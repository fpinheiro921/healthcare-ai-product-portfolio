import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
    ArrowLeft,
    Heart,
    Activity,
    Scale,
    Thermometer,
    AlertTriangle,
    CheckCircle,
    Phone,
    User,
    TrendingUp,
    Shield
} from 'lucide-react';
import { askAI, AIResult } from '../lib/aiClient';
import { PROMPTS } from '../lib/prompts';

// --- Mock Patient Data ---
const PATIENT = {
    name: "Maria Silva",
    age: 72,
    condition: "CHF (NYHA III)",
    medications: ["Furosemide 40mg", "Lisinopril 10mg", "Carvedilol 12.5mg"]
};

interface VitalReading {
    timestamp: string;
    weight: number;
    bp: string;
    hr: number;
    spo2: number;
}

function HeartGuideLive() {
    const [vitals, setVitals] = useState<VitalReading[]>([]);
    const [currentWeight, setCurrentWeight] = useState(82.0);
    const [alertLevel, setAlertLevel] = useState<'normal' | 'warning' | 'critical'>('normal');
    const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [isFallback, setIsFallback] = useState(false);
    const [isMonitoring, setIsMonitoring] = useState(true);
    const aiRequestInFlight = useRef(false);
    const abortRef = useRef<AbortController | null>(null);
    const lastAlertLevelRef = useRef<'normal' | 'warning' | 'critical'>('normal');
    const stableAlertCountRef = useRef(0);

    // Simulate incoming vitals — fast tick for UI, gated LLM calls
    useEffect(() => {
        if (!isMonitoring) return;

        const interval = setInterval(() => {
            const newWeight = currentWeight + (Math.random() * 0.4 - 0.1);
            const newVital: VitalReading = {
                timestamp: new Date().toLocaleTimeString(),
                weight: parseFloat(newWeight.toFixed(1)),
                bp: `${130 + Math.floor(Math.random() * 20)}/${80 + Math.floor(Math.random() * 15)}`,
                hr: 72 + Math.floor(Math.random() * 20),
                spo2: 94 + Math.floor(Math.random() * 4)
            };

            setVitals(prev => [newVital, ...prev].slice(0, 10));
            setCurrentWeight(newWeight);

            // Local threshold-based alert level
            const newAlertLevel = newWeight > 83.5 ? 'critical' : newWeight > 82.5 ? 'warning' : 'normal';
            setAlertLevel(newAlertLevel);

            // Debounce: only call LLM when alert level changes or after 3 stable ticks
            if (newAlertLevel !== lastAlertLevelRef.current) {
                stableAlertCountRef.current = 0;
                lastAlertLevelRef.current = newAlertLevel;
            } else {
                stableAlertCountRef.current++;
            }

            const shouldCallLLM = newAlertLevel !== 'normal' || stableAlertCountRef.current >= 3;

            if (shouldCallLLM && !aiRequestInFlight.current) {
                aiRequestInFlight.current = true;
                setIsThinking(true);
                const weightDelta = newWeight - 82.0;
                const userPrompt = PROMPTS.heartguide.userTemplate({
                    weight: newVital.weight,
                    bp: newVital.bp,
                    hr: newVital.hr,
                    spo2: newVital.spo2,
                    alertLevel: newAlertLevel,
                    weightDelta,
                });
                const controller = new AbortController();
                abortRef.current = controller;
                askAI(PROMPTS.heartguide.system, userPrompt, 200, controller.signal)
                    .then((result: AIResult) => {
                        setAiRecommendation(result.text);
                        setIsFallback(result.isFallback);
                    })
                    .finally(() => {
                        setIsThinking(false);
                        aiRequestInFlight.current = false;
                        abortRef.current = null;
                    });
            }
        }, 3000);

        return () => {
            clearInterval(interval);
            abortRef.current?.abort();
        };
    }, [isMonitoring, currentWeight]);

    // Cleanup on unmount
    useEffect(() => {
        return () => abortRef.current?.abort();
    }, []);

    const alertColors = {
        normal: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
        warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
        critical: 'bg-red-500/20 border-red-500/50 text-red-400'
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-rose-500/30 font-sans">
            <Navbar />

            <main className="pt-24 min-h-screen flex flex-col">
                <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div className="flex items-center gap-4">
                            <Link
                                to="/heartguide-showcase"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold">HeartGuide <span className="text-rose-500">Live</span></h1>
                                <p className="text-sm text-slate-400">Remote Cardiac Monitoring Console</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${isMonitoring ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}></span>
                                {isMonitoring ? 'MONITORING' : 'PAUSED'}
                            </span>
                            <span className="w-px h-3 bg-white/10"></span>
                            <span>V2.1.0</span>
                        </div>
                    </motion.div>

                    {/* Main Dashboard Grid */}
                    <div className="flex-1 grid lg:grid-cols-3 gap-6">

                        {/* Patient Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
                                    <User className="w-8 h-8 text-rose-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{PATIENT.name}</h2>
                                    <p className="text-sm text-slate-400">{PATIENT.age}y • {PATIENT.condition}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Current Medications</h3>
                                {PATIENT.medications.map((med, i) => (
                                    <div key={i} className="text-sm text-slate-300 bg-white/5 px-3 py-2 rounded-lg">{med}</div>
                                ))}
                            </div>

                            <button
                                onClick={() => setIsMonitoring(!isMonitoring)}
                                className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${isMonitoring ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                            >
                                {isMonitoring ? 'Pause Monitoring' : 'Resume Monitoring'}
                            </button>
                        </motion.div>

                        {/* Vitals Monitor */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-rose-400" />
                                    Live Vitals Stream
                                </h2>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${alertColors[alertLevel]}`}>
                                    {alertLevel.toUpperCase()}
                                </div>
                            </div>

                            {/* Vital Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-black/30 rounded-xl p-4 text-center">
                                    <Scale className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                                    <div className="text-2xl font-bold">{currentWeight.toFixed(1)}<span className="text-sm text-slate-400">kg</span></div>
                                    <div className="text-xs text-slate-500">Weight</div>
                                </div>
                                <div className="bg-black/30 rounded-xl p-4 text-center">
                                    <Heart className="w-6 h-6 mx-auto mb-2 text-rose-400" />
                                    <div className="text-2xl font-bold">{vitals[0]?.hr || '--'}<span className="text-sm text-slate-400">bpm</span></div>
                                    <div className="text-xs text-slate-500">Heart Rate</div>
                                </div>
                                <div className="bg-black/30 rounded-xl p-4 text-center">
                                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                                    <div className="text-2xl font-bold">{vitals[0]?.bp || '--/--'}</div>
                                    <div className="text-xs text-slate-500">Blood Pressure</div>
                                </div>
                                <div className="bg-black/30 rounded-xl p-4 text-center">
                                    <Shield className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                                    <div className="text-2xl font-bold">{vitals[0]?.spo2 || '--'}<span className="text-sm text-slate-400">%</span></div>
                                    <div className="text-xs text-slate-500">SpO2</div>
                                </div>
                            </div>

                            {/* Reading Log */}
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                <AnimatePresence>
                                    {vitals.map((v, i) => (
                                        <motion.div
                                            key={v.timestamp + i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center justify-between text-sm bg-black/20 px-4 py-2 rounded-lg font-mono"
                                        >
                                            <span className="text-slate-500">{v.timestamp}</span>
                                            <span>Wt: {v.weight}kg</span>
                                            <span>BP: {v.bp}</span>
                                            <span>HR: {v.hr}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* AI Recommendation Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-3 bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <Heart className="w-5 h-5 text-rose-500" />
                                HeartGuide AI Analysis
                            </h2>

                            {isThinking && alertLevel !== 'critical' ? (
                                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                                    <p className="font-mono text-sm text-slate-400 flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></span>
                                        HeartGuide AI is analyzing vitals...
                                    </p>
                                </div>
                            ) : isThinking && alertLevel === 'critical' ? (
                                <div>
                                    <div className="p-4 rounded-xl border border-red-500/50 bg-red-500/20 text-red-400 mb-2">
                                        <p className="font-mono text-sm font-bold flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            CRITICAL: Weight threshold exceeded. AI analysis in progress...
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-xl border border-white/10 bg-white/5">
                                        <p className="font-mono text-xs text-slate-400 flex items-center gap-2">
                                            <span className="inline-block w-3 h-3 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></span>
                                            Generating detailed recommendation...
                                        </p>
                                    </div>
                                </div>
                            ) : aiRecommendation ? (
                                <div>
                                    <motion.div
                                        key={aiRecommendation}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`p-4 rounded-xl border ${alertColors[alertLevel]}`}
                                    >
                                        <p className="font-mono text-sm leading-relaxed">{aiRecommendation}</p>
                                    </motion.div>
                                    {isFallback && (
                                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                            <Shield className="w-3 h-3" /> Showing fallback text — AI service temporarily unavailable
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                                    <p className="font-mono text-sm flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        All vitals within normal parameters. Patient stable.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-600">
                            Simulated demo for portfolio purposes — not a medical device. AI recommendations are generated by a free-tier LLM and should not be used for clinical decisions.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HeartGuideLive;
