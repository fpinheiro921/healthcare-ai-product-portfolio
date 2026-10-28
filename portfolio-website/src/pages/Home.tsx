import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    Wind,
    Droplet,
    Github,
    Linkedin,
    Mail,
    ArrowRight,
    FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { resumeData } from '../data/resume';
import ArchitectureModal from '../components/ArchitectureModal';
import { architectureData } from '../data/architecture';
import SafetyReportModal from '../components/SafetyReportModal';
import { safetyReports } from '../data/safetyReports';
import ProjectCard from '../components/ProjectCard';

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
                problem: "Heart Failure has a high unplanned readmission burden when symptom drift is detected late.",
                solution: "A continuous monitoring workflow that surfaces weight/symptom drift for clinician review.",
                kpi: "Target: lower 30-day readmissions (hypothesis)"
            }
        },
        {
            id: 'breatheasy',
            name: 'BreathEasy AI',
            tagline: 'Environmental Care Specialist',
            description: 'Predictive agent that correlates AQI and clinical history to prevent asthma/COPD exacerbations before they escalate.',
            icon: Wind,
            color: 'from-teal-500 to-cyan-600',
            url: '/breatheasy-showcase',
            features: ['Predictive Safety', 'Trigger Simulator', 'Asthma + COPD'],
            strategy: {
                problem: "Respiratory exacerbations are often managed reactively after environmental exposure.",
                solution: "Correlate pollen/AQI signals with patient history to issue pre-emptive alerts.",
                kpi: "Target: fewer ED visits (hypothesis)"
            }
        },
        {
            id: 'glucowise',
            name: 'GlucoWise AI',
            tagline: 'Metabolic Care Specialist',
            description: 'Coaching UI for Type 2 diabetes on insulin — meal impact estimation and pre-meal decision support.',
            icon: Droplet,
            color: 'from-blue-500 to-indigo-600',
            url: '/glucowise-showcase',
            features: ['Metabolic Physics', 'Glucose Prediction', 'Smart Bolus'],
            strategy: {
                problem: "Insulin users struggle to estimate meal impact, driving post-prandial spikes.",
                solution: "Meal load estimation plus pre-meal bolus decision support with safety checks.",
                kpi: "Target: higher time-in-range (hypothesis)"
            }
        },
        {
            id: 'docuflow',
            name: 'DocuFlow',
            tagline: 'Clinical Documentation Workflow',
            description: 'Case study + working UI for structured clinical notes with privacy-minded processing patterns.',
            icon: FileText,
            color: 'from-emerald-500 to-teal-600',
            url: '/docuflow-showcase',
            features: ['SOAP Workflow', 'Clinician Review', 'Privacy-minded'],
            strategy: {
                problem: "Documentation burden and cloud PII exposure create clinician and compliance risk.",
                solution: "Structured note workflows designed for local/controlled processing and human review.",
                kpi: "Target: less documentation time (hypothesis)"
            }
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
                        <div className="mb-8 flex justify-center relative z-10">
                            <img
                                src="/images/profile-avatar.jpg"
                                alt="Francisco Pinheiro"
                                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-teal-500/30 shadow-xl shadow-teal-900/20"
                            />
                        </div>
                        <h1 className="font-display text-5xl sm:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight relative z-10">
                            Francisco Pinheiro
                        </h1>

                        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
                            Clinical workflow prototypes for health systems. <br />
                            <span className="text-teal-600 dark:text-teal-400">MD + Biomedical Engineer</span> building case studies with working UIs.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#flagship"
                                className="group inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40"
                            >
                                View case studies
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link
                                to="/experiments"
                                className="inline-flex items-center gap-2 glass-card text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all"
                            >
                                Additional experiments
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

            {/* Focus case studies */}
            <section id="flagship" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 print:hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-bold text-sm tracking-wide uppercase mb-6">
                            Focus
                        </div>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Case studies + working UIs
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Four primary prototypes: heart failure, asthma/COPD, Type 2 diabetes on insulin, and clinical documentation. Outcome metrics are targets/hypotheses, not measured results.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
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
            </section>

            {/* Experiments teaser (full list on secondary page) */}
            <section id="experiments-teaser" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 print:hidden border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        Additional experiments
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                        Smaller working-UI prototypes for triage, capacity, logistics, and related clinical workflows — kept off the homepage focus set.
                    </p>
                    <Link
                        to="/experiments"
                        className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all"
                    >
                        Browse experiments
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Product Thinking Section */}
            <section id="thinking" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 print:hidden">
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
                            Problem-first PRDs for the four focus case studies — clinical workflow requirements, not marketing claims.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                                Heart-failure remote monitoring and readmission-risk workflow requirements.
                            </p>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                Read PRD <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                                Asthma and COPD environmental-trigger risk and exacerbation-prevention requirements.
                            </p>
                            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm">
                                Read PRD <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                                Type 2 diabetes on insulin — meal impact estimation and glucose-coaching requirements.
                            </p>
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                                Read PRD <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link
                            to="/docuflow-showcase"
                            className="glass-card p-8 group"
                        >
                            <div className="bg-emerald-50 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                                <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                DocuFlow Case Study
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Clinical documentation workflow — structured notes with clinician review (case study + UI).
                            </p>
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                                View case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 print:bg-white print:py-0">
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
                            <p className="text-lg text-slate-600">MD • Biomedical Engineer • Clinical workflow prototypes</p>
                            <div className="flex gap-4 mt-2 text-sm text-slate-500">
                                <span>fpinheiro921@gmail.com</span>
                                <span>linkedin.com/in/fmmpinheiro</span>
                                <span>github.com/fpinheiro921</span>
                            </div>
                        </div>

                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16 text-center print:text-left print:mb-8 print:text-base print:max-w-none print:text-slate-900">
                            Bridging clinical medicine and product thinking to design health-system clinical workflows — case studies with working UIs.
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
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 print:hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-slate-400 mb-4">
                        © 2025 Francisco Pinheiro. Built with React, TypeScript, and Tailwind CSS.
                    </p>
                    <p className="text-slate-500 text-sm italic">
                        Clinical workflow prototypes for health systems — case studies with working UIs.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
