# HeartGuide AI - Product Requirements Document (PRD)

## Document Information
- **Prepared by**: Francisco Pinheiro
- **Date**: 29/11/2025
- **Version**: 1.0
- **Status**: Draft

## 1. Executive Summary
Heart Failure (HF) remains a major driver of unplanned hospital returns after discharge. **HeartGuide AI** is a clinical-workflow case study + working UI for remote patient monitoring (RPM): patients log vitals/symptoms; clinicians see prioritized risk for earlier review. This document defines product requirements for a health-system workflow prototype — **not** a cleared medical device, and **not** measured outcome claims.

## 2. Product Overview
- **Framing**: Case study + working UI for post-discharge HF clinical workflows (home ↔ care team).
- **Target Users**:
    - **Patients**: Post-discharge HF patients (NYHA Class II-III), typically 65+ years old.
    - **Providers**: Cardiologists, HF Nurse Navigators, and Case Managers.
- **Key Differentiators**:
    - **Risk stratification workflow**: Dynamic scoring from recent patient-generated data, with clinician oversight.
    - **User-Centric Design**: Simplified interface for elderly patients (big buttons, voice logging).
    - **Actionable Insights**: Alerts that surface possible interventions for **human review** (e.g., diuretic titration discussion) — never autonomous prescribing.

## 3. Business Objectives *(targets / hypotheses — not validated results)*
- **Clinical Outcome (target)**: Lower 30-day HF readmission rate in a future pilot (hypothesis: ~20% relative reduction).
- **Engagement (target)**: High daily adherence to weight and symptom logging among active patients.
- **Operational (target)**: Fewer low-value nurse callbacks via better alert filtering.

## 4. User Stories & Requirements

### 4.1 User Roles
- **Patient (Maria)**: 72yo, lives alone, anxious about her condition, not tech-savvy.
- **Cardiologist (Dr. Sarah)**: Busy, manages 200+ patients, needs to know who to call *now*.

### 4.2 Functional Requirements

#### Patient Mobile App
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| **PA-01** | As Maria, I want to easily log my weight and symptoms daily so my doctor knows how I'm doing. | **Must Have** | - Big, high-contrast buttons.<br>- < 3 clicks to complete log.<br>- Confirmation message upon success. |
| **PA-02** | As Maria, I want to see my medication list and get reminders so I don't miss a dose. | **Must Have** | - Push notifications at scheduled times.<br>- "Taken" checkbox for tracking. |
| **PA-03** | As Maria, I want to see a simple "Heart Score" so I know if I'm stable. | **Should Have** | - Green/Yellow/Red status indicator.<br>- Simple advice (e.g., "Great job, keep it up!"). |

#### Provider Dashboard
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| **PD-01** | As Dr. Sarah, I want to see a ranked list of high-risk patients so I can prioritize my rounds. | **Must Have** | - List sorted by AI Risk Score (High to Low).<br>- Visual flags for "Critical" status. |
| **PD-02** | As Dr. Sarah, I want to view a patient's trend over the last 7 days to identify deterioration. | **Must Have** | - Interactive charts for Weight, BP, and Symptom Score.<br>- Overlay of medication changes. |
| **PD-03** | As Dr. Sarah, I want to receive alerts only when a patient truly needs attention to avoid alert fatigue. | **Must Have** | - Configurable thresholds.<br>- AI suppression of minor fluctuations. |

### 4.3 Non-Functional Requirements
- **Compliance**: HIPAA compliant data storage and transmission (encryption at rest and in transit).
- **Accessibility**: WCAG 2.1 AA standards (large text, screen reader support).
- **Performance**: Dashboard loads < 2s; Real-time alerts delivered < 1 min.

## 5. Technical Specifications
- **Frontend**: React Native (Patient App), React + Tailwind CSS (Provider Dashboard).
- **Backend**: Node.js / Python (FastAPI).
### 5.1 The Decompensation Models
HeartGuide's logic aligns with **ACC 2024 Guidelines** on Remote Patient Management, specifically focusing on "multiparametric monitoring."

#### A. The "Triangulation" Logic
We avoid false alarms by demanding concordance between **Objective** (Weight) and **Subjective** (Symptom) data.
*   **Rule 1 (The Safety Net)**: $\Delta$Weight > 3.0 lbs in 24h $\rightarrow$ **CRITICAL ALERT** (Regardless of symptoms).
*   **Rule 2 (The AI Suspicion)**: 
    *   IF $\Delta$Weight > 1.5 lbs AND Dyspnea Score > Baseline + 2
    *   THEN Risk = HIGH (Predictive of readmission).

#### B. Explainability (SHAP Values)
To gain provider trust, every alert includes a specific clinical reason:
*   *"Risk Score: 85% (Critical)"*
*   *Why?*: "Rapid Weight Gain (+3.2 lbs) + Worsening Orthopnea."

---

## 6. Market Differentiation: HeartGuide vs. Hello Heart

| Feature | Hello Heart (The Monitor) | HeartGuide AI (The Manager) |
| :--- | :--- | :--- |
| **Logic** | **Reactive**: Alerts *after* BP is high. | **Predictive**: Alerts *before* fluid overload becomes critical. |
| **Data Source** | **Single (BP)**: Limited view of physiology. | **Triangulated (Weight + Symptoms + BP)**: Full hemodynamic picture. |
| **User Role** | **Passive Logger**: "Just check your numbers." | **Active Partner**: "Confirm you took your Lasix." |

## 6. User Experience (UX)
- **Patient App**: "Morning Routine" flow. App opens directly to the check-in screen. No navigation required for primary task.
- **Provider Dashboard**: "Command Center" view. Dark mode option for radiologists/cardiologists working in dim rooms.

## 7. Success Metrics
- **Primary KPI**: 30-Day Readmission Rate (Target: <18%).
- **Secondary KPIs**:
    - Patient Adherence Rate (Target: >85%).
    - System Usability Scale (SUS) Score (Target: >80).
    - False Positive Alert Rate (Target: <10%).

## 8. Risks & Mitigations
| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| **Low Patient Adherence** | High | Medium | Gamification (streaks), automated SMS reminders, caregiver notifications. |
| **AI False Negatives** | Critical | Low | "Safety net" rules: Any weight gain >3lbs in 24h triggers alert regardless of AI score. |
| **Data Privacy Breach** | Critical | Low | End-to-end encryption, regular penetration testing, strict access controls. |

## 9. Roadmap
- **Phase 1 (MVP)**: Manual logging, basic rule-based alerts. (Completed)
- **Phase 2 (Pilot)**: AI Risk Scoring, EHR Integration (Epic/Cerner). (Current)
- **Phase 3 (Scale)**: Wearable integration (Apple Watch/Fitbit), Telemedicine video calls.
