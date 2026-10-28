import React from 'react';
import { motion } from 'framer-motion';
import { PhoenixLab } from '../components/phoenix/PhoenixLab';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function PhoenixLive() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
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
                                to="/phoenix-showcase"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold font-display">Phoenix Lab <span className="text-blue-500">Live</span></h1>
                                <p className="text-sm text-slate-400">Agentic Reasoning Environment</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                SYSTEM ONLINE
                            </span>
                            <span className="w-px h-3 bg-white/10"></span>
                            <span>V1.0.4 PRODUCTION</span>
                        </div>
                    </motion.div>

                    {/* Immersive Workspace */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 relative rounded-2xl border border-white/10 bg-slate-900/50 shadow-2xl flex flex-col"
                    >
                        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
                        <div className="relative h-full flex flex-col p-1">
                            <PhoenixLab />
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default PhoenixLive;
