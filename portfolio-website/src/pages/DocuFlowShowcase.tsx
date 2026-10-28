import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FileText,
    Shield,
    WifiOff,
    Server,
    Activity,
    CheckCircle,
    XCircle,
    Lock,
    Database,
    ArrowRight,
    Stethoscope,
    Terminal,
    Cpu
} from 'lucide-react';

// --- Types ---
interface Step {
    id: string;
    type: 'process' | 'action' | 'error' | 'success' | 'warning';
    content: string;
    duration: number;
}

// --- Mock Data ---
const SCENARIO_INPUT = "Clinician Audio: 'Patient presents with worsening fatigue. A1c is 9.2. Increasing Metformin to 1000mg BID. Diagnose with T2DM uncontrolled.'";

const CLOUD_STEPS: Step[] = [
    { id: 'c1', type: 'process', content: "Uploading audio to Cloud (AWS-East-1)...", duration: 1500 },
    { id: 'c2', type: 'warning', content: "PII Detected: 'Patient A1c 9.2'. Encrypting...", duration: 1000 },
    { id: 'c3', type: 'process', content: "Waiting for GPU text-to-speech...", duration: 2500 },
    { id: 'c4', type: 'action', content: "LLM Processing: Generative Note Creation", duration: 2000 },
    { id: 'c5', type: 'error', content: "Hallucination Warning: Suggested 'Insulin' (not in audio).", duration: 1500 },
    { id: 'c6', type: 'success', content: "Note returned. Total Latency: 4.2s", duration: 500 }
];

const LOCAL_STEPS: Step[] = [
    { id: 'l1', type: 'process', content: "Audio processed locally (Whisper-Tiny).", duration: 800 },
    { id: 'l2', type: 'action', content: "Tool: ICD10_Lookup('T2DM uncontrolled')", duration: 600 },
    { id: 'l3', type: 'success', content: "Mapped: E11.65 (Type 2 diabetes with hyperglycemia)", duration: 400 },
    { id: 'l4', type: 'action', content: "Tool: Rx_Validator('Metformin', '1000mg BID')", duration: 600 },
    { id: 'l5', type: 'success', content: "Dose Verified. Generating SOAP.", duration: 400 },
    { id: 'l6', type: 'success', content: "Note Ready. 0 bytes sent to cloud.", duration: 500 }
];

const DocuFlowShowcase = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [cloudProgress, setCloudProgress] = useState<Step[]>([]);
    const [localProgress, setLocalProgress] = useState<Step[]>([]);

    // Auto-Run Simulation in Loop
    React.useEffect(() => {
        let isMounted = true;
        let timeoutId: NodeJS.Timeout;

        const runLoop = () => {
            if (!isMounted) return;

            setIsPlaying(true);
            setCloudProgress([]);
            setLocalProgress([]);

            // Cloud Simulation
            let cloudTime = 0;
            CLOUD_STEPS.forEach(step => {
                setTimeout(() => {
                    if (isMounted) setCloudProgress(prev => [...prev, step]);
                }, cloudTime);
                cloudTime += step.duration;
            });

            // Local Simulation
            let localTime = 0;
            LOCAL_STEPS.forEach(step => {
                setTimeout(() => {
                    if (isMounted) setLocalProgress(prev => [...prev, step]);
                }, localTime);
                localTime += step.duration;
            });

            const totalDuration = Math.max(cloudTime, localTime) + 3000; // 3s pause before restart

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
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-emerald-500/30">
            {/* ... (Header) ... */}
            <nav className="fixed top-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-500" />
                        <span className="text-white">Docu<span className="text-emerald-500">Flow</span></span>
                    </Link>
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                        <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> HIPAA Compliant</span>
                        <span className="flex items-center gap-2"><WifiOff className="w-4 h-4" /> Offline First</span>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="pt-32 pb-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6"
                    >
                        <Shield className="w-3 h-3" />
                        PRIVACY-FIRST ARCHITECTURE
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Documentation that <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                            Stays Under Control
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Cloud scribes raise privacy and workflow questions. <br />
                        <span className="text-white">DocuFlow</span> is a <strong>case study + working UI</strong> for privacy-minded clinical documentation with clinician review in the loop.
                    </p>

                    <div className="flex justify-center">
                        <Link
                            to="/docuflow-live"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white hover:scale-105 active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" />
                            Open working UI
                        </Link>
                    </div>
                </div>
            </header>

            {/* Simulation */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8 text-center backdrop-blur-sm">
                        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-2">Incoming Audio Stream</span>
                        <code className="text-lg text-emerald-300 font-mono">"{SCENARIO_INPUT}"</code>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Cloud Competitor */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-red-500/5 rounded-2xl blur-xl transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-white/5 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Server className="w-8 h-8 text-red-400" />
                                        <div>
                                            <h3 className="font-bold text-white">Standard AI Scribe</h3>
                                            <div className="text-xs text-slate-400">Cloud Processing • Data Risk</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 font-mono text-sm overflow-y-auto pr-2 scrollbar-hide">
                                    <AnimatePresence>
                                        {cloudProgress.map(step => (
                                            <motion.div key={step.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded border flex gap-3 items-center ${step.type === 'error' ? 'bg-red-900/20 border-red-800 text-red-300' :
                                                    step.type === 'warning' ? 'bg-yellow-900/20 border-yellow-800 text-yellow-300' :
                                                        'bg-slate-900 border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {step.type === 'warning' ? <Lock className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                                                {step.content}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* DocuFlow Local */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl blur-xl transition-all opacity-50" />
                            <div className="relative bg-black/40 border border-emerald-500/20 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-8 h-8 text-emerald-400" />
                                        <div>
                                            <h3 className="font-bold text-white">DocuFlow SLM</h3>
                                            <div className="text-xs text-slate-400">On-Device • Tool-Augmented</div>
                                        </div>
                                    </div>
                                    <div className="text-emerald-400 font-mono text-xs flex items-center gap-1">
                                        <WifiOff className="w-3 h-3" /> Offline Mode
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 font-mono text-sm overflow-y-auto pr-2 scrollbar-hide">
                                    <AnimatePresence>
                                        {localProgress.map(step => (
                                            <motion.div key={step.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                                className={`p-3 rounded border flex gap-3 items-center ${step.type === 'action' ? 'bg-indigo-900/20 border-indigo-800 text-indigo-300' :
                                                    step.type === 'success' ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300' :
                                                        'bg-slate-900 border-slate-800 text-slate-400'
                                                    }`}
                                            >
                                                {step.type === 'action' ? <Cpu className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
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

            {/* Tech Spotlight: SLM-350M */}
            <section className="py-20 bg-emerald-900/10 border-t border-emerald-500/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6">
                        <Cpu className="w-3 h-3" />
                        UNDER THE HOOD
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        What is a Neural Engine (SLM-350M)?
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        Unlike massive 70B parameter models that require server farms, our <strong>Small Language Model (350M)</strong> is a distilled neural network highly specialized for clinical syntax.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-400" />
                                Hyper-Specialized
                            </h3>
                            <p className="text-sm text-slate-400">
                                It doesn't know poetry or coding. It only knows medical ontology (SNOMED-CT, RxNorm, ICD-10), making it incredibly accurate for documentation despite its small size.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                <WifiOff className="w-5 h-5 text-emerald-400" />
                                Zero Latency & Offline
                            </h3>
                            <p className="text-sm text-slate-400">
                                Because it runs in the browser's WebGPU, it generates notes instantly without network lag, and no patient data ever touches the cloud.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-20 bg-slate-900/20 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div>
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                            <Database className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Local Vector Store</h3>
                        <p className="text-slate-400 leading-relaxed">
                            DocuFlow embeds previous patient encounters directly on the device using Chroma-WASM. It retrieves context without pinging a central server.
                        </p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Clinical Tool-Bench</h3>
                        <p className="text-slate-400 leading-relaxed">
                            The SLM doesn't "hallucinate" codes. It detects medical entities and queries a rigorous <code className="text-emerald-300">Sqlite</code> database for valid ICD-10 and CPT codes.
                        </p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Air-Gapped Ready</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Designed for high-security environments. The entire stack (Model, UI, DB) is contained in a single Docker container that requires zero outbound network rules.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default DocuFlowShowcase;
