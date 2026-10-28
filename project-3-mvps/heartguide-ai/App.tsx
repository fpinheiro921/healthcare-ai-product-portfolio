import React, { useState } from 'react';
import { PatientView } from './components/patient/PatientView';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import OverviewBrief from './components/OverviewBrief';
import ManagerBriefing from './components/ManagerBriefing';
import { Patient, RiskLevel, Medication, AppView } from './types';
import { Smartphone, Monitor, HeartPulse, Info, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data Initialization
const INITIAL_MEDS: Medication[] = [
  { id: '1', name: 'Lisinopril', dosage: '10mg', frequency: 'Daily', takenToday: true },
  { id: '2', name: 'Furosemide', dosage: '40mg', frequency: 'Twice Daily', takenToday: false },
  { id: '3', name: 'Carvedilol', dosage: '12.5mg', frequency: 'Daily', takenToday: false },
];

const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'Martha Stuart',
    age: 72,
    condition: 'HFrEF',
    riskScore: 78,
    riskLevel: RiskLevel.HIGH,
    weightHistory: [
      { date: '2023-10-20', weight: 148.0 },
      { date: '2023-10-21', weight: 148.5 },
      { date: '2023-10-22', weight: 149.2 },
      { date: '2023-10-23', weight: 152.5 }, // High gain
    ],
    medications: INITIAL_MEDS,
    logs: [],
    foodLogs: [],
    alerts: ['Sudden weight gain (+3.3 lbs in 48h)', 'Missed PM Furosemide'],
  },
  {
    id: 'p2',
    name: 'Robert Chen',
    age: 65,
    condition: 'HFpEF',
    riskScore: 25,
    riskLevel: RiskLevel.LOW,
    weightHistory: [
      { date: '2023-10-20', weight: 180.0 },
      { date: '2023-10-21', weight: 179.8 },
      { date: '2023-10-22', weight: 180.2 },
    ],
    medications: INITIAL_MEDS.map(m => ({ ...m, takenToday: true })),
    logs: [],
    foodLogs: [],
    alerts: [],
  },
  {
    id: 'p3',
    name: 'Evelyn Rose',
    age: 81,
    condition: 'Valvular HF',
    riskScore: 45,
    riskLevel: RiskLevel.MODERATE,
    weightHistory: [
      { date: '2023-10-20', weight: 130 },
      { date: '2023-10-21', weight: 130 },
      { date: '2023-10-22', weight: 131 },
    ],
    medications: INITIAL_MEDS,
    logs: [],
    foodLogs: [],
    alerts: ['Reported moderate SOB (4/10)'],
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('patient');
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [currentPatientId, setCurrentPatientId] = useState<string>('p1');

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };

  const activePatient = patients.find(p => p.id === currentPatientId) || patients[0];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Dev Toolbar / Role Switcher */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight text-slate-900 leading-none">HeartGuide AI</h1>
            <span className="text-xs text-slate-500 font-medium">Clinical Decision Support System</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://theaihustlelab.com/heartguide-showcase" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline">
            ← Back to Portfolio
          </a>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setView('patient')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${view === 'patient' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Smartphone size={16} /> Patient App
            </button>
            <button
              onClick={() => setView('provider')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${view === 'provider' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Monitor size={16} /> Provider Portal
            </button>
            <button
              onClick={() => setView('overview')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${view === 'overview' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Info size={16} /> Product Overview
            </button>
            <button
              onClick={() => setView('manager')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${view === 'manager' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Briefcase size={16} /> Manager Briefing
            </button>
          </div>
        </div>
      </div>

      {/* Main View Container */}
      <div className="flex-1 relative overflow-hidden bg-slate-50/50">
        <AnimatePresence mode="wait">
          {view === 'patient' ? (
            <motion.div
              key="patient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full flex justify-center items-center p-8"
            >
              {/* Mobile Simulator Wrapper */}
              <div className="h-[800px] w-full max-w-[390px] bg-white rounded-[3rem] shadow-2xl border-8 border-slate-900 overflow-hidden relative ring-1 ring-slate-900/5">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-50"></div>
                <div className="h-full w-full overflow-y-auto scrollbar-hide pt-8">
                  <PatientView patient={activePatient} onUpdatePatient={handleUpdatePatient} />
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full"></div>
              </div>
            </motion.div>
          ) : view === 'provider' ? (
            <motion.div
              key="provider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <ProviderDashboard
                patients={patients}
                onSelectPatient={setCurrentPatientId}
                selectedPatientId={currentPatientId}
              />
            </motion.div>
          ) : view === 'manager' ? (
            <motion.div
              key="manager"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full overflow-y-auto"
            >
              <ManagerBriefing />
            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full p-6"
            >
              <div className="h-full w-full max-w-5xl mx-auto">
                <OverviewBrief />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;