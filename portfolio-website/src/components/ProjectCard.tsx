import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ExternalLink,
    Code as CodeIcon,
    ShieldCheck,
    Target,
    Eye,
    ArrowRight
} from 'lucide-react';

interface ProjectCardProps {
    project: {
        id: string;
        name: string;
        tagline: string;
        description: string;
        icon: React.ElementType;
        color: string;
        url: string;
        features?: string[];
    };
    strategy?: {
        problem: string;
        solution: string;
        kpi: string;
    };
    onArchitectureClick?: (id: string) => void;
    onReportClick?: (id: string) => void;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    strategy,
    onArchitectureClick,
    onReportClick,
    index
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const Icon = project.icon;
    const isInternal = project.url.startsWith('/');

    return (
        <div className="relative h-[640px] perspective-1000 group">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1 // Staggered entrance
                }}
                whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="w-full h-full relative"
            >
                {/* Front and Back Container */}
                <div
                    className={`relative w-full h-full duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* FRONT FACE (Showcase) */}
                    <div className="absolute inset-0 backface-hidden glass-card overflow-hidden hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-teal-900/20 border-2 border-transparent hover:border-teal-500/20 flex flex-col bg-white dark:bg-slate-900 rounded-3xl">
                        {/* Spotlight Gradient on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                        {/* Header */}
                        <div className={`h-36 min-h-[9rem] max-h-[9rem] shrink-0 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/10"></div>
                            <Icon className="absolute -bottom-6 -right-6 w-36 h-36 text-white opacity-10 rotate-12" />

                            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                                {/* Strategy Toggle Button */}
                                {strategy && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsFlipped(true);
                                        }}
                                        className="glass-panel p-2 rounded-full hover:bg-white/20 transition-colors shadow-lg group/btn cursor-pointer z-50 relative"
                                        title="View Strategy"
                                    >
                                        <Target className="w-6 h-6 text-white" />
                                    </button>
                                )}
                                <div className="glass-panel p-2 rounded-2xl shadow-xl">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 relative z-10 flex-1 flex flex-col">
                            <h3 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-3">
                                {project.name}
                            </h3>
                            <p className="text-sm font-bold text-teal-600 dark:text-teal-400 mb-4 uppercase tracking-wider">
                                {project.tagline}
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.features?.map((feature) => (
                                    <span
                                        key={feature}
                                        className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full font-bold border border-slate-200 dark:border-slate-700"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 mt-auto">
                                {isInternal ? (
                                    <Link
                                        to={project.url}
                                        className="w-full inline-flex justify-center items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100 text-white dark:text-slate-900 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-white/20 transition-all duration-200 shadow-lg active:scale-95"
                                    >
                                        Case study + UI
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                ) : (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex justify-center items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100 text-white dark:text-slate-900 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-white/20 transition-all duration-200 shadow-lg active:scale-95"
                                    >
                                        Working UI
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}

                                <div className="grid grid-cols-2 gap-3 w-full">
                                    {onArchitectureClick && (
                                        <button
                                            onClick={() => onArchitectureClick(project.id)}
                                            className="flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 text-sm"
                                        >
                                            <CodeIcon className="w-4 h-4" /> Architecture
                                        </button>
                                    )}
                                    {onReportClick && (
                                        <button
                                            onClick={() => onReportClick(project.id)}
                                            className="flex items-center justify-center gap-2 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors border border-emerald-200 dark:border-emerald-800 text-sm"
                                        >
                                            <ShieldCheck className="w-4 h-4" /> Safety Report
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BACK FACE (Strategy) */}
                    <div
                        className="absolute inset-0 backface-hidden glass-card overflow-hidden bg-slate-900 text-white flex flex-col rotate-y-180"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <div className="h-full p-8 flex flex-col relative overflow-hidden">
                            {/* Background Decor */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                            {/* Top Bar */}
                            <div className="flex justify-between items-center mb-8 relative z-10">
                                <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-widest text-xs">
                                    <Target className="w-4 h-4" />
                                    Product Strategy
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsFlipped(false);
                                    }}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-50 relative"
                                >
                                    <Eye className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Content */}
                            {strategy && (
                                <div className="flex-1 space-y-8 relative z-10">
                                    <div>
                                        <h4 className="text-red-400 font-bold text-sm uppercase mb-2">The Problem</h4>
                                        <p className="text-xl font-display font-medium leading-relaxed">
                                            "{strategy.problem}"
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-teal-400 font-bold text-sm uppercase mb-2">The Solution</h4>
                                        <p className="text-lg text-slate-300 leading-relaxed">
                                            {strategy.solution}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-purple-400 font-bold text-sm uppercase mb-2">Key Metric</h4>
                                        <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-200 font-mono font-bold">
                                            {strategy.kpi}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                                >
                                    View Implementation <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectCard;
