import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
    ArrowLeft,
    Wind,
    Activity,
    Leaf,
    CloudSun,
    AlertTriangle,
    CheckCircle,
    MapPin,
    Thermometer,
    Droplets,
    Shield
} from 'lucide-react';
import { askAI, AIResult } from '../lib/aiClient';
import { PROMPTS } from '../lib/prompts';

// --- Mock Location Data ---
const LOCATION = {
    city: "Lisbon",
    coordinates: "38.7223° N, 9.1393° W"
};

interface AirReading {
    timestamp: string;
    pm25: number;
    ozone: number;
    pollen: { type: string; level: number };
    humidity: number;
    temp: number;
}

function BreathEasyLive() {
    const [readings, setReadings] = useState<AirReading[]>([]);
    const [riskLevel, setRiskLevel] = useState<'low' | 'moderate' | 'high' | 'severe'>('low');
    const [aiAdvice, setAiAdvice] = useState<string>("Conditions are favorable for outdoor activity.");
    const [isThinking, setIsThinking] = useState(false);
    const [isFallback, setIsFallback] = useState(false);
    const [isTracking, setIsTracking] = useState(true);
    const aiRequestInFlight = useRef(false);
    const abortRef = useRef<AbortController | null>(null);
    const lastRiskLevelRef = useRef<'low' | 'moderate' | 'high' | 'severe'>('low');
    const stableRiskCountRef = useRef(0);

    const pollenTypes = ['Grass', 'Oak', 'Birch', 'Olive', 'Ragweed'];

    useEffect(() => {
        if (!isTracking) return;

        const interval = setInterval(() => {
            const pm25 = 15 + Math.floor(Math.random() * 35);
            const ozone = 40 + Math.floor(Math.random() * 60);
            const pollenLevel = Math.floor(Math.random() * 10);
            const pollenType = pollenTypes[Math.floor(Math.random() * pollenTypes.length)];

            const newReading: AirReading = {
                timestamp: new Date().toLocaleTimeString(),
                pm25,
                ozone,
                pollen: { type: pollenType, level: pollenLevel },
                humidity: 40 + Math.floor(Math.random() * 30),
                temp: 18 + Math.floor(Math.random() * 10)
            };

            setReadings(prev => [newReading, ...prev].slice(0, 8));

            // Local risk calculation
            const combinedRisk = (pm25 / 50) + (ozone / 100) + (pollenLevel / 10);
            const newRiskLevel = combinedRisk > 2.2 ? 'severe' : combinedRisk > 1.5 ? 'high' : combinedRisk > 1.0 ? 'moderate' : 'low';
            setRiskLevel(newRiskLevel);

            // Debounce: only call LLM when risk level changes or after 3 stable ticks
            if (newRiskLevel !== lastRiskLevelRef.current) {
                stableRiskCountRef.current = 0;
                lastRiskLevelRef.current = newRiskLevel;
            } else {
                stableRiskCountRef.current++;
            }

            const shouldCallLLM = newRiskLevel !== 'low' || stableRiskCountRef.current >= 3;

            if (shouldCallLLM && !aiRequestInFlight.current) {
                aiRequestInFlight.current = true;
                setIsThinking(true);
                const userPrompt = PROMPTS.breatheasy.userTemplate({
                    pm25,
                    ozone,
                    pollenType,
                    pollenLevel,
                    humidity: newReading.humidity,
                    temp: newReading.temp,
                    riskLevel: newRiskLevel,
                });
                const controller = new AbortController();
                abortRef.current = controller;
                askAI(PROMPTS.breatheasy.system, userPrompt, 200, controller.signal)
                    .then((result: AIResult) => {
                        setAiAdvice(result.text);
                        setIsFallback(result.isFallback);
                    })
                    .finally(() => {
                        setIsThinking(false);
                        aiRequestInFlight.current = false;
                        abortRef.current = null;
                    });
            }
        }, 4000);

        return () => {
            clearInterval(interval);
            abortRef.current?.abort();
        };
    }, [isTracking]);

    // Cleanup on unmount
    useEffect(() => {
        return () => abortRef.current?.abort();
    }, []);

    const riskColors = {
        low: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
        moderate: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
        high: 'bg-orange-500/20 border-orange-500/50 text-orange-400',
        severe: 'bg-red-500/20 border-red-500/50 text-red-400'
    };

    const riskBadge = {
        low: 'bg-emerald-500',
        moderate: 'bg-yellow-500',
        high: 'bg-orange-500',
        severe: 'bg-red-500'
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-cyan-500/30 font-sans">
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
                                to="/breatheasy-showcase"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold">BreathEasy <span className="text-cyan-400">Live</span></h1>
                                <p className="text-sm text-slate-400">Real-Time Respiratory Risk Monitor</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" />
                                {LOCATION.city}
                            </span>
                            <span className="w-px h-3 bg-white/10"></span>
                            <span className={`w-2 h-2 rounded-full ${riskBadge[riskLevel]}`}></span>
                            <span>{riskLevel.toUpperCase()} RISK</span>
                        </div>
                    </motion.div>

                    {/* Main Dashboard Grid */}
                    <div className="flex-1 grid lg:grid-cols-3 gap-6">

                        {/* Current Conditions */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                                <CloudSun className="w-5 h-5 text-cyan-400" />
                                Current Conditions
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Wind className="w-5 h-5 text-slate-400" />
                                        <span className="text-sm">PM2.5</span>
                                    </div>
                                    <span className="font-mono font-bold">{readings[0]?.pm25 || '--'}µg/m³</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-5 h-5 text-blue-400" />
                                        <span className="text-sm">Ozone</span>
                                    </div>
                                    <span className="font-mono font-bold">{readings[0]?.ozone || '--'}ppb</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Leaf className="w-5 h-5 text-green-400" />
                                        <span className="text-sm">{readings[0]?.pollen.type || 'Pollen'}</span>
                                    </div>
                                    <span className="font-mono font-bold">{readings[0]?.pollen.level || '--'}/10</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Droplets className="w-5 h-5 text-cyan-400" />
                                        <span className="text-sm">Humidity</span>
                                    </div>
                                    <span className="font-mono font-bold">{readings[0]?.humidity || '--'}%</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Thermometer className="w-5 h-5 text-orange-400" />
                                        <span className="text-sm">Temperature</span>
                                    </div>
                                    <span className="font-mono font-bold">{readings[0]?.temp || '--'}°C</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsTracking(!isTracking)}
                                className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${isTracking ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                            >
                                {isTracking ? 'Tracking Active' : 'Resume Tracking'}
                            </button>
                        </motion.div>

                        {/* Risk Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-cyan-400" />
                                    Environmental Stream
                                </h2>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${riskColors[riskLevel]}`}>
                                    {riskLevel.toUpperCase()} RISK
                                </div>
                            </div>

                            {/* Reading Log */}
                            <div className="space-y-2 max-h-72 overflow-y-auto">
                                <AnimatePresence>
                                    {readings.map((r, i) => (
                                        <motion.div
                                            key={r.timestamp + i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center justify-between text-sm bg-black/20 px-4 py-3 rounded-lg font-mono"
                                        >
                                            <span className="text-slate-500">{r.timestamp}</span>
                                            <span className="text-cyan-300">PM2.5: {r.pm25}</span>
                                            <span className="text-green-300">{r.pollen.type}: {r.pollen.level}</span>
                                            <span className="text-blue-300">O₃: {r.ozone}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* AI Recommendation Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-3 bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <Wind className="w-5 h-5 text-cyan-500" />
                                BreathEasy AI Recommendation
                            </h2>

                            {isThinking ? (
                                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                                    <p className="font-mono text-sm text-slate-400 flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                                        BreathEasy AI is analyzing air quality...
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <motion.div
                                        key={aiAdvice}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`p-4 rounded-xl border ${riskColors[riskLevel]}`}
                                    >
                                        <p className="font-mono text-sm leading-relaxed">{aiAdvice}</p>
                                    </motion.div>
                                    {isFallback && (
                                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                            <Shield className="w-3 h-3" /> Showing fallback text — AI service temporarily unavailable
                                        </p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-600">
                            Simulated demo for portfolio purposes — not a medical device. AI recommendations are generated by a free-tier LLM and should not be used for clinical decisions.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BreathEasyLive;
