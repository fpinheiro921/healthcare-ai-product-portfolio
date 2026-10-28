export interface RetrievalChunk {
    id: string;
    text: string;
    score: number;
}

export interface AgentStep {
    type: 'PLANNING' | 'RETRIEVAL' | 'REASONING' | 'RESPONSE';
    content: string;
    timestamp: number;
}

// Mock Vector Store Logic
export class VectorStoreMock {
    private chunks: string[] = [];

    constructor() { }

    // "Ingest" document: Simple recursive character splitter mock
    ingest(text: string): number {
        // Split by paragraphs first, then naive length
        const rawChunks = text.split(/\n\s*\n/);
        this.chunks = rawChunks.flatMap(p => {
            if (p.length < 500) return [p];
            // Split long paragraphs
            const mid = Math.floor(p.length / 2);
            return [p.slice(0, mid), p.slice(mid)];
        }).filter(c => c.length > 20); // Filter noise

        return this.chunks.length;
    }

    // "Retrieve": Naive keyword overlap scoring
    retrieve(query: string, topK: number = 3): RetrievalChunk[] {
        const queryTerms = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);

        const scored = this.chunks.map((text, idx) => {
            const lowerText = text.toLowerCase();
            let score = 0;
            queryTerms.forEach(term => {
                if (lowerText.includes(term)) score += 1;
            });
            // Boost score slightly for shorter chunks (precision focus)
            score = score / (Math.log(text.length) + 1);

            return {
                id: `chunk-${idx}`,
                text,
                score
            };
        });

        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);
    }

    getStats() {
        return { totalChunks: this.chunks.length };
    }
}

// Pre-canned Guidelines (if user doesn't paste anything)
export const DEFAULT_GUIDELINES = `
ACC/AHA/HFSA GUIDELINE FOR HEART FAILURE:

1. DIAGNOSIS
- HFrEF is defined as LVEF <= 40%.
- HFmrEF is defined as LVEF 41-49%.
- HFpEF is defined as LVEF >= 50% with evidence of spontaneous or provokable increased LV filling pressures.

2. MEDICAL THERAPY (HFrEF - Class I)
- GDMT (Guideline-Directed Medical Therapy) is the cornerstone.
- Tenets: ARNI/ACEI/ARB + Beta Blocker + MRA + SGLT2i.
- Beta Blockers: Specific evidence for Carvedilol, Metoprolol Succinate, and Bisoprolol.
- SGLT2 Inhibitors: Dapagliflozin or Empagliflozin recommended regardless of diabetes status.

3. DEVICE THERAPY
- ICD: Recommended for primary prevention in ischemic cardiomyopathy (LVEF <= 35%) > 40 days post-MI.
- CRT: Recommended for LVEF <= 35%, Sinus Rhythm, LBBB with QRS >= 150ms.
`;
