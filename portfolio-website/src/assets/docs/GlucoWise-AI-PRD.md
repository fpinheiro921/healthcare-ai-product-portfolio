# Product Requirements Document (PRD): GlucoWise AI

**Version**: 1.0  
**Status**: Final  
**Date**: November 29, 2025  
**Author**: Francisco Pinheiro, MD

---

## 1. Executive Summary

**GlucoWise AI** is a clinical-workflow case study + working UI for **Type 2 diabetes on insulin** — helping patients and clinicians connect meals, glucose response, and bolus decision support. Scope is **not Type 1 diabetes**. This PRD defines prototype requirements; outcome metrics below are **targets / hypotheses**, not measured results.

### The Problem
- **Data Overload**: Patients generate hundreds of glucose data points but lack the expertise to interpret them.
- **Generic Advice**: "Eat better" is too vague — insulin users need meal-specific decision support.
- **High Friction**: Manual logging is tedious and leads to abandonment.
- **Safety**: Bolus suggestions must sit behind deterministic checks and clinician-safe framing.

### The Solution
A diabetes companion workflow that:
1.  **Simplifies Logging**: Meal capture (including photo-assisted estimation in the UI).
2.  **Connects the Dots**: Relates foods to likely glucose excursions.
3.  **Supports Decisions**: Pre-meal coaching / smart-bolus style guidance with safety guardrails for human review.

---

## 2. User Personas

### Primary Persona: "David" (Type 2 on insulin)
- **Profile**: 55-year-old accountant with Type 2 diabetes, newly started on insulin.
- **Pain Point**: Unsure how meals map to bolus decisions; fears hypo/hyper swings.
- **Goal (target)**: Improve time-in-range / HbA1c without abandoning all favorite foods.
- **Quote**: *"My doctor said 'watch your carbs,' but I don't know how that changes my dose before dinner."*

### Secondary Persona: "Dr. Lee" (The Endocrinologist)
- **Profile**: Busy specialist with 15-minute appointment slots.
- **Pain Point**: Patients bring in messy paper logs or raw CSV files that take too long to analyze.
- **Goal**: Quickly identify adherence issues and patterns to adjust medication.
- **Quote**: *"I don't need to see every number. I need to know if they're spiking after dinner or waking up high."*

---

## 3. Functional Requirements

### 3.1 Patient Mobile App

| Feature | Description | Priority |
| :--- | :--- | :--- |
| **Smart Meal Logging** | User takes a photo or types a description. AI extracts macronutrients (Carbs, Protein, Fat). | P0 |
| **Glucose Tracking** | Manual entry of finger-stick readings or sync with CGM data (simulated). | P0 |
| **Pattern Recognition** | "Insight Engine" that flags correlations (e.g., "Pizza dinners lead to >180 mg/dL next morning"). | P1 |
| **Food Swaps** | Recommendation engine suggesting lower-GI alternatives (e.g., "Try quinoa instead of white rice"). | P2 |

### 3.2 Provider Dashboard

| Feature | Description | Priority |
| :--- | :--- | :--- |
| **Glycemic Variability** | Visual graphs showing Time-in-Range (TIR) vs. Hyper/Hypoglycemia. | P0 |
| **Adherence Score** | Metric tracking logging frequency and medication compliance. | P1 |
| **Red Flag Alerts** | Notifications for severe hypoglycemia (<70 mg/dL) or sustained hyperglycemia (>250 mg/dL). | P1 |

---

## 4. AI/ML Capabilities: The "Simulation Engine"

### 4.1 The Smart Bolus Algorithm (FDA Class II SaMD Logic)
Unlike simple "calculators," GlucoWise uses a dynamic safety-bounded formula inspired by the **JAMA 2024** findings on AI decision support non-inferiority.

*   **Core Formula**:
    $$ \text{Bolus} = \left( \frac{\text{Carbohydrates (g)}}{\text{ICR}} \right) + \left( \frac{\text{Current BG} - \text{Target BG}}{\text{ISF}} \right) - \text{IOB} $$
*   **Where**:
    *   **ICR** = Insulin-to-Carb Ratio (clinician set).
    *   **ISF** = Insulin Sensitivity Factor (adaptive).
    *   **IOB** = Insulin On Board (decay function over 4 hours).
*   **Safety Guardrails**:
    *   **Max Bolus Cap**: Hard limit set by physician (e.g., 20 units).
    *   **Hypo-Guard**: If current trend is dropping (>2 mg/dL/min), reduce calculated dose by 30%.

### 4.2 Pattern Recognition: "Metabolic Fingerprinting"
*   **Input**: "Turkey sandwich on whole wheat"
*   **NLP Extraction**: {Carbs: 30g, Protein: 25g, Fat: 15g} via **OpenAI GPT-4o**.
*   **Cluster Analysis**: Groups meals into "Green/Yellow/Red" based on 2-hour post-prandial excursions.

---

## 5. Market Differentiation: GlucoWise vs. Omada

| Feature | Omada Health (The Incumbent) | GlucoWise AI (The Challenger) |
| :--- | :--- | :--- |
| **Methodology** | **Human Coaching**: "Let's talk about why you ate that." | **Decision Automation**: "Here is the exact dose/swap to fix it." |
| **Philosophy** | **Willpower-Driven**: Relies on behavioral psychology. | **Logistics-Driven**: Relies on metabolic simulation. |
| **Scalability** | **Linear**: 1 Coach = 500 Patients. | **Exponential**: 1 AI = ∞ Patients. |
| **GLP-1 fit** | Weak (Educational only). | Strong (Protein tracking to prevent sarcopenia). |

---

## 5. Success Metrics

### 5.1 Clinical Outcomes
- **HbA1c Reduction**: Target 0.5% reduction in 3 months.
- **Time-in-Range (TIR)**: Increase % of time glucose is 70-180 mg/dL.

### 5.2 Engagement Metrics
- **Daily Active Users (DAU)**: % of users logging at least 1 meal/day.
- **Logging Friction**: Average time to log a meal (Target: <30 seconds).

### 5.3 Behavioral Metrics
- **Swap Acceptance Rate**: % of AI-suggested food swaps accepted by the user.

---

## 6. Roadmap

### Phase 1: MVP (Current)
- Manual glucose and meal logging.
- Basic trend visualization.
- Rule-based insights (e.g., "High glucose detected").

### Phase 2: Intelligence Layer
- Integration of NLP for automated macro estimation.
- "Traffic Light" system for logged meals based on historical response.

### Phase 3: Connected Ecosystem
- Real-time CGM integration (Dexcom/Libre APIs).
- Apple Health / Google Fit sync for activity data.

---

## 7. Risks & Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **Inaccurate Macro Estimation** | User relies on wrong carb counts for insulin dosing. | **Disclaimer**: "Estimates for educational purposes only." Manual override option. |
| **Alert Fatigue** | User ignores constant notifications. | **Smart Throttling**: Limit non-critical alerts to 1/day. |
| **Data Privacy** | Leak of sensitive health data. | HIPAA-compliant encryption; local-first data storage where possible. |
