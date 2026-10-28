# BreathEasy AI - Product Requirements Document (PRD)

## Document Information
- **Prepared by**: Francisco Pinheiro
- **Date**: 29/11/2025
- **Version**: 1.0
- **Status**: Draft

## 1. Executive Summary
Asthma affects over 260 million people globally, yet management remains largely reactive. **BreathEasy AI** is a smart asthma management platform that shifts care from reactive to proactive. By correlating patient-reported outcomes (Peak Flow, Symptoms) with real-time environmental data (AQI, Pollen, Weather), BreathEasy AI predicts exacerbation risks and enables timely interventions.

## 2. Product Overview
- **Vision**: To empower asthma patients to breathe freely by predicting and preventing flare-ups before they happen.
- **Target Users**:
    - **Patients**: Moderate-to-severe asthma patients who need daily monitoring.
    - **Providers**: Pulmonologists and Allergists seeking objective data for treatment adjustment.
- **Key Differentiators**:
    - **Environmental Context**: Unlike standard loggers, we overlay symptom data with local air quality and pollen levels.
    - **Predictive Alerts**: "High Risk Day" notifications based on forecasted triggers.
    - **Simple UI**: Designed for quick (<30s) daily check-ins.

## 3. Business Objectives
- **Clinical Outcome**: Reduce annualized asthma exacerbation rate by 30% in pilot population.
- **Engagement**: Achieve >70% daily adherence to Peak Flow logging.
- **Monetization**: B2B2C model (Health Plans & Employers) focused on reducing ER utilization costs.

## 4. User Stories & Requirements

### 4.1 User Roles
- **Leo (Patient)**: 25yo, active lifestyle, often forgets controller meds, sensitive to grass pollen.
- **Dr. Patel (Pulmonologist)**: Frustrated by "recall bias" during 6-month checkups.

### 4.2 Functional Requirements

#### Patient Mobile App
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| **PA-01** | As Leo, I want to log my Peak Flow Rate (PEF) quickly so I can get on with my day. | **Must Have** | - Slider or keypad input.<br>- Auto-calculation of "Zone" (Green/Yellow/Red). |
| **PA-02** | As Leo, I want to see the current Air Quality and Pollen count to plan my outdoor runs. | **Must Have** | - Real-time API integration (e.g., BreezoMeter).<br>- Location-based data. |
| **PA-03** | As Leo, I want to receive a reminder to take my inhaler if I haven't logged it. | **Should Have** | - Customizable push notifications.<br>- "Snooze" functionality. |

#### Provider Dashboard
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| **PD-01** | As Dr. Patel, I want to see a graph of Leo's Peak Flow vs. Air Quality to identify triggers. | **Must Have** | - Dual-axis line chart.<br>- Date range filtering (7d, 30d, 90d). |
| **PD-02** | As Dr. Patel, I want to be alerted if a patient enters the "Red Zone" (PEF < 50%). | **Must Have** | - Real-time dashboard notification.<br>- Email summary of high-risk patients. |

### 4.3 Non-Functional Requirements
- **Interoperability**: FHIR-compatible data export for EHR integration.
- **Reliability**: 99.9% uptime for alert delivery system.
- **Privacy**: GDPR and HIPAA compliant handling of location data.

## 5. Technical Specifications
- **Frontend**: React Native (App), React (Dashboard).
- **Backend**: Node.js, PostgreSQL (Time-series data).
- **Integrations**:
    - OpenWeatherMap API (Weather/Pollen).
    - IQAir API (Air Quality).
### 5.1 The Lagged Risk Algorithm
Standard apps correlate *current* AQI with *current* symptoms. BreathEasy uses a **Lagged Distributed Lag Model (DLNM)** logic to account for inflammation latency.

*   **The Logic**:
    *   *Observation*: High Ozone (O3) exposure on Day 0 often triggers attacks on Day 2 due to airway inflammation kinetics.
    *   *The Model*: Risk(t) = $\alpha \cdot AQI(t) + \beta \cdot AQI(t-1) + \gamma \cdot AQI(t-2)$.
    *   *Result*: We warn the patient *before* they feel tight.

---

## 6. Sword Ecosystem Fit: "Digital Pneumology"

BreathEasy is designed to be Sword Health's **fourth vertical**, sitting alongside MSK (Move), Pelvic (Bloom), and Mental (Mind).

| Feature | Sword MSK (Move) | Sword Respiratory (BreathEasy) |
| :--- | :--- | :--- |
| **Sensor** | IMU (Motion) | Spirometer + Air Monitor |
| **Logic** | Biomechanical Correction | Environmental Prediction |
| **Model** | "Fix the movement" | "Dodge the trigger" |
| **value** | Avoid Surgery ($$) | Avoid ER Visits ($$$) |

## 6. User Experience (UX)
- **"Traffic Light" System**: Immediate visual feedback after every log.
    - 🟢 **Green**: "All good. Maintain therapy."
    - 🟡 **Yellow**: "Caution. Take rescue inhaler."
    - 🔴 **Red**: "Medical Alert. Call doctor."

## 7. Success Metrics
- **Primary KPI**: Reduction in "Yellow/Red Zone" days per patient.
- **Secondary KPIs**:
    - App retention (Day 30).
    - Correlation accuracy (AI Trigger Identification).

## 8. Risks & Mitigations
| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| **Inaccurate Environmental Data** | Medium | Medium | Use multiple data providers and average the values. |
| **Patient Anxiety** | High | Low | Ensure "Red Zone" messaging is calm and directive, not alarming. |
| **Device Calibration** | Medium | High | Support manual entry from standard mechanical peak flow meters (cheaper, reliable). |

## 9. Roadmap
- **Phase 1 (MVP)**: Manual logging + Weather API. (Completed)
- **Phase 2**: Smart Inhaler integration (Bluetooth sensors).
- **Phase 3**: Telehealth integration for immediate "Red Zone" consults.
