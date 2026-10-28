# HeartGuide AI — Product Requirements Document

| Field | Value |
| --- | --- |
| Prepared by | Francisco Pinheiro, MD |
| Date | 2026-10-28 |
| Version | 1.1 |
| Status | Draft — case study / prototype |
| Framing | Case study + working UI (not a cleared medical device) |

> Outcome numbers in this document are **targets / hypotheses**, not measured clinical results.

---

## 1. Executive Summary

Heart failure (HF) drives many unplanned returns to hospital after discharge, often when weight/symptom drift is detected too late. **HeartGuide AI** defines a health-system clinical workflow for remote patient monitoring (RPM): patients log vitals and symptoms; clinicians review a prioritized risk queue for earlier intervention discussion.

This PRD specifies requirements for the portfolio prototype — **not** marketing claims of real-world efficacy.

---

## 2. Product Overview

- **Problem:** Between-visit HF deterioration is hard to see without structured home data and clinician triage time.
- **Solution framing:** Dual patient + provider workflow with deterministic safety rules before any LLM coaching.
- **Users:**
  - Patients: post-discharge HF (typically NYHA II–III), often older adults
  - Providers: cardiology / HF nurses / care managers
- **Differentiators (prototype):**
  - Weight + symptom triangulation (not BP-only logging)
  - Human-in-the-loop alerts (no autonomous prescribing)
  - Explainable “why this risk” messaging for clinician trust

---

## 3. Objectives *(targets / hypotheses)*

| Objective | Target / hypothesis |
| --- | --- |
| Clinical | Lower 30-day unplanned HF readmissions in a future pilot |
| Engagement | High daily adherence to weight + symptom logging |
| Operational | Fewer low-value callbacks via better alert filtering |
| Safety | Critical weight-gain rules fire even if model score is muted |

---

## 4. Requirements

### 4.1 Personas
- **Maria (patient):** 72, lives alone, low tech comfort, anxious about “bothering” the clinic.
- **Dr. Sarah (clinician):** High panel load; needs “who needs a call today?” not raw streams.

### 4.2 Patient app (Must / Should)

| ID | User story | Priority | Acceptance criteria |
| --- | --- | --- | --- |
| PA-01 | Log weight + symptoms daily in &lt;3 taps | Must | Large controls; success confirmation |
| PA-02 | Medication list + reminders | Must | Scheduled reminders; taken/skipped |
| PA-03 | Simple stability status | Should | Green/Yellow/Red with plain-language tip |

### 4.3 Provider dashboard

| ID | User story | Priority | Acceptance criteria |
| --- | --- | --- | --- |
| PD-01 | Ranked high-risk queue | Must | Sort by risk; critical flags visible |
| PD-02 | 7-day trend view | Must | Weight/BP/symptoms charts |
| PD-03 | Alert fatigue control | Must | Configurable thresholds; suppress minor noise |

### 4.4 Non-functionals
- Privacy baseline: encryption in transit/at rest; access control (HIPAA/GDPR-minded design)
- Accessibility: large type, high contrast for older adults
- Prototype performance: dashboard interactive in a few seconds locally/hosted demo

---

## 5. Clinical logic (prototype)

Aligned in spirit with multiparametric RPM thinking (e.g. ACC-style remote HF monitoring themes):

1. **Safety net:** ΔWeight &gt; ~3 lb / 24h → critical alert regardless of symptoms  
2. **Suspicion:** moderate weight rise **and** symptom worsening → high risk for clinician review  
3. **Explainability:** every high alert includes a short clinical reason string  

LLM coaching (if enabled) runs **after** deterministic guardrails.

---

## 6. Competitive note (context only)

Compared with BP-centric consumer monitors, HeartGuide emphasizes **HF fluid/symptom triangulation** and a **provider queue**, not patient-only dashboards.

---

## 7. Risks

| Risk | Mitigation |
| --- | --- |
| Low adherence | Simple morning check-in; caregiver optional |
| Missed deterioration | Hard safety-net weight rule |
| Overclaiming | Public copy = case study + working UI; metrics as targets |

---

## 8. Roadmap (prototype)

1. Manual logging + rule alerts (demo)  
2. Richer risk UI + clinician review flows  
3. Optional wearables / EHR export themes (future; FHIR-aware)

**Working UI:** https://heartguide-ai.vercel.app/
