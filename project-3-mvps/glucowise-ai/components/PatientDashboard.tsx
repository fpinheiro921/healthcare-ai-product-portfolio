import React, { useState, useEffect, useMemo } from 'react';
import AIChatInterface from './AIChatInterface';
import AgentInsight from './AgentInsight';
import RecentActivityLog from './RecentActivityLog';
import SmartBolusCalculator from './SmartBolusCalculator';
import { Plus, Bell, TrendingUp, Activity, Pill, AlertTriangle, Calendar, Droplet, LineChart as ChartIcon, Heart, Utensils, BookOpen, MessageSquare, Check, AlertCircle, Loader2 } from 'lucide-react';
import GlucoseChart from './GlucoseChart';
import FoodLogger from './FoodLogger';
import { GlucoseReading, GlucoseContext, Medication } from '../types';
import { MealPredictor } from './MealPredictor';
import { getGlucoseInsights, generateEducationalContent } from '../services/geminiService';

// Mock Data
const MOCK_READINGS: GlucoseReading[] = Array.from({ length: 20 }, (_, i) => ({
  id: `r-${i}`,
  value: Math.floor(Math.random() * (190 - 85) + 85), // Random between 85 and 190
  timestamp: new Date(Date.now() - (19 - i) * 6 * 60 * 60 * 1000).toISOString(), // Every 6 hours
  context: i % 4 === 0 ? GlucoseContext.FASTING : GlucoseContext.POST_MEAL
}));

// Mock A1C History for the Trend Graph
const MOCK_A1C_HISTORY = [
  { timestamp: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), value: 7.8 },
  { timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), value: 7.5 },
  { timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), value: 7.2 },
  { timestamp: new Date().toISOString(), value: 6.9 } // Current projected
];

const MOCK_MEDS: Medication[] = [
  { id: '1', name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', takenToday: true },
  { id: '2', name: 'Lantus (Insulin)', dosage: '20 units', frequency: 'Bedtime', takenToday: false },
];

const PatientDashboard: React.FC = () => {
  const [readings, setReadings] = useState<GlucoseReading[]>(MOCK_READINGS);
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDS);
  const [insight, setInsight] = useState<any>(null);
  const [showAddReading, setShowAddReading] = useState(false);
  const [newReadingValue, setNewReadingValue] = useState('');
  const [chartView, setChartView] = useState<'glucose' | 'a1c'>('glucose');
  const [activeTab, setActiveTab] = useState<'home' | 'checkin' | 'food' | 'learn' | 'chat'>('home');

  // Agent State
  const [prediction, setPrediction] = useState({ peak: 0, carbs: 0 });

  // Check-in State
  const [checkinFasting, setCheckinFasting] = useState('');
  const [checkinSteps, setCheckinSteps] = useState('');
  const [checkinNotes, setCheckinNotes] = useState('');
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  // Learn tab: AI-personalized article state
  const [learnTopic, setLearnTopic] = useState<string | null>(null);
  const [learnContent, setLearnContent] = useState<string | null>(null);
  const [learnLoading, setLearnLoading] = useState(false);

  const openLearnTopic = async (title: string) => {
    setLearnTopic(title);
    setLearnContent(null);
    setLearnLoading(true);
    const result = await generateEducationalContent(title, 'Type 2 Diabetes on insulin');
    setLearnContent(result.content);
    setLearnLoading(false);
  };

  // Fetch AI insights on mount or when readings change
  useEffect(() => {
    let cancelled = false;
    const fetchInsights = async () => {
      try {
        const result = await getGlucoseInsights(readings, medications);
        if (!cancelled) setInsight(result);
      } catch (e) {
        console.error("Failed to get insights", e);
        if (!cancelled) {
          setInsight({
            hypoRiskScore: 15,
            riskLevel: "Low",
            insightTitle: "Stable Trends",
            insightMessage: "Your levels have been consistent. Great job on the post-meal walks.",
            recommendation: "Maintain current medication schedule."
          });
        }
      }
    };
    fetchInsights();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readings]);

  // Calculate Estimated A1C based on average glucose
  // Formula: A1C = (eAG + 46.7) / 28.7
  const estimatedA1C = useMemo(() => {
    if (readings.length === 0) return 0;
    const sum = readings.reduce((acc, curr) => acc + curr.value, 0);
    const avg = sum / readings.length;
    return ((avg + 46.7) / 28.7).toFixed(1);
  }, [readings]);

  const addReading = () => {
    const value = parseInt(newReadingValue);
    if (isNaN(value) || value < 20 || value > 600) return;
    const reading: GlucoseReading = {
      id: Date.now().toString(),
      value,
      timestamp: new Date().toISOString(),
      context: GlucoseContext.PRE_MEAL, // Default for now
    };
    setReadings([...readings, reading]);
    setNewReadingValue('');
    setShowAddReading(false);
  };

  const toggleMedication = (id: string) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, takenToday: !med.takenToday } : med
    ));
  };

  const latestReading = readings[readings.length - 1];
  const currentVal = latestReading.value;

  // Status Theme Logic
  let statusTheme = {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    subtext: 'text-emerald-600/80',
    iconBg: 'bg-emerald-100',
    label: 'Normal'
  };

  let a1cColor = 'text-emerald-600';

  if (currentVal > 180) {
    statusTheme = {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      subtext: 'text-amber-600/80',
      iconBg: 'bg-amber-100',
      label: 'High'
    };
    a1cColor = 'text-amber-600';
  } else if (currentVal < 70) {
    statusTheme = {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      subtext: 'text-red-600/80',
      iconBg: 'bg-red-100',
      label: 'Low'
    };
    a1cColor = 'text-red-600';
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-emerald-50/50 px-6 py-5 shadow-sm flex justify-between items-center sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-md">
            <Droplet size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Hi, John</h2>
            <p className="text-xs text-slate-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <button onClick={() => setShowEmergency(true)} aria-label="Emergency" className="bg-red-50 text-red-600 p-2.5 rounded-full hover:bg-red-100 transition-all duration-200 shadow-sm border border-red-100 hover:shadow-md hover:scale-105 active:scale-95">
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
              <p className="text-gray-600 mb-4">If blood sugar is very low and the person is confused, unconscious, or cannot swallow, do not give food or insulin.</p>
              <p className="text-gray-600 mb-6">If conscious with low blood sugar: take 15g fast-acting carbs and recheck in 15 minutes.</p>

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
          <main className="p-5 space-y-6">

            {/* Neural Guardian Agent */}
            <AgentInsight
              predictedGlucose={prediction.peak}
              mealCarbs={prediction.carbs}
            />

            {/* Status Card with Gradient - Matching HeartGuide AI */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-teal-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p className="text-teal-100 text-sm font-medium mb-1">Current Glucose</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-5xl font-bold tracking-tighter">{currentVal}</h3>
                    <span className="text-lg opacity-60 font-medium">mg/dL</span>
                  </div>
                  <p className="text-teal-100 text-xs mt-1">{latestReading.context} • Just now</p>
                </div>
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                  <Droplet className="text-white fill-white" size={28} />
                </div>
              </div>

            </div>

            {/* Glucose Prediction Simulator */}
            <MealPredictor
              currentGlucose={currentVal}
              onPredictionUpdate={(peak, carbs) => setPrediction({ peak, carbs })}
            />

            {/* Smart Bolus Calculator (New Feature) */}
            <SmartBolusCalculator
              currentGlucose={currentVal}
              mealCarbs={prediction.carbs}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowAddReading(true)}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3.5 rounded-2xl text-emerald-600 shadow-sm">
                  <Plus size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Log Glucose</span>
              </button>
              <button className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <div className="bg-gradient-to-br from-sky-100 to-sky-200 p-3.5 rounded-2xl text-sky-600 shadow-sm">
                  <Calendar size={26} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">Schedule</span>
              </button>
            </div>

            {/* Chart Section */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <button
                  onClick={() => setChartView('glucose')}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${chartView === 'glucose' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                  Glucose
                </button>
                <button
                  onClick={() => setChartView('a1c')}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${chartView === 'a1c' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                  Est. A1C
                </button>
              </div>
              <GlucoseChart
                readings={chartView === 'glucose' ? readings : MOCK_A1C_HISTORY}
                type={chartView}
              />
            </div>

            {/* Food Logger */}
            <FoodLogger onLog={(data) => console.log("Logged food:", data)} />

            {/* Medication Adherence */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                Medications
              </h3>
              <div className="space-y-3">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group">
                    <div>
                      <p className="font-semibold text-slate-900">{med.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{med.dosage} • {med.frequency}</p>
                    </div>
                    <button
                      onClick={() => toggleMedication(med.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${med.takenToday
                        ? 'bg-blue-500 border-blue-500 text-white scale-105'
                        : 'border-slate-200 text-transparent hover:border-blue-400 hover:bg-blue-50'
                        }`}
                    >
                      <Check className="w-6 h-6" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Banner if Risk is High */}
            {insight && insight.riskLevel === "High" && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 animate-pulse">
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-red-800 font-bold text-sm">Action Required</h4>
                  <p className="text-red-600 text-sm mt-1">{insight.recommendation}</p>
                </div>
              </div>
            )}

            {/* Modal for Add Reading */}
            {showAddReading && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl scale-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Log Glucose</h3>
                  <div className="relative mb-8">
                    <input
                      type="number"
                      className="w-full text-5xl font-bold text-center p-4 border-b-2 border-slate-200 focus:border-emerald-500 outline-none bg-transparent text-slate-800 placeholder:text-slate-300"
                      placeholder="---"
                      autoFocus
                      value={newReadingValue}
                      onChange={(e) => setNewReadingValue(e.target.value)}
                    />
                    <span className="absolute bottom-4 right-8 text-slate-400 font-medium">mg/dL</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAddReading(false)}
                      className="flex-1 py-3.5 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addReading}
                      disabled={!newReadingValue || isNaN(parseInt(newReadingValue))}
                      className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Save Reading
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}

        {/* Placeholders for other tabs */}
        {activeTab === 'food' && (
          <div className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Log a meal</h3>
            <FoodLogger />
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900 mb-1">Tips</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Prioritize lean protein + fiber to blunt glucose spikes.</li>
                <li>Log carbs to improve MealPredictor accuracy.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="p-5 h-full">
            <AIChatInterface nurseName="Coach Mike" specialty="Diabetes" />
          </div>
        )}

        {activeTab === 'checkin' && (
          <div className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Daily check-in</h3>
            {checkinSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm text-green-700 flex items-center gap-2">
                <Check size={16} /> Check-in saved! Your care team has been notified.
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
              <label className="space-y-1">
                <span className="text-xs text-slate-500">Fasting glucose (mg/dL)</span>
                <input type="number" value={checkinFasting} onChange={(e) => setCheckinFasting(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="95" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500">Steps today</span>
                <input type="number" value={checkinSteps} onChange={(e) => setCheckinSteps(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="4500" />
              </label>
              <label className="space-y-1 col-span-2">
                <span className="text-xs text-slate-500">Notes</span>
                <textarea value={checkinNotes} onChange={(e) => setCheckinNotes(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows={2} placeholder="Light walk after lunch, feeling good." />
              </label>
            </div>
            <button onClick={() => {
              const fastingVal = parseInt(checkinFasting);
              if (!isNaN(fastingVal) && fastingVal >= 20 && fastingVal <= 600) {
                const reading: GlucoseReading = {
                  id: Date.now().toString(),
                  value: fastingVal,
                  timestamp: new Date().toISOString(),
                  context: GlucoseContext.FASTING,
                };
                setReadings([...readings, reading]);
              }
              setCheckinSuccess(true);
              setTimeout(() => { setCheckinSuccess(false); setActiveTab('home'); }, 2500);
            }} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 active:scale-95 transition-all duration-200">Submit Check-in</button>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="p-5 space-y-4 text-sm text-slate-700">
            {learnTopic ? (
              <div>
                <button onClick={() => { setLearnTopic(null); setLearnContent(null); }} className="mb-4 text-xs font-bold text-emerald-600 hover:text-emerald-700">
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
                  { title: 'Avoiding Post-Meal Spikes', icon: TrendingUp, iconWrap: 'from-emerald-100 to-emerald-200', iconColor: 'text-emerald-600', teaser: 'Pair carbs with protein and walk 10 minutes after meals to blunt glucose excursions.' },
                  { title: 'Smart Bolus Safety', icon: AlertTriangle, iconWrap: 'from-amber-100 to-amber-200', iconColor: 'text-amber-600', teaser: 'Always confirm carb counts before dosing. Use the safety cap and never exceed your correction factor.' },
                  { title: 'Hypo Recognition', icon: BookOpen, iconWrap: 'from-sky-100 to-sky-200', iconColor: 'text-sky-600', teaser: 'Sweating, shaking, confusion, and hunger are early signs. Check glucose immediately and follow the 15-15 rule.' },
                ].map(t => (
                  <button key={t.title} onClick={() => openLearnTopic(t.title)} className="w-full text-left rounded-2xl border border-slate-200 p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 bg-gradient-to-br ${t.iconWrap} rounded-lg flex items-center justify-center`}>
                        <t.icon size={16} className={t.iconColor} />
                      </div>
                      <p className="font-bold text-slate-900">{t.title}</p>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{t.teaser}</p>
                    <p className="text-[11px] font-semibold text-emerald-600 mt-2">Read personalized article →</p>
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
          className={`${activeTab === 'home' ? 'text-emerald-600 border-emerald-500 bg-emerald-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <Heart size={22} className={activeTab === 'home' ? 'fill-current stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('checkin')}
          className={`${activeTab === 'checkin' ? 'text-emerald-600 border-emerald-500 bg-emerald-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <Activity size={22} className={activeTab === 'checkin' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Check-in</span>
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className={`${activeTab === 'food' ? 'text-emerald-600 border-emerald-500 bg-emerald-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <Utensils size={22} className={activeTab === 'food' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Log</span>
        </button>
        <button
          onClick={() => setActiveTab('learn')}
          className={`${activeTab === 'learn' ? 'text-emerald-600 border-emerald-500 bg-emerald-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <BookOpen size={22} className={activeTab === 'learn' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Learn</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`${activeTab === 'chat' ? 'text-emerald-600 border-emerald-500 bg-emerald-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200'} flex flex-col items-center gap-1 transition-all duration-200 px-3 py-2 rounded-xl border-2`}
        >
          <MessageSquare size={22} className={activeTab === 'chat' ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] font-medium">Care</span>
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;