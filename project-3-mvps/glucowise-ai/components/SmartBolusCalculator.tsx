import React, { useState, useEffect } from 'react';
import { Syringe, Settings, AlertTriangle, ChevronDown, ChevronUp, Info, Calculator, Check } from 'lucide-react';

interface SmartBolusProps {
    currentGlucose: number;
    mealCarbs: number;
}

const SmartBolusCalculator: React.FC<SmartBolusProps> = ({ currentGlucose, mealCarbs }) => {
    // Clinical Settings (Default typical Type 2 on insulin values)
    const [icr, setIcr] = useState(10); // Insulin-to-Carb Ratio (1 unit per 10g)
    const [isf, setIsf] = useState(50); // Insulin Sensitivity Factor (1 unit drops 50 mg/dL)
    const [targetBg, setTargetBg] = useState(100); // Target Glucose (mg/dL)
    const [iob, setIob] = useState(0); // Insulin On Board (Active Insulin)
    const [doseLogged, setDoseLogged] = useState(false);

    // Inputs (Auto-filled but editable)
    const [inputCarbs, setInputCarbs] = useState(mealCarbs);
    const [inputBg, setInputBg] = useState(currentGlucose);

    // Visibility State
    const [showSettings, setShowSettings] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // Sync props to inputs when they change (Auto-fill)
    useEffect(() => {
        if (mealCarbs > 0) setInputCarbs(mealCarbs);
    }, [mealCarbs]);

    useEffect(() => {
        setInputBg(currentGlucose);
    }, [currentGlucose]);

    // A new recommendation invalidates a previously logged dose
    useEffect(() => {
        setDoseLogged(false);
    }, [inputCarbs, inputBg, iob, icr, isf, targetBg]);

    // Calculation Logic
    const calculateDose = () => {
        const safeIcr = icr > 0 ? icr : 1;
        const safeIsf = isf > 0 ? isf : 1;
        // 1. Carb Bolus: Carbs / ICR
        const carbBolus = inputCarbs / safeIcr;

        // 2. Correction Bolus: (Current BG - Target) / ISF
        // Only correct if BG is above target (typically) or subtract if below
        const correctionBolus = (inputBg - targetBg) / safeIsf;

        // 3. Total Formula
        // Total = Carb Bolus + Correction Bolus - IOB
        let total = carbBolus + correctionBolus - iob;

        return Math.max(0, total); // Never recommend negative dose
    };

    const recommendedDose = calculateDose();
    const carbPart = inputCarbs / (icr > 0 ? icr : 1);
    const correctionPart = (inputBg - targetBg) / (isf > 0 ? isf : 1);

    // Safety Checks
    const isHighDose = recommendedDose > 10;
    const isHypoRisk = inputBg < 70;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-teal-500/20 p-2 rounded-lg">
                        <Calculator className="text-teal-400 w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg leading-tight">Smart Bolus</h3>
                        <p className="text-slate-400 text-xs font-medium">Clinical Dosage Calculator</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* Main Calculator Body */}
            <div className="p-6">

                {/* Settings Accordion */}
                {showSettings && (
                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200 animate-in slide-in-from-top-2 duration-300">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Clinical Parameters</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">ICR (1:g)</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={icr}
                                    onChange={(e) => setIcr(Math.max(1, Number(e.target.value)))}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-sm font-bold text-slate-700 text-center focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">ISF (mg/dL)</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={isf}
                                    onChange={(e) => setIsf(Math.max(1, Number(e.target.value)))}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-sm font-bold text-slate-700 text-center focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">Target (mg/dL)</label>
                                <input
                                    type="number"
                                    value={targetBg}
                                    onChange={(e) => setTargetBg(Number(e.target.value))}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-sm font-bold text-slate-700 text-center focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">IOB (units)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={iob}
                                    onChange={(e) => setIob(Math.max(0, Number(e.target.value)))}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-sm font-bold text-slate-700 text-center focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Inputs */}
                <div className="flex gap-4 mb-8">
                    <div className="flex-1">
                        <label className="text-xs font-bold text-slate-500 mb-1.5 block">Glucose (mg/dL)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={inputBg}
                                onChange={(e) => setInputBg(Number(e.target.value))}
                                className={`w-full bg-slate-50 border-2 rounded-xl py-3 px-3 text-xl font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none transition-colors ${inputBg > 180 ? 'border-amber-200 bg-amber-50' : inputBg < 70 ? 'border-red-200 bg-red-50' : 'border-slate-100'}`}
                            />
                            {inputBg > 180 && <AlertTriangle className="absolute right-3 top-3.5 w-5 h-5 text-amber-500" />}
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="text-xs font-bold text-slate-500 mb-1.5 block">Carbs (g)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={inputCarbs}
                                onChange={(e) => setInputCarbs(Number(e.target.value))}
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-3 text-xl font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                            {inputCarbs > 0 && <span className="absolute right-3 top-4 text-xs font-bold text-teal-600">AUTO</span>}
                        </div>
                    </div>
                </div>

                {/* Result Card */}
                <div className={`rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${isHypoRisk ? 'bg-red-50 border-2 border-red-100' : 'bg-slate-900'}`}>
                    {isHypoRisk ? (
                        <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <div className="bg-red-100 p-3 rounded-full animate-pulse">
                                    <AlertTriangle className="w-8 h-8 text-red-600" />
                                </div>
                            </div>
                            <h3 className="text-red-700 font-bold text-lg mb-1">Hypoglycemia Risk</h3>
                            <p className="text-red-600/80 text-sm font-medium">Do not take insulin. Treat hypo immediately.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-slate-400 text-sm font-medium">Recommended Dose</span>
                                {isHighDose && (
                                    <div className="flex items-center gap-1.5 bg-amber-500 text-amber-950 px-2 py-1 rounded text-[10px] font-bold">
                                        <AlertTriangle className="w-3 h-3" />
                                        High Dose
                                    </div>
                                )}
                            </div>
                            <div className="flex items-baseline gap-2 mb-4">
                                <h2 className="text-5xl font-bold text-white tracking-tight">{recommendedDose.toFixed(1)}</h2>
                                <span className="text-lg text-slate-400 font-medium">units</span>
                            </div>

                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="w-full flex items-center justify-between text-slate-400 text-xs font-medium hover:text-white transition-colors group"
                            >
                                <span>Show Breakdown</span>
                                {showDetails ? <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> : <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />}
                            </button>

                            {showDetails && (
                                <div className="mt-4 pt-4 border-t border-slate-700 space-y-2 animate-in fade-in slide-in-from-top-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-400">Meal Bolus ({inputCarbs}g / {icr})</span>
                                        <span className="text-teal-400 font-mono font-bold">{carbPart.toFixed(2)}u</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-400">Correction (({inputBg}-{targetBg}) / {isf})</span>
                                        <span className={`${correctionPart > 0 ? 'text-amber-400' : 'text-emerald-400'} font-mono font-bold`}>
                                            {correctionPart > 0 ? '+' : ''}{correctionPart.toFixed(2)}u
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-400">Active Insulin (IOB)</span>
                                        <span className="text-slate-500 font-mono font-bold">-{iob.toFixed(1)}u</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer Action */}
                {!isHypoRisk && (
                    <button
                        onClick={() => setDoseLogged(true)}
                        disabled={doseLogged || recommendedDose <= 0}
                        className={`w-full mt-4 font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${doseLogged ? 'bg-emerald-500 text-white shadow-emerald-900/10 cursor-default' : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-900/10 disabled:opacity-40 disabled:cursor-not-allowed'}`}
                    >
                        {doseLogged ? <Check className="w-5 h-5" /> : <Syringe className="w-5 h-5" />}
                        {doseLogged ? 'Dose Logged' : 'Log Dose'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SmartBolusCalculator;
