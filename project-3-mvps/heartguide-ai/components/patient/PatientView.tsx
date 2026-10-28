import React, { useState, useEffect } from 'react';
import { Patient, SymptomLog, FoodEntry } from '../../types';
import AIChatInterface from '../AIChatInterface';
import AgentInsight from '../AgentInsight';
import RecentActivityLog from '../RecentActivityLog';
import { Heart, Scale, Activity, AlertCircle, Camera, Utensils, MessageSquare, Phone, Check, BookOpen, TrendingUp, Info, Loader2 } from 'lucide-react';
import { estimateSodium, chatWithNurseAI, assessPatientRisk } from '../../services/geminiService';
import { EducationView } from './EducationView';
import { DecompensationMonitor } from './DecompensationMonitor';
import { motion, AnimatePresence } from 'framer-motion';

interface PatientViewProps {
  patient: Patient;
  onUpdatePatient: (p: Patient) => void;
}

export const PatientView: React.FC<PatientViewProps> = ({ patient, onUpdatePatient }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'checkin' | 'food' | 'learn' | 'chat'>('home');
  const [isEmergency, setIsEmergency] = useState(false);

  // Check-in State
  const [sob, setSob] = useState(1);
  const [weight, setWeight] = useState<string>(patient.weightHistory[patient.weightHistory.length - 1]?.weight.toString() || "150");
  const [swelling, setSwelling] = useState(false);
  const [chestPain, setChestPain] = useState(false);
  const [checkinComplete, setCheckinComplete] = useState(false);

  // Risk Simulator State
  const [simulatedWeight, setSimulatedWeight] = useState<number>(parseFloat(weight));
  const [simulatedSob, setSimulatedSob] = useState<number>(1);
  const [simulatedRiskScore, setSimulatedRiskScore] = useState<number>(patient.riskScore);

  // Food State
  const [foodInput, setFoodInput] = useState("");
  const [scanningFood, setScanningFood] = useState(false);

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: `Hi ${patient.name}, how are you feeling today?` }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // ML-based Risk Calculation using trained model feature importance
  useEffect(() => {
    // Model artifact from training (feature importance weights)
    const modelWeights = {
      Age: 0.164,
      ChestPainType: 0.171,
      RestingBP: 0.119,
      ExerciseAngina: 0.123,
      Oldpeak: 0.112,
      MaxHR: 0.085,
      Cholesterol: 0.079,
      FastingBS: 0.063,
      ST_Slope: 0.043,
      Sex: 0.020,
      RestingECG: 0.020
    };

    const baseScore = patient.riskScore;
    const currentWeight = patient.weightHistory[patient.weightHistory.length - 1]?.weight || 150;

    // Calculate weight change impact (proxy for fluid retention)
    const weightChange = simulatedWeight - currentWeight;
    const weightImpact = weightChange > 2 ? (weightChange - 2) * 10 : 0;

    // Calculate SOB impact (proxy for ExerciseAngina and general cardiac stress)
    // SOB scale: 1 (none) to 5 (severe)
    const sobImpact = (simulatedSob - 1) * 8; // Each level adds ~8% risk

    // Combine impacts using model-inspired logic
    // Weight change affects multiple features: RestingBP, Oldpeak (fluid overload indicators)
    // SOB affects: ExerciseAngina, MaxHR
    const combinedImpact =
      (weightImpact * (modelWeights.RestingBP + modelWeights.Oldpeak)) +
      (sobImpact * (modelWeights.ExerciseAngina + modelWeights.MaxHR));

    let newScore = baseScore + combinedImpact;
    newScore = Math.min(100, Math.max(0, newScore));

    setSimulatedRiskScore(Math.round(newScore));
  }, [simulatedWeight, simulatedSob, patient.riskScore, patient.weightHistory]);

  const handleEmergency = () => {
    setIsEmergency(true);
  };

  // Keep form state in sync when switching patients in the provider view
  useEffect(() => {
    const last = patient.weightHistory[patient.weightHistory.length - 1]?.weight;
    setWeight(last?.toString() || "150");
    setSimulatedWeight(last || 150);
    setCheckinComplete(false);
  }, [patient.id]);

  const handleCheckinSubmit = async () => {
    const currentWeight = parseFloat(weight);
    if (isNaN(currentWeight) || currentWeight <= 0) return;
    const prevWeight = patient.weightHistory[patient.weightHistory.length - 1]?.weight || currentWeight;

    const log: SymptomLog = {
      date: new Date().toISOString(),
      weight: currentWeight,
      shortnessOfBreath: sob,
      swelling,
      chestPain,
      notes: "Daily check-in"
    };

    // Basic AI Risk Assessment Simulation
    const assessment = await assessPatientRisk(log, prevWeight, 90);

    const updatedPatient = {
      ...patient,
      logs: [log, ...patient.logs],
      weightHistory: [...patient.weightHistory, { date: new Date().toISOString().split('T')[0], weight: currentWeight }],
      lastCheckIn: new Date().toISOString(),
      riskScore: assessment.riskScore,
      alerts: assessment.riskScore > 60 ? [`New Risk Alert: ${assessment.riskAnalysis}`, ...patient.alerts] : patient.alerts
    };

    onUpdatePatient(updatedPatient);

    // Chest pain reported at check-in escalates to the emergency protocol
    if (chestPain) {
      setIsEmergency(true);
      return;
    }

    setCheckinComplete(true);
    setTimeout(() => setActiveTab('home'), 1500);
  };

  const handleMedToggle = (medId: string) => {
    const updatedMeds = patient.medications.map(m =>
      m.id === medId ? { ...m, takenToday: !m.takenToday, lastTaken: !m.takenToday ? new Date().toISOString() : undefined } : m
    );
    onUpdatePatient({ ...patient, medications: updatedMeds });
  };

  const handleFoodSubmit = async () => {
    if (!foodInput.trim()) return;
    setScanningFood(true);
    const estimation = await estimateSodium(foodInput);

    const newLog: FoodEntry = {
      id: Date.now().toString(),
      name: foodInput,
      sodiumMg: estimation.sodiumMg,
      timestamp: new Date().toISOString(),
      confidence: estimation.advice
    };

    onUpdatePatient({ ...patient, foodLogs: [newLog, ...patient.foodLogs] });
    setFoodInput("");
    setScanningFood(false);
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setChatLoading(true);

    const response = await chatWithNurseAI(userMsg, `Patient Name: ${patient.name}. Condition: ${patient.condition}. Recent Checkin Risk: ${patient.riskScore}`);

    setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
    setChatLoading(false);
  };

  const dailySodium = patient.foodLogs
    .filter(l => l.timestamp.startsWith(new Date().toISOString().split('T')[0]))
    .reduce((acc, curr) => acc + curr.sodiumMg, 0);

  const sodiumLimit = 2000;

  if (isEmergency) {
    return (
      <div className="flex flex-col h-full bg-red-50 p-6 text-center justify-center items-center space-y-6 animate-in fade-in">
        <AlertCircle className="w-24 h-24 text-red-600 animate-pulse" />
        <h1 className="text-3xl font-bold text-red-800">EMERGENCY PROTOCOL</h1>
        <p className="text-lg text-red-700">Are you experiencing severe chest pain or difficulty breathing?</p>
        <div className="w-full space-y-4">
          <a href="tel:911" className="flex items-center justify-center w-full p-6 bg-red-600 text-white rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-transform">
            <Phone className="mr-3" /> CALL 911
          </a>
          <button onClick={() => setIsEmergency(false)} className="w-full p-4 bg-white text-red-600 border-2 border-red-200 rounded-xl font-semibold">
            It was a mistake, go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-indigo-50/50 px-6 py-5 shadow-sm flex justify-between items-center sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
            <Heart size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Hi, {patient.name.split(' ')[0]}</h2>
            <p className="text-xs text-slate-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <button onClick={handleEmergency} className="bg-red-50 text-red-600 p-2.5 rounded-full hover:bg-red-100 transition-all duration-200 shadow-sm border border-red-100 hover:shadow-md hover:scale-105 active:scale-95">
          <AlertCircle size={22} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 scroll-smooth">

        {activeTab === 'home' && (
          <div className="p-5 space-y-6">

            {/* Neural Guardian Agent */}
            <AgentInsight
              riskScore={simulatedRiskScore}
              weightChange={simulatedWeight - 150}
              symptomCount={simulatedSob}
            />

            {/* Smart Decompensation Monitor (New Feature) */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <p className="text-indigo-200 text-sm font-medium mb-1">Decompensation Risk</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold tracking-tight">Multi-Factor Analysis</h3>
                  </div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
                  <Activity className="text-indigo-400" size={24} />
                </div>
              </div>

              <DecompensationMonitor
                baselineWeight={150} // Mock baseline
                currentWeight={simulatedWeight}
                symptomScore={simulatedSob}
              />

              {/* Simulation Controls (Preserved for Demo) */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Risk Simulator Inputs</p>
                <div>
                  <div className="flex justify-between text-xs text-indigo-200 mb-1.5">
                    <span>Weight Input</span>
                    <span className="font-bold">{simulatedWeight} lbs</span>
                  </div>
                  <input
                    type="range"
                    min={140}
                    max={160}
                    step={0.5}
                    value={simulatedWeight}
                    onChange={(e) => setSimulatedWeight(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-indigo-500/30 rounded-full appearance-none cursor-pointer accent-white"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-indigo-200 mb-1.5">
                    <span>Symptom Severity</span>
                    <span className="font-bold">{simulatedSob}/10</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={simulatedSob}
                    onChange={(e) => setSimulatedSob(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-indigo-500/30 rounded-full appearance-none cursor-pointer accent-white"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveTab('checkin')} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-3.5 rounded-2xl text-indigo-600">
                  <Activity size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Daily Check-in</span>
              </button>
              <button onClick={() => setActiveTab('food')} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3.5 rounded-2xl text-orange-600">
                  <Utensils size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Log Food</span>
              </button>
            </div>

            {/* Medication Tracker */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-100 rounded-lg">
                    <Heart size={16} className="text-indigo-600" />
                  </div>
                  Today's Medications
                </h3>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full">
                  {patient.medications.filter(m => m.takenToday).length}/{patient.medications.length} Taken
                </span>
              </div>
              <div className="space-y-3">
                {patient.medications.map(med => (
                  <div key={med.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${med.takenToday ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                        {med.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${med.takenToday ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{med.name}</p>
                        <p className="text-xs text-slate-500">{med.dosage} • {med.frequency}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleMedToggle(med.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${med.takenToday ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-300 hover:border-emerald-500 hover:text-emerald-500'}`}
                    >
                      <Check size={20} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checkin' && (
          <div className="p-6 space-y-6 max-w-lg mx-auto">
            {!checkinComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold text-slate-800">Daily Symptom Check</h3>
                  <p className="text-slate-500 text-sm">Help us track your heart health trends.</p>
                </div>

                {/* Weight */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center justify-center gap-2">
                    <Scale size={18} className="text-indigo-500" /> Current Weight (lbs)
                  </label>
                  <div className="flex items-center justify-center">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-32 text-4xl font-bold text-center p-2 border-b-2 border-slate-200 focus:border-indigo-500 focus:outline-none bg-transparent text-slate-800 placeholder-slate-300"
                      placeholder="150.0"
                    />
                  </div>
                </div>

                {/* Breath */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <label className="block text-sm font-semibold text-slate-700 mb-6 text-center">Shortness of Breath (1-10)</label>
                  <div className="px-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={sob}
                      onChange={(e) => setSob(parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-4 font-medium uppercase tracking-wide">
                    <span>None</span>
                    <span className="text-indigo-600 text-base">{sob}</span>
                    <span>Severe</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  <button
                    onClick={() => setSwelling(!swelling)}
                    className={`w-full p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${swelling ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                  >
                    <span className="font-medium text-slate-700">Any Swelling in Legs?</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${swelling ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300'}`}>
                      {swelling && <Check size={14} className="text-white" />}
                    </div>
                  </button>

                  <button
                    onClick={() => setChestPain(!chestPain)}
                    className={`w-full p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${chestPain ? 'border-red-500 bg-red-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                  >
                    <span className="font-medium text-slate-700">Any Chest Pain?</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${chestPain ? 'bg-red-500 border-red-500' : 'border-slate-300'}`}>
                      {chestPain && <Check size={14} className="text-white" />}
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleCheckinSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-95 transition-all duration-200"
                >
                  Submit Report
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 animate-in zoom-in">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                  <Check size={48} strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">All Checked In!</h3>
                <p className="text-slate-500">Your care team has received your update.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'food' && (
          <div className="p-5 space-y-6">
            {/* Daily Sodium Tracker */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-slate-800">Daily Sodium</h3>
                <span className={`text-sm font-bold ${dailySodium > sodiumLimit ? 'text-red-600' : 'text-slate-600'}`}>
                  {dailySodium} / {sodiumLimit} mg
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${dailySodium > sodiumLimit ? 'bg-red-500' : dailySodium > sodiumLimit * 0.8 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (dailySodium / sodiumLimit) * 100)}%` }}
                />
              </div>
              {dailySodium > sodiumLimit && (
                <p className="text-xs text-red-600 font-medium mt-2">Limit exceeded — choose low-sodium options for the rest of the day.</p>
              )}
            </div>

            {/* Food Input */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-3">Log a Meal</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={foodInput}
                  onChange={(e) => setFoodInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFoodSubmit()}
                  placeholder="e.g., Grilled chicken with rice"
                  aria-label="Describe your meal"
                  className="flex-1 bg-slate-100 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
                <button
                  onClick={handleFoodSubmit}
                  disabled={!foodInput.trim() || scanningFood}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 rounded-xl font-semibold text-sm disabled:opacity-40 flex items-center gap-2"
                >
                  {scanningFood ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                  {scanningFood ? 'Analyzing' : 'Estimate'}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">AI estimates sodium content per serving.</p>
            </div>

            {/* Today's Food Log */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">Today's Log</h3>
              </div>
              {patient.foodLogs.length === 0 ? (
                <p className="p-5 text-sm text-slate-400">No foods logged yet today.</p>
              ) : (
                <div className="divide-y divide-slate-50">
                  {patient.foodLogs.map(f => (
                    <div key={f.id} className="p-4 flex justify-between items-start gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-slate-800 truncate">{f.name}</p>
                        {f.confidence && <p className="text-xs text-slate-400 mt-0.5">{f.confidence}</p>}
                      </div>
                      <span className={`text-sm font-bold whitespace-nowrap ${f.sodiumMg > 600 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {f.sodiumMg} mg
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <RecentActivityLog />
          </div>
        )}

        {activeTab === 'learn' && (
          <EducationView condition={patient.condition} />
        )}

        {activeTab === 'chat' && (
          <div className="p-4 h-full flex flex-col">
            <AIChatInterface nurseName="Nurse Sarah" specialty="Cardiology" />
          </div>
        )}

      </div>

      {/* Bottom Nav */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-3 flex justify-between items-center absolute bottom-0 w-full z-20 pb-6">
        <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-indigo-600 border-indigo-500 bg-indigo-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}>
          <Heart size={22} className={activeTab === 'home' ? 'fill-current stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => setActiveTab('checkin')} className={`${activeTab === 'checkin' ? 'text-indigo-600 border-indigo-500 bg-indigo-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}>
          <Activity size={22} className={activeTab === 'checkin' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Check-in</span>
        </button>
        <button onClick={() => setActiveTab('food')} className={`${activeTab === 'food' ? 'text-indigo-600 border-indigo-500 bg-indigo-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}>
          <Utensils size={22} className={activeTab === 'food' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Log</span>
        </button>
        <button onClick={() => setActiveTab('learn')} className={`${activeTab === 'learn' ? 'text-indigo-600 border-indigo-500 bg-indigo-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}>
          <BookOpen size={22} className={activeTab === 'learn' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Learn</span>
        </button>
        <button onClick={() => setActiveTab('chat')} className={`${activeTab === 'chat' ? 'text-indigo-600 border-indigo-500 bg-indigo-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}>
          <MessageSquare size={22} className={activeTab === 'chat' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Care</span>
        </button>
      </div>
    </div>
  );
};
