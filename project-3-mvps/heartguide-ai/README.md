# HeartGuide AI

**Case study + working UI** for heart-failure remote monitoring and readmission-risk workflows.

> Metrics below are **targets / hypotheses**, not measured clinical outcomes.

## Working UI

[https://heartguide-ai.vercel.app/](https://heartguide-ai.vercel.app/)

## Clinical framing

Implements ACC-oriented heart-failure RPM style triangulation (e.g. weight + symptoms) as product logic for clinician review — not a cleared medical device.

PRD: [HeartGuide-AI-PRD.md](../../project-2-prd/HeartGuide-AI-PRD.md)

## Highlights

- Dual patient / provider views
- Deterministic safety guardrail before LLM advice
- Risk simulator trained on public heart-disease data (lab performance, not real-world outcomes)

## Stack

React 19, TypeScript, Vite 6, Tailwind, Recharts, Vitest. LLM via local/env-configured providers (moving toward OpenRouter).

## Run

```bash
npm install
npm run dev
npm run build
npm test
```

Copy `.env.local` for provider keys — never commit secrets.

## License

MIT — see [LICENSE](../../LICENSE).
