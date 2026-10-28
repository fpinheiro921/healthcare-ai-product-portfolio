import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Activity, BarChart3, TrendingUp, DollarSign
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { PatientJourneyMap } from '../components/PatientJourneyMap';

function SNSSimulator() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-500/30">
            <Navbar />

            <div className="pt-24 pb-20">
                {/* Hero Section */}
                <div className="max-w-6xl mx-auto px-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-6">
                            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">SNS Command Center</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            Patient <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">Journey Intelligence</span>
                        </h1>
                        
                        <div className="mb-6">
                            <a 
                                href="/" 
                                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors"
                            >
                                <ArrowRight size={16} className="rotate-180" />
                                Back to Home
                            </a>
                        </div>

                        <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
                            Track real-time patient journeys across our AI-powered healthcare ecosystem.
                            Monitor interventions, outcomes, and care coordination patterns.
                        </p>
                    </motion.div>
                </div>

                {/* Patient Journey Content */}
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8">
                            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Product Manager View</h3>
                            <div className="grid md:grid-cols-4 gap-4">
                                <ViewToggleItem
                                    icon={<Activity className="text-teal-400" size={20} />}
                                    title="Clinical Impact"
                                    desc="Track patient outcomes and intervention effectiveness"
                                />
                                <ViewToggleItem
                                    icon={<BarChart3 className="text-blue-400" size={20} />}
                                    title="User Engagement"
                                    desc="Monitor adoption rates and usage patterns"
                                />
                                <ViewToggleItem
                                    icon={<TrendingUp className="text-green-400" size={20} />}
                                    title="Growth Metrics"
                                    desc="Analyze market penetration and expansion opportunities"
                                />
                                <ViewToggleItem
                                    icon={<DollarSign className="text-amber-400" size={20} />}
                                    title="Unit Economics"
                                    desc="Evaluate CAC, LTV, and contribution margins"
                                />
                            </div>
                        </div>
                        <PatientJourneyMap />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

const ViewToggleItem = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
    <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <p className="text-sm font-bold text-slate-200 mb-1">{title}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default SNSSimulator;
