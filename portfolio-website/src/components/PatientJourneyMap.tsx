import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, Wind, Droplet, Brain, Baby,
    ShieldCheck, Pill, GitBranch, FileText,
    Monitor, Eye, ShieldAlert,
    Activity, Truck, Microscope, Leaf,
    X
} from 'lucide-react';

// ─── Data Definitions ───────────────────────────────────────────────

interface AppIntervention {
    id: string;
    name: string;
    icon: any;
    color: string;
    action: string;
    impact: string;
}

interface JourneyStep {
    id: string;
    location: string;
    locationIcon: string;
    description: string;
    apps: AppIntervention[];
}

interface PatientJourney {
    id: string;
    condition: string;
    patient: string;
    color: string;
    borderColor: string;
    bgColor: string;
    textColor: string;
    dotColor: string;
    paths: {
        label: string;
        severity: string;
        steps: JourneyStep[];
    }[];
}

const JOURNEYS: PatientJourney[] = [
    {
        id: 'hf',
        condition: 'Heart Failure',
        patient: 'Maria, 68y — NYHA Class III',
        color: 'from-rose-500 to-pink-600',
        borderColor: 'border-rose-500/30',
        bgColor: 'bg-rose-500/10',
        textColor: 'text-rose-400',
        dotColor: 'bg-rose-500',
        paths: [
            {
                label: 'Mild Decompensation',
                severity: 'mild',
                steps: [
                    {
                        id: 'hf-home',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'Maria notices ankle swelling and mild dyspnea climbing stairs. Weight up 1.2 kg overnight.',
                        apps: [
                            { id: 'heartguide', name: 'HeartGuide AI', icon: Heart, color: 'text-rose-400', action: 'Detects weight trend + symptom pattern via daily check-in', impact: 'Flags decompensation risk 48h before crisis' },
                            { id: 'mindbridge', name: 'MindBridge AI', icon: Brain, color: 'text-violet-400', action: 'Monitors anxiety/depression that worsen HF adherence', impact: 'Reduces medication non-compliance by 25%' }
                        ]
                    },
                    {
                        id: 'hf-pc-mild',
                        location: 'Primary Care',
                        locationIcon: 'local_hospital',
                        description: 'GP reviews HeartGuide alert. Increases Furosemide 40→60mg. Schedules follow-up in 48h.',
                        apps: [
                            { id: 'rxoptimize', name: 'RxOptimize', icon: Pill, color: 'text-blue-400', action: 'Checks drug interactions, renal function before dose change', impact: 'Prevents 15% of adverse drug events' },
                            { id: 'docu-flow', name: 'DocuFlow', icon: FileText, color: 'text-slate-400', action: 'Auto-generates visit note with ACC/AHA guideline citations', impact: 'Saves 12 min per consultation' },
                            { id: 'careflow-architect', name: 'CareFlow Architect', icon: GitBranch, color: 'text-teal-400', action: 'Ensures HF pathway protocol is followed', impact: 'Standardizes care across 150+ USFs' }
                        ]
                    },
                    {
                        id: 'hf-home-return-mild',
                        location: 'Back Home',
                        locationIcon: 'house',
                        description: 'Maria returns home. Weight stabilizes in 3 days. No ER visit needed.',
                        apps: [
                            { id: 'heartguide', name: 'HeartGuide AI', icon: Heart, color: 'text-rose-400', action: 'Continues daily monitoring, confirms weight trend reversal', impact: 'ER visit avoided — saves ~€3,200' }
                        ]
                    }
                ]
            },
            {
                label: 'Moderate — ED Required',
                severity: 'moderate',
                steps: [
                    {
                        id: 'hf-home-mod',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'Weight +2.5 kg in 48h. Orthopnea worsening. Sleeping in chair.',
                        apps: [
                            { id: 'heartguide', name: 'HeartGuide AI', icon: Heart, color: 'text-rose-400', action: 'Sends SMS symptom check: confirms orthopnea + PND', impact: 'Triggers immediate escalation pathway' }
                        ]
                    },
                    {
                        id: 'hf-pc-mod',
                        location: 'Primary Care',
                        locationIcon: 'local_hospital',
                        description: 'GP unable to manage outpatient. Refers to Emergency Department.',
                        apps: [
                            { id: 'triage-os', name: 'HealthLine AI', icon: ShieldCheck, color: 'text-emerald-400', action: 'Pre-triages patient, sends structured handoff to ED', impact: 'ED knows patient is coming — bed pre-allocated' },
                            { id: 'docu-flow', name: 'DocuFlow', icon: FileText, color: 'text-slate-400', action: 'Generates referral letter with full RPM history', impact: 'ED physician has complete context on arrival' }
                        ]
                    },
                    {
                        id: 'hf-ed-mod',
                        location: 'Emergency Dept',
                        locationIcon: 'emergency',
                        description: 'IV Furosemide 80mg. Labs, BNP, CXR. Observation for 6 hours.',
                        apps: [
                            { id: 'fasttrack', name: 'FastTrack AI', icon: Monitor, color: 'text-amber-400', action: 'Kiosk check-in with pre-populated data from referral', impact: 'Registration time: 45s vs 12 min' },
                            { id: 'sentinel', name: 'Sentinel AI', icon: Eye, color: 'text-cyan-400', action: 'Monitors waiting room for deterioration signs', impact: 'Detects 8% of cases that worsen while waiting' },
                            { id: 'sepsis-sentinel', name: 'SepsisSentinel', icon: ShieldAlert, color: 'text-red-400', action: 'Screens for concurrent infection (common HF trigger)', impact: 'Catches sepsis 2.1h earlier than standard screening' }
                        ]
                    },
                    {
                        id: 'hf-home-return-mod',
                        location: 'Back Home',
                        locationIcon: 'house',
                        description: 'Discharged after 8h. Oral diuretics adjusted. Follow-up in 24h.',
                        apps: [
                            { id: 'heartguide', name: 'HeartGuide AI', icon: Heart, color: 'text-rose-400', action: 'Intensive monitoring: twice-daily weight + symptom checks', impact: 'Readmission rate reduced by 38%' }
                        ]
                    }
                ]
            },
            {
                label: 'Severe — Hospital Admission',
                severity: 'severe',
                steps: [
                    {
                        id: 'hf-home-sev',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'Acute dyspnea at rest. Cannot lie flat. SpO2 88%. Family calls 112.',
                        apps: [
                            { id: 'heartguide', name: 'HeartGuide AI', icon: Heart, color: 'text-rose-400', action: 'Real-time alert to cardiology + INEM with full patient profile', impact: 'Ambulance crew arrives pre-briefed' }
                        ]
                    },
                    {
                        id: 'hf-ed-sev',
                        location: 'Emergency Dept',
                        locationIcon: 'emergency',
                        description: 'BIPAP, IV diuretics, vasodilators. Decision: admit to Cardiology.',
                        apps: [
                            { id: 'fasttrack', name: 'FastTrack AI', icon: Monitor, color: 'text-amber-400', action: 'Fast-lane admission bypass — no kiosk needed', impact: 'Time to treatment: <10 min' },
                            { id: 'surge-commander', name: 'Surge Commander', icon: ShieldAlert, color: 'text-purple-400', action: 'Finds available cardiology bed across hospital network', impact: 'Bed assignment in 4 min vs 45 min manual' },
                            { id: 'cliniscript', name: 'CliniScript', icon: FileText, color: 'text-sky-400', action: 'Ambient scribe captures ED physician assessment', impact: 'Documentation complete before admission order' }
                        ]
                    },
                    {
                        id: 'hf-ward-sev',
                        location: 'Hospital Ward',
                        locationIcon: 'bed',
                        description: 'IV therapy 72h. Cardiac rehab consult. Medication optimization.',
                        apps: [
                            { id: 'sepsis-sentinel', name: 'SepsisSentinel', icon: ShieldAlert, color: 'text-red-400', action: 'Continuous sepsis screening during hospital stay', impact: 'Hospital-acquired infection detection 4h faster' },
                            { id: 'flowmaster', name: 'FlowMaster', icon: Activity, color: 'text-teal-400', action: 'Predicts discharge readiness based on vitals + labs trend', impact: 'Reduces LOS by 1.2 days on average' },
                            { id: 'portersmart', name: 'PorterSmart', icon: Truck, color: 'text-orange-400', action: 'Coordinates echo/CT transport slots automatically', impact: 'Diagnostic delay reduced by 60%' },
                            { id: 'patho-ai', name: 'Patho-AI', icon: Microscope, color: 'text-pink-400', action: 'Analyzes cardiac biomarker trends for prognostication', impact: 'Risk stratification accuracy +22%' }
                        ]
                    },
                    {
                        id: 'hf-discharge-sev',
                        location: 'Discharge Home',
                        locationIcon: 'house',
                        description: 'Discharged day 5. Optimized on Entresto + Dapagliflozin. RPM kit provided.',
                        apps: [
                            { id: 'heartguide', name: 'HeartGuide AI', icon: Heart, color: 'text-rose-400', action: 'Transition to intensive remote monitoring program', impact: '30-day readmission risk: 8% vs 24% national avg' },
                            { id: 'rxoptimize', name: 'RxOptimize', icon: Pill, color: 'text-blue-400', action: 'Medication reconciliation + adherence tracking', impact: 'Ensures no discharge medication errors' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'dm',
        condition: 'Diabetes',
        patient: 'João, 45y — Type 2, on Insulin',
        color: 'from-orange-500 to-amber-600',
        borderColor: 'border-orange-500/30',
        bgColor: 'bg-orange-500/10',
        textColor: 'text-orange-400',
        dotColor: 'bg-orange-500',
        paths: [
            {
                label: 'Mild — Glucose Spike',
                severity: 'mild',
                steps: [
                    {
                        id: 'dm-home',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'João eats high-carb meal. CGM shows rapid glucose rise to 210 mg/dL.',
                        apps: [
                            { id: 'glucowise', name: 'GlucoWise AI', icon: Droplet, color: 'text-orange-400', action: 'Detects glucose velocity spike + meal photo analysis', impact: 'Real-time insulin dose recommendation' }
                        ]
                    },
                    {
                        id: 'dm-pc-mild',
                        location: 'Primary Care',
                        locationIcon: 'local_hospital',
                        description: 'Weekly virtual check-in. GP reviews GlucoWise report. Adjusts basal insulin.',
                        apps: [
                            { id: 'rxoptimize', name: 'RxOptimize', icon: Pill, color: 'text-blue-400', action: 'Titration algorithm suggests basal adjustment', impact: 'HbA1c reduction: 0.8% in 3 months' },
                            { id: 'docu-flow', name: 'DocuFlow', icon: FileText, color: 'text-slate-400', action: 'Auto-generates diabetes management summary', impact: 'Structured data for endocrinology referral if needed' }
                        ]
                    },
                    {
                        id: 'dm-home-return-mild',
                        location: 'Back Home',
                        locationIcon: 'house',
                        description: 'Glucose stabilizes. Time-in-range improves from 52% to 71% over 4 weeks.',
                        apps: [
                            { id: 'glucowise', name: 'GlucoWise AI', icon: Droplet, color: 'text-orange-400', action: 'Continues CGM coaching + meal pattern learning', impact: 'Prevents progression to insulin-dependent complications' }
                        ]
                    }
                ]
            },
            {
                label: 'Moderate — Hypoglycemia Risk',
                severity: 'moderate',
                steps: [
                    {
                        id: 'dm-home-mod',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'CGM drops to 55 mg/dL at 3 AM. João is asleep.',
                        apps: [
                            { id: 'glucowise', name: 'GlucoWise AI', icon: Droplet, color: 'text-orange-400', action: 'Alarm triggered on phone + smartwatch. Predicted 30 min earlier.', impact: 'Severe hypoglycemia prevented' }
                        ]
                    },
                    {
                        id: 'dm-pc-mod',
                        location: 'Primary Care',
                        locationIcon: 'local_hospital',
                        description: 'Next-day urgent consult. GP reviews nocturnal hypo pattern.',
                        apps: [
                            { id: 'triage-os', name: 'HealthLine AI', icon: ShieldCheck, color: 'text-emerald-400', action: 'Auto-schedules urgent slot based on severity flag', impact: 'Same-day appointment vs 2-week wait' },
                            { id: 'rxoptimize', name: 'RxOptimize', icon: Pill, color: 'text-blue-400', action: 'Identifies insulin stacking + suggests dose reduction', impact: 'Eliminates nocturnal hypo pattern' }
                        ]
                    },
                    {
                        id: 'dm-home-return-mod',
                        location: 'Back Home',
                        locationIcon: 'house',
                        description: 'Basal insulin reduced. Zero hypo events in next 30 days.',
                        apps: [
                            { id: 'glucowise', name: 'GlucoWise AI', icon: Droplet, color: 'text-orange-400', action: 'Hypo prediction model retrained with João\'s updated profile', impact: 'Ambulance call avoided — saves ~€1,800' }
                        ]
                    }
                ]
            },
            {
                label: 'Severe — DKA Emergency',
                severity: 'severe',
                steps: [
                    {
                        id: 'dm-home-sev',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'Insulin pump malfunction. Glucose >400 mg/dL. Nausea, Kussmaul breathing.',
                        apps: [
                            { id: 'glucowise', name: 'GlucoWise AI', icon: Droplet, color: 'text-orange-400', action: 'Emergency alert: DKA risk score 0.94. Auto-calls 112.', impact: 'Time to INEM dispatch: 2 min vs 15 min self-recognition' }
                        ]
                    },
                    {
                        id: 'dm-ed-sev',
                        location: 'Emergency Dept',
                        locationIcon: 'emergency',
                        description: 'IV insulin drip, fluid resuscitation, potassium monitoring. pH 7.18.',
                        apps: [
                            { id: 'fasttrack', name: 'FastTrack AI', icon: Monitor, color: 'text-amber-400', action: 'Pre-registration from GlucoWise handoff data', impact: 'Treatment starts in <5 min from door' },
                            { id: 'surge-commander', name: 'Surge Commander', icon: ShieldAlert, color: 'text-purple-400', action: 'Routes to nearest hospital with ICU capacity', impact: 'Avoids ED boarding in overcrowded facility' }
                        ]
                    },
                    {
                        id: 'dm-ward-sev',
                        location: 'Hospital Ward',
                        locationIcon: 'bed',
                        description: 'ICU 24h → step-down. DKA resolved. Pump replaced. Education session.',
                        apps: [
                            { id: 'flowmaster', name: 'FlowMaster', icon: Activity, color: 'text-teal-400', action: 'Predicts ICU→step-down transfer timing from lab trends', impact: 'ICU bed freed 8h earlier for next patient' },
                            { id: 'cliniscript', name: 'CliniScript', icon: FileText, color: 'text-sky-400', action: 'Captures endocrinologist assessment + education notes', impact: 'Complete discharge summary auto-generated' }
                        ]
                    },
                    {
                        id: 'dm-discharge-sev',
                        location: 'Discharge Home',
                        locationIcon: 'house',
                        description: 'New pump configured. GlucoWise recalibrated. Follow-up in 72h.',
                        apps: [
                            { id: 'glucowise', name: 'GlucoWise AI', icon: Droplet, color: 'text-orange-400', action: 'Post-DKA intensive monitoring: hourly glucose checks', impact: 'DKA recurrence rate: 4% vs 18% baseline' },
                            { id: 'rxoptimize', name: 'RxOptimize', icon: Pill, color: 'text-blue-400', action: 'Full medication reconciliation post-discharge', impact: 'Catches 12% of dosing errors at transition' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'resp',
        condition: 'Asthma / COPD',
        patient: 'Sofia, 32y — Severe Persistent Asthma',
        color: 'from-indigo-500 to-blue-600',
        borderColor: 'border-indigo-500/30',
        bgColor: 'bg-indigo-500/10',
        textColor: 'text-indigo-400',
        dotColor: 'bg-indigo-500',
        paths: [
            {
                label: 'Mild — Controller Adjustment',
                severity: 'mild',
                steps: [
                    {
                        id: 'resp-home',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'Sofia\'s PEF declining over 5 days. Rescue inhaler used 4x/week. AQI normal.',
                        apps: [
                            { id: 'breatheasy', name: 'BreathEasy AI', icon: Wind, color: 'text-indigo-400', action: 'Detects PEF trend + rescue inhaler overuse pattern', impact: 'Flags need for controller step-up 7 days earlier' }
                        ]
                    },
                    {
                        id: 'resp-pc-mild',
                        location: 'Primary Care',
                        locationIcon: 'local_hospital',
                        description: 'GP reviews BreathEasy report. Steps up ICS from low to medium dose.',
                        apps: [
                            { id: 'rxoptimize', name: 'RxOptimize', icon: Pill, color: 'text-blue-400', action: 'GINA step-up algorithm + inhaler technique assessment', impact: 'Correct step-up on first visit (vs 2.3 visits avg)' },
                            { id: 'careflow-architect', name: 'CareFlow Architect', icon: GitBranch, color: 'text-teal-400', action: 'Asthma action plan auto-updated with new doses', impact: 'Patient has clear written instructions' }
                        ]
                    },
                    {
                        id: 'resp-home-return-mild',
                        location: 'Back Home',
                        locationIcon: 'house',
                        description: 'PEF returns to green zone in 10 days. Rescue use drops to 1x/week.',
                        apps: [
                            { id: 'breatheasy', name: 'BreathEasy AI', icon: Wind, color: 'text-indigo-400', action: 'Confirms response to treatment. Updates trigger profile.', impact: 'Exacerbation prevented — saves ~€2,100' }
                        ]
                    }
                ]
            },
            {
                label: 'Moderate — Environmental Trigger',
                severity: 'moderate',
                steps: [
                    {
                        id: 'resp-home-mod',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'Wildfire smoke pushes AQI to 160. PEF drops to 60% personal best overnight.',
                        apps: [
                            { id: 'breatheasy', name: 'BreathEasy AI', icon: Wind, color: 'text-indigo-400', action: 'Cross-correlates AQI spike with PEF drop. Sends proactive alert.', impact: 'Patient warned before symptoms worsen' }
                        ]
                    },
                    {
                        id: 'resp-ed-mod',
                        location: 'Emergency Dept',
                        locationIcon: 'emergency',
                        description: 'Nebulized salbutamol + ipratropium. IV methylprednisolone. 4h observation.',
                        apps: [
                            { id: 'fasttrack', name: 'FastTrack AI', icon: Monitor, color: 'text-amber-400', action: 'Respiratory fast-lane activated from BreathEasy handoff', impact: 'Nebulizer started in <8 min from arrival' },
                            { id: 'sentinel', name: 'Sentinel AI', icon: Eye, color: 'text-cyan-400', action: 'Monitors respiratory rate in waiting area via camera', impact: 'Catches silent desaturation before patient reports it' }
                        ]
                    },
                    {
                        id: 'resp-home-return-mod',
                        location: 'Back Home',
                        locationIcon: 'house',
                        description: 'Discharged with 5-day prednisone. BreathEasy increases check-in frequency.',
                        apps: [
                            { id: 'breatheasy', name: 'BreathEasy AI', icon: Wind, color: 'text-indigo-400', action: 'Post-exacerbation intensive monitoring + AQI alerts', impact: 'Repeat ED visit rate reduced by 45%' }
                        ]
                    }
                ]
            },
            {
                label: 'Severe — ICU Admission',
                severity: 'severe',
                steps: [
                    {
                        id: 'resp-home-sev',
                        location: 'Patient Home',
                        locationIcon: 'home',
                        description: 'Status asthmaticus. Cannot complete sentences. SpO2 85%. Partner calls 112.',
                        apps: [
                            { id: 'breatheasy', name: 'BreathEasy AI', icon: Wind, color: 'text-indigo-400', action: 'Emergency dispatch with patient profile + medication history', impact: 'Paramedics arrive with correct nebulizer protocol' }
                        ]
                    },
                    {
                        id: 'resp-ed-sev',
                        location: 'Emergency Dept',
                        locationIcon: 'emergency',
                        description: 'Continuous nebulization, IV magnesium, intubation standby.',
                        apps: [
                            { id: 'surge-commander', name: 'Surge Commander', icon: ShieldAlert, color: 'text-purple-400', action: 'Routes ambulance to hospital with ICU ventilator capacity', impact: 'Avoids inter-hospital transfer (saves 40 min)' },
                            { id: 'cliniscript', name: 'CliniScript', icon: FileText, color: 'text-sky-400', action: 'Real-time documentation of rapid sequence decisions', impact: 'Medico-legal protection + handoff quality' }
                        ]
                    },
                    {
                        id: 'resp-ward-sev',
                        location: 'Hospital Ward',
                        locationIcon: 'bed',
                        description: 'ICU 48h (non-invasive ventilation). Step-down. Pulmonology consult.',
                        apps: [
                            { id: 'flowmaster', name: 'FlowMaster', icon: Activity, color: 'text-teal-400', action: 'Predicts safe step-down timing from ventilator weaning data', impact: 'ICU stay optimized — bed freed for next critical patient' },
                            { id: 'ecoward', name: 'EcoWard', icon: Leaf, color: 'text-green-400', action: 'Optimizes nebulizer waste + energy use in ward', impact: 'Sustainability metrics tracked per admission' }
                        ]
                    },
                    {
                        id: 'resp-discharge-sev',
                        location: 'Discharge Home',
                        locationIcon: 'house',
                        description: 'Discharged day 6. Biologic therapy initiated. Connected PEF meter provided.',
                        apps: [
                            { id: 'breatheasy', name: 'BreathEasy AI', icon: Wind, color: 'text-indigo-400', action: 'Transition to daily PEF + environmental monitoring', impact: '12-month hospitalization rate: 5% vs 22% baseline' },
                            { id: 'gestalink', name: 'GestaLink', icon: Baby, color: 'text-pink-400', action: '(If pregnant) Monitors asthma impact on fetal wellbeing', impact: 'Cross-condition safety net' }
                        ]
                    }
                ]
            }
        ]
    }
];

// ─── Tooltip / Detail Card ──────────────────────────────────────────

interface AppTooltipProps {
    app: AppIntervention;
    onClose: () => void;
}

const AppTooltip: React.FC<AppTooltipProps> = ({ app, onClose }) => {
    const Icon = app.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72"
        >
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl shadow-black/40">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg bg-slate-800 ${app.color}`}>
                            <Icon size={16} />
                        </div>
                        <span className="text-sm font-bold text-white">{app.name}</span>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition p-0.5">
                        <X size={14} />
                    </button>
                </div>
                <div className="space-y-2">
                    <div className="bg-slate-800/50 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">What it does here</p>
                        <p className="text-xs text-slate-300 leading-relaxed">{app.action}</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5">
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">Impact</p>
                        <p className="text-xs text-emerald-300 leading-relaxed font-medium">{app.impact}</p>
                    </div>
                </div>
            </div>
            <div className="w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        </motion.div>
    );
};

// ─── Step Card ──────────────────────────────────────────────────────

interface StepCardProps {
    step: JourneyStep;
    journeyColor: string;
    isFirst: boolean;
    isLast: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, journeyColor, isFirst, isLast }) => {
    const [activeApp, setActiveApp] = useState<string | null>(null);

    return (
        <div className="flex items-start gap-4">
            {/* Location Icon + Connector */}
            <div className="flex flex-col items-center flex-shrink-0 w-12">
                {!isFirst && <div className={`w-0.5 h-6 bg-gradient-to-b ${journeyColor} opacity-30`} />}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${journeyColor} flex items-center justify-center shadow-lg`}>
                    <span className="material-symbols-outlined text-white text-xl">{step.locationIcon}</span>
                </div>
                {!isLast && <div className={`w-0.5 h-6 bg-gradient-to-b ${journeyColor} opacity-30`} />}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{step.location}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3">{step.description}</p>

                    {/* App Intervention Badges */}
                    <div className="flex flex-wrap gap-2">
                        {step.apps.map(app => {
                            const Icon = app.icon;
                            return (
                                <div key={app.id} className="relative">
                                    <AnimatePresence>
                                        {activeApp === app.id && (
                                            <AppTooltip app={app} onClose={() => setActiveApp(null)} />
                                        )}
                                    </AnimatePresence>
                                    <button
                                        onClick={() => setActiveApp(activeApp === app.id ? null : app.id)}
                                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all text-xs font-semibold
                                            ${activeApp === app.id
                                                ? 'bg-slate-700 border-slate-600 text-white shadow-lg'
                                                : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800'
                                            }`}
                                    >
                                        <Icon size={13} className={app.color} />
                                        <span>{app.name}</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Journey Lane ───────────────────────────────────────────────────

interface JourneyLaneProps {
    journey: PatientJourney;
}

const JourneyLane: React.FC<JourneyLaneProps> = ({ journey }) => {
    const [activePath, setActivePath] = useState(0);
    const currentPath = journey.paths[activePath];

    return (
        <div className={`border ${journey.borderColor} rounded-2xl overflow-hidden bg-slate-950/50 backdrop-blur-sm`}>
            {/* Lane Header */}
            <div className={`bg-gradient-to-r ${journey.color} p-5`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white">{journey.condition}</h3>
                        <p className="text-sm text-white/70">{journey.patient}</p>
                    </div>
                    <div className="flex gap-1">
                        {journey.paths.map((path, idx) => (
                            <button
                                key={path.severity}
                                onClick={() => setActivePath(idx)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                    ${activePath === idx
                                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                                        : 'text-white/50 hover:text-white/80 hover:bg-white/10'
                                    }`}
                            >
                                {path.severity}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Path Label */}
            <div className={`px-5 py-3 border-b border-slate-800 ${journey.bgColor}`}>
                <p className={`text-sm font-semibold ${journey.textColor}`}>
                    {currentPath.label}
                </p>
            </div>

            {/* Steps */}
            <div className="p-5">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePath}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentPath.steps.map((step, idx) => (
                            <StepCard
                                key={step.id}
                                step={step}
                                journeyColor={journey.color}
                                isFirst={idx === 0}
                                isLast={idx === currentPath.steps.length - 1}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// ─── Main Component ─────────────────────────────────────────────────

export const PatientJourneyMap: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Data Sources Disclaimer */}
            <div className="bg-slate-900/40 border border-slate-700 rounded-lg p-4 text-center">
                <p className="text-xs text-slate-400">
                    <strong>Patient journeys are illustrative examples</strong> based on clinical guidelines and published case studies. 
                    Individual patient experiences may vary. All AI interventions are hypothetical demonstrations.
                </p>
            </div>
            {JOURNEYS.map(journey => (
                <JourneyLane key={journey.id} journey={journey} />
            ))}
        </div>
    );
};
