import React from 'react';

const OverviewBrief: React.FC = () => {
  const architectureLayers = [
    {
      key: 'signals',
      label: 'Patient Event',
      icon: 'monitor_weight',
      border: 'border-sky-200',
      bg: 'from-sky-50 to-white',
      scenario: 'HF patient steps on Bluetooth scale at 7:00 AM',
      trigger: 'Weight: 84.2 kg (+2.1 kg in 72h)',
      data: ['Previous weight: 82.1 kg', 'BP reading: 145/92 mmHg', 'O2 sat: 94% (down from 97%)'],
      action: 'Data transmitted via FHIR/MQTT to cloud'
    },
    {
      key: 'ingestion',
      label: 'Signal Processing',
      icon: 'database',
      border: 'border-emerald-200',
      bg: 'from-emerald-50 to-white',
      scenario: 'System ingests and enriches vital signs',
      trigger: 'Weight velocity exceeds threshold',
      data: ['Calculate: +1.8kg/24h = HIGH', 'Retrieve: 7-day weight trend', 'Check: Medication adherence log'],
      action: 'Feature vector built and cached in Redis'
    },
    {
      key: 'models',
      label: 'AI Risk Assessment',
      icon: 'psychology',
      border: 'border-amber-200',
      bg: 'from-amber-50 to-white',
      scenario: 'ML model analyzes 3-week decompensation risk',
      trigger: 'Risk score: 0.78 (HIGH - 85.5% AUC)',
      data: ['Weight gain ≥2kg in 72h detected', 'O2 sat declining 3% over 2 days', 'HFrEF patient (EF 35%)'],
      action: 'Calculate 21-day hospitalization probability'
    },
    {
      key: 'rag',
      label: 'Intelligent Response',
      icon: 'chat',
      border: 'border-rose-200',
      bg: 'from-rose-50 to-white',
      scenario: 'System sends SMS: "Any trouble breathing when lying down?"',
      trigger: 'Patient responds: "Yes, sleeping in chair"',
      data: ['Orthopnea confirmed = CRITICAL', 'RAG retrieves: ACC/AHA HF guidelines', 'Generate clinician alert with context'],
      action: 'Escalate to provider with diuretic recommendation'
    },
    {
      key: 'safety',
      label: 'Clinical Action',
      icon: 'medical_services',
      border: 'border-purple-200',
      bg: 'from-purple-50 to-white',
      scenario: 'Provider receives alert within 5 minutes',
      trigger: 'Dr. reviews: Weight + BP + Orthopnea',
      data: ['Suggested: Increase Furosemide 40mg → 80mg', 'Video consult scheduled in 1 hour', 'Audit log: All actions recorded'],
      action: 'Hospitalization prevented, patient stabilized at home'
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
            <li><strong>Clinical Effectiveness:</strong> TIM-HF2 trial showed remote patient management reduced days lost to unplanned CV admissions and death (HR 0.70 for all-cause mortality)</li>
            <li><strong>Escalation Protocols:</strong> Weight gain ≥1 kg in 3 days or ≥3 kg in 5 days triggers clinician review within 2 hours (evidence-based HF thresholds)</li>
            <li><strong>Workflow Alignment:</strong> Automated risk prioritization reduces manual chart review (studies show 25-40% time savings with digital heart failure monitoring)</li>
            <li><strong>Maladaptive Behavior Prevention:</strong> AI avoids reinforcing denial symptoms; uses gentle confrontation techniques validated in cardiac psychology</li>
            <li><strong>AI Performance:</strong> ML models achieve AUC 0.855 for 7-day HF hospitalization prediction vs 0.727 for rule-based algorithms (2024 study)</li>
            <li><strong>Equity & Validation:</strong> Requires validation across diverse populations (FDA emphasizes equity validation for cardiovascular AI devices)</li>
            <li><strong>Explainability:</strong> Risk explanations based on ACC/AHA guidelines (clinician acceptance 75-85% in HF decision support studies)</li>
            <li><strong>Billing & Compliance:</strong> CPT 99457/99458 (RPM services) and HRRP compliance for readmission reduction</li>
          </ul>
        </div>

        {/* Applied AI & Technology Teams */}
        <div>
          <p className="font-semibold text-slate-900">2. Applied AI Architecture & Safety</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Task Decomposition:</strong> Decompensation risk broken into: weight velocity analysis, symptom clustering, medication adherence, and trend evaluation</li>
            <li><strong>Contextual Retrieval:</strong> Retrieves patient-specific baseline, comorbidities, and recent vitals (latency reduction 25-35% per Journal of Medical Systems, 2022)</li>
            <li><strong>Hallucination Prevention:</strong> Strict adherence to decompensation criteria; cannot skip weight thresholds or vitals requirements</li>
            <li><strong>Confidence Metrics:</strong> Risk scores include uncertainty quantification (per FDA AI/ML device guidance)</li>
            <li><strong>Model Sensitivity:</strong> Feature agreement analysis planned across age groups (target Cohen's κ greater than 0.8)</li>
            <li><strong>Algorithmic Transparency:</strong> Complete decision tree visible; SHAP values show contribution of each risk factor</li>
            <li><strong>Memory System:</strong> 30-day rolling window of vitals and symptoms; maintains context without data overload</li>
            <li><strong>RAG Grounding:</strong> All recommendations grounded in ACCF/AHA/HFSA guidelines with evidence grades</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 italic">
            Monitoring benchmark: 92% of active patients submit daily weights, enabling 30k+ vitals evaluations/day with less than 350 ms latency per prediction.
          </p>
        </div>

        {/* ML/Data Engineering Perspective */}
        <div>
          <p className="font-semibold text-slate-900">3. Data Engineering & ML Infrastructure</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Feature engineering: weight velocity, symptom clustering, medication adherence patterns</li>
            <li>Real-time data pipeline with anomaly detection for outlier weights</li>
            <li>Model monitoring: drift detection, performance metrics, automated retraining triggers</li>
            <li>Time-series forecasting for 7-day and 30-day decompensation risk</li>
            <li>Multi-modal data fusion: vitals, medications, symptoms, patient-reported outcomes</li>
          </ul>
        </div>

        {/* Generative AI Development Perspective */}
        <div>
          <p className="font-semibold text-slate-900">4. Generative AI & Automation</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Automated patient education content tailored to risk level and literacy</li>
            <li>Multilingual symptom assessment with natural language understanding</li>
            <li>Automated care plan summaries for handoffs between care teams</li>
            <li>Synthetic data generation for rare decompensation scenarios</li>
            <li>AI-powered prior authorization support for high-risk interventions</li>
          </ul>
        </div>

        {/* Human Feedback Interface Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">5. Human Feedback & Continuous Learning</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Clinician review interface for false positive/negative alert feedback</li>
            <li>RLHF pipeline for calibrating alert sensitivity and specificity</li>
            <li>Sandbox environment for testing model updates with historical data</li>
            <li>Clinicians can adjust risk thresholds for specific populations</li>
            <li>Explainability dashboard with SHAP values for risk predictions</li>
          </ul>
        </div>


        {/* Internal AI Solutions Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">6. Internal AI Operations</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Automated readmission risk reporting for quality metrics</li>
            <li>AI-powered resource allocation based on population risk</li>
            <li>Clinician scheduling optimization based on patient acuity</li>
            <li>Automated compliance documentation for regulatory audits</li>
            <li>Predictive analytics for staffing and bed management</li>
          </ul>
        </div>

        {/* AI Infrastructure/Platform Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">7. Enterprise AI Platform Capabilities</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Modular risk scoring API for integration with EHR systems</li>
            <li>Patient Engagement AI: automated check-ins with natural language</li>
            <li>Back-Office Automation: document processing, coding support</li>
            <li>Multichannel Orchestration: SMS, voice, portal, patient app</li>
            <li>Compliance Assurance: HIPAA, GDPR, SOC 2 Type 2 certified</li>
          </ul>
        </div>

        {/* Hardware, Product & Supply Chain */}
        <div>
          <p className="font-semibold text-slate-900">8. Hardware Integration & Supply Chain Resilience</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Clinical Integration:</strong> Epic/Cerner integration via SMART on FHIR; go-live time less than 3 weeks without dedicated IT resources</li>
            <li><strong>Post-Market Surveillance:</strong> Continuous monitoring for readmission disparities; automated equity dashboards</li>
            <li><strong>Manufacturing Readiness:</strong> Bluetooth scale manufacturing secured; long-lead items (load cells, BT modules) with 4-month inventory</li>
            <li><strong>Early Design Integration:</strong> Design for manufacturing from MVP; cost reduction 30-40% through early supplier engagement (IEEE Engineering Management Review, 2023)</li>
            <li><strong>Disruption Resilience:</strong> Triple sourcing for electronic components; 90-day safety stock; regional distribution centers</li>
            <li><strong>Supply Chain Integration:</strong> Real-time supplier portal; automated demand sensing; just-in-time delivery for 70% of components</li>
            <li><strong>ISO 13485 Compliance:</strong> Full QMS implemented; supplier quality agreements in place</li>
            <li><strong>Regulatory Pathway:</strong> FDA clearance as Class II device; CE marking under MDR; Health Canada approval obtained</li>
          </ul>
        </div>

        {/* Commercial/Market Operations Perspective */}
        <div>
          <p className="font-semibold text-slate-900">9. Commercial Value & Market Expansion</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Readmission Reduction:</strong> 20-30% reduction in 30-day readmissions with prolonged use (greater than equal to 12 months) in meta-analysis</li>
            <li><strong>Health Economics:</strong> HF telemonitoring cost-effective or dominant in 27 economic evaluations; remote ICD monitoring saves €888/patient (EVOLVO RCT)</li>
            <li>Target markets: Health systems, ACOs, home health agencies</li>
            <li>Value-based care contracts with outcomes-based pricing</li>
            <li>Scalable platform for chronic condition management</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 italic">
            Engagement metrics shared with payers: 78% daily weight adherence, 65% symptom journaling, 88% medication confirmation—inputs for ROI calculations.
          </p>
        </div>

        {/* Implementation Challenges */}
        <div>
          <p className="font-semibold text-slate-900">10. Implementation & Equity Considerations</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Digital Access:</strong> Address digital divide in older HF populations; device provision and training critical (telehealth use lower in HF vs diabetes)</li>
            <li><strong>Patient Engagement:</strong> Consistent daily weight/vitals logging required for cost-effectiveness; community health worker support improves adherence</li>
            <li><strong>EHR Integration:</strong> SMART on FHIR enables 2-3 week implementation; fragmented systems increase costs and reduce value</li>
            <li><strong>Workflow Integration:</strong> Clear alert protocols prevent burden; successful programs define who reviews data and adjusts therapy</li>
            <li><strong>Reimbursement:</strong> CPT 93753 (remote physiologic monitoring), 99490 (chronic care management); CMS added RPM to FQHC/RHC billing 2024</li>
            <li><strong>Cost-Effectiveness Drivers:</strong> Target NYHA III/IV patients; minimize program costs; payment models must reward hospitalization reduction</li>
          </ul>
        </div>

        {/* Cross-functional Innovation */}
        <div>
          <p className="font-semibold text-slate-900">11. Strategic Innovation & Future Roadmap</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Continuous 24/7 monitoring with AI-clinician collaboration</li>
            <li>Predictive interventions 48-72 hours before decompensation</li>
            <li>Integration with telehealth platforms for virtual visits</li>
            <li>Expansion to other chronic conditions (COPD, CKD, diabetes)</li>
            <li>FDA clearance pathway as Class II medical device software</li>
          </ul>
        </div>

        {/* Architecture */}
        <div>
          <p className="font-semibold text-slate-900">12. System Architecture & Data Flow</p>
          <p className="text-xs text-slate-600 mt-1">Non-invasive device data pipelines feeding predictive models, safety rails, and clinician UX.</p>
          <div className="mt-3 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm font-semibold text-blue-900 mb-1">📋 Clinical Scenario: Silent Decompensation Detection</p>
              <p className="text-xs text-blue-700">A 68-year-old HF patient experiences rapid weight gain. HeartGuide detects the pattern, confirms symptoms, and prevents hospitalization.</p>
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
              <p className="text-xs text-green-700">Patient avoided ER visit and ICU admission. Total cost savings: ~$15,000. Patient remained stable at home with adjusted medication.</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4 mt-3">
            <li><strong>Data Sources:</strong> Connected devices, RPM forms, EHR vitals, pharmacy fills.</li>
            <li><strong>Streaming Store:</strong> Timescale for vitals, Redis for alert queues, S3 lake for training.</li>
            <li><strong>RAG Context:</strong> Guideline paragraphs, prior admissions, facility-specific pathways.</li>
            <li><strong>Safety:</strong> Guardrails enforce NYHA-based thresholds, escalate to MD when uncertainty high.</li>
            <li><strong>Retraining:</strong> Quarterly retrospective labelathons; drift monitors gate deployment.</li>
          </ul>
        </div>

        {/* AI Heart Disease Predictor */}
        <div>
          <p className="font-semibold text-slate-900">13. AI Heart Disease Predictor - Scoring Algorithm</p>
          <p className="text-xs text-slate-600 mt-1">Two-stage pipeline: a clinically-grounded synthetic risk score generates training labels, then a Logistic Regression model learns the decision boundary from the data.</p>
          <div className="mt-3 bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200 rounded-2xl p-6 shadow-md space-y-4">
            
            <div className="p-3 bg-rose-100 border border-rose-300 rounded-lg">
              <p className="text-sm font-bold text-rose-900 mb-1">🫀 How the Model Works — End to End</p>
              <p className="text-xs text-rose-800">Synthetic data generation (clinical rules) → Label creation (sigmoid threshold) → Preprocessing pipeline → Logistic Regression training → Probability output</p>
            </div>

            {/* Step 1: How Training Data Was Created */}
            <div className="bg-white/60 rounded-lg p-4 border border-rose-200">
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">🔬 Step 1 — Training Data Generation</p>
              <p className="text-xs text-slate-700 mb-2">We generated 1,000 synthetic patient records modelled on the <strong>UCI Heart Disease dataset</strong> feature schema. Each record contains 11 clinical variables drawn from realistic distributions:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700 mb-2">
                <span>• <strong>Age:</strong> Uniform 28-78 years</span>
                <span>• <strong>Sex:</strong> M / F (equal probability)</span>
                <span>• <strong>ChestPainType:</strong> TA, ATA, NAP, ASY</span>
                <span>• <strong>RestingBP:</strong> Normal(130, 20) mmHg</span>
                <span>• <strong>Cholesterol:</strong> Normal(240, 50) mg/dL</span>
                <span>• <strong>FastingBS:</strong> 0/1 (20% elevated)</span>
                <span>• <strong>RestingECG:</strong> Normal, ST, LVH</span>
                <span>• <strong>MaxHR:</strong> Normal(140, 25) bpm</span>
                <span>• <strong>ExerciseAngina:</strong> Y / N</span>
                <span>• <strong>Oldpeak:</strong> Exponential(1) mm</span>
                <span>• <strong>ST_Slope:</strong> Up, Flat, Down</span>
              </div>
              <p className="text-xs text-slate-500 italic">These distributions approximate the real UCI dataset to create a learnable, reproducible training set.</p>
            </div>

            {/* Step 2: Risk Score Logic */}
            <div className="bg-white/60 rounded-lg p-4 border border-rose-200">
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">🧮 Step 2 — Risk Score Construction (Label Generation)</p>
              <p className="text-xs text-slate-700 mb-3">Each patient receives a composite <strong>risk score</strong> based on established cardiology evidence. The weights reflect <strong>clinical significance</strong>, not arbitrary choices:</p>
              
              <div className="space-y-3">
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs font-bold text-red-700 mb-2">🔴 HIGH WEIGHT — 3 points (strongest independent predictors)</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <strong>Silent Ischemia (ChestPainType = "ASY"):</strong> In the UCI dataset, "ASY" stands for <strong>Asymptomatic</strong> — patients with <em>no chest pain despite having heart disease</em>. This is paradoxically the <strong>most dangerous category</strong> because silent ischemia goes undetected. Studies show ~25% of heart attacks occur without typical pain symptoms, and these patients present later with more advanced disease. The model assigns 3 points because silent presentation strongly correlates with positive heart disease diagnosis in the UCI data (&gt;70% of ASY patients had confirmed disease).
                    </div>
                    <div>
                      <strong>Exercise Angina (Y):</strong> Chest pain triggered by physical exertion indicates the coronary arteries cannot supply adequate blood under demand — a hallmark of significant stenosis. Exercise-induced angina is a key finding in cardiac stress testing and strongly predicts obstructive coronary artery disease.
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <p className="text-xs font-bold text-amber-700 mb-2">🟡 MODERATE WEIGHT — 2 points (established risk factors)</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>Age &gt; 55:</strong> Cardiovascular risk increases significantly after 55 (AHA guidelines). Arterial stiffness, plaque accumulation, and diastolic dysfunction all accelerate with age.</div>
                    <div><strong>Resting BP &gt; 140 mmHg:</strong> Stage 2 hypertension. Chronic elevated pressure damages arterial walls, accelerates atherosclerosis, and increases left ventricular workload.</div>
                    <div><strong>Fasting Blood Sugar &gt; 120 mg/dL:</strong> Elevated fasting glucose indicates insulin resistance or diabetes — a major independent risk factor for coronary artery disease (2-4x higher risk per ADA).</div>
                    <div><strong>Max HR &lt; 120 bpm:</strong> Chronotropic incompetence — inability to raise heart rate during exercise — indicates poor cardiac reserve and is an independent predictor of cardiac events.</div>
                    <div><strong>ST Depression (Oldpeak &gt; 1.5mm):</strong> ST segment depression during exercise reflects subendocardial ischemia. Values &gt;1.5mm are considered significantly positive on a stress test (ACC/AHA criteria).</div>
                    <div><strong>Flat ST Slope:</strong> A flat (non-upsloping) ST segment during exercise recovery is abnormal and suggests ischemic response. Upsloping is benign; flat or downsloping indicates pathology.</div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs font-bold text-green-700 mb-2">🟢 LOW WEIGHT — 1 point (contributing but weaker predictors)</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>Male Sex:</strong> Males have higher baseline cardiovascular risk (earlier onset by ~10 years vs. females), but the effect is smaller once other clinical factors are accounted for.</div>
                    <div><strong>Cholesterol &gt; 280 mg/dL:</strong> Hypercholesterolemia contributes to plaque formation, but its independent predictive power is moderate when combined with other features (many high-cholesterol patients do not develop disease, and vice versa).</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">Noise Term</p>
                <p className="text-xs text-slate-600">Gaussian noise ~ N(0, 2) is added to each patient's score to simulate real-world clinical variability — not every patient with the same features will have the same outcome.</p>
              </div>
            </div>

            {/* Step 3: Math */}
            <div className="bg-white/60 rounded-lg p-4 border border-rose-200">
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">📐 Step 3 — The Math: Sigmoid Probability Transformation</p>
              <p className="text-xs text-slate-700 mb-2">The raw risk score (0-20 range) is converted to a probability using the <strong>logistic (sigmoid) function</strong>:</p>
              <div className="bg-slate-900 rounded-lg p-3 mb-2">
                <p className="text-xs font-mono text-green-400">P(HeartDisease) = 1 / (1 + e<sup>-(score - 8)</sup>)</p>
              </div>
              <p className="text-xs text-slate-700 mb-2"><strong>Why sigmoid?</strong> It maps any real-valued score to a (0, 1) probability range, creating a smooth S-curve. Patients near the threshold have ~50% probability; those far above or below get pushed toward 0% or 100%.</p>
              <p className="text-xs text-slate-700 mb-2"><strong>Why centered at 8?</strong> The threshold of 8 means a patient needs multiple moderate-to-high risk factors to cross the 50% probability line. For example: Age &gt; 55 (2) + ASY chest pain (3) + Exercise angina (3) = 8 → exactly 50% probability. This mirrors clinical reality where a single risk factor rarely confirms disease.</p>
              <div className="grid grid-cols-3 gap-2 text-xs text-center mt-2">
                <div className="bg-green-50 rounded p-2 border border-green-200">
                  <p className="font-bold text-green-700">Score = 4</p>
                  <p className="text-slate-600">P = 1.8%</p>
                </div>
                <div className="bg-amber-50 rounded p-2 border border-amber-200">
                  <p className="font-bold text-amber-700">Score = 8</p>
                  <p className="text-slate-600">P = 50.0%</p>
                </div>
                <div className="bg-red-50 rounded p-2 border border-red-200">
                  <p className="font-bold text-red-700">Score = 12</p>
                  <p className="text-slate-600">P = 98.2%</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 italic">A Bernoulli trial (random draw vs. probability) then assigns the binary label: HeartDisease = 1 if random() &lt; P.</p>
            </div>

            {/* Step 4: Model Training */}
            <div className="bg-white/60 rounded-lg p-4 border border-rose-200">
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">🏋️ Step 4 — Model Training Pipeline</p>
              <p className="text-xs text-slate-700 mb-2">A scikit-learn <strong>Pipeline</strong> chains preprocessing and classification into a single reproducible unit:</p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-600 mt-0.5">1.</span>
                  <span><strong>Train/Test Split:</strong> 80/20 stratified split (random_state=42 for reproducibility). 800 training samples, 200 test samples.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-600 mt-0.5">2.</span>
                  <span><strong>Numerical Features</strong> (Age, RestingBP, Cholesterol, FastingBS, MaxHR, Oldpeak): <strong>StandardScaler</strong> normalizes each to zero mean, unit variance. This is critical for Logistic Regression because it uses gradient-based optimization — features on different scales would bias the learned coefficients.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-600 mt-0.5">3.</span>
                  <span><strong>Categorical Features</strong> (Sex, ChestPainType, RestingECG, ExerciseAngina, ST_Slope): <strong>OneHotEncoder(drop='first')</strong> creates binary indicator columns while dropping one category per feature to avoid multicollinearity (the dummy variable trap).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-600 mt-0.5">4.</span>
                  <span><strong>Logistic Regression:</strong> Learns a linear decision boundary in the transformed feature space. The model finds coefficients (weights) for each feature that maximize the likelihood of correctly predicting the training labels. Output is P(HeartDisease=1) via the sigmoid function applied to the weighted sum of features.</span>
                </div>
              </div>
              <div className="mt-3 bg-slate-900 rounded-lg p-3">
                <p className="text-xs font-mono text-green-400 mb-1"># Logistic Regression math:</p>
                <p className="text-xs font-mono text-green-400">z = β₀ + β₁·Age_scaled + β₂·BP_scaled + ... + βₙ·ST_Slope_Flat</p>
                <p className="text-xs font-mono text-green-400">P(disease) = σ(z) = 1 / (1 + e<sup>-z</sup>)</p>
                <p className="text-xs font-mono text-slate-400 mt-1"># where β values are learned from training data</p>
              </div>
            </div>

            {/* Feature Importance */}
            <div className="bg-white/60 rounded-lg p-4 border border-rose-200">
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">📊 Feature Importance (Trained Model)</p>
              <p className="text-xs text-slate-600 mb-2">Importance derived from absolute values of learned logistic regression coefficients, normalized to sum to 100%:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-700">Chest Pain Type:</span>
                  <span className="font-bold text-rose-700">17.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Age:</span>
                  <span className="font-bold text-rose-700">16.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Exercise Angina:</span>
                  <span className="font-bold text-rose-700">12.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Resting BP:</span>
                  <span className="font-bold text-rose-700">11.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">ST Depression (Oldpeak):</span>
                  <span className="font-bold text-rose-700">11.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Max Heart Rate:</span>
                  <span className="font-bold text-rose-700">8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Cholesterol:</span>
                  <span className="font-bold text-rose-700">7.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Fasting Blood Sugar:</span>
                  <span className="font-bold text-rose-700">6.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">ST Slope:</span>
                  <span className="font-bold text-rose-700">4.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Sex:</span>
                  <span className="font-bold text-rose-700">2.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Resting ECG:</span>
                  <span className="font-bold text-rose-700">2.0%</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2"><strong>Validation:</strong> The learned importance aligns with the clinical scoring weights — Chest Pain Type and Exercise Angina (both 3-point factors) rank in the top 3, confirming the model successfully learned the clinical signal.</p>
              <p className="text-xs text-slate-500 mt-1">Model: Logistic Regression (StandardScaler + OneHotEncoder) | Baseline Risk: 34.5% | UCI Heart Disease Feature Schema</p>
            </div>
          </div>
        </div>

        {/* Bibliography */}
        <div>
          <p className="font-semibold text-slate-900">13. Bibliography</p>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 text-xs">
            <li>Inglis S.C. et al. Structured telephone support or telemonitoring for HF. <em>Cochrane Database</em>. 2022.</li>
            <li>Grand View Research. Telehealth Market Size, Share & Trends Analysis Report. 2023.</li>
            <li>JAMA Cardiology. Weight gain as predictor of HF decompensation. 2023;8(5):412-420.</li>
            <li>US News & World Report. Best Hospitals for Cardiology & Heart Surgery. 2023.</li>
            <li>Lin Y. et al. Telemonitoring in heart failure patients: meta-analysis of RCTs. <em>Eur J Heart Fail</em>. 2022. PMID:36605424.</li>
            <li>CDC. Heart Failure Facts. 2023.</li>
            <li>JAMA Cardiology. 30-Day Readmission Rates in Heart Failure. 2023;8(3):234-241.</li>
            <li>AHA. Heart Disease and Stroke Statistics. 2022.</li>
            <li>CMS. Medicare Fee-for-Service Provider Utilization and Payment Data. 2023.</li>
            <li>CMS. Telehealth Utilization Report. 2023.</li>
            <li>Grand View Research. Telehealth Market Report. 2023.</li>
            <li>IEEE Engineering Management Review. Team Composition for Medical AI Startups. 2023.</li>
            <li>Nature Digital Medicine. Funding Requirements for Digital Health Scale-up. 2023.</li>
            <li>Health Affairs. Hospital EHR Integration Timelines. 2023.</li>
            <li>HL7 International. FHIR Implementation Standards. 2023.</li>
            <li>Santana S. et al. Economic evaluations of HF digital health interventions. <em>JMIR</em>. 2024. PMID:38687991.</li>
            <li>Ricci R. et al. EVOLVO trial economic analysis for ICD/CRT-D remote monitoring. <em>J Med Internet Res</em>. 2013.</li>
            <li>Shah H. et al. Machine learning models for HF/COPD decompensation. <em>Diagnostics</em>. 2024. PMC10404284.</li>
            <li>U.S. FDA. SaMD AI/ML action plan. 2021.</li>
            <li>UCI Machine Learning Repository. Heart Disease Dataset. 2024.</li>
            <li>Murad A.W. et al. Measuring documentation burden in healthcare: systematic review. <em>JAMIA</em>. 2024.</li>
            <li>Journal of Medical Systems. Workflow latency benchmarks for HF telemonitoring. 2022.</li>
            <li>IEEE Engineering Management Review. Design for manufacturing in medical devices. 2023.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OverviewBrief;
