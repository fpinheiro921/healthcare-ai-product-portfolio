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

export const analyzeMealImage = async (base64Image: string, promptText: string = "") => {
  const prompt = promptText || "Analyze this meal for a diabetic patient. Identify food items, estimate total carbohydrates in grams, and estimate calories.";

  try {
    const content = await callLLM([
      {
        role: 'system',
        content: 'You are a diabetes nutrition AI assistant. Analyze meal descriptions for Type 2 Diabetes patients on insulin. Return ONLY valid JSON with keys: foodItems (array of strings), totalCarbs (number in grams), totalCalories (number), glycemicIndexEstimate (string: Low/Medium/High), healthTip (string). No markdown, no code fences.',
      },
      {
        role: 'user',
        content: `${prompt}\n\nNote: Image analysis is not available in this demo. Please describe your meal in text for accurate carb estimation.`,
      },
    ]);

    const parsed = extractJson<{ foodItems: string[]; totalCarbs: number; totalCalories: number; glycemicIndexEstimate: string; healthTip: string }>(content);
    if (parsed) return parsed;
    return { foodItems: [], totalCarbs: 0, totalCalories: 0, glycemicIndexEstimate: "Unknown", healthTip: "Please describe your meal in text for analysis." };
  } catch (error) {
    console.error("Error analyzing meal:", error);
    throw error;
  }
};

export const getGlucoseInsights = async (readings: any[], medications: any[]) => {
  try {
    const contextData = {
      recentReadings: readings.slice(-10),
      medications: medications
    };

    const content = await callLLM([
      {
        role: 'system',
        content: 'You are a diabetes care AI assistant for Type 2 Diabetes patients on insulin. Analyze glucose data and provide risk assessment. Return ONLY valid JSON with keys: hypoRiskScore (number 0-100), riskLevel (string: Low/Moderate/High), insightTitle (string), insightMessage (string), recommendation (string). No markdown, no code fences.',
      },
      {
        role: 'user',
        content: `Analyze the following recent glucose readings and medication data for a Type 2 Diabetes patient on insulin. Provide a risk assessment for hypoglycemia in the next 24 hours (0-100%) and one key actionable insight.

Data: ${JSON.stringify(contextData)}`,
      },
    ]);

    const parsed = extractJson<{ hypoRiskScore: number; riskLevel: string; insightTitle: string; insightMessage: string; recommendation: string }>(content);
    if (parsed) return parsed;
    throw new Error("No JSON returned");
  } catch (error) {
    console.error("Error generating insights:", error);
    return {
      hypoRiskScore: 0,
      riskLevel: "Low",
      insightTitle: "Analysis Unavailable",
      insightMessage: "Could not generate AI insights at this time.",
      recommendation: "Continue standard monitoring."
    };
  }
};

export const generateEducationalContent = async (topic: string, patientCondition: string): Promise<{ title: string; content: string }> => {
  try {
    const content = await callLLM([
      {
        role: 'system',
        content: 'You are a patient education writer for Type 2 Diabetes patients on insulin. Write short, encouraging articles. Output plain text with simple Markdown (use ** for bold, - for lists).',
      },
      {
        role: 'user',
        content: `Write a short, encouraging educational article for a Type 2 Diabetes patient (${patientCondition}) about "${topic}".
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
        content: `You are "Coach Sarah", a compassionate diabetes care assistant for patients with Type 2 Diabetes on insulin. Context about patient: ${context}. Keep answers short (under 50 words), empathetic, and practical. Focus on insulin management, blood glucose monitoring, and lifestyle for Type 2 Diabetes. If the user describes symptoms of hypoglycemia (low blood sugar), advise them to check their glucose and consume 15g of fast-acting carbs.`,
      },
      { role: 'user', content: message },
    ]);
    return content || "I'm sorry, I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Chat AI Error:", error);
    return "I'm having trouble connecting right now. If this is urgent, please call your healthcare provider.";
  }
};