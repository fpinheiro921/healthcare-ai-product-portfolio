import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { Utensils, Syringe, Activity, TrendingUp, AlertCircle, Info } from 'lucide-react';

// Trained Model Coefficients (from ml-pipeline/train_glucose_model.py)
const MODEL_PARAMS = {
    coef: {
        Pregnancies: 0.2126,
        Glucose: 1.0713,
        BloodPressure: -0.2478,
        SkinThickness: 0.0457,
        Insulin: -0.2008,
        BMI: 0.7782,
        DiabetesPedigreeFunction: 0.2306,
        Age: 0.4212,
        Intercept: -0.8861
    },
    means: {
        Glucose: 120.86,
        BMI: 31.98,
        Age: 32.91
    },
    scales: {
        Glucose: 32.01,
        BMI: 7.73,
        Age: 11.49
    }
};

interface MealPredictorProps {
    currentGlucose: number;
    onPredictionUpdate?: (peak: number, carbs: number) => void;
}

export const MealPredictor: React.FC<MealPredictorProps> = ({ currentGlucose, onPredictionUpdate }) => {
    const [carbs, setCarbs] = useState(60); // grams
    const [insulin, setInsulin] = useState(5); // units
    const [mealType, setMealType] = useState('Balanced');

    // ... (rest of the logic remains same until data calculation) ...

    // Mock Patient Profile — glucose reflects the live latest reading
    const patientProfile = {
        Glucose: currentGlucose,
        BMI: 28.5,
        Age: 42
    };

    // Calculate Metabolic Resistance Score using trained model
    const resistanceScore = useMemo(() => {
        const normGlucose = (patientProfile.Glucose - MODEL_PARAMS.means.Glucose) / MODEL_PARAMS.scales.Glucose;
        const normBMI = (patientProfile.BMI - MODEL_PARAMS.means.BMI) / MODEL_PARAMS.scales.BMI;
        const normAge = (patientProfile.Age - MODEL_PARAMS.means.Age) / MODEL_PARAMS.scales.Age;

        let logit = MODEL_PARAMS.coef.Intercept +
            (MODEL_PARAMS.coef.Glucose * normGlucose) +
            (MODEL_PARAMS.coef.BMI * normBMI) +
            (MODEL_PARAMS.coef.Age * normAge);

        // Sigmoid to get probability (0-1) representing resistance level
        return 1 / (1 + Math.exp(-logit));
    }, [currentGlucose]);

    // Generate Prediction Curve
    const data = useMemo(() => {
        const points = [];
        const baseline = currentGlucose;

        // PK/PD Simulation Parameters
        // Peak height depends on Carbs and Resistance
        const carbSensitivity = 3.5; // mg/dL per gram of carb (base)
        const resistanceFactor = 1 + resistanceScore; // Multiplier (e.g., 1.8x for high resistance)
        const maxRise = carbs * carbSensitivity * resistanceFactor;

        // Insulin effect
        const insulinSensitivity = 40; // mg/dL drop per unit (ISF)
        const insulinEffectTotal = insulin * insulinSensitivity;

        // Time constants (minutes)
        const absorptionPeakTime = mealType === 'Pizza/Pasta' ? 90 : 45; // Slower for complex carbs
        const insulinPeakTime = 60; // Rapid acting insulin

        for (let t = 0; t <= 240; t += 15) { // 4 hours
            // Glucose Absorption Curve (Gamma distribution-like)
            const absorption = maxRise * (t / absorptionPeakTime) * Math.exp(1 - t / absorptionPeakTime);

            // Insulin Action Curve
            const insulinAction = insulinEffectTotal * (t / insulinPeakTime) * Math.exp(1 - t / insulinPeakTime);

            // Net Glucose
            let value = baseline + absorption - (insulin > 0 ? insulinAction : 0);

            // Add some noise/realism
            value = Math.max(40, value); // Floor matches chart domain so predicted lows stay visible

            points.push({
                time: t,
                glucose: Math.round(value),
                optimalHigh: 180,
                optimalLow: 70
            });
        }
        return points;
    }, [carbs, insulin, mealType, currentGlucose, resistanceScore]);

    const peakGlucose = Math.max(...data.map(d => d.glucose));
    const minGlucose = Math.min(...data.map(d => d.glucose));
    const isHigh = peakGlucose > 180;
    const isLow = minGlucose < 70;

    // Report back to parent
    useEffect(() => {
        if (onPredictionUpdate) {
            onPredictionUpdate(peakGlucose, carbs);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [peakGlucose, carbs]);

    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-teal-50/50 to-white">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-teal-100 text-teal-700 rounded-xl">
                        <Utensils size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg">Meal Predictor</h3>
                        <p className="text-xs text-slate-500 font-medium">AI-powered glucose simulation</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                    <Activity size={14} />
                    <span>Resistance Score: {(resistanceScore * 100).toFixed(0)}%</span>
                </div>
            </div>

            <div className="flex flex-col">
                {/* Chart Section - Always Top, Full Width */}
                <div className="bg-slate-50/50 border-b border-slate-100 p-4 relative h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey="time"
                                tickFormatter={(val) => `${val}m`}
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                dy={5}
                            />
                            <YAxis
                                domain={[40, 300]}
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <ReferenceLine y={180} stroke="#fbbf24" strokeDasharray="3 3" label={{ value: 'High', fill: '#d97706', fontSize: 10, position: 'insideRight' }} />
                            <ReferenceLine y={70} stroke="#f87171" strokeDasharray="3 3" label={{ value: 'Low', fill: '#dc2626', fontSize: 10, position: 'insideRight' }} />
                            <Area
                                type="monotone"
                                dataKey="glucose"
                                stroke="#0d9488"
                                strokeWidth={3}
                                fill="url(#colorGlucose)"
                                animationDuration={500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    {/* AI Insight - Compact Strip Overlay */}
                    <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg shrink-0 ${isHigh ? 'bg-amber-100 text-amber-600' : isLow ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {isHigh ? <AlertCircle size={16} /> : isLow ? <AlertCircle size={16} /> : <TrendingUp size={16} />}
                        </div>
                        <p className="text-xs text-slate-700 leading-tight font-medium">
                            {isHigh ? `Spike predicted. Try ${Math.max(0, Math.round(insulin + (peakGlucose - 150) / 40))}u insulin.` :
                                isLow ? `Hypo risk! Reduce insulin.` :
                                    `Good control.`}
                        </p>
                    </div>
                </div>

                {/* Info & Controls Section */}
                <div className="p-5 space-y-6 bg-white">
                    {/* Stats Row */}
                    <div className="flex gap-4">
                        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Peak</span>
                            <span className={`text-xl font-bold ${isHigh ? 'text-amber-600' : 'text-slate-700'}`}>{peakGlucose}</span>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Min</span>
                            <span className={`text-xl font-bold ${isLow ? 'text-red-600' : 'text-slate-700'}`}>{minGlucose}</span>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resist.</span>
                            <span className="text-xl font-bold text-slate-700">{(resistanceScore * 100).toFixed(0)}%</span>
                        </div>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-bold text-slate-700">Meal Carbs</label>
                                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">{carbs}g</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="150"
                                step="5"
                                value={carbs}
                                onChange={(e) => setCarbs(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                            />
                            <div className="flex gap-2 mt-4">
                                {['Salad', 'Balanced', 'Pizza'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setMealType(type === 'Pizza' ? 'Pizza/Pasta' : type)}
                                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all border ${mealType === (type === 'Pizza' ? 'Pizza/Pasta' : type)
                                            ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Syringe size={16} className="text-slate-400" /> Insulin Dose
                                </label>
                                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">{insulin}u</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                step="1"
                                value={insulin}
                                onChange={(e) => setInsulin(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
