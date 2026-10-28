import React, { useState } from 'react';
import PatientDashboard from './components/PatientDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import OverviewBrief from './components/OverviewBrief';
import ManagerBriefing from './components/ManagerBriefing';
import { UserRole } from './types';
import { Stethoscope, User, Droplet, Info, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Dev Toolbar / Role Switcher */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center shadow-md">
            <Droplet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight text-slate-900 leading-none">GlucoWise AI</h1>
            <span className="text-xs text-slate-500 font-medium">Digital insulin navigator</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://theaihustlelab.com/glucowise-showcase"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline"
          >
            ← Back to Portfolio
          </a>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setRole(UserRole.PATIENT)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${role === UserRole.PATIENT ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <User size={16} /> Patient App
            </button>
            <button
              onClick={() => setRole(UserRole.PROVIDER)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${role === UserRole.PROVIDER ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Stethoscope size={16} /> Provider Portal
            </button>
            <button
              onClick={() => setRole(UserRole.OVERVIEW)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${role === UserRole.OVERVIEW ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Info size={16} /> Product Overview
            </button>
            <button
              onClick={() => setRole(UserRole.MANAGER)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${role === UserRole.MANAGER ? 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <Briefcase size={16} /> Manager Briefing
            </button>
          </div>
        </div>
      </div>

      {/* Main View Container */}
      <div className="flex-1 relative overflow-hidden bg-slate-50/50">
        <AnimatePresence mode="wait">
          {role === UserRole.PATIENT ? (
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
                  <PatientDashboard />
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full"></div>
              </div>
            </motion.div>
          ) : role === UserRole.PROVIDER ? (
            <motion.div
              key="provider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full p-6"
            >
              <div className="h-full w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <ProviderDashboard />
              </div>
            </motion.div>
          ) : role === UserRole.MANAGER ? (
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