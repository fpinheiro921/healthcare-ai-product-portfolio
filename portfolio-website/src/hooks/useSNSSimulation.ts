import { useState, useMemo } from 'react';

export type AgentId =
    | 'heartguide' | 'breatheasy' | 'glucowise'
    | 'ecoward' | 'rxoptimize' | 'gestalink'
    | 'patho-ai' | 'mindbridge' | 'portersmart'
    | 'cliniscript' | 'sentinel' | 'fasttrack'
    | 'triage-os' | 'flowmaster' | 'sepsis-sentinel' | 'careflow-architect' | 'docu-flow' | 'surge-commander';

// Grouping for UI
export const AGENT_CATEGORIES = {
    CHRONIC: ['heartguide', 'breatheasy', 'glucowise', 'mindbridge'],
    CLINICAL: ['patho-ai', 'gestalink', 'rxoptimize', 'sepsis-sentinel', 'triage-os', 'docu-flow', 'careflow-architect'],
    OPERATIONAL: ['ecoward', 'portersmart', 'flowmaster', 'fasttrack', 'cliniscript', 'sentinel', 'surge-commander']
};

interface AgentImpact {
    id: AgentId;
    name: string;
    description: string;
    // Impact deltas (negative is reduction/better, positive is improvement)
    costSavings: number; // Billions
    occupancyReduction: number; // Percent points
    waitWaitReduction: number; // Percent
    burnoutReduction: number; // Points (0-10)
    safetyImprovement: number; // Percent reduction in events
}

const AGENT_DATA: Record<string, AgentImpact> = {
    // CHRONIC
    'heartguide': { id: 'heartguide', name: 'HeartGuide AI', description: 'Prevent Heart Failure Readmissions', costSavings: 0.8, occupancyReduction: 4.5, waitWaitReduction: 2, burnoutReduction: 0.2, safetyImprovement: 5 },
    'breatheasy': { id: 'breatheasy', name: 'BreathEasy AI', description: 'Prevent Asthma ER Visits', costSavings: 0.4, occupancyReduction: 1.2, waitWaitReduction: 8, burnoutReduction: 0.1, safetyImprovement: 2 },
    'glucowise': { id: 'glucowise', name: 'GlucoWise AI', description: 'Metabolic Disease Management', costSavings: 1.2, occupancyReduction: 2.0, waitWaitReduction: 1, burnoutReduction: 0.1, safetyImprovement: 3 },
    'mindbridge': { id: 'mindbridge', name: 'MindBridge AI', description: 'Mental Health Triage', costSavings: 0.3, occupancyReduction: 0.5, waitWaitReduction: 5, burnoutReduction: 0.3, safetyImprovement: 4 },

    // CLINICAL
    'patho-ai': { id: 'patho-ai', name: 'Patho-AI', description: 'Oncology Staging Accuracy', costSavings: 0.2, occupancyReduction: 0, waitWaitReduction: 0, burnoutReduction: 0.2, safetyImprovement: 8 },
    'gestalink': { id: 'gestalink', name: 'GestaLink Agent', description: 'Maternal Safety Monitor', costSavings: 0.3, occupancyReduction: 0.8, waitWaitReduction: 1, burnoutReduction: 0.3, safetyImprovement: 12 },
    'rxoptimize': { id: 'rxoptimize', name: 'RxOptimize', description: 'Medication Error Prevention', costSavings: 0.5, occupancyReduction: 1.5, waitWaitReduction: 0, burnoutReduction: 0.2, safetyImprovement: 15 },
    'sepsis-sentinel': { id: 'sepsis-sentinel', name: 'SepsisSentinel', description: 'Early Sepsis Detection', costSavings: 0.6, occupancyReduction: 3.0, waitWaitReduction: 0, burnoutReduction: 0.4, safetyImprovement: 20 },
    'triage-os': { id: 'triage-os', name: 'HealthLine AI', description: 'National Symptom Triage', costSavings: 0.4, occupancyReduction: 0, waitWaitReduction: 15, burnoutReduction: 0.5, safetyImprovement: 5 },
    'docu-flow': { id: 'docu-flow', name: 'DocuFlow', description: 'Clinical Documentation Engine', costSavings: 0.2, occupancyReduction: 0, waitWaitReduction: 0, burnoutReduction: 1.5, safetyImprovement: 1 },
    'careflow-architect': { id: 'careflow-architect', name: 'CareFlow Architect', description: 'Protocol Standardization', costSavings: 0.1, occupancyReduction: 0.5, waitWaitReduction: 2, burnoutReduction: 0.2, safetyImprovement: 5 },

    // OPERATIONAL
    'ecoward': { id: 'ecoward', name: 'EcoWard', description: 'Sustainability & Waste', costSavings: 0.2, occupancyReduction: 0, waitWaitReduction: 0, burnoutReduction: 0.1, safetyImprovement: 0 },
    'portersmart': { id: 'portersmart', name: 'PorterSmart', description: 'Patient Transport Logistics', costSavings: 0.1, occupancyReduction: 0.5, waitWaitReduction: 5, burnoutReduction: 0.3, safetyImprovement: 0 },
    'flowmaster': { id: 'flowmaster', name: 'FlowMaster', description: 'Discharge Flow Prediction', costSavings: 0.4, occupancyReduction: 5.0, waitWaitReduction: 8, burnoutReduction: 0.4, safetyImprovement: 0 },
    'fasttrack': { id: 'fasttrack', name: 'FastTrack AI', description: 'ED Kiosk Check-in', costSavings: 0.1, occupancyReduction: 0, waitWaitReduction: 10, burnoutReduction: 0.3, safetyImprovement: 0 },
    'cliniscript': { id: 'cliniscript', name: 'CliniScript', description: 'Ambient Clinical Scribe', costSavings: 0.3, occupancyReduction: 0, waitWaitReduction: 0, burnoutReduction: 2.0, safetyImprovement: 2 },
    'sentinel': { id: 'sentinel', name: 'Sentinel AI', description: 'Waiting Room Vision', costSavings: 0.05, occupancyReduction: 0, waitWaitReduction: 0, burnoutReduction: 0.1, safetyImprovement: 8 },
    'surge-commander': { id: 'surge-commander', name: 'National Health OS', description: 'Network Capacity Loading', costSavings: 0.5, occupancyReduction: 4.0, waitWaitReduction: 12, burnoutReduction: 0.5, safetyImprovement: 0 },
};

export const useSNSSimulation = () => {
    const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());

    const toggleAgent = (id: string) => {
        const newSet = new Set(activeAgents);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setActiveAgents(newSet);
    };

    const toggleAll = (enable: boolean) => {
        if (enable) {
            setActiveAgents(new Set(Object.keys(AGENT_DATA)));
        } else {
            setActiveAgents(new Set());
        }
    };

    const metrics = useMemo(() => {
        // Baseline Metrics (The "Problem" State)
        // Baseline Metrics (The "Problem" State)
        let cost = 15.0; // Billion EUR (approx. SNS budget pressure)
        let occupancy = 96.0; // % (Critical Saturation)
        let waitTime = 6.0; // Hours (LVT Average)
        let burnout = 8.4; // Index / 10
        let safety = 12500; // Preventable Adverse Events / yr

        const activeCount = activeAgents.size;

        activeAgents.forEach(id => {
            const data = AGENT_DATA[id];
            if (!data) return;

            cost -= data.costSavings;
            occupancy -= data.occupancyReduction;
            waitTime = waitTime * (1 - (data.waitWaitReduction / 100)); // Percentage reduction
            burnout -= data.burnoutReduction;
            safety = safety * (1 - (data.safetyImprovement / 100));
        });

        // Synergy Bonus: If > 10 agents active, add "Platform Effect"
        if (activeCount > 10) {
            cost *= 0.95; // 5% extra cost efficiency
            occupancy -= 2;
            burnout -= 0.5;
        }

        return {
            cost: Math.max(8, cost), // Floor values
            occupancy: Math.max(70, occupancy),
            waitTime: Math.max(1, waitTime),
            burnout: Math.max(2, burnout),
            safety: Math.round(Math.max(1000, safety)),
            activeCount
        };
    }, [activeAgents]);

    return {
        activeAgents,
        toggleAgent,
        toggleAll,
        metrics,
        AGENT_DATA
    };
};
