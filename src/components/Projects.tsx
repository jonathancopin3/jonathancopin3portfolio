import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { content } from '../constants';
import { Link } from 'react-router-dom';

const TABS = [
    { id: 'all', label: 'All Projects', projects: [] },
    { id: 'highlights', label: 'Highlights', projects: ['premium-window-frame', 'nomad-apple-watch', 'devialet-mania', 'premium-microphone', 'vfx-animation'] },
    { id: 'design', label: 'Design', projects: ['premium-window-frame', 'nomad-apple-watch', 'devialet-mania', 'premium-microphone', 'ikea-lockers'] },
    { id: 'animation', label: 'Animation', projects: ['nomad-apple-watch', 'pixar-lamp', 'the-big-robots', 'vfx-animation'] }
];

export const Projects = () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredProjects = activeTab === 'all'
        ? content.projects
        : content.projects.filter(p => {
            const tab = TABS.find(t => t.id === activeTab);
            return tab?.projects.includes(p.id);
        });

    return (
        <section id="projects" className="py-32 bg-dark">
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-6">
                        Selected Work.
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light mb-10">
                        A collection of projects designed with precision and passion.
                    </p>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-white text-black'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className={`group relative apple-card cursor-pointer h-[500px] flex flex-col ${index % 4 === 0 || index % 4 === 3 ? 'md:col-span-2' : ''}`}
                            >
                                <Link to={`/project/${project.id}`} className="block w-full h-full relative">
                                    {/* Image Info Overlay */}
                                    <div className="absolute top-8 left-8 z-20">
                                        <span className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-2 block">
                                            {project.category}
                                        </span>
                                        <h3 className="text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="absolute top-8 right-8 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-white">
                                        <ArrowUpRight size={20} />
                                    </div>

                                    {/* Image */}
                                    <div className="absolute inset-0 z-0 rounded-[24px] overflow-hidden">
                                        <img
                                            src={project.thumbnailUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            style={{ objectPosition: project.thumbnailObjectPosition || 'center' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

