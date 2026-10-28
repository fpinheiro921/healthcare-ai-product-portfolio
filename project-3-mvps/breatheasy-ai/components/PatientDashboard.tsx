import React, { useState } from 'react';
import AIChatInterface from './AIChatInterface';
import AgentInsight from './AgentInsight';
import RecentActivityLog from './RecentActivityLog';
import { Patient, WeatherData, DailyLog, Medication, Zone } from '../types';
import { generateEducationalContent } from '../services/geminiService';

import { EnvironmentalTrigger } from './EnvironmentalTrigger';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle, Wind, Activity, Thermometer, Phone, Pill, CheckCircle, PlusCircle, Clock, ChevronDown, ChevronUp, AlertCircle, TrendingUp, Heart, Utensils, BookOpen, MessageSquare, Check, Info, Loader2 } from 'lucide-react';

interface Props {
  patient: Patient;
  weather: WeatherData;
  onAddLog: (log: DailyLog) => void;
  onTakeMedication: (medId: string) => void;
}

const PatientDashboard: React.FC<Props> = ({ patient, weather, onAddLog, onTakeMedication }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'checkin' | 'food' | 'learn' | 'chat'>('home');
  const [showEmergency, setShowEmergency] = useState(false);
  const [expandedMedId, setExpandedMedId] = useState<string | null>(null);
  const [todayLog, setTodayLog] = useState<Partial<DailyLog>>({
    pef: patient.baselinePEF,
    spO2: 98,
    breathlessness: 1,
    coughSeverity: 1,
    sputumColor: 'Clear' as DailyLog['sputumColor'],
    steps: 3000,
    rescueInhalerPuffs: 0,
    notes: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Learn tab: AI-personalized article state
  const [learnTopic, setLearnTopic] = useState<string | null>(null);
  const [learnContent, setLearnContent] = useState<string | null>(null);
  const [learnLoading, setLearnLoading] = useState(false);

  const openLearnTopic = async (title: string) => {
    setLearnTopic(title);
    setLearnContent(null);
    setLearnLoading(true);
    const result = await generateEducationalContent(title, `${patient.copdStage} COPD / asthma`);
    setLearnContent(result.content);
    setLearnLoading(false);
  };

  // Calculate Zone based on latest PEF
  const latestLog = patient.logs[patient.logs.length - 1];
  const latestPef = latestLog?.pef ?? patient.baselinePEF;
  const pefPercentage = (latestPef / patient.baselinePEF) * 100;

  let currentZone = Zone.GREEN;
  if (pefPercentage < 50) currentZone = Zone.RED;
  else if (pefPercentage < 80) currentZone = Zone.YELLOW;

  // Simulator state: trigger exposure and symptom severity shift the predicted zone
  const [simTrigger, setSimTrigger] = useState(5);
  const [simSeverity, setSimSeverity] = useState(3);
  const predictedPefPct = Math.max(0, pefPercentage - (simSeverity - 1) * 3 - (simTrigger - 1) * 2);
  let predictedZone = Zone.GREEN;
  if (predictedPefPct < 50) predictedZone = Zone.RED;
  else if (predictedPefPct < 80) predictedZone = Zone.YELLOW;

  const getZoneColor = (zone: Zone) => {
    switch (zone) {
      case Zone.GREEN: return 'bg-green-100 text-green-800 border-green-300';
      case Zone.YELLOW: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case Zone.RED: return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: DailyLog = {
      date: new Date().toISOString().split('T')[0],
      pef: Number(todayLog.pef),
      spO2: Number(todayLog.spO2),
      breathlessness: Number(todayLog.breathlessness),
      coughSeverity: Number(todayLog.coughSeverity),
      sputumColor: todayLog.sputumColor || 'Clear',
      steps: Number(todayLog.steps),
      rescueInhalerPuffs: Number(todayLog.rescueInhalerPuffs),
      notes: todayLog.notes || ''
    };
    onAddLog(newLog);

    // Dangerous values escalate straight to the emergency protocol
    if (newLog.spO2 < 90 || newLog.pef < patient.baselinePEF * 0.5) {
      setShowEmergency(true);
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveTab('home');
    }, 2000);
  };

  // Check if a medication was taken today
  const isTakenToday = (med: Medication) => {
    if (!med.lastTaken) return false;
    const takenDate = new Date(med.lastTaken).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return takenDate === today;
  };

  const toggleMedExpand = (id: string) => {
    setExpandedMedId(expandedMedId === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-sky-50/50 px-6 py-5 shadow-sm flex justify-between items-center sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl flex items-center justify-center shadow-md">
            <Wind size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Hi, {patient.name.split(' ')[0]}</h2>
            <p className="text-xs text-slate-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <button onClick={() => setShowEmergency(true)} className="bg-red-50 text-red-600 p-2.5 rounded-full hover:bg-red-100 transition-all duration-200 shadow-sm border border-red-100 hover:shadow-md hover:scale-105 active:scale-95">
          <AlertCircle size={22} />
        </button>
      </div>

      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border-t-8 border-red-600">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle size={48} className="text-red-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Protocol</h2>
              <p className="text-gray-600 mb-6">If you are having severe difficulty breathing or chest pain, do not wait.</p>

              <a href="tel:911" className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg mb-3 hover:bg-red-700 transition">
                Call 911 Immediately
              </a>
              <button
                onClick={() => setShowEmergency(false)}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        {activeTab === 'home' && (
          <div className="p-5 space-y-6">
            {/* Neural Guardian Agent */}
            <AgentInsight
              aqi={weather.aqi || 45} // Fallback if missing
              pollenLevel={weather.pollen.split(' ')[0]} // "High"
              pollenDetail={weather.pollen.includes('(') ? weather.pollen.substring(weather.pollen.indexOf('(')) : ''} // "(Grass)"
              isIndoors={false}
            />

            {/* Environmental Trigger Simulator */}
            <EnvironmentalTrigger weather={weather} className="mb-6" />

            {/* Current Status Zone - Matching HeartGuide AI */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-teal-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p className="text-teal-100 text-sm font-medium mb-1">Asthma Status</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-5xl font-bold tracking-tighter">{currentZone}</h3>
                    <span className="text-lg opacity-60 font-medium">ZONE</span>
                  </div>
                  <p className="text-teal-100 text-xs mt-1">Peak Flow: {latestPef} L/min</p>
                </div>
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                  <Wind className="text-white" size={28} />
                </div>
              </div>

              {/* Zone Simulator */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-teal-200" />
                    <span className="text-sm font-medium text-teal-50">Risk Simulator</span>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                    PEF: {Math.round(pefPercentage)}%
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-teal-100 mb-1.5">
                      <span>Trigger Exposure</span>
                      <span className="font-bold">{simTrigger}/10</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={simTrigger}
                      onChange={(e) => setSimTrigger(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-teal-900/30 rounded-full appearance-none cursor-pointer accent-white"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-teal-100 mb-1.5">
                      <span>Symptom Severity</span>
                      <span className="font-bold">{simSeverity}/10</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={simSeverity}
                      onChange={(e) => setSimSeverity(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-teal-900/30 rounded-full appearance-none cursor-pointer accent-white"
                    />
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-teal-200">Predicted Zone:</span>
                    <span className={`text-sm font-bold ${predictedZone === Zone.RED ? 'text-red-300' : predictedZone === Zone.YELLOW ? 'text-amber-300' : 'text-emerald-300'}`}>
                      {predictedZone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('checkin')}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="bg-gradient-to-br from-sky-100 to-sky-200 p-3.5 rounded-2xl text-sky-600 shadow-sm">
                  <PlusCircle size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Log Symptoms</span>
              </button>
              <button
                onClick={() => setActiveTab('food')}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3.5 rounded-2xl text-teal-600 shadow-sm">
                  <Pill size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Medications</span>
              </button>
            </div>

            {/* PEF Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Peak Flow Trend (30 Days)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.logs}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(val) => val.slice(5)} />
                    <YAxis domain={[0, 500]} />
                    <Tooltip />
                    <ReferenceLine y={patient.baselinePEF} stroke="#10b981" strokeDasharray="3 3" label="Baseline" />
                    <ReferenceLine y={patient.baselinePEF * 0.8} stroke="#f59e0b" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="pef" stroke="#0d9488" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Medications tab */}
        {activeTab === 'food' && (
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-900">Medications</h3>
              <span className="text-xs font-bold bg-sky-50 text-sky-600 px-3 py-1.5 rounded-full">
                {patient.medications.filter(isTakenToday).length}/{patient.medications.length} Taken
              </span>
            </div>
            <div className="space-y-3">
              {patient.medications.map(med => {
                const taken = isTakenToday(med);
                const expanded = expandedMedId === med.id;
                return (
                  <div key={med.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 flex items-center justify-between gap-3">
                      <button onClick={() => toggleMedExpand(med.id)} className="flex items-center gap-3 min-w-0 text-left flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${med.type === 'Rescue' ? 'bg-red-50 text-red-500' : 'bg-sky-50 text-sky-600'}`}>
                          <Pill size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className={`font-semibold text-sm truncate ${taken ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{med.name}</p>
                          <p className="text-xs text-slate-500">{med.dosage} • {med.frequency}</p>
                        </div>
                      </button>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${med.remainingDoses <= 5 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                          {med.remainingDoses} left
                        </span>
                        <button
                          onClick={() => onTakeMedication(med.id)}
                          disabled={taken}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${taken ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-300 hover:border-sky-500 hover:text-sky-500'}`}
                          aria-label={taken ? `${med.name} taken` : `Mark ${med.name} as taken`}
                        >
                          <Check size={18} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                    {expanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-50 text-xs text-slate-500 space-y-1">
                        <p><span className="font-semibold text-slate-600">Type:</span> {med.type}</p>
                        {med.instructions && <p><span className="font-semibold text-slate-600">Instructions:</span> {med.instructions}</p>}
                        {taken && <p><span className="font-semibold text-slate-600">Last taken:</span> {new Date(med.lastTaken!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {patient.medications.some(m => m.remainingDoses <= 5) && (
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">A medication is running low. Request a refill from your pharmacy.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="p-4 h-full">
            <AIChatInterface nurseName="Coach Mia" specialty="Respiratory" />
          </div>
        )}

        {activeTab === 'checkin' && (
          <form onSubmit={handleLogSubmit} className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Daily check-in</h3>
            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm text-green-700 flex items-center gap-2">
                <CheckCircle size={16} /> Check-in saved successfully!
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
              <label className="space-y-1">
                <span className="text-xs text-slate-500">Breathlessness (1-10)</span>
                <input type="number" min="1" max="10" value={todayLog.breathlessness ?? 1} onChange={(e) => setTodayLog({ ...todayLog, breathlessness: Number(e.target.value) })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500">Cough severity (1-10)</span>
                <input type="number" min="1" max="10" value={todayLog.coughSeverity ?? 1} onChange={(e) => setTodayLog({ ...todayLog, coughSeverity: Number(e.target.value) })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500">Sputum color</span>
                <select value={todayLog.sputumColor ?? 'Clear'} onChange={(e) => setTodayLog({ ...todayLog, sputumColor: e.target.value as DailyLog['sputumColor'] })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <option>Clear</option>
                  <option>White</option>
                  <option>Yellow</option>
                  <option>Green</option>
                  <option>Brown</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500">Rescue inhaler puffs</span>
                <input type="number" min="0" value={todayLog.rescueInhalerPuffs ?? 0} onChange={(e) => setTodayLog({ ...todayLog, rescueInhalerPuffs: Number(e.target.value) })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              </label>
              <label className="space-y-1 col-span-2">
                <span className="text-xs text-slate-500">Notes</span>
                <textarea value={todayLog.notes ?? ''} onChange={(e) => setTodayLog({ ...todayLog, notes: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows={2} placeholder="Windy today, wore mask outside." />
              </label>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-2xl font-bold shadow-lg shadow-sky-600/20 hover:shadow-xl hover:shadow-sky-600/30 active:scale-95 transition-all duration-200">Submit Check-in</button>
          </form>
        )}

        {activeTab === 'learn' && (
          <div className="p-5 space-y-4 text-sm text-slate-700">
            {learnTopic ? (
              <div>
                <button onClick={() => { setLearnTopic(null); setLearnContent(null); }} className="mb-4 text-xs font-bold text-sky-600 hover:text-sky-700">
                  ← Back to topics
                </button>
                <h3 className="text-base font-bold text-slate-800 mb-3">{learnTopic}</h3>
                {learnLoading ? (
                  <div className="flex items-center gap-2 text-slate-400 py-8 justify-center">
                    <Loader2 size={18} className="animate-spin" />
                    <span className="text-sm">Personalizing content for you...</span>
                  </div>
                ) : (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{learnContent}</p>
                    <p className="text-[10px] text-slate-400 italic mt-4 pt-3 border-t border-slate-100">
                      AI-generated for education — not a substitute for professional medical advice.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <h3 className="text-base font-bold text-slate-800">Learn</h3>
                {[
                  { title: 'PEF Zones', icon: Info, iconWrap: 'from-emerald-100 to-emerald-200', iconColor: 'text-emerald-600', teaser: 'Green: ≥80% baseline, Yellow: 50-79%, Red: <50%. Follow your action plan.' },
                  { title: 'Trigger Avoidance', icon: Wind, iconWrap: 'from-sky-100 to-sky-200', iconColor: 'text-sky-600', teaser: 'Check air quality, wear a mask on high AQI days, and pre-treat before exercise.' },
                  { title: 'Inhaler Technique', icon: BookOpen, iconWrap: 'from-amber-100 to-amber-200', iconColor: 'text-amber-600', teaser: 'Shake MDI, exhale fully, seal lips, press + breathe in slowly, hold 10 seconds, wait 30s between puffs.' },
                ].map(t => (
                  <button key={t.title} onClick={() => openLearnTopic(t.title)} className="w-full text-left rounded-2xl border border-slate-200 p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 bg-gradient-to-br ${t.iconWrap} rounded-lg flex items-center justify-center`}>
                        <t.icon size={16} className={t.iconColor} />
                      </div>
                      <p className="font-bold text-slate-900">{t.title}</p>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{t.teaser}</p>
                    <p className="text-[11px] font-semibold text-sky-600 mt-2">Read personalized article →</p>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-3 flex justify-between items-center absolute bottom-0 w-full z-20 pb-6">
        <button
          onClick={() => setActiveTab('home')}
          className={`${activeTab === 'home' ? 'text-sky-600 border-sky-500 bg-sky-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <Heart size={22} className={activeTab === 'home' ? 'fill-current stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('checkin')}
          className={`${activeTab === 'checkin' ? 'text-sky-600 border-sky-500 bg-sky-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <Activity size={22} className={activeTab === 'checkin' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Check-in</span>
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className={`${activeTab === 'food' ? 'text-sky-600 border-sky-500 bg-sky-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <Utensils size={22} className={activeTab === 'food' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Log</span>
        </button>
        <button
          onClick={() => setActiveTab('learn')}
          className={`${activeTab === 'learn' ? 'text-sky-600 border-sky-500 bg-sky-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <BookOpen size={22} className={activeTab === 'learn' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Learn</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`${activeTab === 'chat' ? 'text-sky-600 border-sky-500 bg-sky-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <MessageSquare size={22} className={activeTab === 'chat' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Care</span>
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;