# CLAUDE.md — System Brain

## Strategy

### Product Philosophy
- Problem-first, not solution-first
- Clinical validation trumps user engagement
- Build what clinicians will trust, not just what patients will use
- Regulatory compliance is a feature, not a blocker

### Competitive Positioning
- Clinical depth over consumer breadth
- Outcomes over engagement metrics
- Regulatory rigor over speed-to-market
- B2B2C (health systems/insurers) over DTC

### Key Differentiators
1. **Clinical credibility**: Built by someone who's treated patients
2. **Regulatory readiness**: FDA SaMD/MDR considered from day one
3. **Workflow integration**: Designed for clinical reality, not idealized journeys
4. **Outcome focus**: HbA1c reduction, readmission prevention—not just DAU

### Portfolio Apps & Clinical Domains
| App | Domain | Key Outcome Metric |
|-----|--------|--------------------|
| HeartGuide AI | Heart failure | 30-day readmission reduction |
| GlucoWise AI | Type 2 diabetes (insulin users) | HbA1c reduction, time-in-range |
| BreathEasy AI | Asthma/COPD | Exacerbation prevention, ED visits avoided |
| DocuFlow | Clinical documentation | Documentation time reduction, clinician burnout |

---

## Metrics Framework

### Clinical Outcomes (North Star)
- **HeartGuide**: Readmission rate (target: 40% reduction), NYHA class improvement, ED visit reduction
- **GlucoWise**: HbA1c change (target: 0.5% reduction), time-in-range (>70%), hypoglycemia events
- **BreathEasy**: Exacerbation frequency, rescue inhaler use, PEF variability, ED visits
- **DocuFlow**: Documentation time (target: 50% reduction), note accuracy, clinician satisfaction

### Product Metrics
- **Activation**: Time-to-first-value, setup completion rate
- **Engagement**: DAU/MAU (target: 60-80% for chronic care), feature adoption
- **Retention**: D7, D30, D90 retention (benchmark: 50-70% for health apps)
- **Satisfaction**: NPS, clinician trust score, patient confidence

### Business Metrics
- **Unit economics**: CAC, LTV, payback period, contribution margin
- **Market**: TAM/SAM/SOM, penetration rate, expansion revenue
- **Efficiency**: Time-to-clinical-validation, regulatory timeline

---

## Personas

### Primary: Dr. Sarah Chen — Internist
- **Context**: Sees 20-25 patients/day, 15 min per visit, EHR burden high
- **Pain points**: No time to review patient-generated data, alert fatigue, workflow fragmentation
- **Goals**: Efficient chronic disease management, reduced liability, better outcomes without more work
- **Tech attitude**: Skeptical but pragmatic—will adopt if it saves time and improves care
- **Relevant apps**: All four (HeartGuide for HF patients, GlucoWise for diabetics, BreathEasy for respiratory, DocuFlow for documentation)

### Secondary: Maria Santos — Type 2 Diabetic
- **Context**: 58 years old, newly on insulin, low health literacy, smartphone comfortable
- **Pain points**: Fear of hypoglycemia, confused by carb counting, feels abandoned between visits
- **Goals**: Avoid complications, feel supported, reduce clinic visits
- **Tech attitude**: Uses phone for everything but needs simple, reassuring interfaces
- **Relevant apps**: GlucoWise (primary), HeartGuide (comorbid HF)

### Secondary: James Williams — COPD Patient
- **Context**: 67 years old, retired, 2 exacerbations in past year, uses rescue inhaler daily
- **Pain points**: Anxiety about breathing attacks, unsure when to seek help, environmental triggers unclear
- **Goals**: Prevent exacerbations, maintain independence, reduce ED visits
- **Relevant apps**: BreathEasy (primary)

### Economic Buyer: Dr. James Park — Chief Medical Officer
- **Context**: 500-bed health system, value-based contracts, margin pressure
- **Pain points**: Rising chronic care costs, readmission penalties, physician burnout
- **Goals**: Reduce total cost of care, improve quality metrics, retain clinical staff
- **Decision criteria**: ROI evidence, workflow integration, liability coverage, regulatory compliance
- **Relevant apps**: All four (HeartGuide for HRRP penalties, DocuFlow for burnout reduction)

---

## Glossary

### Clinical Terms
- **HbA1c**: 3-month average blood glucose (target: <7% for most diabetics)
- **Time-in-range**: % of time glucose is 70-180 mg/dL (target: >70%)
- **Readmission**: Unplanned hospital return within 30 days (penalized by CMS via HRRP)
- **NYHA Class**: Heart failure severity (I-IV, IV being severe)
- **PEF**: Peak expiratory flow (lung function measure)
- **Exacerbation**: Acute worsening of chronic respiratory disease

### Product Terms
- **SaMD**: Software as a Medical Device (FDA classification)
- **MDR**: Medical Device Regulation (EU)
- **B2B2C**: Business-to-business-to-consumer (sell to system, use by patient)
- **DTC**: Direct-to-consumer (patient pays directly)

### Regulatory
- **510(k)**: FDA clearance pathway (substantial equivalence)
- **De Novo**: FDA pathway for novel devices
- **CE Marking**: EU approval to market
- **HIPAA**: Health data privacy (US)
- **GDPR**: Data protection (EU)

### Business
- **TAM/SAM/SOM**: Total/Serviceable/Obtainable Market
- **RICE**: Reach, Impact, Confidence, Effort prioritization
- **LTV**: Lifetime value of customer
- **CAC**: Customer acquisition cost
- **NPS**: Net Promoter Score (-100 to +100)
- **HRRP**: Hospital Readmissions Reduction Program (CMS penalty)

---

## Decision Principles

1. **When in doubt, optimize for clinical outcome over user delight**
2. **Regulatory compliance is not optional—build it in, not on**
3. **Clinician trust is harder to earn than patient trust—prioritize accordingly**
4. **B2B2C beats DTC for chronic care (payer reimbursement matters)**
5. **Real-world evidence beats RCTs for adoption (clinicians trust peer experience)**

---

## Anti-Patterns

- ❌ Describing prototypes as "deployed" or "live"
- ❌ Using "AI" as a feature rather than an enabler
- ❌ Optimizing for engagement over outcomes
- ❌ Building DTC when B2B2C is the viable path
- ❌ Ignoring regulatory until "later"
- ❌ Feature bloat without clinical validation
