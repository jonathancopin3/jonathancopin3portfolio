import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { content } from '../constants';

const HERO_SLIDES = [
    {
        image: "/Image all projet/Horman - Chassis/chassis_fenetre_sections_L_exploded_studio.png",
        title: "Prenium Window Frame"
    },
    {
        image: "/Image all projet/Mic/Mike_v2__03_argent.png",
        title: "Prenium Microphone"
    },
    {
        image: "/Image all projet/Nomad/Nomad_picture_upscale.png",
        title: "Nomad Apple Watch Strap"
    },
    {
        image: "/Image all projet/Devialet/Rendu_Devialet_Mania_1.jpeg",
        title: "Devialet Mania"
    },
    {
        image: "/Image all projet/Wilo/Wilo_boite_final.png",
        title: "Technical Project : Component Modeling"
    },
    {
        image: "/Image all projet/Retour vers le futur/Picture_retourverslefututr.png",
        title: "VFX Animation"
    }
];

export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
            {/* Liquid Background - Monochrome */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[120px] animate-liquid" />
                <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-gray-500/10 rounded-full blur-[100px] animate-liquid animation-delay-2000" />
                <div className="absolute top-[30%] left-[-10%] w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[80px] animate-liquid animation-delay-4000" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white/80 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        Available for new projects
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tight leading-tight text-white mb-8 relative z-20"
                >
                    Portfolio <br />
                    <span className="text-gray-400/90">Copine Jonathan</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed"
                >
                    {content.tagline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-primary text-black rounded-full font-medium text-lg hover:bg-gray-200 transition-all flex items-center gap-2 group"
                    >
                        View Work
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#about"
                        className="flex items-center gap-2 text-primary hover:text-white transition-colors text-lg group"
                    >
                        <span className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <Play size={16} fill="currentColor" />
                        </span>
                        Watch Showreel
                    </a>
                </motion.div>

                {/* Hero Carousel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ delay: 1, duration: 1.5, type: "spring" }}
                    className="mt-20 w-full max-w-4xl perspective-1000"
                >
                    <div className="glass-apple rounded-3xl p-2 md:p-4 transform rotate-x-12 hover:rotate-x-0 transition-transform duration-1000 bg-[#1d1d1f]">
                        <div className="aspect-[21/9] rounded-2xl bg-black/50 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={HERO_SLIDES[currentSlide].image}
                                        alt={HERO_SLIDES[currentSlide].title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay Gradient & Title */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-12">
                                        <motion.h3
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-2xl md:text-4xl font-display font-bold text-white drop-shadow-lg"
                                        >
                                            {HERO_SLIDES[currentSlide].title}
                                        </motion.h3>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
