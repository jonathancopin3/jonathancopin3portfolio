import { motion } from 'framer-motion';
import { content } from '../constants';

export const About = () => {
    return (
        <section id="about" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    {/* Image Side */}
                    <div className="relative group">
                        {/* Decorative frames */}
                        <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl transform rotate-3 scale-100 group-hover:rotate-1 transition-transform duration-500 opacity-60" />
                        <div className="absolute inset-0 bg-white/5 rounded-2xl transform -rotate-3 scale-100 group-hover:-rotate-1 transition-transform duration-500 border border-white/10 backdrop-blur-sm" />

                        <a
                            href="/CV_Jonathan_Copine.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative rounded-2xl overflow-hidden glass-card shadow-2xl skew-y-1 group-hover:skew-y-0 transition-transform duration-700 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10 opacity-50" />
                            <img
                                src={content.photoUrl}
                                alt={content.name}
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                        </a>
                    </div>

                    {/* Text Side */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
                            About <span className="text-gradient">Me</span>.
                        </h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed relative">
                            <div className="absolute left-[-20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />
                            <p className="pl-4 border-l-2 border-transparent hover:border-primary/50 transition-colors duration-300">
                                {content.about}
                            </p>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-primary/50" />
                                Toolkit & Skills
                            </h3>
                            <div className="space-y-6">
                                {content.skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                                            <span className="text-sm font-medium text-primary">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                                                className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
