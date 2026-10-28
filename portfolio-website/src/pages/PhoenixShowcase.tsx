import React from 'react';
import { motion } from 'framer-motion';
import {
    Cpu,
    Database,
    Brain,
    Activity,
    ArrowRight,
    ExternalLink,
    Layers,
    Code,
    Zap,
    GitBranch
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function PhoenixShowcase() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-sm tracking-wide uppercase mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            System Architecture Deep Dive
                        </div>
                        <h1 className="font-display text-5xl sm:text-7xl font-bold mb-6 leading-tight tracking-tight">
                            The Phoenix <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                RAG Sandbox
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Proving the "Hard Tech" skills: A live client-side simulation of an <span className="text-blue-400 font-semibold">Agentic Reasoning Loop</span> (Plan → Retrieve → Synthesize) built to demonstrate architectural mastery.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Challenge */}
            <section className="py-20 px-6 border-b border-white/5 bg-slate-900/20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">The Engineering Challenge</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Activity size={48} />
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-red-400">Latency vs. Logic</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                RAG systems often suffer from multi-second latency. The goal was to build a <strong>sub-100ms</strong> perceived latency interaction using optimistic UI updates and streaming.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Database size={48} />
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-amber-400">Context Window</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Managing the "Lost in the Middle" phenomenon. Implemented smart chunking and re-ranking to prioritize the most relevant clinical guidelines.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Cpu size={48} />
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-blue-400">Simulation Costs</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Demonstration requires scale. Built a <strong>Mock Vector Store</strong> engine to simulate embeddings and retrieval purely client-side for zero-cost scalability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Pipeline */}
            <section className="py-24 px-6 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-slate-400 mb-4">PIPELINE V1.0</div>
                        <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            A breakdown of the agent's decision-making pipeline. Each step is visualized in real-time in the live interface.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 border-t border-dashed border-blue-500/50 -z-10" />

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: <Activity />,
                                    title: "1. Intent Detection",
                                    desc: "Query classifier identifies clinical vs. general intent using regex-based heuristics (simulating NLU)."
                                },
                                {
                                    icon: <GitBranch />,
                                    title: "2. Strategic Planning",
                                    desc: "Deconstructs complex queries into atomic retrieval steps. (e.g. 'Diagnosis' + 'Therapy')."
                                },
                                {
                                    icon: <Database />,
                                    title: "3. Vector Retrieval",
                                    desc: "Simulated cosine similarity search against a pre-indexed Knowledge Base of clinical PDFs."
                                },
                                {
                                    icon: <Brain />,
                                    title: "4. Reasoning & Synthesis",
                                    desc: "Injects retrieved context into the prompt window to generate a citation-backed response."
                                }
                            ].map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed border-t border-white/5 pt-3 mt-3">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Capabilities */}
            <section className="py-24 px-6 bg-slate-900/30 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Key Engineering Features</h2>
                        <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Feature 1 */}
                        <div className="flex gap-6">
                            <div className="w-12 h-12 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">Chain-of-Thought Visualization</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Most RAG systems are "Black Boxes". I engineered a transparent UI that exposes the internal state machine (Plan/Retrieve/Think) to the user. This builds trust, especially in clinical settings where "how you got the answer" is as important as the answer itself.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex gap-6">
                            <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                <Code size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">Modular Engine Design</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    The <code className="text-xs bg-slate-800 px-1 py-0.5 rounded text-indigo-300">PhoenixEngine.ts</code> is built with dependency injection. The storage layer uses a Client-Side Vector Store, guaranteeing <strong className="text-indigo-400">100% Offline Reliability</strong> and zero downtime, even during network outages.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Environment CTA */}
            <section className="py-24 px-6 relative">
                <div className="max-w-5xl mx-auto bg-slate-900/50 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-sm tracking-wide uppercase mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Restricted Area
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                            Enter the Phoenix Lab
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Access the dedicated Agentic Reasoning Environment. Interact with the live RAG system in a distraction-free cockpit.
                        </p>

                        <div className="flex justify-center">
                            <Link
                                to="/phoenix-live"
                                className="px-10 py-5 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] flex items-center gap-3 group text-lg"
                            >
                                Launch Live Environment
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Stack */}
            <section className="py-20 px-6 bg-slate-900">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Engineering Stack</h2>
                        <p className="text-slate-400">Zero-backend simulation architecture</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-950 p-8 rounded-2xl border border-white/5">
                            <h3 className="flex items-center gap-3 font-bold text-xl mb-6 text-blue-400">
                                <Cpu size={24} /> Engine
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <div>
                                        <span className="block font-bold text-sm">Vector Store Mock</span>
                                        <span className="text-sm text-slate-500">Client-side keyword/semantic hybrid retrieval implementation.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <div>
                                        <span className="block font-bold text-sm">State Management</span>
                                        <span className="text-sm text-slate-500">React + Context API for managing agent thought chains.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-950 p-8 rounded-2xl border border-white/5">
                            <h3 className="flex items-center gap-3 font-bold text-xl mb-6 text-indigo-400">
                                <Layers size={24} /> UI/UX
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    <div>
                                        <span className="block font-bold text-sm">Real-time Visualization</span>
                                        <span className="text-sm text-slate-500">Framer Motion for fluid "Thought Step" animations.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    <div>
                                        <span className="block font-bold text-sm">Responsive Design</span>
                                        <span className="text-sm text-slate-500">Tailwind CSS for pixel-perfect layout across devices.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}

export default PhoenixShowcase;
