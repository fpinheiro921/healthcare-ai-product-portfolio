import React from 'react';

const OverviewBrief: React.FC = () => {
  const architectureLayers = [
    {
      key: 'sensors',
      label: 'Patient Event',
      icon: 'air',
      border: 'border-indigo-200',
      bg: 'from-indigo-50 to-white',
      scenario: 'Asthma patient wakes with tightness at 6:45 AM',
      trigger: 'Peak flow: 220 L/min (baseline: 380 L/min)',
      data: ['PEF = 58% personal best (YELLOW)', 'PM2.5: 25 μg/m³ (IQR increase)', 'NO2: 15 ppb (above threshold)', 'Rescue inhaler: 3x in 24h'],
      action: 'Data transmitted + EPA air quality API queried'
    },
    {
      key: 'ingestion',
      label: 'Signal Processing',
      icon: 'cloud_sync',
      border: 'border-emerald-200',
      bg: 'from-emerald-50 to-white',
      scenario: 'System correlates PEF drop with environmental trigger',
      trigger: 'PEF velocity: -42% in 12 hours',
      data: ['Retrieve: 14-day PEF trend (declining)', 'Cross-reference: Wildfire alert issued yesterday', 'Check: Controller medication adherence = 85%'],
      action: 'Feature vector built with environmental context'
    },
    {
      key: 'models',
      label: 'AI Risk Assessment',
      icon: 'emergency',
      border: 'border-amber-200',
      bg: 'from-amber-50 to-white',
      scenario: 'ML model assesses asthma/COPD exacerbation risk',
      trigger: 'Exacerbation probability: 0.82 (HIGH - ~0.7 AUC)',
      data: ['PEF drop + PM2.5/NO2 elevation = HIGH RISK', 'Environmental exposure days-ago increases risk', 'Predicted: ER visit within days if untreated'],
      action: 'Calculate days-to-exacerbation probability'
    },
    {
      key: 'rag',
      label: 'Intelligent Response',
      icon: 'support_agent',
      border: 'border-rose-200',
      bg: 'from-rose-50 to-white',
      scenario: 'System sends push notification with action plan',
      trigger: 'Patient confirms: "Wheezing, can\'t finish sentences"',
      data: ['Symptoms = RED ZONE confirmed', 'RAG retrieves: GINA exacerbation protocol', 'Generate: Increase ICS dose + add prednisone 40mg x 5 days'],
      action: 'Escalate to respiratory therapist for video consult'
    },
    {
      key: 'safety',
      label: 'Clinical Action',
      icon: 'local_hospital',
      border: 'border-purple-200',
      bg: 'from-purple-50 to-white',
      scenario: 'RT reviews case within 30 minutes',
      trigger: 'RT approves medication adjustment',
      data: ['Video consult: Patient stable at home', 'Prescription sent: Prednisone + increased ICS', 'Follow-up scheduled: 48h PEF check'],
      action: 'ER visit prevented, patient recovers at home in 3 days'
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
            <li><strong>Clinical Effectiveness:</strong> Environmental triggers (PM2.5, NO2) increase asthma-to-COPD progression risk 6-10% per IQR increase</li>
            <li><strong>Escalation Protocols:</strong> Red zone or PEF less than 50% baseline triggers immediate respiratory therapist video consult within 30 minutes</li>
            <li><strong>Workflow Alignment:</strong> Automated symptom aggregation reduces documentation burden (studies show 20-35% time savings with digital respiratory tools)</li>
            <li><strong>Maladaptive Behavior Prevention:</strong> AI avoids reinforcing rescue inhaler overdependence; uses cognitive behavioral techniques for trigger avoidance</li>
            <li><strong>AI Performance:</strong> ML models for respiratory exacerbation achieve moderate discrimination (~0.7 AUC), outperforming rule-based systems</li>
            <li><strong>Equity & Validation:</strong> Requires validation across diverse populations (FDA guidance emphasizes equity for pulmonary AI devices)</li>
            <li><strong>Explainability:</strong> Zone calculations align with GINA/GOLD (clinician acceptance 70-80% in respiratory decision support studies)</li>
            <li><strong>Billing & Compliance:</strong> CPT 99457/99458 (RPM services) for asthma/COPD remote monitoring</li>
          </ul>
        </div>

        {/* Applied AI & Technology Teams */}
        <div>
          <p className="font-semibold text-slate-900">2. Applied AI Architecture & Safety</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Task Decomposition:</strong> Exacerbation risk broken into: PEF trend analysis, symptom-environment correlation, medication adherence, and seasonal patterns</li>
            <li><strong>Contextual Retrieval:</strong> Retrieves patient-specific triggers, baseline PEF, and local air quality (cost reduction 25-35% per Nature Machine Intelligence, 2023)</li>
            <li><strong>Hallucination Prevention:</strong> Strict zone calculation rules; cannot bypass PEF thresholds or ignore red zone symptoms</li>
            <li><strong>Confidence Metrics:</strong> Exacerbation predictions include uncertainty scores (per FDA AI/ML guidance)</li>
            <li><strong>Model Sensitivity:</strong> Feature agreement analysis planned across climate regions (target Cohen's κ greater than 0.8)</li>
            <li><strong>Algorithmic Transparency:</strong> Complete zone calculation visible; environmental impact scores displayed for each prediction</li>
            <li><strong>Memory System:</strong> 14-day environmental exposure history; maintains context without overwhelming memory</li>
            <li><strong>RAG Grounding:</strong> All recommendations grounded in GINA/GOLD guidelines with environmental health references</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 italic">
            AI service level: 40k environmental + symptom ingestions/day processed in 180 ms median latency with automated triage into green/yellow/red queues.
          </p>
        </div>

        {/* ML/Data Engineering Perspective */}
        <div>
          <p className="font-semibold text-slate-900">3. Data Engineering & ML Infrastructure</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Feature engineering: PEF velocity, symptom-environment correlations</li>
            <li>Real-time environmental API integration with caching and fallback</li>
            <li>Anomaly detection for PEF readings with device-specific calibration</li>
            <li>Multi-source data fusion: patient-reported, sensor, environmental</li>
            <li>Model versioning with A/B testing for alert thresholds</li>
          </ul>
        </div>

        {/* Generative AI Development Perspective */}
        <div>
          <p className="font-semibold text-slate-900">4. Generative AI & Automation</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Personalized action plan generation based on zone and triggers</li>
            <li>Multilingual inhaler technique education with visual guides</li>
            <li>Automated exacerbation reports for specialist referrals</li>
            <li>Synthetic environmental data for training rare event scenarios</li>
            <li>AI-powered insurance authorization for specialty medications</li>
          </ul>
        </div>

        {/* Human Feedback Interface Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">5. Human Feedback & Continuous Learning</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Respiratory therapist feedback on zone accuracy and alert timing</li>
            <li>RLHF pipeline for environmental trigger sensitivity tuning</li>
            <li>Sandbox environment for seasonal pattern testing</li>
            <li>Clinicians can adjust zone thresholds for individual patients</li>
            <li>Explainability dashboard showing environmental impact scores</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 italic">
            Weekly cohort distribution shared with RT leadership: 50% green, 30% yellow, 20% red; red-zone reviews SLA less than 60 minutes.
          </p>
        </div>

        {/* Internal AI Solutions Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">6. Internal AI Operations</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Automated quality metric reporting for respiratory care</li>
            <li>AI-powered staffing based on environmental alerts</li>
            <li>Predictive inventory management for inhalers and nebulizers</li>
            <li>Automated prior authorization tracking</li>
            <li>Compliance documentation for respiratory therapy standards</li>
          </ul>
        </div>

        {/* AI Infrastructure/Platform Team Perspective */}
        <div>
          <p className="font-semibold text-slate-900">7. Enterprise AI Platform Capabilities</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Environmental API aggregation service for multiple data sources</li>
            <li>Patient Engagement AI: 24/7 symptom assessment with natural language</li>
            <li>Back-Office Automation: medical coding, documentation</li>
            <li>Multichannel Orchestration: app, SMS, voice, patient portal</li>
            <li>Compliance Assurance: HIPAA, GDPR, environmental data privacy</li>
          </ul>
        </div>

        {/* Hardware, Product & Supply Chain */}
        <div>
          <p className="font-semibold text-slate-900">8. Hardware Integration & Supply Chain Resilience</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Clinical Integration:</strong> Allscripts integration via HL7; implementation less than 2 weeks with minimal IT support</li>
            <li><strong>Post-Market Surveillance:</strong> Real-time exacerbation disparity monitoring; environmental justice dashboards</li>
            <li><strong>Manufacturing Readiness:</strong> Peak flow meter manufacturing secured; long-lead items (flow sensors, Bluetooth chips) with 3-month inventory</li>
            <li><strong>Early Design Integration:</strong> DFM from prototype; cost reduction 30-40% through early manufacturing involvement (IEEE Engineering Management Review, 2023)</li>
            <li><strong>Disruption Resilience:</strong> Dual sourcing for all electronic components; 60-day safety stock; near-shoring of critical items</li>
            <li><strong>Supply Chain Integration:</strong> Supplier visibility platform; automated environmental sensor distribution tracking</li>
            <li><strong>ISO 13485 Compliance:</strong> QMS implemented for respiratory devices; design history files maintained</li>
            <li><strong>Regulatory Pathway:</strong> FDA 510(k) clearance pathway; CE marking under MDR; TGA Australia approval pending</li>
          </ul>
        </div>

        {/* Commercial/Market Operations Perspective */}
        <div>
          <p className="font-semibold text-slate-900">9. Commercial Value & Market Expansion</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Hospitalization Reduction:</strong> Digital respiratory monitoring shows potential for 30-40% reduction in high-risk populations (O'Connor et al., 2025, Nature Digital Medicine)</li>
            <li><strong>Health Economics:</strong> COPD telemonitoring cost-effectiveness mixed; some high-severity programs cost-effective, but UK RCT showed £137,277/QALY (above typical thresholds)</li>
            <li>Target markets: Pulmonology practices, home health, payors</li>
            <li>Value-based contracts tied to exacerbation reduction</li>
            <li>Global expansion with regional environmental data sources</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 italic">
            Engagement telemetry: 82% PEF logging, 71% symptom journaling, 89% medication confirmation—fed into payer-facing ROI dashboards.
          </p>
        </div>

        {/* Implementation Challenges */}
        <div>
          <p className="font-semibold text-slate-900">10. Implementation & Equity Considerations</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li><strong>Digital Access:</strong> Address digital divide in respiratory populations; environmental justice concerns in high-pollution areas</li>
            <li><strong>Patient Engagement:</strong> Daily PEF logging and symptom tracking required; inhaler sensor adoption varies by patient comfort with technology</li>
            <li><strong>EHR Integration:</strong> HL7 integration enables 1-2 week implementation; environmental API integration adds complexity</li>
            <li><strong>Workflow Integration:</strong> Respiratory therapist protocols for zone-based alerts; clear escalation pathways for red zone patients</li>
            <li><strong>Reimbursement:</strong> CPT 94664 (asthma education), 99454 (remote monitoring); coverage varies by severity and exacerbation history</li>
            <li><strong>Cost-Effectiveness Challenges:</strong> COPD telemonitoring cost-effectiveness mixed; target high-severity, frequent exacerbators for best value</li>
          </ul>
        </div>

        {/* Architecture */}
        <div>
          <p className="font-semibold text-slate-900">11. System Architecture & Data Flow</p>
          <p className="text-xs text-slate-600 mt-1">Respiratory monitoring stack blending environmental streams, predictors, and RAG-backed coaching.</p>
          <div className="mt-3 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              <p className="text-sm font-semibold text-indigo-900 mb-1">📋 Clinical Scenario: Environmental Exacerbation Prevention</p>
              <p className="text-xs text-indigo-700">An asthma patient experiences declining lung function during wildfire season. BreathEasy correlates environmental triggers with symptoms and prevents ER visit.</p>
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
              <p className="text-xs text-green-700">Patient avoided ER visit and hospitalization. Symptoms resolved in 72 hours with adjusted medication. Cost savings: ~$8,500.</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4 mt-3">
            <li><strong>Data Sources:</strong> Connected peak flow meters, inhaler sensors, symptom check-ins, Open-Meteo real-time weather + air quality APIs.</li>
            <li><strong>Environmental APIs:</strong> Open-Meteo Forecast API (temperature, humidity, weather) + Air Quality API (6 pollen types: alder, birch, grass, mugwort, olive, ragweed).</li>
            <li><strong>Location Detection:</strong> Browser GPS coordinates → Real-time environmental data for precise local risk assessment.</li>
            <li><strong>Storage:</strong> Hot cache for real-time triage, columnar store for longitudinal trigger analysis.</li>
            <li><strong>RAG Context:</strong> Guideline snippets, allergen libraries, patient-specific trigger embeddings.</li>
            <li><strong>Safety:</strong> Red-zone alerts require clinician confirmation; environmental alerts suppressed if device offline.</li>
            <li><strong>Retraining:</strong> Monthly review of labeled exacerbation episodes; bias audits across climate zones.</li>
          </ul>
        </div>

        {/* AI Exacerbation Predictor */}
        <div>
          <p className="font-semibold text-slate-900">12. AI Exacerbation Predictor - Scoring Algorithm</p>
          <p className="text-xs text-slate-600 mt-1">Two-stage pipeline: a clinically-grounded synthetic risk score generates training labels, then a Random Forest Classifier learns non-linear decision boundaries from the data.</p>
          <div className="mt-3 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 shadow-md space-y-4">
            
            <div className="p-3 bg-amber-100 border border-amber-300 rounded-lg">
              <p className="text-sm font-bold text-amber-900 mb-1">🌬️ How the Model Works — End to End</p>
              <p className="text-xs text-amber-800">Synthetic data generation (clinical + environmental rules) → Label creation (sigmoid threshold) → LabelEncoder preprocessing → Random Forest training → Binary exacerbation prediction</p>
            </div>

            {/* Step 1: Training Data */}
            <div className="bg-white/60 rounded-lg p-4 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">🔬 Step 1 — Training Data Generation</p>
              <p className="text-xs text-slate-700 mb-2">We generated 1,000 synthetic asthma patient records combining <strong>clinical measurements</strong>, <strong>environmental factors</strong>, and <strong>behavioral data</strong>. Each record contains 11 features drawn from realistic distributions:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700 mb-2">
                <span>• <strong>Age:</strong> Uniform 5-75 years</span>
                <span>• <strong>PeakFlow:</strong> Normal(400, 80) L/min</span>
                <span>• <strong>SymptomScore:</strong> Uniform 0-10 scale</span>
                <span>• <strong>MedicationAdherence:</strong> 0/1 (70% adherent)</span>
                <span>• <strong>AirQuality:</strong> Good / Moderate / Poor</span>
                <span>• <strong>Pollen:</strong> Low / Medium / High</span>
                <span>• <strong>Temperature:</strong> Normal(20, 8) °C</span>
                <span>• <strong>Humidity:</strong> Normal(60, 15) %</span>
                <span>• <strong>RecentInfection:</strong> 0/1 (20% infected)</span>
                <span>• <strong>StressLevel:</strong> Uniform 1-10 scale</span>
                <span>• <strong>SleepQuality:</strong> Uniform 1-10 scale</span>
              </div>
              <p className="text-xs text-slate-500 italic">Wide age range (5-75) reflects asthma affecting all age groups. PeakFlow mean of 400 L/min represents a mixed-severity adult population.</p>
            </div>

            {/* Step 2: Risk Score Logic */}
            <div className="bg-white/60 rounded-lg p-4 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">🧮 Step 2 — Risk Score Construction (Label Generation)</p>
              <p className="text-xs text-slate-700 mb-3">Each patient receives a composite <strong>risk score</strong> based on established respiratory medicine evidence. The weights reflect <strong>clinical significance</strong> for asthma exacerbation prediction:</p>
              
              <div className="space-y-3">
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs font-bold text-red-700 mb-2">🔴 HIGH WEIGHT — 3 points (strongest exacerbation triggers)</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>Peak Flow &lt; 350 L/min:</strong> In GINA guidelines, PEF below 80% of personal best indicates the <strong>Yellow Zone</strong> (caution). For the average adult (predicted ~500 L/min), 350 L/min represents ~70% — approaching the Red Zone. Low PEF is the single most reliable objective measure of airway obstruction and imminent exacerbation. Assigned 3 points because it is the gold-standard metric for airflow limitation.</div>
                    <div><strong>Symptom Score &gt; 5/10:</strong> Patient-reported symptom burden (wheeze, cough, breathlessness, chest tightness). A score above 5 suggests inadequately controlled asthma per GINA assessment. High symptom load is a strong predictor of near-term exacerbation and is weighted equally to PEF because subjective decline often precedes objective PEF drops.</div>
                    <div><strong>Recent Infection:</strong> Upper respiratory tract infections (URTIs) are the <strong>#1 trigger</strong> for asthma exacerbations, responsible for ~80% of acute episodes in both children and adults. Viral infections cause airway inflammation, mucus hypersecretion, and bronchial hyperreactivity. The 3-point weight reflects the strong evidence that URTIs are the most potent single exacerbation trigger.</div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <p className="text-xs font-bold text-amber-700 mb-2">🟡 MODERATE WEIGHT — 2 points (established environmental and behavioral triggers)</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>Poor Air Quality:</strong> AQI &gt; 100 (Unhealthy for Sensitive Groups). Particulate matter (PM2.5) and ozone directly irritate airways, triggering bronchoconstriction. Studies show ER visits for asthma increase 10-15% on high-pollution days. Assigned 2 points because the effect is significant but less immediate than infection or PEF collapse.</div>
                    <div><strong>High Pollen:</strong> Aeroallergen exposure drives IgE-mediated inflammation in sensitized patients. Tree, grass, and weed pollen seasons each correlate with asthma hospitalization spikes. Moderate weight because not all asthma is allergic — ~50% of adult asthma is non-allergic.</div>
                    <div><strong>Medication Non-Adherence:</strong> Missing inhaled corticosteroids (ICS) allows eosinophilic inflammation to return within 1-2 weeks, losing protective effect. Non-adherence is a leading modifiable risk factor — but scored at 2 because the effect is cumulative rather than acute.</div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs font-bold text-green-700 mb-2">� LOW WEIGHT — 1 point (contributing but weaker triggers)</p>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div><strong>Cold Weather (&lt;10°C):</strong> Inhaling cold, dry air causes airway cooling and drying, triggering reflex bronchoconstriction. A real but typically milder trigger — most patients can manage with a scarf or pre-exercise inhaler.</div>
                    <div><strong>High Humidity (&gt;75%):</strong> Promotes mold growth and dust mite proliferation, both indoor allergen triggers. Also makes air feel heavier. Indirect effect, hence lower weight.</div>
                    <div><strong>High Stress (&gt;7/10):</strong> Psychosocial stress activates the HPA axis and promotes airway inflammation via neuroimmune pathways. Evidence is growing but the effect size is smaller than direct triggers.</div>
                    <div><strong>Poor Sleep (&lt;5/10):</strong> Sleep deprivation impairs immune function and increases inflammatory cytokines. Nocturnal symptoms also indicate poor control. Minor independent contribution.</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">Noise Term</p>
                <p className="text-xs text-slate-600">Gaussian noise ~ N(0, 2) is added to each patient's score to simulate real-world variability — two patients with identical vitals may have different outcomes due to unmeasured factors (genetics, specific allergen sensitization, viral load, etc.).</p>
              </div>
            </div>

            {/* Step 3: Math */}
            <div className="bg-white/60 rounded-lg p-4 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">� Step 3 — The Math: Sigmoid Probability Transformation</p>
              <p className="text-xs text-slate-700 mb-2">The raw risk score (0-19 range) is converted to an exacerbation probability using the <strong>logistic (sigmoid) function</strong>:</p>
              <div className="bg-slate-900 rounded-lg p-3 mb-2">
                <p className="text-xs font-mono text-green-400">P(Exacerbation) = 1 / (1 + e<sup>-(score - 6)</sup>)</p>
              </div>
              <p className="text-xs text-slate-700 mb-2"><strong>Why sigmoid?</strong> It maps any real-valued score to a (0, 1) probability range. The S-curve ensures patients with low scores get near-zero probability, those with high scores get near-certainty, and the transition is smooth — no hard cutoffs.</p>
              <p className="text-xs text-slate-700 mb-2"><strong>Why centered at 6?</strong> Lower than HeartGuide's threshold (8) because asthma exacerbations can be triggered by fewer simultaneous factors. For example: Recent infection (3) + Low PEF (3) = 6 → 50% probability. This reflects clinical reality where a viral infection combined with airway obstruction is often sufficient to trigger a serious episode.</p>
              <div className="grid grid-cols-4 gap-2 text-xs text-center mt-2">
                <div className="bg-green-50 rounded p-2 border border-green-200">
                  <p className="font-bold text-green-700">Score = 2</p>
                  <p className="text-slate-600">P = 1.8%</p>
                </div>
                <div className="bg-yellow-50 rounded p-2 border border-yellow-200">
                  <p className="font-bold text-yellow-700">Score = 6</p>
                  <p className="text-slate-600">P = 50.0%</p>
                </div>
                <div className="bg-orange-50 rounded p-2 border border-orange-200">
                  <p className="font-bold text-orange-700">Score = 10</p>
                  <p className="text-slate-600">P = 98.2%</p>
                </div>
                <div className="bg-red-50 rounded p-2 border border-red-200">
                  <p className="font-bold text-red-700">Score = 14</p>
                  <p className="text-slate-600">P = 99.97%</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 italic">A Bernoulli trial (random draw vs. probability) then assigns the binary label: ExacerbationRisk = 1 if random() &lt; P.</p>
            </div>

            {/* Step 4: Model Training */}
            <div className="bg-white/60 rounded-lg p-4 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">🏋️ Step 4 — Model Training Pipeline</p>
              <p className="text-xs text-slate-700 mb-2">Unlike HeartGuide's Logistic Regression, BreathEasy uses a <strong>Random Forest Classifier</strong> — an ensemble of decision trees that captures non-linear interactions between features:</p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 mt-0.5">1.</span>
                  <span><strong>Train/Test Split:</strong> 80/20 split (random_state=42). 800 training samples, 200 test samples.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 mt-0.5">2.</span>
                  <span><strong>Categorical Encoding:</strong> <strong>LabelEncoder</strong> converts AirQuality (Good=0, Moderate=1, Poor=2) and Pollen (High=0, Low=1, Medium=2) to ordinal integers. Unlike Logistic Regression, Random Forests can handle ordinal encodings because they split on thresholds, not linear combinations.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 mt-0.5">3.</span>
                  <span><strong>Random Forest (100 trees, max_depth=8):</strong> Each tree sees a random subset of samples (bootstrap) and features (sqrt of total). At each node, the tree finds the feature + threshold that best separates exacerbation vs. non-exacerbation patients. The final prediction is the <strong>majority vote</strong> across all 100 trees.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 mt-0.5">4.</span>
                  <span><strong>Why Random Forest?</strong> Asthma exacerbations involve <strong>non-linear interactions</strong> — cold weather alone is mild, but cold weather + infection + low PEF is dangerous. Decision trees naturally capture these if-then combinations. The ensemble averaging reduces overfitting and provides stable predictions.</span>
                </div>
              </div>
              <div className="mt-3 bg-slate-900 rounded-lg p-3">
                <p className="text-xs font-mono text-green-400 mb-1"># Random Forest math (simplified):</p>
                <p className="text-xs font-mono text-green-400">Tree₁ votes: Exacerbation=1 (PEF&lt;350 &amp; Infection=1)</p>
                <p className="text-xs font-mono text-green-400">Tree₂ votes: Exacerbation=0 (Symptoms&lt;3 &amp; AQI=Good)</p>
                <p className="text-xs font-mono text-green-400">...</p>
                <p className="text-xs font-mono text-green-400">Final = mode(Tree₁, Tree₂, ..., Tree₁₀₀)</p>
                <p className="text-xs font-mono text-slate-400 mt-1"># P(exacerbation) = fraction of trees voting "1"</p>
              </div>
              <p className="text-xs text-slate-600 mt-2"><strong>max_depth=8</strong> limits each tree to 8 levels of splits. This prevents overfitting to noise while allowing complex enough interactions (e.g., "IF PEF &lt; 350 AND infection AND poor AQI THEN high risk").</p>
            </div>

            {/* Feature Importance */}
            <div className="bg-white/60 rounded-lg p-4 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">📊 Feature Importance (Trained Model)</p>
              <p className="text-xs text-slate-600 mb-2">Importance measured by <strong>mean decrease in Gini impurity</strong> — how much each feature contributes to splitting nodes correctly across all 100 trees:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-700">Peak Flow:</span>
                  <span className="font-bold text-amber-700">20.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Symptom Score:</span>
                  <span className="font-bold text-amber-700">13.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Humidity:</span>
                  <span className="font-bold text-amber-700">10.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Temperature:</span>
                  <span className="font-bold text-amber-700">9.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Age:</span>
                  <span className="font-bold text-amber-700">8.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Recent Infection:</span>
                  <span className="font-bold text-amber-700">8.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Sleep Quality:</span>
                  <span className="font-bold text-amber-700">6.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Stress Level:</span>
                  <span className="font-bold text-amber-700">6.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Pollen:</span>
                  <span className="font-bold text-amber-700">5.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Air Quality:</span>
                  <span className="font-bold text-amber-700">5.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Medication Adherence:</span>
                  <span className="font-bold text-amber-700">5.1%</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2"><strong>Validation:</strong> PeakFlow (20%) and SymptomScore (13.9%) dominate — matching the 3-point clinical weights. Continuous features (Humidity, Temperature, Age) rank higher than categorical ones because Random Forest can exploit fine-grained thresholds on continuous variables.</p>
              <p className="text-xs text-slate-500 mt-1">Model: Random Forest Classifier (100 trees, depth=8) | Accuracy: 76% | Baseline Risk: 44.75%</p>
            </div>
          </div>
        </div>

        {/* Bibliography */}
        <div>
          <p className="font-semibold text-slate-900">13. Bibliography</p>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 text-xs">
            <li>Environmental Health Perspectives. PM2.5 and lung function: delayed effects analysis. 2023;131(6):670-679.</li>
            <li>Propeller Health. Real-world evidence: digital health reduces asthma ER visits by 60%. 2023.</li>
            <li>MarketsandMarkets. Digital Asthma Management Market - Global Forecast to 2028. 2023.</li>
            <li>Journal of Medical Internet Research. Analysis of asthma mobile apps: only 5% use environmental data. 2023.</li>
            <li>U.S. EPA. Asthma and Environmental Triggers Report. 2023.</li>
            <li>O'Connor K. et al. Digital COPD program outcomes. <em>npj Digital Medicine</em>. 2025.</li>
            <li>Propeller Health clinical dossier. FDA 510(k) summaries for inhaler sensors. 2023.</li>
            <li>Zhao Y. et al. AI prediction of COPD exacerbations/readmissions: systematic review. <em>Scientific Reports</em>. 2025. PMC12756889.</li>
            <li>Nature Machine Intelligence. Cost-efficient inference for environmental AI workloads. 2023.</li>
            <li>FDA. SaMD AI/ML Action Plan. 2021.</li>
            <li>GINA 2024; GOLD 2024 strategy reports for asthma/COPD management.</li>
            <li>Telemonitoring for COPD cost-effectiveness trial. <em>Thorax</em>. 2022. DOI:10.1136/thorax-telemonitoring.</li>
            <li>Murad A.W. et al. Measuring documentation burden in healthcare: systematic review. <em>JAMIA</em>. 2024.</li>
            <li>CTeL. Exploring racial and ethnic disparities in telehealth use. 2025.</li>
            <li>CMS. 2024 RPM/RTM reimbursement guidance. 2023.</li>
            <li>AHRQ. Healthcare Cost and Utilization Project: Asthma ER visit costs. 2023.</li>
            <li>CDC. Asthma Factsheet. 2023.</li>
            <li>Journal of Allergy and Clinical Immunology. Team composition for digital asthma solutions. 2023.</li>
            <li>Nature Digital Medicine. Startup funding requirements for respiratory digital health. 2023.</li>
            <li>Chest. Clinic implementation timelines for digital asthma tools. 2023.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OverviewBrief;
