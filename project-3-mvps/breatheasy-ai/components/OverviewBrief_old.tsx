import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const OverviewBrief: React.FC = () => {
  // Mock data for visualizations
  const pefTrend = [
    { day: 'Mon', pef: 380 },
    { day: 'Tue', pef: 365 },
    { day: 'Wed', pef: 340 },
    { day: 'Thu', pef: 355 },
    { day: 'Fri', pef: 370 },
    { day: 'Sat', pef: 390 },
    { day: 'Sun', pef: 385 }
  ];

  const riskDistribution = [
    { name: 'Green Zone', value: 50, color: '#10b981' },
    { name: 'Yellow Zone', value: 30, color: '#f59e0b' },
    { name: 'Red Zone', value: 20, color: '#ef4444' }
  ];

  const adherenceData = [
    { metric: 'PEF Logs', adherence: 82 },
    { metric: 'Symptom Logs', adherence: 71 },
    { metric: 'Meds Taken', adherence: 89 }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 max-h-[800px] overflow-y-auto">
      <h3 className="text-xl font-bold text-slate-900">Product Overview</h3>
      <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
        <div>
          <p className="font-semibold text-slate-900">1. Clinical problem & users</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Asthma/COPD patients need daily symptom/PEF tracking, medication adherence, and environmental context to avoid exacerbations.</li>
            <li>Clinicians need risk stratification, trend visualizations, and early exacerbation alerts to reduce ED visits.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">2. AI scope and techniques</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Zone calculation based on PEF percentage vs baseline (Green/Yellow/Red thresholds).</li>
            <li>EnvironmentalTrigger component displays live weather/air quality context.</li>
            <li>AI insights for exacerbation risk scores and personalized recommendations.</li>
          </ul>
          <div className="mt-3 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs font-medium text-slate-600 mb-2">PEF Trend Analysis</p>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={pefTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="pef" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-900">3. Data model</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Patient: id, name, age, gender, COPD stage, baseline PEF, riskScore/riskTrend, logs[], meds[].</li>
            <li>Logs: PEF, SpO2, breathlessness, cough severity, sputum color, steps, rescue puffs, notes.</li>
            <li>Weather: AQI/PM2.5/temp/humidity/wind/pollen (live API with geolocation fallback).</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">4. Safety & validation</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Clinician review for automated recommendations with explainable risk factors.</li>
            <li>Input validation, outlier detection, and alert fatigue controls.</li>
            <li>Threshold-based alerts with escalation protocols.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">5. Workflow integration points</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Patient app replaces paper diaries and phone check-ins.</li>
            <li>Provider panel reduces manual chart review via risk badges and trend charts.</li>
            <li>Future: EHR integration for labs, meds, and discharge summaries.</li>
          </ul>
          <div className="mt-3 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs font-medium text-slate-600 mb-2">Population Zone Distribution</p>
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
            <li>Potential SaMD if automated exacerbation predictions trigger care actions.</li>
            <li>Clinical validation and FDA/CE pathways required for automated predictions.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">7. Success metrics</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>Patient: PEF/symptom logging adherence, rescue inhaler use, exacerbation avoidance.</li>
            <li>Provider: time to identify at-risk patients, alert response time, panel efficiency.</li>
          </ul>
          <div className="mt-3 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs font-medium text-slate-600 mb-2">Patient Engagement Metrics</p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={adherenceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="metric" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="adherence" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-900">8. Key risks and mitigations</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>False alerts → clinician review, explainable thresholds, alert fatigue controls.</li>
            <li>Data gaps → input validation, missed-entry reminders, fallback ranges.</li>
            <li>Model drift → periodic retraining, population shift monitoring.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-900">9. Team skill needs</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
            <li>ML engineers for time-series exacerbation modeling and alert calibration.</li>
            <li>Clinical product owners for asthma/COPD pathways and environmental triggers.</li>
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
