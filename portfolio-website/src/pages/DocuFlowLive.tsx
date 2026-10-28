import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic,
    StopCircle,
    FileText,
    Activity,
    Shield,
    CheckCircle,
    Cpu,
    Database,
    ArrowLeft,
    Lock,
    WifiOff,
    Save,
    Copy,
    AlertTriangle,
    Stethoscope,
    LogOut,
    Keyboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { askAI, AIResult } from '../lib/aiClient';
import { PROMPTS, validateNoteStructure } from '../lib/prompts';

// --- Simulation Data: SCRIBE ---
const SCRIBE_TRANSCRIPT_CHUNKS = [
    "Dr. Chen: Good morning, Mr. Alvarez. I see from your chart you've been feeling",
    " unusually tired lately. Tell me more about that.\\n",
    "Pt: Yeah, honest to god doc, I'm just wiped out. I drive a truck for 10 hours a day",
    " and I'm finding myself dozing off at the wheel. It's scary. Plus I'm drinking water like a fish.",
    " I stopped at three rest stops last night just to pee.\\n",
    "Dr: I see. Have you checked your sugar levels at home?\\n",
    "Pt: I tried, but my insurance changed and they won't cover the strips anymore. I haven't",
    " checked in maybe... two months? I'm still taking the Lisinopril for my blood pressure though.\\n",
    "Dr: Okay. I'm looking at your vitals today, BP is 138/84, which is decent. But I'm very concerned",
    " about these symptoms. Polyuria, polydipsia, fatigue... it sounds like your diabetes is uncontrolled.",
    " I want to start Metformin today, 500mg twice a day with meals. And let's get a new set of labs.",
    " We need to check your kidneys and get a fresh A1c."
];

const SCRIBE_THOUGHTS = [
    { id: 1, type: 'scan', text: 'Scanning audio stream...' },
    { id: 2, type: 'entity', text: 'Detected: "Dozing off at wheel" (Symptom/Risk)' },
    { id: 3, type: 'tool', text: 'Tool Call: Risk_Assessment("Drowsy Driving") -> HIGH_RISK' },
    { id: 4, type: 'entity', text: 'Detected: "Polyuria/Polydipsia" (Classic T2DM Symptoms)' },
    { id: 5, type: 'barrier', text: 'Detected Barrier: "Insurance denied test strips"' },
    { id: 6, type: 'tool', text: 'Tool Call: SDoH_Code("Financial Barrier") -> Z59.6' },
    { id: 7, type: 'entity', text: 'Detected: "Lisinopril" (Adherence: Yes)' },
    { id: 8, type: 'tool', text: 'Tool Call: Guideline_Check("Metformin", "kidney function") -> REQ_LAB' },
    { id: 9, type: 'alert', text: 'Action Item: Order BMP prior to Metformin start.' },
    { id: 10, type: 'success', text: 'Plan Generated. SDoH flagged for Social Work.' }
];

const SCRIBE_NOTE = `Subjective:
54yo male truck driver presenting with 2-month history of severe fatigue and microsleeps while driving. Reports classic hyperglycemia symptoms (polyuria, polydipsia).
- Social Hx: Commercial driver.
- Barriers: Stopped home glucose monitoring due to insurance denial of strips (Z59.6).
- Meds: Compliant with Lisinopril.

Objective:
- Vitals: BP 138/84.
- Constitutional: Fatigued appearing.

Assessment:
1. Uncontrolled Type 2 Diabetes Mellitus w/ Hyperglycemia (E11.65)
   - Suspected based on sx and lack of monitoring.
   - High safety risk due to occupation (driving).
2. Financial Hardship (Medical)
   - Inability to afford glucometer supplies.

Plan:
1. Start Metformin 500mg BID with meals.
2. Labs: Order HbA1c, CMP today.
3. Referral: Case Management for DME coverage assistance.
4. Counseling: Discussed driving safety risks; advised frequent breaks/testing.`;

// --- Simulation Data: ADMISSION (Gap Analysis) ---
const ADMISSION_INPUT_SAMPLE = `ED TRIAGE NOTE:
72yo female brought by squad for shortness of breath.
History of HFrEF (EF 35%), HTN.
Vitals: BP 160/90, HR 105, O2 88% on RA.
Lungs: Crackles bilaterally.
ED Course: Given Lasix 40mg IV x1. Urine output 400cc.
Patient admitted to Medicine for CHF exacerbation.`;

const ADMISSION_THOUGHTS = [
    { id: 1, type: 'scan', text: 'Scanning ED Triage Note...' },
    { id: 2, type: 'entity', text: 'Detected: "History of HFrEF (EF 35%)"' },
    { id: 3, type: 'tool', text: 'Tool Call: Vector_Query("Echocardiogram", "Last 12 months")' },
    { id: 4, type: 'error', text: 'Result: NO_RECORD_FOUND' },
    { id: 5, type: 'gap', text: 'GAP DETECTED: Missing "Recent Echo" for known HFrEF.' },
    { id: 6, type: 'entity', text: 'Detected: "given Lasix 40mg"' },
    { id: 7, type: 'tool', text: 'Tool Call: Guideline_Check("Acute CHF", "K+")' },
    { id: 8, type: 'gap', text: 'GAP DETECTED: Missing "Potassium Check" post-diuresis.' },
    { id: 9, type: 'success', text: 'Admission Note Generated with 2 Safety Flags.' }
];

const ADMISSION_NOTE = `ADMISSION NOTE
History of Present Illness:
72F w/ hx HFrEF presenting with acute decompensated heart failure.
Presentation consistent with volume overload (hypoxia, crackles).
Response to Lasix 40mg IV in ED favorable.

Assessment & Plan:

1. Acute on Chronic Systolic Heart Failure
   - Diuresis: Continue Lasix 40mg IV BID.
   ⚠️ GAP: No recent Echocardiogram found in system. ACTION: Order TTE.
   ⚠️ GAP: K+ not checked post-diuresis. ACTION: Order BMPAM.

2. Hypertension (160/90)
   - Optimize GDMT once euvolemic.`;

// --- Simulation Data: DISCHARGE (Summary) ---
const DISCHARGE_INPUT_SAMPLE = `HOSPITAL COURSE SUMMARY:
Pt admitted 5 days ago for severe Sepsis 2/2 CAP.
Day 1: Hypotensive (80/50), required 2L fluids + Norepinephrine drip in ICU.
Started on Vanc/Zosyn.
Day 2: Weaned off pressors. Extubated. Transferred to floor.
Day 3: Sputum cx grew Strep Pneumo (sensitive to Ceftriaxone).
Regimen narrowed to Ceftriaxone 1g IV. 
Day 4: Transitioned to Doxycycline PO. Ambulating on room air.
Day 5: Stable for discharge. Creatinine returned to baseline.`;

const DISCHARGE_THOUGHTS = [
    { id: 1, type: 'scan', text: 'Analyzing 5-Day Hospital Course...' },
    { id: 2, type: 'entity', text: 'Detected: "Sepsis 2/2 CAP", "ICU stay"' },
    { id: 3, type: 'action', text: 'Summarizing: ICU Course (Pressors, Mechanial Vent)' },
    { id: 4, type: 'entity', text: 'Detected: "Strep Pneumo sens Ceftriaxone"' },
    { id: 5, type: 'tool', text: 'Tool Call: Abx_Stewardship("CAP", "Strep Pneumo") -> CHECK_DURATION' },
    { id: 6, type: 'success', text: 'Action: Complete 5-7 day total course.' },
    { id: 7, type: 'action', text: 'Extracting Follow-up: Pulmonology (Post-ICU)' },
    { id: 8, type: 'success', text: 'Discharge Summary Generated. Quality Measures Met.' }
];

const DISCHARGE_NOTE = `DISCHARGE SUMMARY

Principal Diagnosis: Sepsis secondary to Community Acquired Pneumonia (Severe).
Pathogen: Streptococcus Pneumoniae.

Hospital Course:
Significant for ICU admission requiring vasopressor support (Norepinephrine) and mechanical ventilation.
Rapidly improved with fluids and broad-spectrum antibiotics.
De-escalated to Ceftriaxone -> Doxycycline based on culture sensitivities.
Renal function recovered (AKI resolved).

Discharge Plan:
1. Antibiotics: Continue Doxycycline 100mg BID for 3 more days (Complete 7 day course).
2. Follow-up:
   - PCP in 1 week.
   - Pulmonology in 4 weeks (standard post-ICU pneumonia protocol).
3. Return Precautions: Fever >100.4, Difficulty Breathing, Confusion.`;


type Mode = 'SCRIBE' | 'ADMISSION' | 'DISCHARGE';

const DocuFlowLive = () => {
    const [mode, setMode] = useState<Mode>('SCRIBE');
    const [status, setStatus] = useState<'IDLE' | 'RECORDING' | 'PROCESSING' | 'REVIEW'>('IDLE');
    const [inputText, setInputText] = useState('');
    const [thoughts, setThoughts] = useState<any[]>([]);
    const [generatedNote, setGeneratedNote] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isFallback, setIsFallback] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [missingSections, setMissingSections] = useState<string[]>([]);

    // Refs for intervals
    const transcriptIndex = useRef(0);
    const thoughtIndex = useRef(0);
    const abortRef = useRef<AbortController | null>(null);

    // Reset when switching modes
    useEffect(() => {
        resetDemo();
    }, [mode]);

    const resetDemo = () => {
        setStatus('IDLE');
        setInputText(mode === 'SCRIBE' ? '' : (mode === 'ADMISSION' ? ADMISSION_INPUT_SAMPLE : DISCHARGE_INPUT_SAMPLE));
        setThoughts([]);
        setGeneratedNote(null);
        setIsGenerating(false);
        setIsFallback(false);
        setMissingSections([]);
        transcriptIndex.current = 0;
        thoughtIndex.current = 0;
    };

    // --- Scribe Simulation ---
    useEffect(() => {
        let interval: any;

        if (mode === 'SCRIBE' && status === 'RECORDING') {
            interval = setInterval(() => {
                if (transcriptIndex.current < SCRIBE_TRANSCRIPT_CHUNKS.length) {
                    setInputText(prev => prev + SCRIBE_TRANSCRIPT_CHUNKS[transcriptIndex.current]);
                    transcriptIndex.current++;
                } else {
                    setStatus('PROCESSING');
                    transcriptIndex.current = 0;
                }
            }, 800);
        }

        return () => clearInterval(interval);
    }, [status, mode]);

    // --- Thought Processing Simulation + LLM Note Generation ---
    useEffect(() => {
        let interval: any;
        const currentThoughtsList = mode === 'SCRIBE' ? SCRIBE_THOUGHTS : (mode === 'ADMISSION' ? ADMISSION_THOUGHTS : DISCHARGE_THOUGHTS);

        if (status === 'PROCESSING') {
            interval = setInterval(() => {
                if (thoughtIndex.current < currentThoughtsList.length) {
                    const nextThought = currentThoughtsList[thoughtIndex.current];
                    if (nextThought) {
                        setThoughts(prev => [...prev, nextThought]);
                    }
                    thoughtIndex.current++;
                } else {
                    // All thoughts displayed — fire LLM call and transition to REVIEW
                    clearInterval(interval);
                    const finalInputText = inputText;
                    const currentMode = mode;

                    setIsGenerating(true);

                    const systemPrompt = currentMode === 'SCRIBE'
                        ? PROMPTS.docuflow.scribe
                        : currentMode === 'ADMISSION'
                            ? PROMPTS.docuflow.admission
                            : PROMPTS.docuflow.discharge;

                    const controller = new AbortController();
                    abortRef.current = controller;
                    askAI(systemPrompt, finalInputText, 800, controller.signal)
                        .then((result: AIResult) => {
                            setGeneratedNote(result.text);
                            setIsFallback(result.isFallback);
                            if (!result.isFallback) {
                                const validation = validateNoteStructure(currentMode, result.text);
                                setMissingSections(validation.missing);
                            }
                        })
                        .finally(() => {
                            setIsGenerating(false);
                            setStatus('REVIEW');
                            abortRef.current = null;
                        });
                }
            }, 600);
        }
        return () => clearInterval(interval);
    }, [status, mode, inputText]);

    // Cleanup on unmount
    useEffect(() => {
        return () => abortRef.current?.abort();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(getFinalNote()).then(() => {
            setToastMessage('Note copied to clipboard');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }).catch(() => {
            setToastMessage('Copy failed — try selecting text manually');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        });
    };

    const handleExportEHR = () => {
        setToastMessage('Exporting to EHR (mock)... Note sent to chart successfully.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleStart = () => {
        if (mode === 'SCRIBE') {
            setStatus('RECORDING');
        } else {
            // For text modes, jump straight to processing
            setStatus('PROCESSING');
        }
    };

    const getModeColor = () => {
        if (mode === 'SCRIBE') return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        if (mode === 'ADMISSION') return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
        if (mode === 'DISCHARGE') return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        return 'text-slate-500';
    };

    const getFinalNote = () => {
        if (generatedNote) return generatedNote;
        if (mode === 'SCRIBE') return SCRIBE_NOTE;
        if (mode === 'ADMISSION') return ADMISSION_NOTE;
        return DISCHARGE_NOTE;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 overflow-hidden flex flex-col">

            {/* Header */}
            <nav className="h-16 border-b border-white/5 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-4">
                    <Link to="/docuflow-showcase" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </Link>
                    <div className="flex flex-col">
                        <span className="font-bold text-white tracking-tight flex items-center gap-2">
                            DocuFlow <span className={`text-xs px-1.5 py-0.5 rounded uppercase tracking-wider ${getModeColor()}`}>Live Environment</span>
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-2 decoration-emerald-500/30 underline decoration-dotted"><WifiOff className="w-3 h-3 text-emerald-500" /> OFFLINE MODE</span>
                    <span className="flex items-center gap-2"><Lock className="w-3 h-3 text-emerald-500" /> ENCLAVE ACTIVE</span>
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar Navigation */}
                <aside className="w-64 border-r border-white/5 bg-black/40 flex flex-col p-4 gap-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Workflows</div>

                    <button
                        onClick={() => setMode('SCRIBE')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${mode === 'SCRIBE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                        <Mic className="w-4 h-4" /> Live Scribe
                    </button>

                    <button
                        onClick={() => setMode('ADMISSION')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${mode === 'ADMISSION' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                        <Stethoscope className="w-4 h-4" /> Admission Manager
                    </button>

                    <button
                        onClick={() => setMode('DISCHARGE')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${mode === 'DISCHARGE' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                        <LogOut className="w-4 h-4" /> Discharge Pilot
                    </button>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 grid lg:grid-cols-2 gap-0 relative">

                    {/* LEft: Input Area */}
                    <div className="border-r border-white/5 bg-slate-900/20 p-8 flex flex-col relative">
                        {/* Input Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                {mode === 'SCRIBE' ? <Mic className="w-5 h-5 text-emerald-500" /> :
                                    mode === 'ADMISSION' ? <Activity className="w-5 h-5 text-amber-500" /> :
                                        <FileText className="w-5 h-5 text-blue-500" />}
                                {mode === 'SCRIBE' ? 'Audio Input' : 'Clinical Context'}
                            </h2>
                            {status === 'IDLE' && (
                                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                                    {mode === 'SCRIBE' ? 'Microphone Ready' : 'Paste Text or Load Sample'}
                                </span>
                            )}
                        </div>

                        {/* Input Content */}
                        <div className="flex-1 flex flex-col">
                            {status === 'IDLE' ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-80 hover:opacity-100 transition-opacity">
                                    {mode === 'SCRIBE' ? (
                                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 animate-pulse">
                                            <Mic className="w-8 h-8 text-emerald-500" />
                                        </div>
                                    ) : (
                                        <div className={`w-full h-48 rounded-xl border-2 border-dashed flex items-center justify-center mb-6 p-4 ${mode === 'ADMISSION' ? 'border-amber-500/20 bg-amber-500/5' : 'border-blue-500/20 bg-blue-500/5'}`}>
                                            <p className="text-slate-500 text-sm font-mono">
                                                {mode === 'ADMISSION'
                                                    ? "Paste ED Note / Triage Info..."
                                                    : "Paste Hospital Course / Progress Notes..."}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleStart}
                                        className={`px-8 py-3 rounded-xl font-bold text-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${mode === 'SCRIBE' ? 'bg-emerald-500 hover:bg-emerald-400' :
                                                mode === 'ADMISSION' ? 'bg-amber-500 hover:bg-amber-400' :
                                                    'bg-blue-500 hover:bg-blue-400'
                                            }`}
                                    >
                                        {mode === 'SCRIBE' ? <Activity className="w-5 h-5" /> : <Cpu className="w-5 h-5" />}
                                        {mode === 'SCRIBE' ? 'Start Recording' : 'Analyze & Generate'}
                                    </button>
                                </div>
                            ) : (
                                <div className="prose prose-invert max-w-none">
                                    {/* Scribe Waveform */}
                                    {mode === 'SCRIBE' && status === 'RECORDING' && (
                                        <div className="h-8 flex items-center gap-1 mb-4 opacity-70">
                                            {[...Array(12)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: [4, Math.random() * 24 + 4, 4] }}
                                                    transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                                                    className="w-1 bg-emerald-500 rounded-full"
                                                />
                                            ))}
                                            <span className="text-xs font-mono text-emerald-500 ml-2 animate-pulse">LISTENING...</span>
                                        </div>
                                    )}

                                    {/* Text Display */}
                                    <div className="font-serif text-lg leading-relaxed text-slate-300 whitespace-pre-wrap">
                                        {inputText}
                                        {status === 'RECORDING' && <span className="inline-block w-2 h-5 bg-emerald-500 animate-pulse ml-1">|</span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Right: Neural Engine */}
                    <div className="bg-[#0a0a0c] p-8 flex flex-col border-l border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <Cpu className={`w-5 h-5 ${status === 'PROCESSING' ? 'text-white animate-pulse' : 'text-slate-600'}`} />
                            <h3 className="font-bold text-white">Neural Engine (SLM-350M)</h3>
                        </div>

                        <div className="flex-1 relative z-10 overflow-y-auto">
                            {/* Thoughts Stream */}
                            {(status === 'RECORDING' || status === 'PROCESSING') && (
                                <div className="space-y-4 font-mono text-sm">
                                    <AnimatePresence>
                                        {thoughts.map(thought => {
                                            if (!thought) return null;
                                            return (
                                                <motion.div
                                                    key={thought.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className={`p-4 rounded-lg border flex items-start gap-3 ${thought.type === 'tool' ? 'bg-indigo-900/10 border-indigo-500/30 text-indigo-300' :
                                                            thought.type === 'alert' ? 'bg-orange-900/10 border-orange-500/30 text-orange-300' :
                                                                thought.type === 'gap' ? 'bg-red-900/10 border-red-500/30 text-red-300' :
                                                                    thought.type === 'success' ? 'bg-emerald-900/10 border-emerald-500/30 text-emerald-400' :
                                                                        'bg-slate-900 border-slate-800 text-slate-400'
                                                        }`}
                                                >
                                                    {thought.type === 'tool' ? <Database className="w-4 h-4 mt-0.5" /> :
                                                        thought.type === 'gap' ? <AlertTriangle className="w-4 h-4 mt-0.5" /> :
                                                            thought.type === 'success' ? <CheckCircle className="w-4 h-4 mt-0.5" /> :
                                                                <Activity className="w-4 h-4 mt-0.5" />}

                                                    <div>
                                                        <div className="font-bold text-xs opacity-50 uppercase mb-1">{thought.type}</div>
                                                        {thought.text}
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* IDLE State */}
                            {status === 'IDLE' && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-700 border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center">
                                    <Cpu className="w-12 h-12 mb-4 opacity-20" />
                                    <p className="font-medium">Waiting for Input</p>
                                    <p className="text-xs mt-2 max-w-xs">
                                        The engine is ready to analyze clinical context using local vectors and deterministic rules.
                                    </p>
                                </div>
                            )}

                            {/* Generating State */}
                            {isGenerating && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                    <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="font-mono text-sm">Generating clinical note with AI...</p>
                                </div>
                            )}

                            {/* Final Note Display */}
                            {status === 'REVIEW' && !isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full border border-slate-200"
                                >
                                    <div className={`p-4 flex justify-between items-center ${mode === 'SCRIBE' ? 'bg-emerald-600' :
                                            mode === 'ADMISSION' ? 'bg-amber-600' :
                                                'bg-blue-600'
                                        } text-white`}>
                                        <div className="flex items-center gap-2 font-bold">
                                            <FileText className="w-4 h-4" />
                                            {mode === 'SCRIBE' ? 'Standard SOAP Note' : mode === 'ADMISSION' ? 'Admission Note w/ Flags' : 'Discharge Summary'}
                                        </div>
                                        <button onClick={handleCopy} className="text-white/80 hover:text-white" title="Copy to clipboard"><Copy className="w-4 h-4" /></button>
                                    </div>
                                    <div className="p-6 font-serif whitespace-pre-wrap leading-relaxed text-sm flex-1 overflow-y-auto bg-slate-50">
                                        {getFinalNote()}
                                    </div>
                                    {missingSections.length > 0 && !isFallback && (
                                        <div className="px-6 py-2 bg-amber-50 border-t border-amber-200 text-amber-700 text-xs flex items-center gap-2">
                                            <AlertTriangle className="w-3 h-3" />
                                            Missing sections detected: {missingSections.join(', ')}
                                        </div>
                                    )}
                                    {isFallback && (
                                        <div className="px-6 py-2 bg-orange-50 border-t border-orange-200 text-orange-700 text-xs flex items-center gap-2">
                                            <Shield className="w-3 h-3" />
                                            Showing example output — AI generation failed, displaying template note instead
                                        </div>
                                    )}
                                    <div className="p-4 bg-white border-t border-slate-200 flex justify-end gap-3 checkbox-optimize">
                                        <button onClick={resetDemo} className="text-slate-500 hover:text-slate-700 font-bold text-sm px-4 py-2">
                                            Start Over
                                        </button>
                                        <button onClick={handleExportEHR} className={`text-white font-bold text-sm px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg ${mode === 'SCRIBE' ? 'bg-emerald-600 hover:bg-emerald-700' :
                                                mode === 'ADMISSION' ? 'bg-amber-600 hover:bg-amber-700' :
                                                    'bg-blue-600 hover:bg-blue-700'
                                            }`}>
                                            <Save className="w-4 h-4" /> Export to EHR
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                </main>
            </div>

            {/* Toast */}
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2"
                    >
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium">{toastMessage}</span>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default DocuFlowLive;
