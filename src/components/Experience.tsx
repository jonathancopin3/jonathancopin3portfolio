import { motion } from 'framer-motion';
import { content } from '../constants';

export const Experience = () => {
    return (
        <section id="experience" className="py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl font-display font-semibold text-white mb-6">
                        Experience.
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />

                    <div className="space-y-16">
                        {content.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-10 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content Card */}
                                <div className="w-full md:w-1/2">
                                    <div className="glass-apple p-8 rounded-3xl relative hover:bg-white/5 transition-colors duration-500">
                                        <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">
                                            {exp.period}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {exp.role}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 font-medium">
                                            {
                                                // @ts-ignore
                                                exp.companyUrl ? (
                                                    // @ts-ignore
                                                    <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                                        {exp.company}
                                                    </a>
                                                ) : (
                                                    exp.company
                                                )
                                            }
                                        </p>
                                        <ul className="space-y-2">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="text-gray-500 text-sm leading-relaxed">
                                                    • {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="hidden md:flex w-4 h-4 rounded-full bg-black border-2 border-primary z-10 relative shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    <div className="absolute inset-0 bg-primary opacity-50 blur-sm rounded-full" />
                                </div>

                                {/* Spacer for opposite side */}
                                <div className="w-full md:w-1/2 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
