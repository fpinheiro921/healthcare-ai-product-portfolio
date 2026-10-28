# BreathEasy AI

**Case study + working UI** for asthma **and** COPD exacerbation risk with environmental triggers.

> Metrics below are **targets / hypotheses**, not measured clinical outcomes.

## Working UI

[https://breatheasy-ai.vercel.app/](https://breatheasy-ai.vercel.app/)

## Clinical framing

Lagged exposure → inflammation risk modeling and deterministic AQI/trigger guardrails for clinician/patient workflows.

PRD: [BreathEasy-AI-PRD.md](../../project-2-prd/BreathEasy-AI-PRD.md)

## Highlights

- Environmental intelligence (AQI / pollen style signals)
- Trigger safety guardrail with traffic-light UX
- Vitest coverage for trigger safety logic

## Stack

React 19, TypeScript, Vite 6, Tailwind, Vitest. LLM via env-configured providers (OpenRouter planned).

## Run

```bash
npm install
npm run dev
npm run build
npm test
```

## License

MIT — see [LICENSE](../../LICENSE).
