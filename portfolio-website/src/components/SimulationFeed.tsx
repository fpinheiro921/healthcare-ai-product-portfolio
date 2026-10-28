import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Wifi, ShieldAlert } from 'lucide-react';
import { IntelligenceCard } from './IntelligenceCard';

interface SimulationFeedProps {
    activeAgents: Set<string>;
}

interface FeedItem {
    id: string;
    agentId: string;
    timestamp: string;
    type: 'alert' | 'action' | 'info';
    details: {
        signal: string;
        action: string;
        outcome: string;
    }
}

interface Particle {
    id: string;
    x: number;
    y: number;
    color: string;
    type: 'optimization' | 'action' | 'alert';
}

const AGENT_SCENARIOS: Record<string, { signal: string, action: string, outcome: string }[]> = {
    'heartguide': [
        { signal: "Santa Maria ER: Patient #842 (HF Decomp) inbound", action: "HeartGuide: Diuretic titration sent 2h ago", outcome: "Admission Prevented" },
        { signal: "H. Garcia de Orta: A-Fib Cluster Detected", action: "Cardiology Consult Auto-Scheduled", outcome: "Stroke Risk Mitigated" },
        { signal: "USF Baixa: Hypertensive Crisis (180/110)", action: "Emergency Protocol Activated", outcome: "Managed at Home" }
    ],
    'breatheasy': [
        { signal: "Lisbon (Alcântara): Pollen Spike (Birch)", action: "Proactive Alert sent to 450 users", outcome: "Pediatric ER Visits -15%" },
        { signal: "Patient #552: Wheezing Audio Signature", action: "Rescue Meds Advised", outcome: "Amadora-Sintra Avoided" }
    ],
    'glucowise': [
        { signal: "Patient #991 (T2DM): Hypo predicted <45m", action: "Alert: 'Consume 15g Fast Carbs'", outcome: "INEM Call Averted" },
        { signal: "São João: Post-Prandial Spike Predicted", action: "Bolus Adjustment Recommended", outcome: "Time-in-Range Safe" }
    ],
    'surge-commander': [
        { signal: "H. Beatriz Ângelo: ER Saturation > 110%", action: "Divert Status: AMBER -> H. Loures", outcome: "Ambulance Offload <15m" },
        { signal: "SNS24: Call Wait Time > 45m", action: "Overflow Bot Deployed (Triage AI)", outcome: "Wait Reduced to 2m" }
    ],
    'triage-os': [
        { signal: "SNS24 Caller #492: 'Chest Pain'", action: "Cat 1 Dispatch (Via Verde Coronária)", outcome: "Time-to-Cath: <60m" },
        { signal: "Caller #115: 'Rash' (Green)", action: "Diverted to Video Consult", outcome: "H. Curry Cabral Preserved" }
    ],
    'portersmart': [
        { signal: "São José: Transfer to Radiology Delayed", action: "Route Optimized (Porter #4 Assigned)", outcome: "Wait Time: 2 mins (vs 45)" },
    ],
    'default': [
        { signal: "System Status Check", action: "Analyzing ACSS / DGS Data Stream", outcome: "Optimization Active" }
    ]
};

export const SimulationFeed: React.FC<SimulationFeedProps> = ({ activeAgents }) => {
    const [items, setItems] = useState<FeedItem[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            // DECISION: Show Positive (AI) vs Negative (Chaos) log based on system state
            const isSystemStrained = activeAgents.size < 3;
            const roll = Math.random();

            if (isSystemStrained && roll > 0.3) {
                // 70% chance of CHAOS log when system is strained
                const chaosLogs = [
                    { type: 'CRITICAL', title: 'H. Santa Maria', signal: 'ER WAIT > 6 HOURS', action: 'Patient Abandonment', outcome: 'Safety Risk High' },
                    { type: 'WARNING', title: 'H. Amadora-Sintra', signal: 'OBSTETRICS DIVERT', action: 'Transfer -> Mac Matern.', outcome: 'Ambulance Delay' },
                    { type: 'CRITICAL', title: 'USF (Lisbon)', signal: 'NO GP SLOTS', action: 'Patient to ER (Green)', outcome: 'System Abuse' },
                    { type: 'WARNING', title: 'SNS24 Center', signal: 'WAIT > 80 MINS', action: 'Call Abandoned', outcome: 'Triage Failed' },
                    { type: 'CRITICAL', title: 'H. Garcia de Orta', signal: 'INTERNAL MED FULL', action: 'Corridor Boarding', outcome: 'Dignity Compromised' }
                ];
                const chaos = chaosLogs[Math.floor(Math.random() * chaosLogs.length)];

                const newItem: FeedItem = {
                    id: Date.now().toString(),
                    agentId: 'CHAOS MONITOR',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    type: 'alert',
                    details: {
                        signal: chaos.signal,
                        action: chaos.action,
                        outcome: chaos.outcome
                    }
                };
                setItems(prev => [newItem, ...prev].slice(0, 10)); // Keep fewer items, but higher quality

                // Spawn Red Particles (Chaos)
                const newParticles = Array.from({ length: 3 }).map((_, i) => ({
                    id: Math.random().toString(),
                    x: 20 + Math.random() * 60, // Random X pos
                    y: 80 + Math.random() * 10,  // Near bottom
                    color: 'bg-rose-500',
                    type: 'alert' as const
                }));
                // @ts-ignore
                setParticles(prev => [...prev, ...newParticles]);

            } else if (activeAgents.size > 0) {
                // Standard AI Logic (Positive)
                const activeAgentIds = Array.from(activeAgents);
                const randomAgentId = activeAgentIds[Math.floor(Math.random() * activeAgentIds.length)];

                // Get scenarios for this agent, fallback to default
                const scenarios = AGENT_SCENARIOS[randomAgentId] || AGENT_SCENARIOS['default'];
                const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

                const newItem: FeedItem = {
                    id: Date.now().toString(), // Fixed: match string type
                    agentId: randomAgentId,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    type: 'action',
                    details: {
                        signal: scenario.signal,
                        action: scenario.action,
                        outcome: scenario.outcome
                    }
                };
                setItems(prev => [newItem, ...prev].slice(0, 50));

                // Spawn Green/Blue Particles (Optimization)
                const type = Math.random() > 0.5 ? 'optimization' : 'action';
                const color = type === 'optimization' ? 'bg-emerald-400' : 'bg-blue-400';

                const newParticles = Array.from({ length: 2 }).map((_, i) => ({
                    id: Math.random().toString(),
                    x: 10 + Math.random() * 80,
                    y: 90,
                    color: color,
                    type: type as any
                }));
                // @ts-ignore
                setParticles(prev => [...prev, ...newParticles]);
            }

            // Cleanup old particles
            setTimeout(() => {
                setParticles(prev => prev.slice(1));
            }, 2000);
        }, 2000); // 2 seconds

        return () => clearInterval(interval);
    }, [activeAgents]);

    return (
        <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl border-l border-white/10 shadow-2xl shadow-black/50 relative overflow-hidden transition-colors duration-500">
            {/* Background Decor - Subtle Gradients */}
            <div className="absolute top-0 right-0 w-full h-64 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Particle Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <AnimatePresence>
                    {particles.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 0, x: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                y: -200 - Math.random() * 100,
                                x: (Math.random() - 0.5) * 50
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className={`absolute w-2 h-2 rounded-full ${p.color} blur-[1px] shadow-[0_0_8px_currentColor]`}
                            style={{ left: `${p.x}%`, bottom: `${p.y - 80}%` }} // Start near bottom
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Professional Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="font-sans font-bold text-sm flex items-center gap-2 text-slate-100 tracking-wide drop-shadow-md">
                        <Cpu size={16} className="text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            NEURAL STREAM
                        </span>
                    </h3>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 shadow-[0_0_10px_rgba(20,184,166,0.1)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                        <span className="text-[10px] font-bold text-teal-400 tracking-wider">LIVE</span>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <p className="text-[10px] text-slate-500 font-mono">
                        {activeAgents.size} Agents Active • <span className="text-emerald-500">Encrypted</span>
                    </p>
                    <div className="flex gap-0.5">
                        <div className="w-8 h-0.5 bg-teal-500/20 rounded-full animate-pulse" />
                        <div className="w-1 h-0.5 bg-teal-500/20 rounded-full animate-pulse delay-75" />
                        <div className="w-1 h-0.5 bg-teal-500/20 rounded-full animate-pulse delay-150" />
                    </div>
                </div>
            </div>

            {/* Stream */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
                {/* Connection Lines Decor */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/20 via-slate-800 to-transparent z-0" />

                <AnimatePresence initial={false} mode='popLayout'>
                    {items.map((item, index) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="relative z-10 pl-6 mb-3 group"
                        >
                            {/* Dot on timeline - Glows for newest item */}
                            <div className={`absolute left-4 top-5 w-2 h-2 -ml-px rounded-full border-2 transition-all duration-500 ${index === 0
                                ? 'bg-teal-400 border-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.6)]'
                                : 'bg-slate-900 border-slate-700 group-hover:border-slate-500'
                                }`} />

                            {/* Card with Hover Effect */}
                            <div className={`${index === 0 ? 'brightness-110 drop-shadow-xl' : 'opacity-80 group-hover:opacity-100 transition-opacity'}`}>
                                <IntelligenceCard
                                    id={item.id}
                                    agentId={item.agentId}
                                    message=""
                                    timestamp={item.timestamp}
                                    type={item.type}
                                    details={item.details}
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {activeAgents.size === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-600 gap-3">
                        <div className="relative">
                            <Wifi size={24} className="opacity-20" />
                            <div className="absolute inset-0 bg-slate-500/20 blur-xl rounded-full" />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest opacity-50">Stream Offline</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-white/5 bg-slate-950/50 backdrop-blur text-[10px] text-slate-600 font-mono text-center flex justify-between px-4">
                <span>LATENCY: <span className="text-teal-500">12ms</span></span>
                <span>CONFIDENCE: <span className="text-teal-500">99.8%</span></span>
            </div>
        </div>
    );
};
