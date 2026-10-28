import { motion } from 'framer-motion';
import { ArrowLeft, Code as CodeIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import ArchitectureModal from '../components/ArchitectureModal';
import { architectureData } from '../data/architecture';
import { experimentProjects } from '../data/experiments';

export default function Experiments() {
    const [selectedArchitectureId, setSelectedArchitectureId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            <section className="pt-28 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 max-w-3xl"
                    >
                        <p className="text-sm font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400 mb-3">
                            Secondary
                        </p>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Additional experiments
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Working UI prototypes exploring triage, capacity, logistics, and related clinical workflows.
                            These are not the primary case studies — see HeartGuide, BreathEasy, GlucoWise, and DocuFlow on the home page.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {experimentProjects.map((project, index) => {
                            const Icon = project.icon;
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.03 }}
                                    className="group relative glass-card overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-950"
                                >
                                    <div className={`h-24 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/10" />
                                        <div className="absolute -bottom-4 -right-4 bg-white/10 p-4 rounded-full">
                                            <Icon className="w-16 h-16 text-white opacity-20" />
                                        </div>
                                    </div>

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
                                                Working UI <ExternalLink className="w-3 h-3" />
                                            </a>
                                            <button
                                                onClick={() => setSelectedArchitectureId(project.id)}
                                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                                title="View design notes"
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
            </section>

            {selectedArchitectureId && architectureData[selectedArchitectureId] && (
                <ArchitectureModal
                    isOpen={!!selectedArchitectureId}
                    onClose={() => setSelectedArchitectureId(null)}
                    data={architectureData[selectedArchitectureId]}
                />
            )}
        </div>
    );
}
