import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Play, Pause } from 'lucide-react';

interface FlipbookProps {
    title: string;
    images: string[];
    aspectRatio?: 'A4' | 'square' | string;
}

export const Flipbook: React.FC<FlipbookProps> = ({ title, images, aspectRatio = 'A4' }) => {
    // If it's a 2-page document (like Flyers), render them statically side-by-side
    if (images.length === 2) {
        return (
            <div className="w-full py-16 flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-[32px] my-12">
                <div className="text-center mb-8 px-6">
                    <h4 className="text-xl font-display font-medium text-white mb-2">{title}</h4>
                    <p className="text-xs text-gray-400 font-mono">Front (left) / Back (right)</p>
                </div>
                <div className="w-full max-w-4xl px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <img src={images[0]} alt="Flyer Front" className="w-full h-auto object-cover" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <img src={images[1]} alt="Flyer Back" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>
        );
    }

    // Symmetrical page indexing: Page 0 is empty (left cover back), Page 1 is Cover (right cover)
    // We pad the images array to ensure cover page is right, and it ends correctly.
    const pages = React.useMemo(() => {
        const padded = ['', ...images];
        if (padded.length % 2 !== 0) {
            padded.push('');
        }
        return padded;
    }, [images]);

    const [currentSpread, setCurrentSpread] = useState(0); // 0 corresponds to cover (pages[0] & pages[1])
    const [isFlipping, setIsFlipping] = useState<'next' | 'prev' | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const totalSpreads = Math.ceil(pages.length / 2);

    // Auto-play / Presentation mode timer
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                if (currentSpread < totalSpreads - 1) {
                    handleNext();
                } else {
                    setIsPlaying(false);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentSpread, totalSpreads]);

    // Handle full-screen events
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch((err) => {
                console.error('Error entering fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleNext = () => {
        if (isFlipping || currentSpread >= totalSpreads - 1) return;
        setIsFlipping('next');
        setTimeout(() => {
            setCurrentSpread(prev => prev + 1);
            setIsFlipping(null);
        }, 600); // matches CSS transition duration (600ms)
    };

    const handlePrev = () => {
        if (isFlipping || currentSpread <= 0) return;
        setIsFlipping('prev');
        setTimeout(() => {
            setCurrentSpread(prev => prev - 1);
            setIsFlipping(null);
        }, 600);
    };

    // Calculate current visible page indexes
    const leftPageIndex = currentSpread * 2;
    const rightPageIndex = currentSpread * 2 + 1;

    // Define dimensions based on Aspect Ratio
    const bookAspect = aspectRatio === 'A4' ? 'aspect-[1.414/1]' : 'aspect-[2/1]';

    return (
        <div 
            ref={containerRef}
            className={`w-full py-16 flex flex-col items-center justify-center relative select-none ${
                isFullscreen ? 'bg-black/95 h-screen py-6 px-4' : 'bg-white/[0.02] border border-white/5 rounded-[32px] my-12'
            }`}
        >
            {/* Header / Info */}
            <div className="text-center mb-8 px-6">
                <h4 className="text-xl font-display font-medium text-white mb-2">{title}</h4>
                <p className="text-xs text-gray-400 font-mono">
                    {currentSpread === 0 
                        ? 'Cover Page' 
                        : currentSpread === totalSpreads - 1 
                            ? 'Back Cover' 
                            : `Pages ${leftPageIndex} - ${rightPageIndex} / ${images.length}`
                    }
                </p>
            </div>

            {/* Desktop Flipbook (preserve-3d) */}
            <div className="w-full max-w-4xl px-8 flex items-center justify-center">
                
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    disabled={currentSpread === 0 || isFlipping !== null}
                    className={`p-3 mr-4 rounded-full border transition-all ${
                        currentSpread === 0 
                            ? 'border-white/5 text-white/20 cursor-not-allowed' 
                            : 'border-white/10 text-white/70 hover:bg-white/5 hover:text-white cursor-pointer'
                    }`}
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Book Wrapper */}
                <div 
                    className={`relative w-full ${isFullscreen ? 'max-w-5xl lg:max-w-6xl xl:max-w-7xl' : 'max-w-3xl'} ${bookAspect} flex perspective-[1500px] shadow-2xl rounded-lg overflow-visible`}
                    style={{ perspective: '2000px' }}
                >
                    
                    {/* Left Static Page */}
                    <div 
                        className={`w-1/2 h-full bg-[#1e1e1e] relative overflow-hidden rounded-l-lg border-r border-black/40`}
                        style={{ transformOrigin: 'right center' }}
                    >
                        {pages[leftPageIndex] ? (
                            <img 
                                src={pages[leftPageIndex]} 
                                alt={`Page ${leftPageIndex}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-black/40 flex items-center justify-center text-xs text-white/20">
                               Jonathan Copine
                            </div>
                        )}
                        {/* Shadow Gradient near the Spine */}
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-black/35 pointer-events-none" />
                    </div>

                    {/* Right Static Page */}
                    <div 
                        className={`w-1/2 h-full bg-[#1e1e1e] relative overflow-hidden rounded-r-lg`}
                        style={{ transformOrigin: 'left center' }}
                    >
                        {pages[rightPageIndex] ? (
                            <img 
                                src={pages[rightPageIndex]} 
                                alt={`Page ${rightPageIndex}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-black/40 flex items-center justify-center text-xs text-white/20">
                               Jonathan Copine
                            </div>
                        )}
                        {/* Shadow Gradient near the Spine */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-l from-transparent to-black/35 pointer-events-none" />
                    </div>

                    {/* 3D Flipping Page Layer */}
                    {isFlipping === 'next' && (
                        <div 
                            className="absolute right-0 top-0 w-1/2 h-full rounded-r-lg overflow-visible pointer-events-none"
                            style={{
                                transformStyle: 'preserve-3d',
                                transformOrigin: 'left center',
                                animation: 'flipBookNext 0.6s ease-in-out forwards',
                                zIndex: 10
                            }}
                        >
                            {/* Front Side of Flipping Page (Current Right Page) */}
                            <div 
                                className="absolute inset-0 bg-[#1e1e1e] overflow-hidden rounded-r-lg"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <img 
                                    src={pages[rightPageIndex]} 
                                    alt="Flipping Front"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-l from-transparent to-black/35 pointer-events-none" />
                                <div className="absolute inset-0 bg-black/10 animation-fade-out" />
                            </div>

                            {/* Back Side of Flipping Page (Next Left Page) */}
                            <div 
                                className="absolute inset-0 bg-[#1e1e1e] overflow-hidden rounded-l-lg"
                                style={{ 
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <img 
                                    src={pages[leftPageIndex + 2]} 
                                    alt="Flipping Back"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-black/35 pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {isFlipping === 'prev' && (
                        <div 
                            className="absolute left-0 top-0 w-1/2 h-full rounded-l-lg overflow-visible pointer-events-none"
                            style={{
                                transformStyle: 'preserve-3d',
                                transformOrigin: 'right center',
                                animation: 'flipBookPrev 0.6s ease-in-out forwards',
                                zIndex: 10
                            }}
                        >
                            {/* Front Side of Flipping Page (Current Left Page) */}
                            <div 
                                className="absolute inset-0 bg-[#1e1e1e] overflow-hidden rounded-l-lg"
                                style={{ 
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(0deg)'
                                }}
                            >
                                <img 
                                    src={pages[leftPageIndex]} 
                                    alt="Flipping Front"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-black/35 pointer-events-none" />
                            </div>

                            {/* Back Side of Flipping Page (Prev Right Page) */}
                            <div 
                                className="absolute inset-0 bg-[#1e1e1e] overflow-hidden rounded-r-lg"
                                style={{ 
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(-180deg)'
                                }}
                            >
                                <img 
                                    src={pages[rightPageIndex - 2]} 
                                    alt="Flipping Back"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-l from-transparent to-black/35 pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {/* Book spine line overlay */}
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-black/60 shadow-lg pointer-events-none z-20" />
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={currentSpread === totalSpreads - 1 || isFlipping !== null}
                    className={`p-3 ml-4 rounded-full border transition-all ${
                        currentSpread === totalSpreads - 1 
                            ? 'border-white/5 text-white/20 cursor-not-allowed' 
                            : 'border-white/10 text-white/70 hover:bg-white/5 hover:text-white cursor-pointer'
                    }`}
                    aria-label="Next Page"
                >
                    <ChevronRight size={20} />
                </button>

            </div>

            {/* Custom 3D animations defined via scoped CSS style tag */}
            <style>{`
                @keyframes flipBookNext {
                    0% {
                        transform: rotateY(0deg);
                    }
                    100% {
                        transform: rotateY(-180deg);
                    }
                }
                @keyframes flipBookPrev {
                    0% {
                        transform: rotateY(0deg);
                    }
                    100% {
                        transform: rotateY(180deg);
                    }
                }
            `}</style>

            {/* Bottom Controls Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 px-6">
                
                {/* Autoplay Play/Pause */}
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 cursor-pointer transition-colors"
                    title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                {/* Page Indicator Slider */}
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-gray-500">Cover</span>
                    <input 
                        type="range"
                        min="0"
                        max={totalSpreads - 1}
                        value={currentSpread}
                        onChange={(e) => {
                            if (isFlipping) return;
                            setCurrentSpread(Number(e.target.value));
                        }}
                        disabled={isFlipping !== null}
                        className="w-32 md:w-48 accent-white h-[3px] bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-gray-500">
                        End
                    </span>
                </div>

                {/* Full-screen Toggle */}
                <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 cursor-pointer transition-colors"
                    title={isFullscreen ? 'Exit Full-screen' : 'Enter Full-screen'}
                >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
            </div>
        </div>
    );
};
