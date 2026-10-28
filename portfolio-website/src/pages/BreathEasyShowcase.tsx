import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Activity,
    Wind,
    AlertTriangle,
    CheckCircle,
    CloudRain,
    Thermometer,
    Shield,
    Leaf,
    ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';

// --- Types ---
interface Step {
    id: string;
    type: 'process' | 'action' | 'error' | 'success' | 'warning';
    content: string;
    duration: number;
}

// --- Mock Data ---
const SCENARIO_INPUT = "Environmental API: PM2.5: 42µg (High). Pollen: Oak 800gr/m³ (Severe). Humidity: 30%.";

const STANDARD_STEPS: Step[] = [
    { id: 'c1', type: 'process', content: "Patient checks window: 'Sunny day'.", duration: 1000 },
    { id: 'c2', type: 'action', content: "Decision: Goes for a 5k run (Unaware of risks).", duration: 1500 },
    { id: 'c3', type: 'warning', content: "exposure: Inhales invisible Ozone + Birch Pollen.", duration: 1500 },
    { id: 'c4', type: 'error', content: "Mile 2: Airway constriction begins.", duration: 1000 },
    { id: 'c5', type: 'error', content: "Outcome: Severe Asthma Attack -> ER Visit.", duration: 1500 }
];

const BREATHEASY_STEPS: Step[] = [
    { id: 'l1', type: 'process', content: "Syncing OpenMeteo API (Local Grid).", duration: 800 },
    { id: 'l2', type: 'warning', content: "Trigger Alert: PM2.5 + Oak Pollen overlap.", duration: 800 },
    { id: 'l3', type: 'action', content: "Calculating Lagged Risk (Global Burden)...", duration: 1000 },
    { id: 'l4', type: 'success', content: "Prediction: Risk Level 9/10 for TODAY.", duration: 1200 },
    { id: 'l5', type: 'action', content: "Intervention: Sent 'Pre-Run Inhaler' alert.", duration: 800 },
    { id: 'l6', type: 'success', content: "Outcome: Patient Pre-medicates. No Attack.", duration: 1000 }
];

const BreathEasyShowcase = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [standardProgress, setStandardProgress] = useState<Step[]>([]);
    const [breathEasyProgress, setBreathEasyProgress] = useState<Step[]>([]);

    // Auto-Run Simulation in Loop
    React.useEffect(() => {
        let isMounted = true;
        let timeoutId: NodeJS.Timeout;

        const runLoop = () => {
            if (!isMounted) return;

            setIsPlaying(true);
            setStandardProgress([]);
            setBreathEasyProgress([]);

            // Standard Simulation
            let stdTime = 0;
            STANDARD_STEPS.forEach(step => {
                setTimeout(() => {
                    if (isMounted) setStandardProgress(prev => [...prev, step]);
                }, stdTime);
                stdTime += step.duration;
            });

            // BreathEasy Simulation
            let beTime = 0;
            BREATHEASY_STEPS.forEach(step => {
                setTimeout(() => {
                    if (isMounted) setBreathEasyProgress(prev => [...prev, step]);
                }, beTime);
                beTime += step.duration;
            });

            const totalDuration = Math.max(stdTime, beTime) + 3000; // 3s pause before restart

            timeoutId = setTimeout(() => {
                if (isMounted) {
                    setIsPlaying(false);
                    runLoop(); // Restart
                }
            }, totalDuration);
        };

        runLoop();

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, []);

    // ...

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* Header Spacing due to fixed Navbar */}
            <div className="pt-20"></div>

            {/* Hero */}
            <header className="py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6"
                    >
                        <Wind className="w-3 h-3" />
                        PREDICTIVE RESPIRATORY AI
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Don't Just Treat the Attack. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Predict It.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Asthma and COPD triggers like ozone and pollen are easy to miss. <span className="text-white">BreathEasy AI</span> is a <strong>case study + working UI</strong> for environmental risk awareness before outdoor exposure escalates.
                    </p>

                    <div className="flex justify-center">
                        <a
                            href="https://breatheasy-ai.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:scale-105 active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" />
                            Open working UI
                        </a>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        *Simulates a "Good Weather / Bad Air" day where visible cues fail.
                    </p>
                </div>
            </header>

            {/* Simulation */}
            <section id="demo-section" className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8 text-center backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">Incoming Environmental Stream</span>
                        <code className="text-lg text-cyan-300 font-mono">"{SCENARIO_INPUT}"</code>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Standard Weather App */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-slate-500/5 rounded-2xl blur-xl transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-white/5 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <CloudRain className="w-8 h-8 text-slate-400" />
                                        <div>
                                            <h3 className="font-bold text-white">Uninformed Patient</h3>
                                            <div className="text-xs text-slate-400">Reactive • "Looks Nice Outside"</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 font-mono text-sm overflow-y-auto pr-2 scrollbar-hide">
                                    <AnimatePresence>
                                        {standardProgress.map(step => (
                                            <motion.div key={step.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded border flex gap-3 items-center ${step.type === 'error' ? 'bg-red-900/20 border-red-800 text-red-300' :
                                                    step.type === 'warning' ? 'bg-yellow-900/20 border-yellow-800 text-yellow-300' :
                                                        'bg-slate-900 border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {step.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                                                {step.content}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* BreathEasy AI */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl blur-xl transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-cyan-500/20 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Wind className="w-8 h-8 text-cyan-400" />
                                        <div>
                                            <h3 className="font-bold text-white">BreathEasy AI</h3>
                                            <div className="text-xs text-slate-400">Micro-Physics • Pollen API</div>
                                        </div>
                                    </div>
                                    <div className="text-cyan-400 font-mono text-xs flex items-center gap-1">
                                        <Shield className="w-3 h-3" /> Protected
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 font-mono text-sm overflow-y-auto pr-2 scrollbar-hide">
                                    <AnimatePresence>
                                        {breathEasyProgress.map(step => (
                                            <motion.div key={step.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded border flex gap-3 items-center ${step.type === 'action' ? 'bg-indigo-900/20 border-indigo-800 text-indigo-300' :
                                                    step.type === 'success' ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300' :
                                                        step.type === 'warning' ? 'bg-yellow-900/20 border-yellow-800 text-yellow-300' :
                                                            'bg-slate-900 border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {step.type === 'action' ? <Leaf className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                                {step.content}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-20 bg-slate-900/20 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div>
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Hyper-Local Pollen API</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Integrates with OpenMeteo to track specific allergens (Oak, Ragweed, Grass) at a 1km resolution, rather than generic "High/Low" counts.
                        </p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Lagged Risk Model</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Inflammation builds up. BreathEasy calculates specific <code className="text-cyan-300">Cummulative_Exposure_Score</code> considering the last 48 hours of air quality, not just the current moment.
                        </p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Behavioral Nudges</h3>
                        <p className="text-slate-400 leading-relaxed">
                            It doesn't just say "Air Bad". It gives actionable advice like "Pre-medicate 15m before running" or "Switch to indoor cardio", changing outcome vectors.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default BreathEasyShowcase;
