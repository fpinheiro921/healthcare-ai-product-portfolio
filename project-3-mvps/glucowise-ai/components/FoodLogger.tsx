import React, { useState, useRef } from 'react';
import { Camera, Check, Loader2, Utensils } from 'lucide-react';
import { analyzeMealImage } from '../services/geminiService';
import { motion } from 'framer-motion';

interface FoodLoggerProps {
  onLog?: (data: any) => void;
}

const FoodLogger: React.FC<FoodLoggerProps> = ({ onLog }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Smart Scanner State
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [currentMeal, setCurrentMeal] = useState({
    name: '',
    carbs: '',
    calories: '',
    gi: '',
    foodItems: ''
  });

  const startScanner = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate Logic
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        name: 'Salmon Quinoa Bowl',
        carbs: 45,
        calories: 420,
        gi: 50,
        foodItems: ['Salmon', 'Quinoa', 'Avocado']
      });
      // Auto-fill form
      setCurrentMeal({
        name: 'Salmon Quinoa Bowl',
        carbs: '45',
        calories: '420',
        gi: '50',
        foodItems: 'Salmon, Quinoa, Avocado'
      });
    }, 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      analyzeImage(base64String.split(',')[1]); // Remove data URL prefix
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeMealImage(base64);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const confirmLog = () => {
    if (analysis) {
      onLog?.(analysis);
      setPreview(null);
      setAnalysis(null);
    } else if (currentMeal.name) {
      onLog?.({
        ...currentMeal,
        totalCarbs: Number(currentMeal.carbs),
        totalCalories: Number(currentMeal.calories),
        foodItems: currentMeal.foodItems.split(',').map(i => i.trim()),
        timestamp: new Date().toISOString()
      });
      // Reset
      setCurrentMeal({ name: '', carbs: '', calories: '', gi: '', foodItems: '' });
      setScanResult(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <div className="p-1.5 bg-orange-100 rounded-lg">
            <Utensils className="w-5 h-5 text-orange-500" />
          </div>
          Smart Food Logger
        </h3>
      </div>

      {!preview ? (
        <div
          className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-emerald-200 transition-all group"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Camera className="w-7 h-7 text-emerald-600" />
          </div>
          <h4 className="text-slate-700 font-bold">Snap or Upload Meal</h4>
          <p className="text-sm text-slate-400 mt-1">AI estimates carbs & suggests dosing</p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative h-56 w-full bg-slate-100 rounded-xl overflow-hidden shadow-inner">
            <img src={preview} alt="Meal preview" className="w-full h-full object-cover" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <div className="text-white flex flex-col items-center">
                  <Loader2 className="w-10 h-10 animate-spin mb-3 text-emerald-400" />
                  <span className="text-sm font-semibold tracking-wide">Analyzing nutrition...</span>
                </div>
              </div>
            )}
          </div>

          {analysis && (
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-emerald-900 text-xl">{analysis.totalCarbs}g Carbs</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-emerald-700">{analysis.totalCalories} kcal</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-medium text-emerald-700">GI: {analysis.glycemicIndexEstimate}</span>
                  </div>
                </div>
                <button
                  onClick={confirmLog}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-200"
                >
                  <Check className="w-4 h-4" />
                  Log Meal
                </button>
              </div>

              <div className="text-sm text-slate-600 mb-3">
                <span className="font-semibold text-slate-700">Identified: </span>
                {analysis.foodItems?.join(', ')}
              </div>

              {analysis.healthTip && (
                <div className="bg-white p-3 rounded-lg border border-emerald-100 text-sm text-emerald-800 italic shadow-sm">
                  "💡 {analysis.healthTip}"
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {/* AI Smart Scanner Mode */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 p-4 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                    <Camera size={18} className="text-indigo-600" />
                    Smart Food Scanner
                  </h4>
                  <p className="text-xs text-indigo-600/80 font-medium mt-0.5">
                    Point at your meal for instant analysis
                  </p>
                </div>
                {isScanning ? (
                  <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                    SCANNING...
                  </span>
                ) : scanResult ? (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Check size={12} /> CONFIDENCE: 98%
                  </span>
                ) : (
                  <button
                    onClick={startScanner}
                    className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-1"
                  >
                    Activate Camera
                  </button>
                )}
              </div>

              {/* Scanner Viewport / Simulation */}
              <div className="relative w-full aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-200 shadow-inner group cursor-pointer" onClick={startScanner}>
                {/* Placeholder Image (Salmon Bowl) */}
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
                  alt="Food to scan"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isScanning ? 'opacity-80' : 'opacity-60 grayscale'}`}
                />

                {!isScanning && !scanResult && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera size={48} className="text-white/50" />
                  </div>
                )}

                {/* Laser Scanning Animation */}
                {isScanning && (
                  <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "reverse"
                    }}
                    className="absolute left-0 right-0 h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] z-20"
                  />
                )}

                {/* Scanning Overlay Grid */}
                {isScanning && (
                  <div className="absolute inset-0 border-2 border-green-400/30">
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-green-400" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-green-400" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-green-400" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green-400" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 border border-green-400/50 rounded-full animate-ping" />
                    </div>
                  </div>
                )}

                {/* Result Overlay */}
                {scanResult && !isScanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-3 text-white border-t border-white/10"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-sm">Salmon Quinoa Bowl</p>
                        <p className="text-xs text-white/70">Detected with Computer Vision</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400 text-sm">{scanResult.carbs}g Carbs</p>
                        <p className="text-xs text-white/70">{scanResult.calories} kcal</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500 font-bold">Or enter manually</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Meal Name</label>
              <input
                type="text"
                value={currentMeal.name}
                onChange={(e) => setCurrentMeal({ ...currentMeal, name: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. Grilled Chicken Salad"
              />
            </div>
            {/* Additional manual entry fields can go here */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Carbs (g)</label>
              <input
                type="number"
                value={currentMeal.carbs}
                onChange={(e) => setCurrentMeal({ ...currentMeal, carbs: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. 50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Calories (kcal)</label>
              <input
                type="number"
                value={currentMeal.calories}
                onChange={(e) => setCurrentMeal({ ...currentMeal, calories: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. 400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Glycemic Index (GI)</label>
              <input
                type="number"
                value={currentMeal.gi}
                onChange={(e) => setCurrentMeal({ ...currentMeal, gi: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. 55"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Food Items (comma-separated)</label>
              <input
                type="text"
                value={currentMeal.foodItems}
                onChange={(e) => setCurrentMeal({ ...currentMeal, foodItems: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. Chicken, Rice, Broccoli"
              />
            </div>
            {(scanResult || currentMeal.name) && (
              <div className="flex justify-end">
                <button
                  onClick={confirmLog}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-200"
                >
                  <Check className="w-4 h-4" />
                  Log Meal
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => { setPreview(null); setAnalysis(null); setScanResult(null); setCurrentMeal({ name: '', carbs: '', calories: '', gi: '', foodItems: '' }); }}
              className="text-sm font-medium text-slate-400 hover:text-slate-600 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodLogger;