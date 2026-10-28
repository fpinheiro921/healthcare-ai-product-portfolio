import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const OverviewBrief: React.FC = () => {
  // Mock data for visualizations
  const glucoseTrend = [
    { time: '6am', value: 95 },
    { time: '9am', value: 120 },
    { time: '12pm', value: 160 },
    { time: '3pm', value: 140 },
    { time: '6pm', value: 110 },
    { time: '9pm', value: 98 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 45, color: '#10b981' },
    { name: 'Medium Risk', value: 35, color: '#f59e0b' },
    { name: 'High Risk', value: 20, color: '#ef4444' }
  ];

  const adherenceData = [
    { metric: 'Glucose Logs', adherence: 85, target: 90 },
    { metric: 'Food Logs', adherence: 72, target: 80 },
    { metric: 'Meds Taken', adherence: 91, target: 95 }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 max-h-[800px] overflow-y-auto">
      <h3 className="text-xl font-bold text-slate-900">Product Overview</h3>
      <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
        <div>
          <p className="font-semibold text-slate-900">1. Clinical problem & users</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Type 2 diabetes patients need continuous glucose monitoring, meal impact prediction, and insulin dosing support.</li>
            <li>Clinicians need population views, risk stratification, and actionable alerts without adding manual chart reviews.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">2. AI scope and techniques</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Glucose prediction via MealPredictor component (peak glucose + meal carbs estimate).</li>
            <li>SmartBolusCalculator component displays dosing logic with safety caps.</li>
            <li>AI insights for risk scores and personalized recommendations.</li>
          </ul>
          <div className="mt-3 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs font-medium text-slate-600 mb-2">Typical Daily Glucose Pattern</p>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={glucoseTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-900">3. Data model</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>GlucoseReading: id, value, timestamp, context (fasting/pre/post/bedtime).</li>
            <li>Medication: name, dosage, frequency, adherence flag.</li>
            <li>Prediction state: peak glucose + meal carbs from MealPredictor.</li>
            <li>Food logs: manual entry with future barcode/database integration.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">4. Safety & validation</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Bolus logic includes safety caps and explainable thresholds.</li>
            <li>Clinician-in-the-loop approval for AI dosing suggestions.</li>
            <li>Input validation, outlier detection, and fallback ranges.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">5. Workflow integration points</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Patient app replaces paper logs and manual carb counting.</li>
            <li>Provider panel reduces manual chart review via risk badges and AGP visualizations.</li>
            <li>Future: EHR integration for labs, meds, and appointment context.</li>
          </ul>
          <div className="mt-3 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs font-medium text-slate-600 mb-2">Population Risk Stratification</p>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={45}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-3 mt-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-900">6. Regulatory surface</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Potential medical device software (SaMD) if dosing recommendations are automated.</li>
            <li>Clinical validation and FDA/CE pathways required for automated dosing.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">7. Success metrics</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Patient: Time in Range, A1C trend, hypo events, logging adherence.</li>
            <li>Provider: Panel time saved, risk stratification accuracy, alert response time.</li>
          </ul>
          <div className="mt-3 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs font-medium text-slate-600 mb-2">Patient Engagement vs Targets</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={adherenceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="metric" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748b" domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ fontSize: 11 }}
                  formatter={(value: any, name: string) => [
                    `${value}%`, 
                    name === 'adherence' ? 'Current' : 'Target'
                  ]}
                />
                <Bar dataKey="adherence" fill="#10b981" radius={[4, 4, 0, 0]} name="adherence" />
                <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="target" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>Current adherence shown vs target goals</span>
              <span>Target: 90-95% optimal</span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-900">8. Key risks and mitigations</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Dosing errors → clinician review, hard caps, explainable thresholds.</li>
            <li>Data quality gaps → input validation, outlier detection, fallback ranges.</li>
            <li>Model drift → periodic retraining, monitoring, versioned models.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">9. Team skill needs</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>ML engineers for glucose prediction and safety validation.</li>
            <li>Clinical product owners for dosing logic and workflow design.</li>
            <li>Security/privacy engineers for PHI handling and audit infrastructure.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">10. Implementation roadmap</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Backend persistence + auth, audit logs, consent capture.</li>
            <li>Serverless AI proxy with PHI scrubbing and clinician-in-the-loop approvals.</li>
            <li>Alert queue (ack/escalate) and care-plan versioning.</li>
            <li>Clinical validation and regulatory documentation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OverviewBrief;
