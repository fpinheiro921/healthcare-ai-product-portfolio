import { SodiumEstimationResponse, RiskAssessmentResponse, SymptomLog } from "../types";

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

export const estimateSodium = async (foodDescription: string): Promise<SodiumEstimationResponse> => {
  try {
    const content = await callLLM([
      {
        role: 'system',
        content: 'You are a clinical dietitian AI for heart failure patients. Estimate sodium content. Return ONLY valid JSON with keys: sodiumMg (number), advice (string), riskAnalysis (string). No markdown, no code fences.',
      },
      {
        role: 'user',
        content: `Estimate the sodium content for this food item: "${foodDescription}". Provide a conservative estimate suitable for a heart failure patient. Also provide brief advice (1 sentence).`,
      },
    ]);

    const parsed = extractJson<SodiumEstimationResponse>(content);
    if (parsed) return parsed;
    throw new Error("No JSON returned");
  } catch (error) {
    console.error("LLM Sodium Error:", error);
    return { sodiumMg: 0, advice: "Could not estimate. Please check manual label.", riskAnalysis: "Unknown" };
  }
};

export const assessPatientRisk = async (
  log: SymptomLog,
  previousWeight: number,
  medsAdherenceRate: number
): Promise<RiskAssessmentResponse> => {
  try {
    const content = await callLLM([
      {
        role: 'system',
        content: 'You are an expert cardiologist AI system. Evaluate readmission risk for Heart Failure patients. Return ONLY valid JSON with keys: riskScore (number 0-100), riskAnalysis (string), recommendation (string). No markdown, no code fences.',
      },
      {
        role: 'user',
        content: `Evaluate readmission risk for a Heart Failure patient based on today's check-in.
Current Data:
- Weight: ${log.weight} lbs (Previous: ${previousWeight} lbs)
- SOB (Shortness of Breath): ${log.shortnessOfBreath}/10
- Swelling: ${log.swelling ? "Yes" : "No"}
- Chest Pain: ${log.chestPain ? "Yes" : "No"}
- Med Adherence (Last 7 days): ${medsAdherenceRate}%

Rules:
- Weight gain > 3lbs in 2 days is HIGH risk.
- SOB > 5 is MODERATE/HIGH risk.
- Chest Pain is CRITICAL/HIGH risk.
- Low adherence increases risk.

Output JSON with a risk score (0-100), analysis, and recommendation.`,
      },
    ]);

    const parsed = extractJson<RiskAssessmentResponse>(content);
    if (parsed) return parsed;
    throw new Error("No JSON returned");
  } catch (error) {
    console.error("LLM Risk Error:", error);
    return { riskScore: 50, riskAnalysis: "AI Unavailable", recommendation: "Contact care team manually." };
  }
};

export const chatWithNurseAI = async (message: string, context: string) => {
  try {
    const content = await callLLM([
      {
        role: 'system',
        content: `You are "Nurse Joy", a compassionate cardiac care nurse assistant. Context about patient: ${context}. Keep answers short (under 50 words), empathetic, and strictly medical adherence focused. If emergency (chest pain, severe breath), tell them to call 911 immediately.`,
      },
      { role: 'user', content: message },
    ]);
    return content || "I'm sorry, I didn't catch that.";
  } catch (error) {
    return "I am having trouble connecting. Please call your care provider if this is urgent.";
  }
};

export const generateEducationalContent = async (topic: string, patientCondition: string): Promise<{title: string, content: string}> => {
  try {
    const content = await callLLM([
      {
        role: 'system',
        content: 'You are a patient education writer for heart failure patients. Write short, encouraging articles. Output plain text with simple Markdown (use ** for bold, - for lists).',
      },
      {
        role: 'user',
        content: `Write a short, encouraging educational article for a heart failure patient with ${patientCondition} about "${topic}".
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
