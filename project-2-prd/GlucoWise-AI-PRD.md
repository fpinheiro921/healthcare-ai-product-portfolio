# GlucoWise AI — Product Requirements Document

| Field | Value |
| --- | --- |
| Prepared by | Francisco Pinheiro, MD |
| Date | 2026-10-28 |
| Version | 1.1 |
| Status | Draft — case study / prototype |
| Framing | Case study + working UI (not a cleared medical device) |
| Scope | **Type 2 diabetes on insulin** (not Type 1) |

> Outcome numbers in this document are **targets / hypotheses**, not measured clinical results.

---

## 1. Executive Summary

People with Type 2 diabetes on insulin often struggle to connect meals to glucose response and bolus decisions. **GlucoWise AI** specifies a clinical workflow for meal logging, excursion pattern awareness, and pre-meal decision support with **deterministic safety checks** and clinician-facing review.

This PRD describes a portfolio prototype — educational / workflow exploration, **not** autonomous dosing advice for real patients.

---

## 2. Product Overview

- **Problem:** Logs without interpretation; vague lifestyle advice; bolus math friction; safety risk if AI overreaches.
- **Solution framing:** Meal → estimated load → predicted excursion band → guarded bolus suggestion for **human review**.
- **Users:**
  - Adults with Type 2 diabetes using insulin
  - Endocrinologists / diabetes educators needing pattern summaries
- **Out of scope:** Type 1 diabetes; closed-loop pump control; claiming FDA clearance

---

## 3. Objectives *(targets / hypotheses)*

| Objective | Target / hypothesis |
| --- | --- |
| Clinical | Better time-in-range / HbA1c trajectory in a future pilot |
| Safety | Hard caps and hypo-guards on suggested doses |
| Usability | Meal logging in under ~30 seconds in the demo UX |
| Provider value | Faster pattern review than raw CSV / paper logs |

---

## 4. Requirements

### 4.1 Personas
- **David (T2D on insulin):** Newly started insulin; fears hypos; confused by carbs vs dose.
- **Dr. Lee (clinician):** Needs spikes after dinner vs morning highs — not every reading.

### 4.2 Patient app

| Feature | Description | Priority |
| --- | --- | --- |
| Meal logging | Photo/text capture → macro estimate (prototype) | Must |
| Glucose entry | Manual / simulated CGM | Must |
| Pattern insights | Flag recurring meal→spike patterns | Should |
| Guarded bolus helper | ICR/ISF/IOB-style calc with hard safety caps | Must |
| Disclaimers | Educational / not medical advice in UI | Must |

### 4.3 Provider dashboard

| Feature | Description | Priority |
| --- | --- | --- |
| TIR / variability view | Visual summary | Must |
| Adherence signal | Logging frequency | Should |
| Red flags | Severe hypo / sustained hyper thresholds | Must |

### 4.4 Non-functionals
- Privacy-minded handling of meal/glucose data
- No silent autonomous dose changes
- Clear clinician override / review path in product story

---

## 5. Decision support logic (prototype)

Illustrative bolus structure (clinician-set parameters):

\[
\text{Bolus} = \frac{\text{Carbs}}{\text{ICR}} + \frac{\text{BG} - \text{Target}}{\text{ISF}} - \text{IOB}
\]

**Guardrails (examples):** max bolus cap; reduce suggestion if glucose falling rapidly; always show “review before taking” framing.

Metabolic physics checks in the codebase validate extreme meal loads before “stable” predictions.

---

## 6. Competitive note (context only)

Relative to coaching-heavy digital diabetes programs, GlucoWise emphasizes **meal→glucose decision logistics** for insulin users, with safety bounds — not willpower-only coaching.

---

## 7. Risks

| Risk | Mitigation |
| --- | --- |
| Wrong carb estimate | Manual override; educational disclaimer |
| Users treating AI as authority | Guardrails + clinician review narrative |
| Scope creep into Type 1 / pumps | Explicit out-of-scope |

---

## 8. Roadmap (prototype)

1. Manual logs + charts + rule insights (demo)  
2. Stronger meal estimation UX + safety tests  
3. Optional CGM/activity integration themes  

**Working UI:** https://glucowise-ai.vercel.app/
