import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { content } from '../constants';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

const TABS = [
    { id: 'all', label: 'All Projects', projects: [] },
    { id: 'highlights', label: 'Highlights', projects: ['tfe-liminal', 'premium-window-frame', 'nomad-apple-watch', 'devialet-mania', 'premium-microphone', 'vfx-animation'] },
    { id: 'tfe', label: 'TFE', projects: ['tfe-liminal'] },
    { id: 'design', label: 'Design', projects: ['premium-window-frame', 'nomad-apple-watch', 'truck-simulator', 'devialet-mania', 'premium-microphone', 'ikea-lockers'] },
    { id: 'animation', label: 'Animation', projects: ['nomad-apple-watch', 'pixar-lamp', 'the-big-robots', 'vfx-animation'] }
];

// Ordre d'affichage pour "All Projects"
// Les items sont organisés par paires : chaque paire forme une rangée de 3 colonnes
// Le pattern quinconce est automatique via getColSpan() ci-dessous
const ALL_PROJECTS_ORDER = [
    // Rangée 1 (pair) : grand GAUCHE, petit DROITE
    'tfe-liminal',
    'nomad-apple-watch',
    // Rangée 2 (impair) : petit GAUCHE, grand DROITE
    'sand-simulation',
    'premium-window-frame',
    // Rangée 3 (pair) : grand GAUCHE, petit DROITE
    'truck-simulator',
    'devialet-mania',
    // Rangée 4 (impair) : petit GAUCHE, grand DROITE
    'premium-microphone',
    'wilo-component-modeling',
    // Rangée 5 (pair) : grand GAUCHE, petit DROITE
    'ikea-lockers',
    'pixar-lamp',
    // Rangée 6 (impair) : petit GAUCHE, grand DROITE
    'the-big-robots',
    'passage-between-worlds',
    // Rangée 7 (pair) : grand GAUCHE, petit DROITE
    'vfx-animation',
    'architecture',
    // Rangée 8 : seul, grand
    'environment-cabane',
];

// ─── Quinconce automatique ────────────────────────────────────────────────────
// Rangée paire  → pos 0 = col-span-2 (gauche), pos 1 = col-span-1 (droite)
// Rangée impaire → pos 0 = col-span-1 (gauche), pos 1 = col-span-2 (droite)
// Dernier item seul → col-span-2 centré
const getColSpan = (index: number, total: number): string => {
    const isLastAlone = index === total - 1 && total % 2 === 1;
    if (isLastAlone) return 'md:col-span-2';

    const row = Math.floor(index / 2);
    const pos = index % 2;

    if (row % 2 === 0) {
        // Rangée paire : grand à gauche, petit à droite
        return pos === 0 ? 'md:col-span-2' : 'md:col-span-1';
    } else {
        // Rangée impaire : petit à gauche, grand à droite
        return pos === 0 ? 'md:col-span-1' : 'md:col-span-2';
    }
};

export const Projects = () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredProjects: Project[] = activeTab === 'all'
        ? ALL_PROJECTS_ORDER
            .map(id => content.projects.find(p => p.id === id))
            .filter(Boolean) as Project[]
        : content.projects.filter(p => {
            const tab = TABS.find(t => t.id === activeTab);
            return tab?.projects.includes(p.id);
        }) as Project[];

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
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, index) => {
                            const colSpan = getColSpan(index, filteredProjects.length);

                            return (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    className={`group relative apple-card cursor-pointer h-[500px] flex flex-col ${colSpan}`}
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

                                        {/* Arrow / Lock Icon */}
                                        <div className="absolute top-8 right-8 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-white">
                                            {project.protected ? (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            ) : (
                                                <ArrowUpRight size={20} />
                                            )}
                                        </div>

                                        {/* Image */}
                                        <div className="absolute inset-0 z-0 rounded-[24px] overflow-hidden">
                                            <img
                                                src={project.thumbnailUrl}
                                                alt={project.title}
                                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.protected ? 'blur-md opacity-80' : ''}`}
                                                style={{ objectPosition: project.thumbnailObjectPosition || 'center' }}
                                            />
                                            {project.protected && (
                                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-sm z-10 gap-3">
                                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
                                                        <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase">Access Restricted</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
