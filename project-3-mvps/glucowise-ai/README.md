# GlucoWise AI

**Case study + working UI** for Type 2 diabetes on insulin — meal impact estimation and glucose coaching workflows.

> Metrics below are **targets / hypotheses**, not measured clinical outcomes. Scope is **Type 2 on insulin**, not Type 1.

## Working UI

[https://glucowise-ai.vercel.app/](https://glucowise-ai.vercel.app/)

## Clinical framing

Smart bolus / metabolic-physics style checks before prediction surfaces. Built as a health-system clinical-workflow prototype.

PRD: [GlucoWise-AI-PRD.md](../../project-2-prd/GlucoWise-AI-PRD.md)

## Highlights

- Patient and provider dashboards
- Meal logging + spike prediction UX
- Deterministic metabolic safety tests (`npm test`)

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
