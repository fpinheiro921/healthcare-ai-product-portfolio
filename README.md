# Clinical Workflow Prototypes

Portfolio of **case studies + working UIs** for health-system and clinical-workflow problems — chronic care monitoring, documentation, and operational safety.

Built by **Francisco Pinheiro** (MD, MSc Biomedical Engineering).

> Outcome numbers below are **targets / product hypotheses**, not measured clinical results.

---

## Focus case studies

| Case study | Problem space | Working UI |
| :--- | :--- | :--- |
| **[HeartGuide AI](./project-3-mvps/heartguide-ai)** | Heart failure remote monitoring & readmission risk | [UI](https://heartguide-ai.vercel.app/) |
| **[BreathEasy AI](./project-3-mvps/breatheasy-ai)** | Asthma/COPD environmental trigger risk | [UI](https://breatheasy-ai.vercel.app/) |
| **[GlucoWise AI](./project-3-mvps/glucowise-ai)** | Type 2 diabetes (insulin) meal/glucose coaching | [UI](https://glucowise-ai.vercel.app/) |
| **[DocuFlow](./project-3-mvps/docu-flow)** | Clinical documentation workflow | [UI](https://docu-flow-franciscos-projects-73f8717a.vercel.app/) |

Portfolio site: [portfolio-website](https://portfolio-website-franciscos-projects-73f8717a.vercel.app/)

---

## Additional experiments

Smaller prototypes exploring triage, capacity, logistics, oncology staging, and related workflows. They are **not** the primary case studies — see the site’s **Experiments** page and folders under [`project-3-mvps/`](./project-3-mvps/).

---

## Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion  
- **Validation**: Vitest (where present), deterministic clinical guardrails in app code  
- **Hosting**: Vercel (static/SPA demos)

Each focus app: `npm install` → `npm run dev` / `npm run build` (and `npm test` when configured).

---

## Product artifacts

- Teardowns: [`project-1-teardowns/`](./project-1-teardowns/)  
- PRDs: [`project-2-prd/`](./project-2-prd/)  
- Portfolio app: [`portfolio-website/`](./portfolio-website/)

---

MIT — see [LICENSE](./LICENSE).
