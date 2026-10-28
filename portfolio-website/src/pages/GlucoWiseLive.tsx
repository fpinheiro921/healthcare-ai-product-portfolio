import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
    ArrowLeft,
    Droplet,
    Activity,
    Utensils,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    TrendingDown,
    Zap,
    Clock,
    Shield
} from 'lucide-react';
import { askAI, AIResult } from '../lib/aiClient';
import { PROMPTS } from '../lib/prompts';

interface GlucoseReading {
    timestamp: string;
    value: number;
    trend: 'rising' | 'stable' | 'falling';
}

interface MealEntry {
    name: string;
    carbs: number;
    protein: number;
    fat: number;
    timestamp: string;
}

function GlucoWiseLive() {
    const [glucoseReadings, setGlucoseReadings] = useState<GlucoseReading[]>([]);
    const [currentGlucose, setCurrentGlucose] = useState(110);
    const [iob, setIob] = useState(2.5); // Insulin on Board
    const [lastMeal, setLastMeal] = useState<MealEntry | null>(null);
    const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [isFallback, setIsFallback] = useState(false);
    const [status, setStatus] = useState<'optimal' | 'rising' | 'high' | 'low'>('optimal');
    const [isMonitoring, setIsMonitoring] = useState(true);
    const aiRequestInFlight = useRef(false);
    const abortRef = useRef<AbortController | null>(null);
    const lastStatusRef = useRef<'optimal' | 'rising' | 'high' | 'low'>('optimal');
    const stableStatusCountRef = useRef(0);

    const mealPresets: MealEntry[] = [
        { name: "Pizza (3 slices)", carbs: 85, protein: 25, fat: 30, timestamp: "" },
        { name: "Salad + Chicken", carbs: 15, protein: 35, fat: 12, timestamp: "" },
        { name: "Pasta Carbonara", carbs: 70, protein: 20, fat: 25, timestamp: "" },
        { name: "Burger + Fries", carbs: 65, protein: 30, fat: 40, timestamp: "" }
    ];

    useEffect(() => {
        if (!isMonitoring) return;

        const interval = setInterval(() => {
            // Simulate glucose changes
            let change = (Math.random() * 10 - 4);
            if (lastMeal && lastMeal.fat > 25) {
                change += 3;
            }
            const newGlucose = Math.max(70, Math.min(250, currentGlucose + change));

            const trend = change > 2 ? 'rising' : change < -2 ? 'falling' : 'stable';
            const newReading: GlucoseReading = {
                timestamp: new Date().toLocaleTimeString(),
                value: Math.round(newGlucose),
                trend
            };

            setGlucoseReadings(prev => [newReading, ...prev].slice(0, 12));
            setCurrentGlucose(newGlucose);
            setIob(prev => Math.max(0, prev - 0.2));

            // Local threshold-based status
            const newStatus = newGlucose > 180 ? 'high' : newGlucose < 80 ? 'low' : trend === 'rising' && newGlucose > 140 ? 'rising' : 'optimal';
            setStatus(newStatus);

            // Debounce: only call LLM when status changes or after 3 stable ticks
            if (newStatus !== lastStatusRef.current) {
                stableStatusCountRef.current = 0;
                lastStatusRef.current = newStatus;
            } else {
                stableStatusCountRef.current++;
            }

            const shouldCallLLM = newStatus !== 'optimal' || stableStatusCountRef.current >= 3;

            if (shouldCallLLM && !aiRequestInFlight.current) {
                aiRequestInFlight.current = true;
                setIsThinking(true);
                const userPrompt = PROMPTS.glucowise.userTemplate({
                    glucose: Math.round(newGlucose),
                    trend,
                    iob,
                    status: newStatus,
                    lastMeal: lastMeal ? `${lastMeal.name} (carbs:${lastMeal.carbs}g, fat:${lastMeal.fat}g)` : null,
                });
                const controller = new AbortController();
                abortRef.current = controller;
                askAI(PROMPTS.glucowise.system, userPrompt, 200, controller.signal)
                    .then((result: AIResult) => {
                        setAiRecommendation(result.text);
                        setIsFallback(result.isFallback);
                    })
                    .finally(() => {
                        setIsThinking(false);
                        aiRequestInFlight.current = false;
                        abortRef.current = null;
                    });
            }
        }, 3000);

        return () => {
            clearInterval(interval);
            abortRef.current?.abort();
        };
    }, [isMonitoring, currentGlucose, lastMeal, iob]);

    // Cleanup on unmount
    useEffect(() => {
        return () => abortRef.current?.abort();
    }, []);

    const logMeal = (meal: MealEntry) => {
        const mealWithTime = { ...meal, timestamp: new Date().toLocaleTimeString() };
        setLastMeal(mealWithTime);
        setIob(prev => prev + (meal.carbs / 10));

        // Real LLM call for meal bolus recommendation — guard against interval race
        if (aiRequestInFlight.current) {
            abortRef.current?.abort();
            aiRequestInFlight.current = false;
        }
        aiRequestInFlight.current = true;
        setIsThinking(true);
        const userPrompt = PROMPTS.glucowise.mealTemplate({
            mealName: meal.name,
            carbs: meal.carbs,
            protein: meal.protein,
            fat: meal.fat,
            glucose: Math.round(currentGlucose),
            iob,
            isHighFat: meal.fat > 25,
        });
        const controller = new AbortController();
        abortRef.current = controller;
        askAI(PROMPTS.glucowise.system, userPrompt, 200, controller.signal)
            .then((result: AIResult) => {
                setAiRecommendation(result.text);
                setIsFallback(result.isFallback);
            })
            .finally(() => {
                setIsThinking(false);
                aiRequestInFlight.current = false;
                abortRef.current = null;
            });
    };

    const statusColors = {
        optimal: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10',
        rising: 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10',
        high: 'text-red-400 border-red-500/50 bg-red-500/10',
        low: 'text-orange-400 border-orange-500/50 bg-orange-500/10'
    };

    const glucoseColor = currentGlucose > 180 ? 'text-red-400' : currentGlucose < 80 ? 'text-orange-400' : 'text-emerald-400';

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-orange-500/30 font-sans">
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
                                to="/glucowise-showcase"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold">GlucoWise <span className="text-orange-400">Live</span></h1>
                                <p className="text-sm text-slate-400">Intelligent Glucose Management System</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <Zap className="w-3 h-3 text-orange-400" />
                                IOB: {iob.toFixed(1)}U
                            </span>
                            <span className="w-px h-3 bg-white/10"></span>
                            <span className={`px-2 py-0.5 rounded ${statusColors[status]}`}>{status.toUpperCase()}</span>
                        </div>
                    </motion.div>

                    {/* Main Dashboard Grid */}
                    <div className="flex-1 grid lg:grid-cols-3 gap-6">

                        {/* Current Glucose */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center"
                        >
                            <Droplet className={`w-12 h-12 mb-4 ${glucoseColor}`} />
                            <div className={`text-6xl font-bold font-mono ${glucoseColor}`}>
                                {Math.round(currentGlucose)}
                            </div>
                            <div className="text-sm text-slate-400 mt-2">mg/dL</div>

                            <div className="flex items-center gap-2 mt-4 text-sm">
                                {glucoseReadings[0]?.trend === 'rising' && <TrendingUp className="w-4 h-4 text-yellow-400" />}
                                {glucoseReadings[0]?.trend === 'falling' && <TrendingDown className="w-4 h-4 text-blue-400" />}
                                {glucoseReadings[0]?.trend === 'stable' && <Activity className="w-4 h-4 text-emerald-400" />}
                                <span className="text-slate-400 capitalize">{glucoseReadings[0]?.trend || 'stable'}</span>
                            </div>

                            <button
                                onClick={() => setIsMonitoring(!isMonitoring)}
                                className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${isMonitoring ? 'bg-orange-600 hover:bg-orange-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                            >
                                {isMonitoring ? 'Monitoring Active' : 'Resume'}
                            </button>
                        </motion.div>

                        {/* Quick Meal Log */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <Utensils className="w-5 h-5 text-orange-400" />
                                Quick Log Meal
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                {mealPresets.map((meal, i) => (
                                    <button
                                        key={i}
                                        onClick={() => logMeal(meal)}
                                        className="p-3 bg-black/30 rounded-xl text-left hover:bg-white/5 transition-colors border border-white/5 hover:border-orange-500/30"
                                    >
                                        <div className="text-sm font-bold mb-1">{meal.name}</div>
                                        <div className="text-xs text-slate-500">
                                            C: {meal.carbs}g | P: {meal.protein}g | F: {meal.fat}g
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {lastMeal && (
                                <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-sm">
                                    <div className="flex items-center gap-2 text-orange-400 font-bold">
                                        <Clock className="w-4 h-4" />
                                        Last: {lastMeal.name}
                                    </div>
                                    <div className="text-slate-400 text-xs mt-1">Logged at {lastMeal.timestamp}</div>
                                </div>
                            )}
                        </motion.div>

                        {/* Glucose History */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <Activity className="w-5 h-5 text-orange-400" />
                                Reading History
                            </h2>

                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                <AnimatePresence>
                                    {glucoseReadings.map((r, i) => (
                                        <motion.div
                                            key={r.timestamp + i}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center justify-between text-sm bg-black/20 px-3 py-2 rounded-lg font-mono"
                                        >
                                            <span className="text-slate-500">{r.timestamp}</span>
                                            <span className={r.value > 180 ? 'text-red-400' : r.value < 80 ? 'text-orange-400' : 'text-emerald-400'}>
                                                {r.value} mg/dL
                                            </span>
                                            {r.trend === 'rising' && <TrendingUp className="w-3 h-3 text-yellow-400" />}
                                            {r.trend === 'falling' && <TrendingDown className="w-3 h-3 text-blue-400" />}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* AI Recommendation Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-3 bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <Droplet className="w-5 h-5 text-orange-500" />
                                GlucoWise AI Analysis
                            </h2>

                            {isThinking ? (
                                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                                    <p className="font-mono text-sm text-slate-400 flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></span>
                                        GlucoWise AI is analyzing glucose data...
                                    </p>
                                </div>
                            ) : aiRecommendation ? (
                                <div>
                                    <motion.div
                                        key={aiRecommendation}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`p-4 rounded-xl border ${statusColors[status]}`}
                                    >
                                        <p className="font-mono text-sm leading-relaxed">{aiRecommendation}</p>
                                    </motion.div>
                                    {isFallback && (
                                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                            <Shield className="w-3 h-3" /> Showing fallback text — AI service temporarily unavailable
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                                    <p className="font-mono text-sm flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Glucose in target range. No action required.
                                    </p>
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

export default GlucoWiseLive;
