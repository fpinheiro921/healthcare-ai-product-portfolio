# BreathEasy AI — Product Requirements Document

| Field | Value |
| --- | --- |
| Prepared by | Francisco Pinheiro, MD |
| Date | 2026-10-28 |
| Version | 1.1 |
| Status | Draft — case study / prototype |
| Framing | Case study + working UI (not a cleared medical device) |
| Scope | **Asthma and COPD** (always both) |

> Outcome numbers in this document are **targets / hypotheses**, not measured clinical results.

---

## 1. Executive Summary

Respiratory care is often reactive — patients escalate after symptoms worsen. **BreathEasy AI** specifies a clinical workflow that combines patient-reported outcomes (PEF, symptoms, inhaler use) with environmental context (AQI, pollen, weather) to surface higher-risk windows earlier for patient action and clinician review.

This PRD is for a health-system / telehealth-adjacent **prototype**, not a claim of validated exacerbation reduction.

---

## 2. Product Overview

- **Problem:** Triggers are invisible; patients and clinicians lack shared between-visit context.
- **Solution framing:** Daily check-in + environmental overlay + deterministic trigger safety guardrails.
- **Users:**
  - Patients with moderate–severe asthma and/or COPD
  - Pulmonology / primary care teams monitoring chronic respiratory disease
- **Differentiators (prototype):**
  - Lagged exposure → risk framing (inflammation latency awareness)
  - Traffic-light UX for fast interpretation
  - Explicit asthma **and** COPD scope

---

## 3. Objectives *(targets / hypotheses)*

| Objective | Target / hypothesis |
| --- | --- |
| Clinical | Fewer exacerbations / ED visits in a future pilot |
| Engagement | Useful daily PEF / symptom logging adherence |
| Trust | Clinicians understand trigger explanations without black-box mystique |
| Go-to-market | B2B2C via health systems / plans (hypothesis) |

---

## 4. Requirements

### 4.1 Personas
- **Leo (asthma):** Active adult; pollen-sensitive; forgets controller doses.
- **Ana (COPD):** Older adult; anxious about “bad air” days; needs simple guidance.
- **Dr. Patel (clinician):** Wants PEF vs environment trends, not recall-only visits.

### 4.2 Patient app

| ID | User story | Priority | Acceptance criteria |
| --- | --- | --- | --- |
| PA-01 | Log PEF quickly | Must | Keypad/slider; zone calculated |
| PA-02 | See AQI / pollen for my area | Must | Location-based environmental summary |
| PA-03 | Controller / rescue reminders | Should | Configurable notifications |
| PA-04 | Clear “higher risk day” notice | Must | Calm, directive copy; not panic language |

### 4.3 Provider view

| ID | User story | Priority | Acceptance criteria |
| --- | --- | --- | --- |
| PD-01 | PEF vs environment chart | Must | Dual-axis trends; 7/30/90d |
| PD-02 | Red-zone patient list | Must | PEF &lt; threshold surfaces in queue |

### 4.4 Non-functionals
- Privacy for location + health data (GDPR/HIPAA-minded)
- FHIR-friendly export path as a future interop theme
- Fail safe if environmental APIs degrade (manual PEF still works)

---

## 5. Clinical logic (prototype)

- **Lagged risk idea:** today’s exposure can raise risk over following days — warn earlier than “feel tight now” apps.
- **Trigger safety guardrail:** hazardous AQI bands force red/amber states even if symptoms not yet logged.
- **Zones:** Green / Yellow / Red with plain-language next steps (seek care when red).

---

## 6. Health-system workflow fit

Useful in chronic respiratory journeys: outreach → self-monitoring → escalation to telehealth/clinic when risk rises. Public positioning stays generic (“clinical workflow prototype”), not vendor-specific.

---

## 7. Risks

| Risk | Mitigation |
| --- | --- |
| Bad environmental data | Multi-source / graceful fallback |
| Patient anxiety | Calm red-zone messaging |
| Device friction | Support manual peak-flow entry |

---

## 8. Roadmap (prototype)

1. Manual logging + weather/AQI overlay (demo)  
2. Stronger guardrail tests + clinician charts  
3. Optional smart-inhaler / telehealth handoff themes  

**Working UI:** https://breatheasy-ai.vercel.app/
