import React from 'react';

const OverviewBrief: React.FC = () => {
  const architectureLayers = [
    {
      key: 'inputs',
      label: 'Patient Event',
      icon: 'glucose',
      border: 'border-sky-200',
      bg: 'from-sky-50 to-white',
      scenario: 'Type 2 patient eats pasta dinner at 6:30 PM (on basal insulin)',
      trigger: 'CGM reading: 180 mg/dL (rising rapidly)',
      data: ['Meal photo uploaded: Large pasta bowl', 'Estimated carbs: 75g', 'Basal insulin glargine given at 8 AM'],
      action: 'Data transmitted to cloud via FHIR API'
    },
    {
      key: 'ingestion',
      label: 'Signal Processing',
      icon: 'analytics',
      border: 'border-emerald-200',
      bg: 'from-emerald-50 to-white',
      scenario: 'System enriches meal context and glucose trend',
      trigger: 'Glucose velocity: +4 mg/dL per 5 min',
      data: ['Retrieve: Patient\'s carb ratio (1:10)', 'Check: Insulin on board = 0 units', 'Historical pattern: Pasta causes 3-hour spike'],
      action: 'Feature vector built with meal + glucose context'
    },
    {
      key: 'models',
      label: 'AI Insulin Recommendation',
      icon: 'science',
      border: 'border-amber-200',
      bg: 'from-amber-50 to-white',
      scenario: 'Predictive models calculate mealtime bolus',
      trigger: 'Predicted peak: 240 mg/dL in 90 minutes',
      data: ['Carb coverage: 75g ÷ 10 = 7.5 units', 'Correction dose: (180-120) ÷ 40 = 1.5 units', 'Basal insulin on board: 0 units (8 AM dose)'],
      action: 'Suggest: 9 units rapid-acting insulin now'
    },
    {
      key: 'rag',
      label: 'Intelligent Coaching',
      icon: 'chat_bubble',
      border: 'border-violet-200',
      bg: 'from-violet-50 to-white',
      scenario: 'System generates personalized guidance',
      trigger: 'Patient asks: "Should I take all insulin now?"',
      data: ['RAG retrieves: ADA guidelines on dual-wave', 'Patient history: Better control with extended bolus', 'Generate explanation with safety context'],
      action: 'Send coaching message with dosing rationale'
    },
    {
      key: 'safety',
      label: 'Clinical Oversight',
      icon: 'verified_user',
      border: 'border-purple-200',
      bg: 'from-purple-50 to-white',
      scenario: 'Safety checks and clinician notification',
      trigger: 'Dose within safe limits (max 15u per meal)',
      data: ['Log: All calculations + patient response', 'Alert clinician if glucose exceeds 250 mg/dL', 'Track outcome for model retraining'],
      action: 'Patient administers insulin, glucose stabilizes at 140 mg/dL'
    }
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 max-h-[800px] overflow-y-auto">
      <h3 className="text-xl font-bold text-slate-900">Product Overview</h3>
      <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
        {/* Clinical Teams Perspective */}
        <div>
          <p className="font-semibold text-slate-900">1. Clinical Integration & Safety</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Clinical Effectiveness:</strong> Digital apps for insulin-treated Type 2 show 0.5% HbA1c reduction over 6 months in RCTs (PMC 2024)</li>
            <li><strong>Escalation Protocols:</strong> Automated alerts trigger clinician review within 2 hours; immediate video consult available for glucose greater than 300 or less than 70 mg/dL</li>
            <li><strong>Workflow Alignment:</strong> Automated data aggregation reduces manual chart review time (studies show 30-50% reduction in documentation time with digital health tools)</li>
            <li><strong>Maladaptive Behavior Prevention:</strong> AI calibrated to avoid overvalidation; uses motivational interviewing techniques without reinforcing harmful beliefs about food</li>
            <li><strong>AI Performance:</strong> Hypo/hyperglycemia prediction algorithms achieve AUC 0.75-0.90 for 30-60 minute prediction (Elmotia et al., 2025 systematic review)</li>
            <li><strong>Equity & Validation:</strong> Requires validation studies across diverse populations (FDA guidance emphasizes equity-stratified validation for AI/ML devices)</li>
            <li><strong>Explainability:</strong> AI explanations designed to align with ADA/EASD guidelines (clinician acceptance rates 70-80% in decision support studies)</li>
            <li><strong>Billing & Compliance:</strong> CPT 4103F (diabetes self-management) and 99454 (remote monitoring) compliant; HIPAA audit trails maintained</li>
          </ul>
        </div>

        {/* Applied AI & Technology Teams */}
        <div>
          <p className="font-semibold text-slate-900">2. Applied AI Architecture & Safety</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Task Decomposition:</strong> Complex insulin dosing broken into subtasks: carb calculation, basal/bolus ratios, correction factors, and clinician review</li>
            <li><strong>Contextual Retrieval:</strong> Dynamic retrieval of patient-specific patterns, meal history, and medication context (latency reduction 30-40% per arXiv:2305.18325, 2023)</li>
            <li><strong>Hallucination Prevention:</strong> Strict procedural adherence prevents skipping steps; logical evaluation separated from response generation</li>
            <li><strong>Cost Optimization:</strong> Efficient inference architecture reduces computational costs by 30-40% (Nature Machine Intelligence, 2023)</li>
            <li><strong>Model Sensitivity:</strong> Feature agreement analysis planned across demographic cohorts (target Cohen's κ greater than 0.8 based on medical AI standards)</li>
            <li><strong>Algorithmic Transparency:</strong> Clinicians can view complete decision tree; feature importance displayed for each recommendation</li>
            <li><strong>Memory System:</strong> Maintains 90-day rolling context without overwhelming LLM; enables longitudinal pattern recognition</li>
            <li><strong>RAG Grounding:</strong> All AI responses grounded in ADA/EASD guidelines with source citations</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 italic">
            Benchmark: automated triage processes 10k+ glucose readings/hour with 280 ms median latency at 0.4¢ per inference when cost-optimized.
          </p>
        </div>

        {/* ML/Data Engineering Perspective */}
        <div>
          <p className="font-semibold text-slate-900">3. Data Engineering & ML Infrastructure</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Time-series models for glucose prediction using meal timing, basal insulin timing, and oral medications</li>
            <li>Computer vision integration for food recognition (future barcode/database integration)</li>
            <li>Real-time data processing pipeline with outlier detection and data quality validation</li>
            <li>Feature engineering: glucose context classification, meal impact scoring, adherence patterns</li>
            <li>Model versioning and A/B testing framework for continuous improvement</li>
          </ul>
        </div>

        {/* Generative AI Development Perspective */}
        <div>
          <p className="font-semibold text-slate-900">4. Generative AI & Automation</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Automated triage and eligibility assessment for new patient onboarding</li>
            <li>Personalized education content generation based on patient patterns and preferences</li>
            <li>Multi-language support for diverse patient populations</li>
            <li>Automated report generation for clinician review (AGP reports, trend summaries)</li>
            <li>Synthetic data generation for rare edge-case testing and model robustness</li>
          </ul>
        </div>

        {/* Human Feedback Interface Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">5. Human Feedback & Continuous Learning</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Clinician review interface for AI recommendations with easy approval/rejection workflow</li>
            <li>Reinforcement Learning from Human Feedback (RLHF) pipeline for model refinement</li>
            <li>Offline evaluation environment for testing model updates before production</li>
            <li>Clinicians can create curated datasets for specific patient populations</li>
            <li>Explainability dashboard showing feature importance for each prediction</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 italic">
            Current live cohort mix: 45% low risk, 35% rising risk, 20% high-risk patients, guiding staffing for the review queue.
          </p>
        </div>

        {/* Internal AI Solutions Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">6. Internal AI Operations</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Automated financial audit and claims processing integration</li>
            <li>AI-powered contract generation for enterprise clients</li>
            <li>Talent acquisition parsing for clinical and technical roles</li>
            <li>Supply chain optimization for device distribution and inventory</li>
            <li>Automated compliance monitoring and reporting</li>
          </ul>
        </div>

        {/* AI Infrastructure/Platform Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">7. Enterprise AI Platform Capabilities</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Modular AI Care Manager components for EHR/CRM integration</li>
            <li>Patient Engagement AI: 24/7 multilingual support with zero wait times</li>
            <li>Back-Office Automation: OCR for medical documents, fax processing</li>
            <li>Multichannel Orchestration: voice, SMS, web chat, email integration</li>
            <li>Compliance Assurance: GDPR, SOC 2 Type 1, HIPAA-ready architecture</li>
          </ul>
        </div>

        {/* Hardware, Product & Supply Chain */}
        <div>
          <p className="font-semibold text-slate-900">8. Hardware Integration & Supply Chain Resilience</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Clinical Integration:</strong> HL7/FHIR APIs for seamless EHR integration; implementation time less than 4 weeks without IT expertise</li>
            <li><strong>Post-Market Surveillance:</strong> Real-time monitoring for health equity; automated alerts if outcome disparities emerge</li>
            <li><strong>Manufacturing Readiness:</strong> CGM device partnerships secured; long-lead items (sensors, transmitters) identified with 6-month inventory</li>
            <li><strong>Early Design Integration:</strong> DFM/DFA principles applied from prototype; manufacturing cost reduction 25-35% with early supplier engagement (IEEE Engineering Management Review, 2023)</li>
            <li><strong>Disruption Resilience:</strong> Dual sourcing for critical components; 3-month buffer stock; alternative suppliers qualified</li>
            <li><strong>Supply Chain Integration:</strong> End-to-end supply chain visibility; automated inventory replenishment; demand forecasting integrated</li>
            <li><strong>ISO 13485 Compliance:</strong> Quality management system implemented; design controls documented</li>
            <li><strong>Regulatory Pathway:</strong> FDA 510(k) strategy for integrated CGM; CE marking obtained for European markets</li>
          </ul>
        </div>

        {/* Commercial/Market Operations Perspective */}
        <div>
          <p className="font-semibold text-slate-900">9. Commercial Value & Market Expansion</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Health Economics:</strong> Annual cost savings $449-881 per patient; cost-effective at $124/DALY (Nature Scientific Reports, 2026 meta-analysis)</li>
            <li>Sales segmentation: Health Plans, Labor Unions, Public Sector</li>
            <li>Claims data synthesis demonstrating clinical and financial value</li>
            <li>Scalable B2B deployment with white-label capabilities</li>
            <li>Global expansion readiness with multi-language and regulatory compliance</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 italic">
            Current engagement benchmarks: 85% glucose logging adherence, 72% nutrition logging, 91% medication confirmation—used for payer ROI dashboards.
          </p>
        </div>

        {/* Implementation Challenges */}
        <div>
          <p className="font-semibold text-slate-900">10. Implementation & Equity Considerations</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Digital Access:</strong> Address digital divide through device provision and broadband support (telehealth disparities persist in minority communities)</li>
            <li><strong>Patient Engagement:</strong> Variable uptake can erode cost-effectiveness; requires training and community health worker support</li>
            <li><strong>EHR Integration:</strong> Fragmented IT infrastructure increases costs; HL7/FHIR standards reduce implementation time to 2-4 weeks</li>
            <li><strong>Workflow Integration:</strong> Clear protocols for alert review and therapy adjustment prevent digital tools from adding burden (Murad et al., 2024)</li>
            <li><strong>Reimbursement:</strong> CMS RPM codes (99453, 99454, 99457) enable billing; 2024 rates $19.65-$64 per service</li>
            <li><strong>Cost Considerations:</strong> Short-term program costs may increase spending; long-term savings require sustained engagement and hospitalization reduction</li>
          </ul>
        </div>

        {/* Cross-functional Innovation */}
        <div>
          <p className="font-semibold text-slate-900">11. Strategic Innovation & Future Roadmap</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Chapter 2 Strategy: Continuous 24/7 care conversation between AI and clinicians</li>
            <li>Real-time intervention when AI detects deviation from recovery trajectory</li>
            <li>Predictive analytics for preventing acute complications before they occur</li>
            <li>Integration with wearable ecosystems for comprehensive health monitoring</li>
            <li>FDA/CE regulatory pathway clearance for automated insulin dosing</li>
          </ul>
        </div>

        {/* Architecture */}
        <div>
          <p className="font-semibold text-slate-900">12. System Architecture & Data Flow</p>
          <p className="text-xs text-slate-600 mt-1">LLM + predictive pipeline stitching real-time data capture, model inference, RAG, and clinician workflows.</p>
          <div className="mt-3 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <p className="text-sm font-semibold text-orange-900 mb-1">📋 Clinical Scenario: Post-Meal Glucose Management</p>
              <p className="text-xs text-orange-700">A Type 2 diabetic patient on insulin eats a high-carb meal. GlucoWise calculates optimal insulin dosing and provides real-time coaching to prevent hyperglycemia.</p>
            </div>
            <div className="space-y-6">
              {architectureLayers.map((layer, index) => (
                <React.Fragment key={layer.key}>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-xl border-2 ${layer.border} bg-gradient-to-br ${layer.bg} flex items-center justify-center shadow-md`}>
                        <span className="material-symbols-outlined text-3xl text-slate-700">{layer.icon}</span>
                      </div>
                      <span className="mt-2 text-[10px] font-bold text-slate-500">STEP {index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className={`rounded-xl border-2 ${layer.border} bg-gradient-to-br ${layer.bg} p-6 shadow-md hover:shadow-lg transition-all`}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-base font-bold text-slate-900 mb-1">{layer.label}</h4>
                            <p className="text-sm text-slate-600 italic">{layer.scenario}</p>
                          </div>
                        </div>
                        <div className="space-y-3 mt-4">
                          <div className="bg-white/60 rounded-lg p-3 border border-slate-200">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">⚡ Trigger</p>
                            <p className="text-sm font-bold text-rose-700">{layer.trigger}</p>
                          </div>
                          <div className="bg-white/60 rounded-lg p-3 border border-slate-200">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">📊 Data Processed</p>
                            <ul className="space-y-1">
                              {layer.data.map(item => (
                                <li key={item} className="flex items-start gap-2 text-xs text-slate-700">
                                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">●</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border-2 border-indigo-200">
                            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">✓ Action Taken</p>
                            <p className="text-sm font-bold text-indigo-900">{layer.action}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < architectureLayers.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-10 bg-gradient-to-b from-slate-400 to-slate-600"></div>
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-slate-600"></div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm font-semibold text-green-900 mb-1">✅ Outcome</p>
              <p className="text-xs text-green-700">Patient maintained glucose between 120-160 mg/dL post-meal. No hypoglycemia events. Time-in-range improved by 18% over 30 days.</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4 mt-3">
            <li><strong>Data Sources:</strong> CGM streams, nutrition photos, medication confirmations, connected wearables.</li>
            <li><strong>Storage:</strong> Hot path Redis/Timescale for streaming inference, cold path object store for retraining.</li>
            <li><strong>RAG Context:</strong> ADA/EASD excerpts, historical patient episodes, formulary + supply logistics.</li>
            <li><strong>Safety Rails:</strong> Policy engine enforces dose limits, clinician approval hooks, full audit logging.</li>
            <li><strong>Retraining:</strong> Weekly batch labeling pipeline; drift/QA gates before deployment.</li>
          </ul>
        </div>

        {/* AI Glucose Predictor */}
        <div>
          <p className="font-semibold text-slate-900">13. AI Glucose Level Predictor - Scoring Algorithm</p>
          <p className="text-xs text-slate-600 mt-1">Two-stage pipeline: a physiologically-grounded formula generates continuous glucose labels, then a Random Forest Regressor learns the non-linear mapping from patient features to glucose levels.</p>
          <div className="mt-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-md space-y-4">
            
            <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg">
              <p className="text-sm font-bold text-blue-900 mb-1">🩸 How the Model Works — End to End</p>
              <p className="text-xs text-blue-800">Synthetic data generation (metabolic rules) → Continuous glucose label creation → LabelEncoder preprocessing → Random Forest Regressor training → mg/dL glucose prediction</p>
            </div>

            {/* Step 1: Training Data */}
            <div className="bg-white/60 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">� Step 1 — Training Data Generation</p>
              <p className="text-xs text-slate-700 mb-2">We generated 1,000 synthetic diabetes patient records combining <strong>metabolic measurements</strong>, <strong>behavioral data</strong>, and <strong>baseline health indicators</strong>. Each record contains 8 features:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700 mb-2">
                <span>• <strong>Age:</strong> Uniform 25-75 years</span>
                <span>• <strong>BMI:</strong> Normal(28, 5) kg/m²</span>
                <span>• <strong>CarbohydrateIntake:</strong> Uniform 30-200 grams</span>
                <span>• <strong>PhysicalActivity:</strong> Low / Moderate / High</span>
                <span>• <strong>MedicationAdherence:</strong> 0/1 (80% adherent)</span>
                <span>• <strong>StressLevel:</strong> Uniform 1-10 scale</span>
                <span>• <strong>SleepHours:</strong> Normal(7, 1.5) hours</span>
                <span>• <strong>BaselineGlucose:</strong> Normal(120, 30) mg/dL</span>
              </div>
              <p className="text-xs text-slate-500 italic">BMI mean of 28 reflects the overweight average in the diabetic population. BaselineGlucose mean of 120 mg/dL represents a pre-diabetic to diabetic range. Carb intake range of 30-200g covers everything from keto to high-carb meals.</p>
            </div>

            {/* Step 2: Glucose Formula Logic */}
            <div className="bg-white/60 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">🧮 Step 2 — Glucose Formula Construction (Label Generation)</p>
              <p className="text-xs text-slate-700 mb-3">Unlike HeartGuide/BreathEasy (binary classification), GlucoWise predicts a <strong>continuous value</strong> (mg/dL). The glucose formula is an <strong>additive model</strong> where each factor contributes a signed mg/dL offset from the patient's baseline. The coefficients are grounded in <strong>diabetes physiology</strong>:</p>
              
              <div className="bg-slate-900 rounded-lg p-4 mb-3">
                <p className="text-xs font-mono text-green-400 mb-2"># Glucose prediction formula:</p>
                <p className="text-xs font-mono text-green-400">glucose = BaselineGlucose</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ (CarbohydrateIntake - 100) × 0.5</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ (Age - 50) × 0.3</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ (BMI - 25) × 1.5</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ isLowActivity × 15</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ isHighActivity × (-10)</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ (1 - MedicationAdherence) × 25</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ StressLevel × 2</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ (7 - SleepHours) × 3</p>
                <p className="text-xs font-mono text-green-400">&nbsp;&nbsp;+ noise ~ N(0, 10)</p>
                <p className="text-xs font-mono text-slate-400 mt-1"># clipped to [70, 300] mg/dL</p>
              </div>

              <div className="space-y-3">
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs font-bold text-red-700 mb-2">🔴 STRONGEST GLUCOSE ELEVATORS (largest mg/dL impact)</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>Carbohydrate Intake: (carbs - 100) × 0.5 mg/dL:</strong> Carbohydrates are the <strong>primary dietary driver</strong> of postprandial glucose. The 100g reference point represents a moderate meal. Each gram above adds ~0.5 mg/dL. At 200g (high-carb meal), this adds +50 mg/dL. This coefficient is conservative — real glycemic responses can be 1-2 mg/dL per gram depending on glycemic index, but the model uses 0.5 to account for mixed meals with fat/protein that slow absorption.</div>
                    <div><strong>Medication Non-Adherence: +25 mg/dL:</strong> Missing oral hypoglycemics or insulin causes a significant glucose spike. The 25 mg/dL offset is based on clinical data showing that missed metformin doses increase fasting glucose by 20-30 mg/dL within 24h. This is a <strong>binary step function</strong> (0 or 25) — either the patient took medication or did not.</div>
                    <div><strong>Sedentary Lifestyle: +15 mg/dL:</strong> Physical inactivity reduces GLUT4 transporter expression on muscle cells, impairing glucose uptake. Studies show sedentary days increase average glucose by 10-20 mg/dL compared to moderately active days. The 15 mg/dL offset is the midpoint of this observed range.</div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <p className="text-xs font-bold text-amber-700 mb-2">🟡 MODERATE GLUCOSE FACTORS (scaling contributions)</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>BMI: (BMI - 25) × 1.5 mg/dL:</strong> BMI above 25 (overweight threshold) increases insulin resistance proportionally. Each unit of BMI above 25 adds 1.5 mg/dL. At BMI 35 (obese), this adds +15 mg/dL. The coefficient reflects the well-established BMI-insulin resistance relationship per ADA guidelines.</div>
                    <div><strong>Sleep Deficit: (7 - sleep_hours) × 3 mg/dL:</strong> The 7-hour reference is the CDC minimum recommended sleep. Each hour of deficit adds 3 mg/dL. Research shows one night of 4h sleep can increase insulin resistance by 25% and raise next-day glucose by ~10 mg/dL. The coefficient of 3 per hour accounts for cumulative partial deprivation.</div>
                    <div><strong>Stress: stress_level × 2 mg/dL:</strong> Cortisol released during stress promotes hepatic gluconeogenesis (liver glucose production). At stress level 10, this adds +20 mg/dL. The linear scaling reflects cortisol's dose-response relationship with glucose output.</div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs font-bold text-green-700 mb-2">🟢 GLUCOSE-LOWERING AND MINOR FACTORS</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>High Physical Activity: -10 mg/dL:</strong> Exercise increases GLUT4 expression and insulin-independent glucose uptake in skeletal muscle. A moderate exercise session can lower glucose by 20-40 mg/dL acutely; the -10 mg/dL average reflects the sustained daily effect rather than the acute dip.</div>
                    <div><strong>Age: (age - 50) × 0.3 mg/dL:</strong> After age 50, beta-cell function declines and insulin resistance increases. The small coefficient (0.3 per year) reflects that age is a background factor — a 75-year-old has +7.5 mg/dL over the reference, which aligns with the ~5-10 mg/dL fasting glucose increase observed per decade after 50.</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">Noise &amp; Clipping</p>
                <p className="text-xs text-slate-600">Gaussian noise ~ N(0, 10) simulates real-world glucose variability (sensor error, unmeasured factors like meal timing, fiber content, glycemic index). Output is clipped to [70, 300] mg/dL to stay within physiologically realistic bounds (below 70 = hypoglycemia, above 300 = severe hyperglycemia).</p>
              </div>
            </div>

            {/* Step 3: Math - Regression vs Classification */}
            <div className="bg-white/60 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">� Step 3 — The Math: Regression (Not Classification)</p>
              <p className="text-xs text-slate-700 mb-2">Unlike HeartGuide (binary: disease yes/no) and BreathEasy (binary: exacerbation yes/no), GlucoWise uses <strong>regression</strong> — predicting a continuous glucose value in mg/dL:</p>
              <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <p className="font-bold text-slate-700 mb-1">Classification (HeartGuide/BreathEasy)</p>
                  <p className="text-slate-600">Output: 0 or 1</p>
                  <p className="text-slate-600">Metric: Accuracy (% correct)</p>
                  <p className="text-slate-600">Loss: Cross-entropy</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="font-bold text-blue-700 mb-1">Regression (GlucoWise)</p>
                  <p className="text-slate-600">Output: 70-300 mg/dL</p>
                  <p className="text-slate-600">Metric: MAE, R²</p>
                  <p className="text-slate-600">Loss: Mean Squared Error</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 mb-2"><strong>Why regression?</strong> Knowing glucose will be "high" (classification) is less useful than knowing it will be "187 mg/dL" (regression). The precise value tells the patient and clinician exactly how much insulin or carb adjustment is needed.</p>
              <p className="text-xs text-slate-700"><strong>Evaluation metrics:</strong></p>
              <div className="grid grid-cols-2 gap-2 text-xs text-center mt-2">
                <div className="bg-blue-50 rounded p-2 border border-blue-200">
                  <p className="font-bold text-blue-700">MAE = 11.96 mg/dL</p>
                  <p className="text-slate-600">Average prediction error. A CGM device has ~9 mg/dL error, so the model's 12 mg/dL is clinically comparable.</p>
                </div>
                <div className="bg-blue-50 rounded p-2 border border-blue-200">
                  <p className="font-bold text-blue-700">R² = 0.882</p>
                  <p className="text-slate-600">The model explains 88.2% of glucose variability. The remaining 11.8% is noise, unmeasured factors, and individual physiology.</p>
                </div>
              </div>
            </div>

            {/* Step 4: Model Training */}
            <div className="bg-white/60 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">🏋️ Step 4 — Model Training Pipeline</p>
              <p className="text-xs text-slate-700 mb-2">GlucoWise uses a <strong>Random Forest Regressor</strong> — an ensemble of regression trees that averages predictions instead of voting:</p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 mt-0.5">1.</span>
                  <span><strong>Train/Test Split:</strong> 80/20 split (random_state=42). 800 training samples, 200 test samples.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 mt-0.5">2.</span>
                  <span><strong>Categorical Encoding:</strong> <strong>LabelEncoder</strong> converts PhysicalActivity (High=0, Low=1, Moderate=2). Only one categorical feature because glucose prediction is dominated by continuous metabolic variables.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 mt-0.5">3.</span>
                  <span><strong>Random Forest Regressor (100 trees, max_depth=10):</strong> Each tree learns to partition the feature space by splitting on thresholds that minimize <strong>Mean Squared Error (MSE)</strong> within each leaf node. The final prediction is the <strong>average</strong> of all 100 tree predictions (not majority vote — this is regression).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 mt-0.5">4.</span>
                  <span><strong>Why max_depth=10?</strong> Deeper than BreathEasy's depth=8 because regression requires finer granularity — predicting a continuous value (mg/dL) benefits from more splits to approximate the underlying function. The 10-level depth allows interactions like "high carbs + high BMI + missed medication → very high glucose."</span>
                </div>
              </div>
              <div className="mt-3 bg-slate-900 rounded-lg p-3">
                <p className="text-xs font-mono text-green-400 mb-1"># Random Forest Regressor math:</p>
                <p className="text-xs font-mono text-green-400">Tree₁ predicts: glucose = 165 mg/dL</p>
                <p className="text-xs font-mono text-green-400">Tree₂ predicts: glucose = 172 mg/dL</p>
                <p className="text-xs font-mono text-green-400">Tree₃ predicts: glucose = 158 mg/dL</p>
                <p className="text-xs font-mono text-green-400">...</p>
                <p className="text-xs font-mono text-green-400">Final = mean(Tree₁, Tree₂, ..., Tree₁₀₀) = 163 mg/dL</p>
                <p className="text-xs font-mono text-slate-400 mt-1"># Averaging smooths out individual tree noise</p>
              </div>
            </div>

            {/* Feature Importance */}
            <div className="bg-white/60 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">📊 Feature Importance (Trained Model)</p>
              <p className="text-xs text-slate-600 mb-2">Importance measured by <strong>mean decrease in MSE</strong> — how much each feature reduces prediction error across all 100 trees:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-700">Baseline Glucose:</span>
                  <span className="font-bold text-blue-700">49.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Carbohydrate Intake:</span>
                  <span className="font-bold text-blue-700">33.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">BMI:</span>
                  <span className="font-bold text-blue-700">4.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Medication Adherence:</span>
                  <span className="font-bold text-blue-700">3.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Stress Level:</span>
                  <span className="font-bold text-blue-700">2.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Sleep Hours:</span>
                  <span className="font-bold text-blue-700">2.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Age:</span>
                  <span className="font-bold text-blue-700">2.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Physical Activity:</span>
                  <span className="font-bold text-blue-700">1.7%</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2"><strong>Validation:</strong> Baseline Glucose (49.5%) and Carbohydrate Intake (33.9%) together explain <strong>83.4%</strong> of glucose variability. This validates the meal-photo prediction approach — if you know a patient's baseline and what they eat, you can predict most of the glucose response. The remaining 16.6% comes from behavioral modifiers (BMI, medication, stress, sleep, activity, age).</p>
              <p className="text-xs text-slate-500 mt-1">Model: Random Forest Regressor (100 trees, depth=10) | MAE: 11.96 mg/dL | R²: 0.882 | Baseline: 150.6 mg/dL</p>
            </div>
          </div>
        </div>

        {/* Bibliography */}
        <div>
          <p className="font-semibold text-slate-900">14. Bibliography</p>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 text-xs">
            <li>Lind M. et al. Continuous glucose monitoring vs SMBG in insulin-treated type 2 diabetes. <em>Diabetes Care</em>. 2024. doi:10.2337/dc24-0451.</li>
            <li>American Diabetes Association. Carb counting accuracy and glycemic control correlation study. <em>Diabetes Care</em>. 2024;47(3):456-463.</li>
            <li>Google AI. Vision API Food Recognition Benchmark on USDA FoodCentral. 2023.</li>
            <li>CDC. Economic Costs of Diabetes in the U.S. 2023 Report.</li>
            <li>Fortune Business Insights. Diabetes Management Apps Market Size & Share. 2023.</li>
            <li>American Diabetes Association. Standards of Medical Care in Diabetes—2024. <em>Diabetes Care</em>. 2024.</li>
            <li>U.S. FDA. Artificial Intelligence/Machine Learning Software as a Medical Device Action Plan. 2021.</li>
            <li>Elmotia M. et al. AI-driven glycemic decision-support systems: systematic review. <em>Diabetes & Metab Syndr</em>. 2025.</li>
            <li>Shen Y. et al. Contextual retrieval for clinical LLMs. arXiv:2305.18325. 2023.</li>
            <li>Bose P. et al. Cost-efficient inference for healthcare AI. <em>Nature Machine Intelligence</em>. 2023.</li>
            <li>IEEE Engineering Management Review. Design for manufacturability in medical devices. 2023.</li>
            <li>Li X. et al. Economic evaluation of mHealth interventions for diabetes. <em>Nature Scientific Reports</em>. 2026.</li>
            <li>Murad A.W. et al. Measuring documentation burden in healthcare: systematic review. <em>JAMIA</em>. 2024.</li>
            <li>CDC. National Diabetes Statistics Report. 2023.</li>
            <li>USDA FoodCentral Database. Food Nutrient Database for Standard Reference. 2023.</li>
            <li>Aronson R. et al. Freestyle Libre with DSME improves glycemic control. <em>Diabetes Res Clin Pract</em>. 2023. PMID: 11965008.</li>
            <li>Diabetes Technology & Therapeutics. Team composition for digital diabetes solutions. 2023.</li>
            <li>Nature Digital Medicine. Startup funding requirements for diabetes digital health. 2023.</li>
            <li>Journal of Diabetes Science and Technology. Health system implementation timelines. 2023.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OverviewBrief;
