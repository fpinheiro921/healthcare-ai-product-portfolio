import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentInsightProps {
    riskScore: number;
    weightChange: number; // lbs change in last 48h
    symptomCount: number;
}

const AgentInsight: React.FC<AgentInsightProps> = ({ riskScore, weightChange, symptomCount }) => {

    // Deterministic Logic for "Agent Voice"
    const getInsight = () => {
        if (riskScore > 50) {
            if (weightChange > 2) {
                return {
                    type: 'critical',
                    message: "I've detected a fluid drift.",
                    action: "Your weight is up +2lbs. Let's swap dinner for a low-sodium option and rest tonight."
                };
            }
            if (symptomCount > 3) {
                return {
                    type: 'critical',
                    message: "Your symptoms vary from baseline.",
                    action: "Please complete a full check-in so I can update your care team."
                };
            }
            return {
                type: 'warning',
                message: "Your heart load is elevated.",
                action: "Avoid strenuous activity this afternoon. I'll check back in 4 hours."
            };
        }

        return {
            type: 'success',
            message: "You are optimally compensated.",
            action: "Great job keeping your sodium low. Keep this up to stay out of the hospital!"
        };
    };

    const insight = getInsight();
    const isCritical = insight.type === 'critical';
    const isWarning = insight.type === 'warning';

    const containerClass = isCritical
        ? 'bg-red-50 border-red-200 text-red-900'
        : isWarning
        ? 'bg-amber-50 border-amber-200 text-amber-900'
        : 'bg-emerald-50 border-emerald-200 text-emerald-900';

    const avatarClass = isCritical
        ? 'bg-red-500 text-white'
        : isWarning
        ? 'bg-amber-500 text-white'
        : 'bg-indigo-600 text-white';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border ${containerClass} shadow-sm`}
        >
            <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${avatarClass}`}>
                    <Sparkles size={18} fill="currentColor" className="animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm leading-snug">{insight.message}</p>
                    <p className="text-xs mt-1 opacity-90 leading-relaxed">{insight.action}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default AgentInsight;
