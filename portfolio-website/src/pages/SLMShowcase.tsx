import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Cpu,
    Zap,
    Server,
    Activity,
    CheckCircle,
    XCircle,
    BarChart3,
    Database,
    ArrowRight,
    ShieldCheck,
    Microscope
} from 'lucide-react';

// --- Types ---
interface Step {
    id: string;
    type: 'thinking' | 'action' | 'error' | 'success';
    content: string;
    duration: number;
}

// --- Mock Data ---
const TASK_PROMPT = "Task: Schedule an urgent MRI for Patient #8821 (hypertensive crisis) and verify insurance coverage.";

const LLM_STEPS: Step[] = [
    { id: 'l1', type: 'thinking', content: "Analyzing request... Patient has hypertensive crisis. MRI is needed. I should first understand the patient history and checking for contraindications...", duration: 2000 },
    { id: 'l2', type: 'thinking', content: "Searching for 'Hypertension MRI protocols' in general knowledge base... Note: Gadolinium contrast might be risky...", duration: 2500 },
    { id: 'l3', type: 'action', content: "SearchProtocols('MRI details')", duration: 1500 },
    { id: 'l4', type: 'error', content: "Error: Tool 'SearchProtocols' not found in registry.", duration: 1000 },
    { id: 'l5', type: 'thinking', content: "Apologies. I will try to check insurance now. Generating email draft to admin...", duration: 2000 },
    { id: 'l6', type: 'action', content: "DraftEmail('admin@hospital.com')", duration: 1500 },
    { id: 'l7', type: 'error', content: "Task Failed: Max iterations reached without solution.", duration: 1000 }
];

const SLM_STEPS: Step[] = [
    { id: 's1', type: 'thinking', content: "Identified tools: InsuranceAPI, LabScheduleAPI. Starting execution.", duration: 800 },
    { id: 's2', type: 'action', content: "GET /insurance/coverage?id=8821", duration: 1000 },
    { id: 's3', type: 'success', content: "Result: Coverage Active (Gold Plan)", duration: 500 },
    { id: 's4', type: 'action', content: "POST /radiology/schedule { type: 'MRI', urgent: true }", duration: 1000 },
    { id: 's5', type: 'success', content: "Result: Slot Confirmed 14:00 today.", duration: 500 },
    { id: 's6', type: 'success', content: "Task Completed Successfully.", duration: 500 }
];

const SLMShowcase = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [llmProgress, setLlmProgress] = useState<Step[]>([]);
    const [slmProgress, setSlmProgress] = useState<Step[]>([]);

    const runSimulation = () => {
        setIsPlaying(true);
        setLlmProgress([]);
        setSlmProgress([]);

        // Run LLM Simulation
        let llmTime = 0;
        LLM_STEPS.forEach(step => {
            setTimeout(() => {
                setLlmProgress(prev => [...prev, step]);
            }, llmTime);
            llmTime += step.duration;
        });

        // Run SLM Simulation
        let slmTime = 0;
        SLM_STEPS.forEach(step => {
            setTimeout(() => {
                setSlmProgress(prev => [...prev, step]);
            }, slmTime);
            slmTime += step.duration;
        });

        // Reset after max time
        setTimeout(() => setIsPlaying(false), Math.max(llmTime, slmTime) + 2000);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* Header */}
            <nav className="fixed top-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-indigo-500" />
                        <span className="text-white">SLM<span className="text-indigo-500">.Lab</span></span>
                    </Link>
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                        <span className="flex items-center gap-2"><Database className="w-4 h-4" /> ToolBench</span>
                        <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> OPT-350M</span>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-6"
                    >
                        <Microscope className="w-3 h-3" />
                        RESEARCH DEMO: ARXIV:2512.15943
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Small Models, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                            Giant Efficiency
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Replacing massive, expensive LLMs with targeted <span className="text-white font-semibold">350M parameter SLMs</span> for clinical tool orchestration.
                        Achieving <span className="text-green-400">77% pass rates</span> where GPT-4 struggles.
                    </p>

                    <button
                        onClick={runSimulation}
                        disabled={isPlaying}
                        className={`px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-3 mx-auto ${isPlaying
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-white text-black hover:scale-105 active:scale-95 shadow-xl shadow-white/10'
                            }`}
                    >
                        {isPlaying ? <Activity className="w-5 h-5 animate-pulse" /> : <Zap className="w-5 h-5" />}
                        {isPlaying ? 'Running Simulation...' : 'Run Benchmark'}
                    </button>
                </div>
            </header>

            {/* Benchmark Arena */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Prompt Display */}
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8 text-center backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">Input Instruction</span>
                        <code className="text-lg text-indigo-300 font-mono">{TASK_PROMPT}</code>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Left: VS-LLM */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-red-500/5 rounded-2xl blur-xl group-hover:bg-red-500/10 transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-white/5 rounded-2xl p-6 h-[600px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Server className="w-8 h-8 text-red-400" />
                                        <div>
                                            <h3 className="font-bold text-white">General LLM</h3>
                                            <div className="text-xs text-slate-400">175B Parameters • High Latency</div>
                                        </div>
                                    </div>
                                    <div className="text-red-400 font-mono text-sm">Pass Rate: 26%</div>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-4 font-mono text-sm pr-2 scrollbar-hide">
                                    {llmProgress.length === 0 && !isPlaying && (
                                        <div className="text-slate-600 text-center mt-20 italic">Waiting to run...</div>
                                    )}
                                    <AnimatePresence>
                                        {llmProgress.map((step) => (
                                            <motion.div
                                                key={step.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded-lg border flex gap-3 ${step.type === 'thinking' ? 'bg-slate-900 border-slate-800 text-slate-400' :
                                                        step.type === 'action' ? 'bg-blue-900/20 border-blue-800/50 text-blue-300' :
                                                            step.type === 'error' ? 'bg-red-900/20 border-red-800/50 text-red-300' :
                                                                'bg-green-900/20 border-green-800 text-green-300'
                                                    }`}
                                            >
                                                <span className="mt-1">
                                                    {step.type === 'thinking' && <Activity className="w-4 h-4" />}
                                                    {step.type === 'action' && <Cpu className="w-4 h-4" />}
                                                    {step.type === 'error' && <XCircle className="w-4 h-4" />}
                                                </span>
                                                <span>{step.content}</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Right: Fine-Tuned SLM */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-green-500/5 rounded-2xl blur-xl group-hover:bg-green-500/10 transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-green-500/20 rounded-2xl p-6 h-[600px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-8 h-8 text-green-400" />
                                        <div>
                                            <h3 className="font-bold text-white">Tool-Tuned SLM</h3>
                                            <div className="text-xs text-slate-400">350M Parameters • Low Latency</div>
                                        </div>
                                    </div>
                                    <div className="text-green-400 font-mono text-sm">Pass Rate: 78%</div>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-4 font-mono text-sm pr-2 scrollbar-hide">
                                    {slmProgress.length === 0 && !isPlaying && (
                                        <div className="text-slate-600 text-center mt-20 italic">Waiting to run...</div>
                                    )}
                                    <AnimatePresence>
                                        {slmProgress.map((step) => (
                                            <motion.div
                                                key={step.id}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded-lg border flex gap-3 ${step.type === 'thinking' ? 'bg-slate-900 border-slate-800 text-slate-400' :
                                                        step.type === 'action' ? 'bg-indigo-900/20 border-indigo-800/50 text-indigo-300' :
                                                            'bg-green-900/20 border-green-800/50 text-green-300'
                                                    }`}
                                            >
                                                <span className="mt-1">
                                                    {step.type === 'thinking' && <Activity className="w-4 h-4" />}
                                                    {step.type === 'action' && <Database className="w-4 h-4" />}
                                                    {step.type === 'success' && <CheckCircle className="w-4 h-4" />}
                                                </span>
                                                <span>{step.content}</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Technical Insight */}
            <section className="py-20 bg-slate-900/20 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">Why Small Models Win at Tool Use</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-black border border-white/10 hover:border-indigo-500/50 transition-colors">
                            <ShieldCheck className="w-8 h-8 text-indigo-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
                            <p className="text-slate-400 text-sm">
                                350M models can run entirely strictly <strong>on-premise</strong> or even in-browser, guaranteeing patient data never leaves the hospital firewall.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-black border border-white/10 hover:border-indigo-500/50 transition-colors">
                            <BarChart3 className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Cost Efficiency</h3>
                            <p className="text-slate-400 text-sm">
                                Fine-tuning an SLM costs a fraction of prompting GPT-4. Inference is ~50x cheaper, enabling 24/7 autonomous monitoring.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-black border border-white/10 hover:border-indigo-500/50 transition-colors">
                            <Cpu className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Specialize, Don't Generalize</h3>
                            <p className="text-slate-400 text-sm">
                                By training on the <strong>ToolBench</strong> dataset, the model learns the <em>syntax</em> of tool use, rather than reciting Shakespeare.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/phoenix-showcase" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium">
                            See the Full Agentic Pipeline <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default SLMShowcase;
