import { Patient, AIAnalysisResult, RiskLevel } from '../types';

const LM_STUDIO_URL = process.env.LM_STUDIO_URL || 'http://localhost:1234/v1/chat/completions';
const MODELS_URL = LM_STUDIO_URL.replace(/\/chat\/completions\/?$/, '/models');
const PREFERRED_MODELS = ['medgemma-27b-text-it', 'qwen2.5-14b-instruct-1m'];
const REQUEST_TIMEOUT_MS = 90_000;
const MODELS_TIMEOUT_MS = 5_000;

let activeModel: string | null = null;
const rejectedModels = new Set<string>();

async function listLoadedModels(): Promise<string[]> {
  try {
    const res = await fetch(MODELS_URL, { signal: AbortSignal.timeout(MODELS_TIMEOUT_MS) });
    if (!res.ok) return [];
    const data = await res.json();
    return ((data?.data ?? []) as Array<{ id?: string }>).map(m => m.id).filter((id): id is string => Boolean(id) && !/embed/i.test(id!));
  } catch {
    return [];
  }
}

async function requestCompletion(model: string, messages: Array<{ role: string; content: string }>, maxTokens: number): Promise<string> {
  const response = await fetch(LM_STUDIO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature: 0.3,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) rejectedModels.add(model);
    throw new Error(`LM Studio error: ${response.status}`);
  }
  const data = await response.json();
  return data?.choices?.[0]?.message?.content || '';
}

async function callLLM(messages: Array<{ role: string; content: string }>, maxTokens = 500): Promise<string> {
  const loaded = await listLoadedModels();
  const candidates = [...new Set([
    ...(activeModel ? [activeModel] : []),
    ...PREFERRED_MODELS,
    ...loaded,
  ])].filter(m => !rejectedModels.has(m));

  let lastError: unknown = new Error('No LM Studio models available');
  for (const model of candidates) {
    try {
      const content = await requestCompletion(model, messages, maxTokens);
      activeModel = model;
      return content;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

export const checkLLMStatus = async (): Promise<{ online: boolean; model: string | null }> => {
  const loaded = await listLoadedModels();
  return { online: loaded.length > 0, model: activeModel ?? loaded.find(m => PREFERRED_MODELS.includes(m)) ?? loaded[0] ?? null };
};

function extractJson<T>(content: string): T | null {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : content;
  const match = candidate.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as T;
  } catch {
    return null;
  }
}

export const analyzePatientRisk = async (patient: Patient): Promise<AIAnalysisResult> => {
  const recentLogs = patient.logs.slice(-7);
  const logSummary = recentLogs.map(log =>
    `Date: ${log.date}, PEF: ${log.pef} (Baseline: ${patient.baselinePEF}), SpO2: ${log.spO2}%, Breathlessness: ${log.breathlessness}/10, Rescue Inhaler: ${log.rescueInhalerPuffs} puffs`
  ).join('\n');

  try {
    const content = await callLLM([
      {
        role: 'system',
        content: 'You are a COPD and asthma specialist AI assistant. Analyze patient data to predict exacerbation risk. Return ONLY valid JSON with keys: riskScore (number 0-100), riskLevel (string), reasoning (string), recommendation (string), urgentActionRequired (boolean). No markdown, no code fences.',
      },
      {
        role: 'user',
        content: `Analyze the following patient data to predict exacerbation risk.

Patient Profile:
- Age: ${patient.age}
- COPD Stage: ${patient.copdStage}
- Baseline PEF: ${patient.baselinePEF}

Recent Daily Logs (Last 7 days):
${logSummary}

Task:
1. Calculate a risk score (0-100) where >60 is high risk of imminent exacerbation.
2. Identify key trends (PEF decline, SpO2 drops, symptom spikes).
3. Provide a specific clinical recommendation.

Output JSON only.`,
      },
    ]);

    const result = extractJson<{ riskScore: number; reasoning: string; recommendation: string; urgentActionRequired: boolean }>(content);
    if (result) {
      let riskLevelEnum = RiskLevel.LOW;
      if (result.riskScore >= 60) riskLevelEnum = RiskLevel.HIGH;
      else if (result.riskScore >= 20) riskLevelEnum = RiskLevel.MODERATE;

      return {
        riskScore: result.riskScore,
        riskLevel: riskLevelEnum,
        reasoning: result.reasoning,
        recommendation: result.recommendation,
        urgentActionRequired: result.urgentActionRequired
      };
    }
    throw new Error("No JSON returned");
  } catch (error) {
    console.error("LLM Analysis Failed", error);
    return {
        riskScore: 0,
        riskLevel: RiskLevel.LOW,
        reasoning: "AI Analysis unavailable. Please consult standard charts.",
        recommendation: "Continue standard monitoring.",
        urgentActionRequired: false
    }
  }
};

export const generateEducationalContent = async (topic: string, patientCondition: string): Promise<{ title: string; content: string }> => {
  try {
    const content = await callLLM([
      {
        role: 'system',
        content: 'You are a patient education writer for people with asthma and COPD. Write short, encouraging articles. Output plain text with simple Markdown (use ** for bold, - for lists).',
      },
      {
        role: 'user',
        content: `Write a short, encouraging educational article for a patient with ${patientCondition} about "${topic}".
Structure:
- 3 Key Takeaways (bullet points)
- Simple explanation (2 paragraphs, max 150 words)
- Actionable advice for today`,
      },
    ], 800);
    return { title: topic, content: content || "Content unavailable." };
  } catch (e) {
    return { title: topic, content: "Content unavailable at the moment." };
  }
};

export const chatWithAI = async (message: string, context: string): Promise<string> => {
  try {
    const content = await callLLM([
      {
        role: 'system',
        content: `You are "Coach Mia", a compassionate respiratory care assistant for patients with asthma and COPD. Context about patient: ${context}. Keep answers short (under 50 words), empathetic, and practical. If the user describes severe breathlessness or an asthma/COPD exacerbation, tell them to use their rescue inhaler and seek emergency care immediately.`,
      },
      { role: 'user', content: message },
    ]);
    return content || "I'm sorry, I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Chat AI Error:", error);
    return "I'm having trouble connecting right now. If this is urgent, please call your healthcare provider.";
  }
};