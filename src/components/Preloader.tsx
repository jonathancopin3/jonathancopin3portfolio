import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        // Critical images to preload (Logo + First Hero Slides)
        const imagesToPreload = [
            "/Images_Projets/Logo/Logo.png",
            "/hero_optimized/magnific_pocLioXehw.jpg",
            "/hero_optimized/Horman_Chassis.jpg"
        ];

        let loadedCount = 0;

        const checkLoaded = () => {
            loadedCount++;
            if (loadedCount >= imagesToPreload.length) {
                // Minimum aesthetic delay (Apple-like feel)
                setTimeout(() => {
                    setIsLoaded(true);
                    document.body.style.overflow = '';
                }, 1500);
            }
        };

        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = checkLoaded;
            img.onerror = checkLoaded; // Ensure it proceeds even on error
        });

        // Failsafe: force remove preloader after 4 seconds
        const fallback = setTimeout(() => {
            setIsLoaded(true);
            document.body.style.overflow = '';
        }, 4000);

        return () => {
            clearTimeout(fallback);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    className="fixed inset-0 z-[999999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.img
                        src="/Images_Projets/Logo/Logo.png"
                        alt="Logo Jonathan Copine"
                        className="w-16 h-16 md:w-20 md:h-20 object-contain mb-10 opacity-90"
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    
                    {/* Minimalist Progress Line */}
                    <motion.div 
                        className="w-32 h-[1px] bg-white/10 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <motion.div 
                            className="h-full bg-white/70"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
