import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    Wind,
    Droplet,
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    ArrowRight,
    FileText,
    Search,
    Code as CodeIcon,
    ShieldCheck,
    ShieldAlert,
    GitBranch,
    Database,
    Eye,
    Monitor,
    Mic,
    Activity,
    Truck,
    Brain,
    Microscope,
    Baby,
    Pill,
    Leaf,
    Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { resumeData } from '../data/resume';
import ArchitectureModal from '../components/ArchitectureModal';
import { architectureData } from '../data/architecture';
import SafetyReportModal from '../components/SafetyReportModal';
import { safetyReports } from '../data/safetyReports';
import ProjectCard from '../components/ProjectCard';
import SwordManifesto from '../components/SwordManifesto';

function Home() {
    const [selectedArchitectureId, setSelectedArchitectureId] = React.useState<string | null>(null);
    const [selectedReportId, setSelectedReportId] = React.useState<string | null>(null);

    const flagshipProjects = [
        {
            id: 'heartguide',
            name: 'HeartGuide AI',
            tagline: 'AI Care Specialist for Heart Failure',
            description: 'Proactive agent following the Predict-Prevent-Treat workflow. Features Human-in-the-Loop clinical oversight to reduce readmissions.',
            icon: Heart,
            color: 'from-red-500 to-pink-600',
            url: '/heartguide-showcase',
            features: ['🛡️ Human-in-the-Loop', 'Neural Care Specialist', 'BP + Risk Triangulation'],
            strategy: {
                problem: "Heart Failure has a 24% readmission rate due to delayed symptom detection.",
                solution: "A Continuous Monitoring Agent that detects weight drift (+2lbs) 48h before hospitalization.",
                kpi: "⇩ 30-Day Readmissions"
            }
        },
        {
            id: 'breatheasy',
            name: 'BreathEasy AI',
            tagline: 'Environmental Care Specialist',
            description: 'Predictive agent that correlates AQI and clinical history to prevent asthma attacks before they happen.',
            icon: Wind,
            color: 'from-teal-500 to-cyan-600',
            url: '/breatheasy-showcase',
            features: ['🛡️ Predictive Safety', 'Neural Care Specialist', 'Trigger Simulator'],
            strategy: {
                problem: "Asthma attacks are reactive; patients don't know environmental triggers until it's too late.",
                solution: "Correlate Real-Time Pollen/AQI data with patient history to issue 'Pre-Emptive Alerts'.",
                kpi: "⇩ Emergency Dept Visits"
            }
        },
        {
            id: 'glucowise',
            name: 'GlucoWise AI',
            tagline: 'Metabolic Care Specialist',
            description: 'Real-time coaching agent using Computer Vision to predict glucose spikes and suggest interventions pre-meal.',
            icon: Droplet,
            color: 'from-blue-500 to-indigo-600',
            url: '/glucowise-showcase',
            features: ['🛡️ Metabolic Physics', 'Neural Care Specialist', 'Glucose Prediction'],
            strategy: {
                problem: "Diabetics struggle to estimate carb impact, leading to post-prandial spikes.",
                solution: "Computer Vision estimation of Glycemic Load + Pre-Meal 'Smart Bolus' advice.",
                kpi: "⇧ Time-in-Range (70-180)"
            }
        },
        {
            id: 'docuflow',
            name: 'DocuFlow 2.0',
            tagline: 'Privacy-First Agentic Scribe',
            description: 'Offline-first clinical documentation engine. Uses fine-tuned SLMs to generate SOAP notes without patient data ever leaving the device.',
            icon: FileText,
            color: 'from-emerald-500 to-teal-600',
            url: '/docuflow-showcase',
            features: ['Offline SLM Engine', 'Tool-Augmented', 'Zero-Data-Leak'],
            strategy: {
                problem: "Cloud AI Scribes pose massive HIPAA/GDPR risks by sending PII to third-party servers.",
                solution: "Local 350M Parameter Model with ToolBench architecture for 100% on-device processing.",
                kpi: "0 Bytes Leaked"
            }
        }
    ];

    const innovationProjects = [
        {
            id: 'ecoward',
            name: 'EcoWard Agent',
            tagline: 'Hospital Sustainability Guardian',
            description: 'Operational agent monitoring energy spikes and waste diversion in real-time to drive "Green Healthcare" goals.',
            icon: Leaf,
            color: 'from-emerald-500 to-teal-600',
            url: 'https://ecoward-rkluioerx-franciscos-projects-73f8717a.vercel.app/',
            features: ['Carbon Tracker', 'Energy Monitor', 'Waste Analytics']
        },
        {
            id: 'rxoptimize',
            name: 'RxOptimize Agent',
            tagline: 'Pharmacist Safety Guardian',
            description: 'Back-office clinical agent that proactively scans medication regimens for dangerous interactions and safety risks.',
            icon: Pill,
            color: 'from-blue-600 to-indigo-700',
            url: 'https://rxoptimize-7da082t62-franciscos-projects-73f8717a.vercel.app/',
            features: ['Interaction Scanner', 'Safety Agent', 'Deprescribing Engine']
        },
        {
            id: 'gestalink',
            name: 'GestaLink Agent',
            tagline: 'Maternal Care Guardian',
            description: 'Always-on safety agent for high-risk pregnancy. Monitors preeclampsia symptoms and provides instant, guideline-based triage.',
            icon: Baby,
            color: 'from-pink-500 to-rose-600',
            url: 'https://gestalink-5do5snmmm-franciscos-projects-73f8717a.vercel.app/',
            features: ['Symptom Monitor', 'Safety Engine', 'Pregnancy Timeline']
        },
        {
            id: 'patho-ai',
            name: 'Patho-AI',
            tagline: 'Oncology Staging Assistant',
            description: 'Automated TNM staging calculator (AJCC 8th Ed). Deterministic logic engine matches tumor/node criteria to prognostic stages.',
            icon: Microscope,
            color: 'from-blue-500 to-sky-600',
            url: 'https://patho-euwl94t84-franciscos-projects-73f8717a.vercel.app/',
            features: ['TNM Calculator', 'Staging Engine', 'Treatment Guidelines']
        },
        {
            id: 'mindbridge',
            name: 'MindBridge AI',
            tagline: 'Mental Health Triage',
            description: 'Conversational assessment tool for depression (PHQ-9) and anxiety (GAD-7). Provides instant risk stratification and resource connection.',
            icon: Brain,
            color: 'from-teal-400 to-indigo-500',
            url: 'https://mindbridge-i08yy9frn-franciscos-projects-73f8717a.vercel.app/',
            features: ['PHQ-9 Scoring', 'Chat Interface', 'Resource Locator']
        },
        {
            id: 'portersmart',
            name: 'PorterSmart AI',
            tagline: 'Logistics Optimization Engine',
            description: 'Uber-like dispatch system for hospital porters. Uses TSP algorithms to optimize patient transport routes and reduce wait times.',
            icon: Truck,
            color: 'from-indigo-500 to-violet-600',
            url: 'https://portersmart-jmujvdjju-franciscos-projects-73f8717a.vercel.app/',
            features: ['TSP Optimization', 'Dispatch Dashboard', 'Real-Time Map']
        },
        {
            id: 'cliniscript',
            name: 'CliniScript',
            tagline: 'Ambient Clinical Scribe',
            description: 'Automated documentation engine that listens to doctor-patient conversations and generates SOAP notes in real-time.',
            icon: Mic,
            color: 'from-purple-500 to-purple-600',
            url: 'https://cliniscript-franciscos-projects-73f8717a.vercel.app/',
            features: ['Ambient Listening', 'Real-Time Transcription', 'Auto-SOAP Generation']
        },
        {
            id: 'sentinel',
            name: 'Sentinel AI',
            tagline: 'Computer Vision Safety Guard',
            description: 'Always-on "Digital Eye" for waiting rooms. Detects patient distress (slumping, agitation) via pose estimation to prevent silent collapse.',
            icon: Eye,
            color: 'from-emerald-500 to-teal-700',
            url: 'https://sentinel-es85ln6nf-franciscos-projects-73f8717a.vercel.app/',
        },
        {
            id: 'fasttrack',
            name: 'FastTrack AI',
            tagline: 'Self-Service ED Kiosk',
            description: 'Touch-friendly patient check-in terminal. Offloads non-urgent triage from front-desk staff via "Big Button" UI and simulated ID scanning.',
            icon: Monitor,
            color: 'from-blue-500 to-indigo-700',
            url: 'https://fasttrack-franciscos-projects-73f8717a.vercel.app/',
            features: ['Touch Interface', 'ID Scan Sim', 'Ticket Printing']
        },
        {
            id: 'triage-os',
            name: 'HealthLine AI',
            tagline: 'National AI Symptom Triage',
            description: 'A "No-Black-Box" clinical front-door simulator. Uses deterministic ESI protocols to safely route patients.',
            icon: ShieldCheck,
            color: 'from-blue-600 to-cyan-500',
            url: 'https://triage-cu5f7vyw9-franciscos-projects-73f8717a.vercel.app/',
            features: ['ESI Scoring Engine', 'Red-Flag Safety', 'Protocol Logic']
        },
        {
            id: 'surge-commander',
            name: 'National Health OS',
            tagline: 'National Capacity Simulator',
            description: 'Command center simulating national health capacity during surges. Moving from hospital-level to network-level orchestration.',
            icon: ShieldAlert,
            color: 'from-amber-500 to-orange-600',
            url: 'https://surge-commander-8ne3vdhp2-franciscos-projects-73f8717a.vercel.app/',
            features: ['National Simulation', 'Network Capacity', 'Collapse Prediction']
        },
        {
            id: 'careflow-architect',
            name: 'CareFlow Architect',
            tagline: 'Visual Protocol Builder',
            description: 'Interactive education platform for training residents on clinical decision logic and protocol adherence.',
            icon: GitBranch,
            color: 'from-violet-500 to-fuchsia-600',
            url: 'https://careflow-architect-7uj5t9doq-franciscos-projects-73f8717a.vercel.app/',
            features: ['React Flow Engine', 'Visual Programming', 'JSON Protocol Export']
        },

        {
            id: 'sepsis-sentinel',
            name: 'SepsisSentinel',
            tagline: 'Ward Risk Monitor',
            description: 'Real-time patient safety dashboard. Automates NEWS2 scoring and alerts clinicians to early signs of deterioration.',
            icon: ShieldAlert,
            color: 'from-red-500 to-orange-600',
            url: 'https://sepsis-sentinel-franciscos-projects-73f8717a.vercel.app/',
            features: ['NEWS2 Scoring', 'Clinical Drift Sim', 'Safety Alerts']
        },
        {
            id: 'flowmaster',
            name: 'FlowMaster',
            tagline: 'Discharge Predictor',
            description: 'AI-driven patient flow optimization. Predicts discharge dates and identifies operational bottlenecks like "Awaiting Rehab".',
            icon: Activity,
            color: 'from-blue-500 to-indigo-500',
            url: 'https://flowmaster-franciscos-projects-73f8717a.vercel.app/',
            features: ['Discharge Prediction', 'Bottleneck Detection', 'LOS Analytics']
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="print:hidden">
                <Navbar />
            </div>
            {/* Hero Section */}
            <section id="home" className="relative overflow-hidden pt-24 pb-20 print:hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 opacity-60 dark:opacity-40"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="font-display text-5xl sm:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight relative z-10">
                            Francisco Pinheiro
                        </h1>

                        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
                            Building AI to save lives, not just time. <br />
                            <span className="text-teal-600 dark:text-teal-400">MD + Engineer</span> obsessed with solving the visceral problems in healthcare.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#flagship"
                                className="group inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40"
                            >
                                View Flagship Products
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link
                                to="/sns-simulator"
                                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-600/30 ring-2 ring-white/20"
                            >
                                <Activity className="w-5 h-5" />
                                Explore Patient Journeys
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-900 rounded-full shadow-lg">
                                    Beta
                                </span>
                            </Link>
                            <a
                                href="https://linkedin.com/in/fmmpinheiro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 glass-card text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all"
                            >
                                <Linkedin className="w-5 h-5" />
                                Connect
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Sword Manifesto Section */}
            <SwordManifesto />

            {/* Featured Build: Candidate OS */}


            {/* Flagship Projects Section */}
            < section id="flagship" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 print:hidden" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-bold text-sm tracking-wide uppercase mb-6">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                            </span>
                            Core Expertise
                        </div>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Flagship AI Solutions
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            My three primary product visions: tackling cardiovascular risk, respiratory health, and metabolic disease with predictive intelligence.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {flagshipProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                strategy={project.strategy}
                                onArchitectureClick={setSelectedArchitectureId}
                                onReportClick={setSelectedReportId}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Architecture Modal */}
                {
                    selectedArchitectureId && architectureData[selectedArchitectureId] && (
                        <ArchitectureModal
                            isOpen={!!selectedArchitectureId}
                            onClose={() => setSelectedArchitectureId(null)}
                            data={architectureData[selectedArchitectureId]}
                        />
                    )
                }

                {/* Safety Report Modal */}
                {
                    selectedReportId && safetyReports[selectedReportId] && (
                        <SafetyReportModal
                            isOpen={!!selectedReportId}
                            onClose={() => setSelectedReportId(null)}
                            data={safetyReports[selectedReportId]}
                        />
                    )
                }
            </section >

            {/* Innovation Lab Projects Section */}
            < section id="innovation" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 print:hidden border-t border-slate-200 dark:border-slate-800" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                    >
                        <div className="text-left">
                            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                Innovation Lab & MVPs
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                                Rapid prototypes demonstrating specific technical capabilities, from Computer Vision to Agentic AI and System Dynamics.
                            </p>
                        </div>
                        <div className="hidden md:block h-1 flex-1 bg-slate-200 dark:bg-slate-800 mx-8 rounded-full"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {innovationProjects.map((project, index) => {
                            const Icon = project.icon;
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="group relative glass-card overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-950"
                                >
                                    {/* Compact Header */}
                                    <div className={`h-24 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/10"></div>
                                        <div className="absolute -bottom-4 -right-4 bg-white/10 p-4 rounded-full">
                                            <Icon className="w-16 h-16 text-white opacity-20" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                                                {project.name}
                                            </h3>
                                            <Icon className="w-5 h-5 text-slate-400" />
                                        </div>

                                        <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2 uppercase line-clamp-1">
                                            {project.tagline}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 transition-colors"
                                            >
                                                Launch <ExternalLink className="w-3 h-3" />
                                            </a>
                                            <button
                                                onClick={() => setSelectedArchitectureId(project.id)}
                                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                                title="View Design"
                                            >
                                                <CodeIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Architecture Modal */}
                {
                    selectedArchitectureId && (
                        <ArchitectureModal
                            isOpen={!!selectedArchitectureId}
                            onClose={() => setSelectedArchitectureId(null)}
                            data={architectureData[selectedArchitectureId]}
                        />
                    )
                }
            </section >

            {/* Product Thinking Section */}
            < section id="thinking" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 print:hidden" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Product Thinking
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Deep dives into market analysis, product strategy, and requirements definition.
                        </p>
                    </motion.div>

                    {/* Unified Grid: 3 Columns for 6 Items */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Featured Insight: SNS Transformation */}
                        <Link
                            to="/sns-transformation"
                            className="glass-card p-8 group md:col-span-2 lg:col-span-3 bg-gradient-to-br from-white to-teal-50 dark:from-slate-900 dark:to-teal-900/20 border-teal-200 dark:border-teal-800"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="bg-teal-100 dark:bg-teal-900/50 p-6 rounded-2xl group-hover:scale-105 transition-transform">
                                    <Database className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <div className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm uppercase tracking-wide mb-2">
                                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                                        Strategic Blueprint 2025
                                    </div>
                                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                                        Re-Engineering the Portuguese SNS
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-4 max-w-2xl">
                                        A tactical roadmap for the Ministry of Health: Moving from a saturated, reactive model to a sustainable "Bionic Health System" through Algorithmic Optimization.
                                    </p>
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-teal-700 dark:text-teal-400 font-bold">
                                        Read the Manifesto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* PRDs */}
                        <Link
                            to="/documents/heartguide-prd"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-blue-50 dark:bg-blue-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                                <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                HeartGuide PRD
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Requirements for AI-powered heart failure readmission prevention.
                            </p>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                Read Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            to="/documents/breatheasy-prd"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-cyan-50 dark:bg-cyan-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-colors">
                                <FileText className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                BreathEasy PRD
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Specs for smart asthma management with environmental trigger prediction.
                            </p>
                            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm">
                                Read Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            to="/documents/glucowise-prd"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                                <FileText className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                GlucoWise PRD
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Specs for AI-driven diabetes coaching and lifestyle management.
                            </p>
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                                Read Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>



                    </div>
                </div>
            </section >

            {/* About Section */}
            < section id="about" className="py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 print:bg-white print:py-0" >
                <div className="max-w-6xl mx-auto px-6 print:px-0 print:max-w-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 print:hidden">
                            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white">
                                About Me
                            </h2>
                            <button
                                onClick={() => window.print()}
                                className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-95"
                            >
                                <FileText className="w-4 h-4" />
                                Download CV
                            </button>
                        </div>

                        {/* Print Header (Only visible when printing) */}
                        <div className="hidden print:block mb-8 border-b-2 border-slate-900 pb-4">
                            <h1 className="text-3xl font-bold text-slate-900">Francisco Pinheiro</h1>
                            <p className="text-lg text-slate-600">MD • Biomedical Engineer • AI Product Manager</p>
                            <div className="flex gap-4 mt-2 text-sm text-slate-500">
                                <span>fpinheiro921@gmail.com</span>
                                <span>linkedin.com/in/fmmpinheiro</span>
                                <span>github.com/fpinheiropt</span>
                            </div>
                        </div>

                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16 text-center print:text-left print:mb-8 print:text-base print:max-w-none print:text-slate-900">
                            Bridging clinical medicine, AI/ML engineering, and product thinking to build solutions that truly address healthcare challenges.
                        </p>

                        {/* Work Experience Timeline */}
                        <div className="mb-16 print:mb-8">
                            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8 print:text-xl print:mb-4">Work Experience</h3>
                            <div className="space-y-6 print:space-y-4">
                                {resumeData.experience.map((exp, index) => (
                                    <div key={index} className="glass-card p-6 border-l-4 border-teal-600 print:break-inside-avoid print:shadow-none print:border-l-2 print:border-slate-800 print:p-0 print:pl-4 print:bg-transparent hover:scale-[1.01] hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
                                        <div className="flex flex-wrap justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-900 dark:text-white print:text-lg print:text-slate-900">{exp.role}</h4>
                                                <p className="text-teal-600 dark:text-teal-400 font-semibold print:text-slate-700">{exp.company}</p>
                                            </div>
                                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full print:bg-transparent print:p-0 print:text-slate-600">{exp.period}</span>
                                        </div>
                                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mt-4 print:mt-2">
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="text-teal-600 dark:text-teal-400 font-bold print:hidden">•</span>
                                                    <span className="print:list-disc print:ml-4">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Matrix */}
                        <div className="mb-12 print:mb-8 print:break-inside-avoid">
                            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8 print:text-xl print:mb-4">Skills & Expertise</h3>
                            <div className="grid md:grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
                                {/* Clinical */}
                                <div className="group bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 rounded-2xl p-6 border border-teal-200 dark:border-teal-800/50 backdrop-blur-sm print:bg-transparent print:border print:border-slate-200 print:p-4 print:rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    <h4 className="font-display font-bold text-teal-900 dark:text-teal-300 mb-4 text-lg uppercase tracking-wide print:text-sm print:mb-2 print:text-slate-900 group-hover:text-teal-700 dark:group-hover:text-teal-200 transition-colors">Clinical Expertise</h4>
                                    <ul className="space-y-2">
                                        {resumeData.skills.clinical.map(skill => (
                                            <li key={skill} className="flex items-center gap-2 text-teal-800 dark:text-teal-200 print:text-slate-800 print:text-sm">
                                                <div className="flex gap-1 print:hidden group-hover:scale-110 transition-transform">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                                                    ))}
                                                </div>
                                                <span className="font-medium">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Digital Health */}
                                <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm print:bg-transparent print:border print:border-slate-200 print:p-4 print:rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    <h4 className="font-display font-bold text-blue-900 dark:text-blue-300 mb-4 text-lg uppercase tracking-wide print:text-sm print:mb-2 print:text-slate-900 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">Digital Health & AI</h4>
                                    <ul className="space-y-2">
                                        {resumeData.skills.digital.map(skill => (
                                            <li key={skill} className="flex items-center gap-2 text-blue-800 dark:text-blue-200 print:text-slate-800 print:text-sm">
                                                <div className="flex gap-1 print:hidden group-hover:scale-110 transition-transform">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                                                    ))}
                                                </div>
                                                <span className="font-medium">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Technical */}
                                <div className="group bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 backdrop-blur-sm print:bg-transparent print:border print:border-slate-200 print:p-4 print:rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 mb-4 text-lg uppercase tracking-wide print:text-sm print:mb-2 print:text-slate-900 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Technical Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.technical.map(skill => (
                                            <span key={skill} className="bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 print:bg-slate-100 print:text-slate-800 print:border print:border-slate-200 group-hover:border-slate-300 dark:group-hover:border-slate-500 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education & Contact */}
                        <div className="glass-card p-8 print:shadow-none print:border-none print:p-0 print:break-inside-avoid">
                            <div className="grid sm:grid-cols-2 gap-8 mb-8 print:gap-4 print:mb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-lg print:text-lg print:mb-2">Education</h3>
                                    <ul className="space-y-3 text-slate-600 dark:text-slate-300 print:space-y-2">
                                        {resumeData.education.map((edu, i) => (
                                            <li key={i} className="flex flex-col">
                                                <span className="font-semibold text-slate-900 dark:text-white print:text-slate-900">{edu.degree}</span>
                                                <span className="text-sm print:text-slate-700">{edu.institution}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600">{edu.period}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-lg print:text-lg print:mb-2">Certifications</h3>
                                    <ul className="space-y-3 text-slate-600 dark:text-slate-300 print:space-y-2">
                                        {resumeData.certifications.map((cert, i) => (
                                            <li key={i} className="flex flex-col">
                                                <span className="font-semibold text-slate-900 dark:text-white print:text-slate-900">{cert.name}</span>
                                                <span className="text-sm print:text-slate-700">{cert.issuer}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600">{cert.date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <a
                                    href="https://linkedin.com/in/fmmpinheiro"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    <span className="font-medium">LinkedIn</span>
                                </a>
                                <a
                                    href="https://github.com/fpinheiropt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    <span className="font-medium">GitHub</span>
                                </a>
                                <a
                                    href="mailto:fpinheiro921@gmail.com"
                                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span className="font-medium">Email</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* Footer */}
            < footer className="bg-slate-900 text-white py-12 print:hidden" >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-400 mb-4">
                        © 2025 Francisco Pinheiro. Built with React, TypeScript, and Tailwind CSS.
                    </p>
                    <p className="text-slate-500 text-sm italic">
                        "The future of healthcare is at the intersection of clinical expertise and artificial intelligence."
                    </p>
                </div>
            </footer >
        </div >
    );
}

export default Home;
