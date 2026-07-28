import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, SkipBack, Play, Pause, SkipForward } from 'lucide-react';

interface Layer {
    src: string;
    label: string;
}

interface MultiLayerSliderProps {
    layers: Layer[];
}

const CompositingProcess = ({ layers, isFullscreen = false }: { layers: Layer[], isFullscreen?: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const intervalRef = useRef<number | null>(null);
    const intervalDuration = 900;

    useEffect(() => {
        layers.forEach(layer => {
            const img = new Image();
            img.src = layer.src;
        });
    }, [layers]);

    const nextStep = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % layers.length);
    }, [layers.length]);

    const prevStep = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + layers.length) % layers.length);
    }, [layers.length]);

    useEffect(() => {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        if (isPlaying) {
            intervalRef.current = window.setInterval(nextStep, intervalDuration);
        }
        return () => {
            if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        };
    }, [isPlaying, nextStep]);

    return (
        <div>
            {!isFullscreen && (
                <div className="text-center mb-6 md:mb-10">
                    <h4 className="text-xl md:text-2xl font-display font-medium text-white mb-2">Compositing Process</h4>
                    <p className="text-sm text-gray-400 font-light">
                        From raw geometry to final composite — {layers.length} steps
                    </p>
                </div>
            )}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-black">
                <div className="relative aspect-[2.39/1]">
                    {layers.map((layer, idx) => (
                        <motion.img
                            key={layer.src}
                            src={layer.src}
                            alt={layer.label}
                            className="absolute inset-0 w-full h-full object-cover"
                            animate={{ opacity: idx === currentIndex ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{ willChange: "opacity" }}
                            draggable={false}
                        />
                    ))}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pt-16 pb-4 px-4 md:px-8 pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ y: 6, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -6, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <p className="text-[10px] md:text-xs text-white/50 font-mono mb-0.5">
                                    Step {currentIndex + 1} / {layers.length}
                                </p>
                                <p className="text-sm md:text-lg font-display font-semibold text-white">
                                    {layers[currentIndex].label}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex gap-[3px] px-4 md:px-6 py-3 bg-black/80">
                    {layers.map((layer, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setCurrentIndex(idx); setIsPlaying(false); }}
                            className={`flex-1 h-1 rounded-full transition-all duration-300 touch-manipulation ${
                                idx === currentIndex ? "bg-white" : idx < currentIndex ? "bg-white/40" : "bg-white/15"
                            }`}
                            aria-label={`Step ${idx + 1}: ${layer.label}`}
                        />
                    ))}
                </div>

                <div className="flex items-center justify-center gap-4 pb-4 bg-black/80">
                    <button
                        onClick={() => { prevStep(); setIsPlaying(false); }}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors touch-manipulation"
                        aria-label="Previous step"
                    >
                        <SkipBack size={18} />
                    </button>
                    <button
                        onClick={() => setIsPlaying(p => !p)}
                        className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center transition-colors touch-manipulation shadow-lg"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                    </button>
                    <button
                        onClick={() => { nextStep(); setIsPlaying(false); }}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors touch-manipulation"
                        aria-label="Next step"
                    >
                        <SkipForward size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const MultiLayerSlider: React.FC<MultiLayerSliderProps> = ({ layers }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-3 right-3 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white/70 hover:text-white hover:bg-black/90 transition-all touch-manipulation backdrop-blur-md"
                    aria-label="View in fullscreen"
                >
                    <Maximize2 size={16} />
                </button>
                <CompositingProcess layers={layers} />
            </div>

            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black flex items-center justify-center p-4 md:p-8"
                        onClick={() => setIsFullscreen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.93, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.93, opacity: 0 }}
                            className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-white/60 text-sm font-light">Compositing Process</span>
                                <button
                                    onClick={() => setIsFullscreen(false)}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white transition-colors touch-manipulation"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <CompositingProcess layers={layers} isFullscreen={true} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
