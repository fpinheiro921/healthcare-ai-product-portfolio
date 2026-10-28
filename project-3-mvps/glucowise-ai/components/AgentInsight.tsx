import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgentInsightProps {
    predictedGlucose: number;
    mealCarbs: number;
}

const AgentInsight: React.FC<AgentInsightProps> = ({ predictedGlucose, mealCarbs }) => {

    const getInsight = () => {
        if (predictedGlucose > 180) {
            if (mealCarbs > 60) {
                return {
                    type: 'critical',
                    message: "High Glycemic Load Detected.",
                    action: "This meal will spike you to 180+. I recommend adding fiber (e.g., side salad) or taking a pre-bolus."
                };
            }
            return {
                type: 'warning',
                message: "Glucose Trending High.",
                action: "Your baseline is elevated. Let's aim for a low-carb option (<30g) for lunch."
            };
        }

        return {
            type: 'success',
            message: "Metabolic State: Stable.",
            action: "You are in range (110 mg/dL). A balanced meal now will keep you steady."
        };
    };

    const insight = getInsight();
    const isCritical = insight.type === 'critical';
    const isWarning = insight.type === 'warning';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative overflow-hidden rounded-2xl p-5 border shadow-sm ${isCritical ? 'bg-red-50 border-red-200 text-red-900' :
                isWarning ? 'bg-amber-50 border-amber-200 text-amber-900' :
                    'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}
        >
            <div className="flex gap-4 items-start">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${isCritical ? 'bg-red-500 text-white' :
                    isWarning ? 'bg-amber-500 text-white' :
                        'bg-emerald-600 text-white'
                    }`}>
                    <Sparkles size={18} fill="currentColor" className={isCritical ? "animate-pulse" : ""} />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isCritical ? 'text-red-600' :
                            isWarning ? 'text-amber-600' :
                                'text-emerald-600'
                            }`}>
                            Neural Care Specialist
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Live Analysis</span>
                    </div>
                    <p className="font-bold text-sm leading-snug">
                        {insight.message}
                    </p>
                    <p className="text-xs mt-1 opacity-90 leading-relaxed">
                        {insight.action}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AgentInsight;
