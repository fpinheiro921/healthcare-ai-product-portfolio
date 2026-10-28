import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, Cell, ReferenceLine, LabelList
} from 'recharts';
import { Clock, TrendingDown, ShieldCheck, ArrowRight } from 'lucide-react';

interface SNSImpactReportProps {
    metrics: {
        cost: number;
        waitTime: number;
        safety: number;
    };
}

export const SNSImpactReport: React.FC<SNSImpactReportProps> = ({ metrics }) => {
    // 1. Wait Time Data
    const waitData = [
        { name: 'Baseline (Chaos)', value: 6.0, color: '#f43f5e' }, // Rose-500
        { name: 'With AI Agents', value: metrics.waitTime, color: '#14b8a6' }, // Teal-500
    ];

    // 2. Economic Waterfall Data
    // We assume 15.0B baseline. 
    // Savings breakdown: Heart (0.8) + Breathe (0.4) + Gluco (1.2) + Ops (rest)
    const currentSavings = 15.0 - metrics.cost;
    const waterfallData = [
        { name: 'Total Waste (2025)', value: 15.0, type: 'total', fill: '#64748b' },
        { name: 'Chronic Prevention', value: -2.4, type: 'saving', fill: '#3b82f6' }, // Heart, Breath, Gluco
        { name: 'ER Diversion', value: -3.1, type: 'saving', fill: '#8b5cf6' }, // Triage, Sepsis
        { name: 'Ops Efficiency', value: -(currentSavings - 5.5), type: 'saving', fill: '#14b8a6' }, // Remaining
        { name: 'Projected (2026)', value: metrics.cost, type: 'total', fill: '#10b981' },
    ];

    // Ensure we don't show negative bars if simulation isn't running perfectly
    const safeWaterfall = waterfallData.map(d => ({
        ...d,
        value: d.type === 'saving' ? Math.max(d.value, -5) : d.value
    }));

    return (
        <div className="h-full flex flex-col p-6 overflow-y-auto custom-scrollbar space-y-8 bg-slate-950/50">

            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Impact Analysis Report</h2>
                <p className="text-slate-400">Projected outcomes based on current agent deployment.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* 1. Wait Time Collapse */}
                <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-teal-500/20 transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-teal-400" />
                                Wait Time Collapse
                            </h3>
                            <p className="text-xs text-slate-500">Average ER Wait (Hours)</p>
                        </div>
                        <div className="text-2xl font-bold text-teal-400">
                            -52%
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={waitData} layout="vertical" barSize={40}>
                                <XAxis type="number" domain={[0, 8]} hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {waitData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                    <LabelList dataKey="value" position="right" fill="#fff" formatter={(val: number) => `${val.toFixed(1)}h`} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Economic Recovery (Waterfall) */}
                <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/20 transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-blue-400" />
                                Economic Recovery
                            </h3>
                            <p className="text-xs text-slate-500">Billions (EUR) Saved per Year</p>
                        </div>
                        <div className="text-2xl font-bold text-emerald-400">
                            €{(15.0 - metrics.cost).toFixed(1)}B
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={safeWaterfall}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} interval={0} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                {/* Reference line for zero if needed, though we deal with absolute values mainly */}
                                <ReferenceLine y={0} stroke="#334155" />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {safeWaterfall.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    <LabelList dataKey="value" position="top" fill="#fff" formatter={(val: number) => Math.abs(val).toFixed(1)} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Safety Shield (Summary) */}
                <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900/40 border border-emerald-500/20 rounded-2xl p-8 col-span-1 lg:col-span-2 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">The Safety Dividend</h3>
                                <p className="text-emerald-400 font-medium">Lives Protected / Year</p>
                            </div>
                        </div>
                        <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
                            By shifting from reactive "crash-and-burn" care to <strong>Continuous Remote Monitoring</strong>, these agents keep doctors informed *before* a crisis hits. This prevents decompensation at home, directly stopping the thousands of avoidable ER visits that cause overcrowding.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Before</div>
                            <div className="text-3xl font-bold text-rose-400">12.5k</div>
                            <div className="text-xs text-rose-500/70">Events</div>
                        </div>
                        <ArrowRight className="text-slate-600" />
                        <div className="text-center">
                            <div className="text-sm text-emerald-500 uppercase tracking-widest font-bold mb-1">After</div>
                            <div className="text-5xl font-bold text-white">{(metrics.safety / 1000).toFixed(1)}k</div>
                            <div className="text-xs text-emerald-500/70">Events</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
