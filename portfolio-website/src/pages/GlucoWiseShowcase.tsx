import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Activity,
    Droplet,
    Utensils,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Shield,
    Zap,
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
const SCENARIO_INPUT = "Meal Entry: 'Pepperoni Pizza (3 Slices)'. Carbs: 85g. Protein: 25g. Fat: 30g.";

const STANDARD_STEPS: Step[] = [
    { id: 'c1', type: 'process', content: "Meal: Pizza. Patient guesses carb count.", duration: 1000 },
    { id: 'c2', type: 'action', content: "Action: Injects standard unit dose (Guesswork).", duration: 1000 },
    { id: 'c3', type: 'warning', content: "2 Hours Later: Glucose looks normal (False calm).", duration: 1500 },
    { id: 'c4', type: 'error', content: "4 Hours Later: Massive Fat/Protein Spike.", duration: 1500 },
    { id: 'c5', type: 'error', content: "Outcome: Hyperglycemic Emergency (Ketosis Risk).", duration: 1500 }
];

const GLUCOWISE_STEPS: Step[] = [
    { id: 'l1', type: 'process', content: "Analyzing Composition: High Fat + Carb Load.", duration: 800 },
    { id: 'l2', type: 'warning', content: "Food Physics: 'Pizza Effect' detected (Delayed Absorption).", duration: 1000 },
    { id: 'l3', type: 'action', content: "Calculating Split-Wave Bolus...", duration: 1000 },
    { id: 'l4', type: 'success', content: "Rec: 5.0 Units Now (Front load).", duration: 1000 },
    { id: 'l5', type: 'success', content: "Rec: 4.5 Units over 3 hours (Square wave).", duration: 1200 },
    { id: 'l6', type: 'success', content: "Outcome: Smooth post-prandial curve.", duration: 1000 }
];

const GlucoWiseShowcase = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [standardProgress, setStandardProgress] = useState<Step[]>([]);
    const [glucoWiseProgress, setGlucoWiseProgress] = useState<Step[]>([]);

    // Auto-Run Simulation in Loop
    React.useEffect(() => {
        let isMounted = true;
        let timeoutId: ReturnType<typeof setTimeout>;

        const runLoop = () => {
            if (!isMounted) return;

            setIsPlaying(true);
            setStandardProgress([]);
            setGlucoWiseProgress([]);

            // Standard Simulation
            let stdTime = 0;
            STANDARD_STEPS.forEach(step => {
                setTimeout(() => {
                    if (isMounted) setStandardProgress(prev => [...prev, step]);
                }, stdTime);
                stdTime += step.duration;
            });

            // GlucoWise Simulation
            let gwTime = 0;
            GLUCOWISE_STEPS.forEach(step => {
                setTimeout(() => {
                    if (isMounted) setGlucoWiseProgress(prev => [...prev, step]);
                }, gwTime);
                gwTime += step.duration;
            });

            const totalDuration = Math.max(stdTime, gwTime) + 3000; // 3s pause before restart

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
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-orange-500/30">
            <Navbar />

            {/* Header Spacing due to fixed Navbar */}
            <div className="pt-20"></div>

            {/* Hero */}
            <header className="py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="mb-6 text-left">
                        <a
                            href="https://theaihustlelab.com"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                        >
                            <span className="text-lg">←</span>
                            Back to Portfolio Home
                        </a>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold mb-6"
                    >
                        <Droplet className="w-3 h-3" />
                        METABOLIC INTELLIGENCE AGENT
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Beyond Simple Math. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                            Food Physics.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Complex meals like Pizza are notorious for causing delayed spikes that manual math can't predict. <span className="text-white">GlucoWise AI</span> sees the outcome hours in advance, preventing the emergency.
                    </p>

                    <div className="flex justify-center">
                        <a
                            href="https://glucowise-ai.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white hover:scale-105 active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" />
                            Launch Full App
                        </a>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        *Simulates the "Pizza Effect" where fat delays glucose spikes by hours.
                    </p>
                </div>
            </header>

            {/* Simulation */}
            <section id="demo-section" className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8 text-center backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">Incoming Meal Log</span>
                        <code className="text-lg text-orange-300 font-mono">"{SCENARIO_INPUT}"</code>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Standard Calculator */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-slate-500/5 rounded-2xl blur-xl transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-white/5 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-8 h-8 text-slate-400" />
                                        <div>
                                            <h3 className="font-bold text-white">Manual Guesswork</h3>
                                            <div className="text-xs text-slate-400">Mental Math • High Error</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 font-mono text-sm overflow-y-auto pr-2 scrollbar-hide">
                                    <AnimatePresence>
                                        {standardProgress.map(step => (
                                            <motion.div key={step.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded border flex gap-3 items-center ${step.type === 'error' ? 'bg-red-900/20 border-red-800 text-red-300' :
                                                    step.type === 'success' ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300' :
                                                        'bg-slate-900 border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {step.type === 'error' ? <TrendingUp className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                                                {step.content}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* GlucoWise AI */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-orange-500/5 rounded-2xl blur-xl transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-orange-500/20 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Droplet className="w-8 h-8 text-orange-500" />
                                        <div>
                                            <h3 className="font-bold text-white">GlucoWise AI</h3>
                                            <div className="text-xs text-slate-400">FDA SaMD Logic • Dual-Wave</div>
                                        </div>
                                    </div>
                                    <div className="text-orange-400 font-mono text-xs flex items-center gap-1">
                                        <Shield className="w-3 h-3" /> Validated
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 font-mono text-sm overflow-y-auto pr-2 scrollbar-hide">
                                    <AnimatePresence>
                                        {glucoWiseProgress.map(step => (
                                            <motion.div key={step.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded border flex gap-3 items-center ${step.type === 'action' ? 'bg-indigo-900/20 border-indigo-800 text-indigo-300' :
                                                    step.type === 'success' ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300' :
                                                        step.type === 'warning' ? 'bg-orange-900/20 border-orange-800 text-orange-300' :
                                                            'bg-slate-900 border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {step.type === 'action' ? <Utensils className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
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
                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
                            <Utensils className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Composition Analysis</h3>
                        <p className="text-slate-400 leading-relaxed">
                            It doesn't just count carbs. It analyzes the Carb/Protein/Fat ratio to predict the "Glycemic Impact Curve" shape, identifying meals that cause late spikes.
                        </p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Dual-Wave Recommendations</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Instead of a single injection, GlucoWise calculates a "Combo Bolus": X% immediately for carbs, and Y% extended over Z hours for the protein/fat tail.
                        </p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">SaMD Safety Guardrails</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Built with "Active Inverse Insulin On Board (IOB)" tracking to prevent stacking insulin, adhering to rigorous SaMD (Software as Medical Device) safety standards.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default GlucoWiseShowcase;
