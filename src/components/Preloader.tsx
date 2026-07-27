import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../constants';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Collect all important images to preload before revealing the site
    const imagesToPreload = [
      "/Image all projet/Logo/Logo.png",
      content.photoUrl,
      ...content.projects.slice(0, 3).map(p => p.thumbnailUrl).filter(Boolean),
      ...content.projects.slice(0, 3).map(p => p.heroUrl).filter(Boolean)
    ] as string[];

    const uniqueImages = [...new Set(imagesToPreload)];
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / uniqueImages.length) * 100);
      setProgress(percent);
    };

    if (uniqueImages.length === 0) {
      setProgress(100);
      setTimeout(onComplete, 500);
      return;
    }

    const loadPromises = uniqueImages.map(src => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          updateProgress();
          resolve();
        };
      });
    });

    Promise.all(loadPromises).then(() => {
      // Add a slight delay at 100% for aesthetic reasons (so the user sees 100% briefly)
      setTimeout(() => {
        onComplete();
      }, 600);
    });

  }, [onComplete]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: "blur(10px)", scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center z-10">
        {/* Apple-style breathing logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-28 h-28 md:w-40 md:h-40 mb-12"
        >
          <img 
            src="/Image all projet/Logo/Logo.png" 
            alt="Jonathan Copine Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
          {/* Subtle pulsing glow */}
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-white/20 blur-3xl rounded-full -z-10" 
          />
        </motion.div>

        {/* Minimalist Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="w-48 md:w-64 h-[1px] bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div 
            className="h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
          />
        </motion.div>

        {/* Sleek Percentage Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-white/40 text-[10px] md:text-xs font-light tracking-[0.3em] font-mono"
        >
          {progress.toString().padStart(3, '0')}%
        </motion.div>
      </div>
      
      {/* Background ambient noise/gradient for a more premium look */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
    </motion.div>
  );
};
