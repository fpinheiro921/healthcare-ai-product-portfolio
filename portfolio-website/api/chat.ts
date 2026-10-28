import type { VercelRequest, VercelResponse } from '@vercel/node';

const LM_STUDIO_URL = process.env.LM_STUDIO_URL || 'http://localhost:1234/v1/chat/completions';
const MODELS_URL = LM_STUDIO_URL.replace(/\/chat\/completions\/?$/, '/models');
const PREFERRED_MODELS = ['medgemma-27b-text-it', 'qwen2.5-14b-instruct-1m'];
const TIMEOUT_MS = 15000;

async function listLoadedModels(): Promise<string[]> {
    try {
        const res = await fetch(MODELS_URL, { signal: AbortSignal.timeout(4000) });
        if (!res.ok) return [];
        const data = await res.json();
        return ((data?.data ?? []) as Array<{ id?: string }>).map(m => m.id).filter((id): id is string => Boolean(id) && !/embed/i.test(id!));
    } catch {
        return [];
    }
}

const serverCache = new Map<string, { content: string; ts: number }>();
const SERVER_CACHE_TTL = 120_000;

function hashMessages(messages: Array<{ role: string; content: string }>): string {
    let h = 0;
    const s = JSON.stringify(messages);
    for (let i = 0; i < s.length; i++) {
        h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return h.toString(36);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, maxTokens } = req.body as {
        messages?: Array<{ role: string; content: string }>;
        maxTokens?: number;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages array is required' });
    }

    const cacheKey = hashMessages(messages);
    const cached = serverCache.get(cacheKey);
    if (cached && Date.now() - cached.ts < SERVER_CACHE_TTL) {
        return res.status(200).json({ content: cached.content, cached: true });
    }

    const startTime = Date.now();
    const loaded = await listLoadedModels();
    const candidates = [...new Set([...PREFERRED_MODELS, ...loaded])];
    let lastStatus = 0;

    for (const model of candidates) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
        try {
            const response = await fetch(LM_STUDIO_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    messages,
                    max_tokens: maxTokens ?? 500,
                    temperature: 0.3,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeout);

            if (!response.ok) {
                lastStatus = response.status;
                const errText = await response.text();
                console.error(`LM Studio error (${model}):`, response.status, errText);
                continue;
            }

            const data = await response.json();
            const content = data?.choices?.[0]?.message?.content;

            if (!content) {
                lastStatus = 502;
                continue;
            }

            serverCache.set(cacheKey, { content, ts: Date.now() });
            console.log(`[chat] ${Date.now() - startTime}ms ok model=${model} cache=miss`);
            return res.status(200).json({ content });
        } catch (err: any) {
            clearTimeout(timeout);
            console.error(`Chat API error (${model}):`, err?.name === 'AbortError' ? 'Request timed out' : err?.message);
            lastStatus = err?.name === 'AbortError' ? 504 : 503;
        }
    }

    return res.status(lastStatus === 504 ? 503 : 502).json({
        error: lastStatus === 504 ? 'Request timed out' : 'LM Studio request failed',
        status: lastStatus,
        fallback: true,
    });
}
