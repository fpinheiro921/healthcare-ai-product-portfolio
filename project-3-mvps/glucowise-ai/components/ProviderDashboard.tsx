import React, { useState } from 'react';
import { Users, Search, AlertCircle, ChevronRight, FileText, Activity, Droplet } from 'lucide-react';
import { Patient, RiskLevel } from '../types';
import GlucoseChart from './GlucoseChart';

// Mock Data for Patients
const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1', name: 'Sarah Johnson', age: 45, type: 'Type 2', latestA1C: 6.8, lastVisit: '2023-10-15', riskLevel: RiskLevel.LOW, timeInRange: 75,
    readings: Array.from({ length: 10 }, (_, i) => ({ id: `r${i}`, value: 110 + Math.random() * 40, timestamp: new Date().toISOString(), context: 'Fasting' } as any))
  },
  {
    id: 'p2', name: 'Robert Smith', age: 62, type: 'Type 2', latestA1C: 8.2, lastVisit: '2023-09-20', riskLevel: RiskLevel.MEDIUM, timeInRange: 55,
    readings: Array.from({ length: 10 }, (_, i) => ({ id: `r${i}`, value: 140 + Math.random() * 80, timestamp: new Date().toISOString(), context: 'Fasting' } as any))
  },
  {
    id: 'p3', name: 'Emily Davis', age: 38, type: 'Type 2 (insulin)', latestA1C: 9.4, lastVisit: '2023-10-01', riskLevel: RiskLevel.HIGH, timeInRange: 40,
    readings: Array.from({ length: 10 }, (_, i) => ({ id: `r${i}`, value: 60 + Math.random() * 250, timestamp: new Date().toISOString(), context: 'Fasting' } as any))
  },
];

const ProviderDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'panel' | 'brief'>('panel');

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskBadge = (level: RiskLevel) => {
    switch(level) {
      case RiskLevel.HIGH: return <span className="bg-red-100 text-red-700 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-bold">High Risk</span>;
      case RiskLevel.MEDIUM: return <span className="bg-amber-100 text-amber-700 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-bold">Moderate</span>;
      case RiskLevel.LOW: return <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-bold">Stable</span>;
    }
  };

  const getA1CColor = (val: number) => {
      if (val >= 9) return 'text-red-600';
      if (val >= 7) return 'text-amber-600';
      return 'text-emerald-600';
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 shadow-xl z-10">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="p-1 bg-emerald-500 rounded-lg">
                <Activity className="text-slate-900 w-5 h-5" />
            </div>
            GlucoWise MD
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl text-emerald-400 font-medium shadow-sm border border-slate-700">
            <Users className="w-5 h-5" /> Patient Panel
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all hover:pl-5">
            <AlertCircle className="w-5 h-5" /> Alert Queue <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all hover:pl-5">
            <FileText className="w-5 h-5" /> Reports
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800 text-sm text-slate-500">
          Dr. A. Peterson
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm z-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-800">Provider Workspace</h2>
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('panel')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${activeTab === 'panel' ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Patient Panel
              </button>
              <button
                onClick={() => setActiveTab('brief')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${activeTab === 'brief' ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Product Overview
              </button>
            </div>
          </div>
          {activeTab === 'panel' && (
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent border-2 focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </header>

        {activeTab === 'brief' && (
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-4xl">
              <h3 className="text-lg font-bold text-slate-900">Product Overview (Provider App)</h3>
              <div>
                <p className="text-sm font-semibold text-slate-800">Scenario</p>
                <p className="text-sm text-slate-600">This workspace uses mock patients and readings to illustrate provider analytics, decision support, and alert workflows. No external APIs are called.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">What to demo</p>
                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                  <li>Patient list with risk badges, A1C status, and time-in-range highlights.</li>
                  <li>Detail view: AGP chart, variability, hypo counts, and clinical decision support suggestions.</li>
                  <li>Messaging/Intervention buttons (placeholder) to show care-team actions.</li>
                  <li>Search filtering and responsive layout (list + detail split view).</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Data model (mocked)</p>
                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                  <li>Patient: id, name, age, type, latestA1C, riskLevel, timeInRange, readings[].</li>
                  <li>Readings: id, value, timestamp, context (used for AGP chart only).</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Safety notes</p>
                <p className="text-sm text-slate-600">Decision support text is illustrative only; no orders are placed, no PHI leaves the client.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Next integration steps</p>
                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                  <li>Add backend persistence + auth for patient panels and audit logs.</li>
                  <li>Route AI calls through a serverless proxy with PHI scrubbing and clinician-in-the-loop approvals.</li>
                  <li>Add alert queue actions (acknowledge/escalate) and care-plan versioning.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'panel' && (
          <div className="flex-1 overflow-auto p-6 flex gap-6">
            {/* Patient List */}
            <div className={`${selectedPatient ? 'w-1/3 hidden lg:flex' : 'w-full flex'} bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col transition-all duration-300`}>
              <div className="p-4 bg-slate-50/80 backdrop-blur border-b border-slate-200 font-semibold text-xs text-slate-500 flex justify-between tracking-wider">
                <span>PATIENT NAME</span>
                <span>A1C STATUS</span>
              </div>
              <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
                {filteredPatients.map(patient => (
                  <div 
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 hover:bg-slate-50 cursor-pointer flex justify-between items-center group transition-colors ${selectedPatient?.id === patient.id ? 'bg-indigo-50/50 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div>
                      <p className={`font-semibold text-slate-900 ${selectedPatient?.id === patient.id ? 'text-indigo-700' : ''}`}>{patient.name}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        {getRiskBadge(patient.riskLevel)}
                        <span className="text-[10px] text-slate-400">Last: {patient.lastVisit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getA1CColor(patient.latestA1C)}`}>
                        {patient.latestA1C}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Detail View */}
            {selectedPatient && (
               <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-y-auto animate-in slide-in-from-right-4 duration-300">
                  <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-white sticky top-0 z-10">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-2xl font-bold text-slate-900">{selectedPatient.name}</h2>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded text-center">{selectedPatient.type}</span>
                      </div>
                      <p className="text-slate-500 text-sm">{selectedPatient.age} years old • ID: #{selectedPatient.id.toUpperCase()}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                        Message
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                        Intervention
                      </button>
                    </div>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1 bg-emerald-100 rounded-full">
                                <Activity className="w-3 h-3 text-emerald-600" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Time in Range</p>
                        </div>
                        <p className={`text-3xl font-bold mt-1 ${selectedPatient.timeInRange < 70 ? 'text-amber-500' : 'text-emerald-600'}`}>
                          {selectedPatient.timeInRange}%
                        </p>
                        <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                          <div className={`h-full rounded-full ${selectedPatient.timeInRange < 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${selectedPatient.timeInRange}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1 bg-blue-100 rounded-full">
                                <Activity className="w-3 h-3 text-blue-600" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Variability (CV)</p>
                        </div>
                        <p className="text-3xl font-bold mt-1 text-slate-800">32%</p>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Target: &lt;36%</p>
                      </div>
                      
                      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1 bg-red-100 rounded-full">
                                <Droplet className="w-3 h-3 text-red-600" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Hypo Events (7d)</p>
                        </div>
                        <p className="text-3xl font-bold mt-1 text-red-600">2</p>
                        <p className="text-xs text-red-400 mt-1 font-medium">Review needed</p>
                      </div>
                    </div>

                    {/* AGP / Chart */}
                    <div>
                      <h3 className="font-bold text-slate-800 mb-4 text-lg">Ambulatory Glucose Profile (AGP)</h3>
                      <GlucoseChart readings={selectedPatient.readings} height={350} />
                    </div>

                    {/* AI Insights Section for Provider */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 rounded-2xl shadow-sm">
                      <h3 className="font-bold text-indigo-900 flex items-center gap-2 mb-3 text-lg">
                         <Activity className="w-5 h-5" />
                         Clinical Decision Support
                      </h3>
                      <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                        Patient shows <strong>dawn phenomenon</strong> pattern with consistent morning spikes. 
                        Adherence to Metformin is 95%, but post-prandial control is suboptimal.
                      </p>
                      <div className="flex gap-3">
                        <button className="bg-white px-4 py-2.5 rounded-xl border border-indigo-100 text-xs font-bold text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors">
                          Suggestion: Adjust Basal Insulin
                        </button>
                        <button className="bg-white px-4 py-2.5 rounded-xl border border-indigo-100 text-xs font-bold text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors">
                          Action: Send Carb Counting Guide
                        </button>
                      </div>
                    </div>

                  </div>
               </div>
            )}
            {!selectedPatient && (
               <div className="flex-1 hidden lg:flex items-center justify-center text-slate-400 flex-col bg-slate-50/50 border border-slate-200 border-dashed rounded-2xl m-4">
                 <div className="p-6 bg-white rounded-full shadow-sm mb-4">
                     <Users className="w-8 h-8 text-slate-300" />
                 </div>
                 <p className="font-medium">Select a patient to view detailed analytics</p>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;