import React from 'react';
import { motion } from 'framer-motion';
import { Flame, MessageSquareWarning, Clock, Target } from 'lucide-react';

const SwordManifesto: React.FC = () => {
    return (
        <section className="py-24 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/40 via-slate-900 to-slate-900"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left: The Manifesto Headline */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-sm mb-6">
                            <Flame className="w-5 h-5 animate-pulse" />
                            The Duty of Excellence
                        </div>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
                            Healthcare software is not just SaaS.<br />
                            <span className="text-slate-400">It is the difference between life and death.</span>
                        </h2>
                        <p className="text-xl text-slate-300 leading-relaxed border-l-4 border-red-500 pl-6 mb-8">
                            "I have the privilege of using my talent to cure them. But we cannot perform if we don't have the tools. My goal is to build the AI infrastructure that enables the SNS to deliver world-class results. Good is not good enough."
                        </p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-slate-400 text-sm font-mono">
                            <Target className="w-4 h-4 text-red-500" />
                            <span>Mission: Zero Preventable Suffering</span>
                        </div>
                    </motion.div>

                    {/* Right: The Values Grid */}
                    <div className="grid gap-6">
                        {/* Value 1: Visceral Impact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="group p-6 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 hover:border-red-500/30 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-sm font-bold">01</span>
                                Biological Results
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                I don't move beyond "user engagement" to "clinical efficacy". My success isn't measured in clicks, but in preventing readmissions and detecting deterioration early. <span className="text-white font-medium">I optimize for physiological outcomes, not just digital metrics.</span>
                            </p>
                        </motion.div>

                        {/* Value 2: Intellectual Honesty */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="group p-6 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 text-sm font-bold">02</span>
                                Radical Transparency
                                <MessageSquareWarning className="w-4 h-4 text-slate-500 group-hover:text-amber-500 transition-colors" />
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                In clinical medicine, hiding errors kills. I build products where data trumps opinion. If a model is drifting, I flag it immediately. <span className="text-white font-medium">I value the uncomfortable truth that prevents harm over the polite silence that hides it.</span>
                            </p>
                        </motion.div>

                        {/* Value 3: Urgency */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="group p-6 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-sm font-bold">03</span>
                                Clinical Velocity
                                <Clock className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Disease progression doesn't respect a product roadmap. I operate with the tempo of the ER, not the boardroom. <span className="text-white font-medium">Deployment velocity matters because every day without the tool is a day patients go unsupported.</span>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SwordManifesto;
