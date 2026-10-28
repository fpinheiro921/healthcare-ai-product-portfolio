import React, { useState, useEffect } from 'react';
import PatientDashboard from './components/PatientDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import OverviewBrief from './components/OverviewBrief';
import ManagerBriefing from './components/ManagerBriefing';
import { mockPatients, mockWeather } from './services/mockData';
import { fetchWeather } from './services/weatherService';
import { DailyLog, WeatherData, AppView } from './types';
import { Stethoscope, User, Wind, MapPin, Info, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [userType, setUserType] = useState<AppView>('patient');
  const [patients, setPatients] = useState(mockPatients);
  const [weather, setWeather] = useState<WeatherData>(mockWeather);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [locationName, setLocationName] = useState('Local Weather');

  // Simulate current patient logged in (John Doe)
  const currentPatientId = 'p1';
  const patientIndex = patients.findIndex(p => p.id === currentPatientId);
  const currentPatient = patients[patientIndex];

  useEffect(() => {
    // Fetch Live Weather on Mount
    if (navigator.geolocation) {
      setLoadingWeather(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeather(latitude, longitude);
          setWeather(data);
          setLocationName('Current Location');
          setLoadingWeather(false);
        },
        (error) => {
          console.error("Geo error:", error);
          setLoadingWeather(false);
          // Fallback to NY or keep mock
        },
        { timeout: 10_000, maximumAge: 600_000 }
      );
    }
  }, []);

  const handleAddLog = (log: DailyLog) => {
    const updatedPatients = [...patients];
    updatedPatients[patientIndex] = {
      ...currentPatient,
      logs: [...currentPatient.logs, log]
    };
    setPatients(updatedPatients);
  };

  const handleTakeMedication = (medId: string) => {
    const updatedPatients = [...patients];
    const patient = updatedPatients[patientIndex];
    const medIndex = patient.medications.findIndex(m => m.id === medId);

    if (medIndex !== -1) {
      const updatedMeds = [...patient.medications];
      updatedMeds[medIndex] = {
        ...updatedMeds[medIndex],
        lastTaken: new Date().toISOString(),
        remainingDoses: Math.max(0, updatedMeds[medIndex].remainingDoses - 1)
      };

      updatedPatients[patientIndex] = {
        ...patient,
        medications: updatedMeds
      };
      setPatients(updatedPatients);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Dev Toolbar / Role Switcher */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight text-slate-900 leading-none">BreathEasy AI</h1>
            <span className="text-xs text-slate-500 font-medium">Asthma & COPD Management</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://theaihustlelab.com/breatheasy-showcase" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline">
            ← Back to Portfolio
          </a>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setUserType('patient')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${userType === 'patient' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <User size={16} /> Patient App
            </button>
            <button
              onClick={() => setUserType('provider')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${userType === 'provider' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Stethoscope size={16} /> Provider Portal
            </button>
            <button
              onClick={() => setUserType('overview')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${userType === 'overview' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Info size={16} /> Product Overview
            </button>
            <button
              onClick={() => setUserType('manager')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${userType === 'manager' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Briefcase size={16} /> Manager Briefing
            </button>
          </div>
        </div>
      </div>

      {/* Main View Container */}
      <div className="flex-1 relative overflow-hidden bg-slate-50/50">
        <AnimatePresence mode="wait">
          {userType === 'patient' ? (
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
                  <PatientDashboard
                    patient={currentPatient}
                    weather={weather}
                    onAddLog={handleAddLog}
                    onTakeMedication={handleTakeMedication}
                  />
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full"></div>
              </div>
            </motion.div>
          ) : userType === 'provider' ? (
            <motion.div
              key="provider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full p-6"
            >
              <div className="h-full w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <ProviderDashboard patients={patients} />
              </div>
            </motion.div>
          ) : userType === 'manager' ? (
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
}

export default App;