import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Activity,
    Heart,
    AlertCircle,
    CheckCircle,
    ArrowRight,
    TrendingUp,
    Scale,
    Stethoscope,
    Shield
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
const SCENARIO_INPUT = "Device Data: Weight 84.2kg (+1.8kg in 24h). BP 145/92. Resting HR 94.";

const STANDARD_STEPS: Step[] = [
    { id: 'c1', type: 'process', content: "Morning: Patient feels slightly short of breath.", duration: 1500 },
    { id: 'c2', type: 'action', content: "Action: Ignores symptom (attributes to 'tiredness').", duration: 1000 },
    { id: 'c3', type: 'warning', content: "Night 2: Orthopnea (Sleeping in chair).", duration: 1500 },
    { id: 'c4', type: 'error', content: "Day 3: Wakes up gasping for air (Flash Edema).", duration: 1500 },
    { id: 'c5', type: 'error', content: "Outcome: 911 Call -> ER Admission -> ICU.", duration: 1500 }
];

const HEARTGUIDE_STEPS: Step[] = [
    { id: 'l1', type: 'process', content: "Ingesting Vitals: Wt 84.2kg, BP 145/92.", duration: 800 },
    { id: 'l2', type: 'warning', content: "Decompensation Signal: Mass + Pressure Spike.", duration: 800 },
    { id: 'l3', type: 'action', content: "Agent Action: Triggering Symptom Check...", duration: 1000 },
    { id: 'l4', type: 'process', content: "Patient Response: 'Sleeping in chair' (Orthopnea).", duration: 1200 },
    { id: 'l5', type: 'action', content: "Triangulation: Weight + BP + Orthopnea = High Risk.", duration: 800 },
    { id: 'l6', type: 'success', content: "Outcome: Auto-Escalation to MD with Diuretic Rec.", duration: 1000 }
];

const HeartGuideShowcase = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [standardProgress, setStandardProgress] = useState<Step[]>([]);
    const [heartGuideProgress, setHeartGuideProgress] = useState<Step[]>([]);

    // Auto-Run Simulation in Loop
    React.useEffect(() => {
        let isMounted = true;
        let timeoutId: ReturnType<typeof setTimeout>;

        const runLoop = () => {
            if (!isMounted) return;

            setIsPlaying(true);
            setStandardProgress([]);
            setHeartGuideProgress([]);

            // Standard Simulation
            let stdTime = 0;
            STANDARD_STEPS.forEach(step => {
                setTimeout(() => {
                    if (isMounted) setStandardProgress(prev => [...prev, step]);
                }, stdTime);
                stdTime += step.duration;
            });

            // HeartGuide Simulation
            let hgTime = 0;
            HEARTGUIDE_STEPS.forEach(step => {
                setTimeout(() => {
                    if (isMounted) setHeartGuideProgress(prev => [...prev, step]);
                }, hgTime);
                hgTime += step.duration;
            });

            const totalDuration = Math.max(stdTime, hgTime) + 3000; // 3s pause before restart

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

    // ... (keep runSimulation for manual if needed, but we are removing button so maybe not needed? Actually the Plan said remove button. I will inline logic into useEffect or keep function but call it from useEffect. Better to inline loop logic to handle recursion cleanly)

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-rose-500/30">
            <Navbar />

            {/* Header Spacing due to fixed Navbar */}
            <div className="pt-20"></div>

            {/* Hero */}
            <header className="py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6 text-left">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                        >
                            <span className="text-lg">←</span>
                            Back to Portfolio Home
                        </Link>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-6"
                    >
                        <Heart className="w-3 h-3" />
                        CLINICAL SAFETY AGENT
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Before the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
                            Heart Fails
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Without monitoring, subtle weight gains are easy to miss until symptoms escalate. <br />
                        <span className="text-white">HeartGuide AI</span> is a <strong>case study + working UI</strong> for spotting decompensation-risk patterns earlier for clinician review.
                    </p>

                    <div className="flex justify-center">
                        <a
                            href="https://heartguide-ai.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all border-2 border-rose-500 text-rose-400 hover:bg-rose-500 hover:text-white hover:scale-105 active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" />
                            Open working UI
                        </a>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        *Simulates a "Silent Decompensation" event where weight gain alone is ignored.
                    </p>
                </div>
            </header>

            {/* Simulation */}
            <section id="demo-section" className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8 text-center backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">Incoming Telemetry</span>
                        <code className="text-lg text-rose-300 font-mono">"{SCENARIO_INPUT}"</code>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Standard RPM */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-slate-500/5 rounded-2xl blur-xl transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-white/5 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Scale className="w-8 h-8 text-slate-400" />
                                        <div>
                                            <h3 className="font-bold text-white">Unmonitored Patient</h3>
                                            <div className="text-xs text-slate-400">Reactive Care • "Crash & Burn"</div>
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
                                                {step.type === 'warning' ? <AlertCircle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                                                {step.content}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* HeartGuide AI */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-rose-500/5 rounded-2xl blur-xl transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-rose-500/20 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Heart className="w-8 h-8 text-rose-500" />
                                        <div>
                                            <h3 className="font-bold text-white">HeartGuide AI</h3>
                                            <div className="text-xs text-slate-400">Multi-Factor • Clinical Logic</div>
                                        </div>
                                    </div>
                                    <div className="text-rose-400 font-mono text-xs flex items-center gap-1">
                                        <Shield className="w-3 h-3" /> Active
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 font-mono text-sm overflow-y-auto pr-2 scrollbar-hide">
                                    <AnimatePresence>
                                        {heartGuideProgress.map(step => (
                                            <motion.div key={step.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded border flex gap-3 items-center ${step.type === 'action' ? 'bg-indigo-900/20 border-indigo-800 text-indigo-300' :
                                                    step.type === 'success' ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300' :
                                                        step.type === 'warning' ? 'bg-rose-900/20 border-rose-800 text-rose-300' :
                                                            'bg-slate-900 border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {step.type === 'action' ? <TrendingUp className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
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
                        <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 mb-6">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Triangulation Logic</h3>
                        <p className="text-slate-400 leading-relaxed">
                            A single variable (weight gain) yields high false positives. HeartGuide correlates Weight + BP + Symptom Reports to calculate a specific <code className="text-rose-300">Decompensation_Score</code>.
                        </p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 mb-6">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Active Symptom Check</h3>
                        <p className="text-slate-400 leading-relaxed">
                            When passive signals spike, the Agent proactively contacts the patient (via app/SMS) to screen for Orthopnea, PND, and Edema, completing the clinical picture automatically.
                        </p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 mb-6">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">NYHA Guideline Aligned</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Escalation protocols are strictly defined by NYHA (New York Heart Association) classifications, ensuring alerts are clinically actionable, not just informational.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HeartGuideShowcase;
