import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause } from 'lucide-react';

interface FlipbookProps {
    title: string;
    images: string[];
    aspectRatio?: 'A4' | 'square' | string;
}

// ─────────────────────────────────────────────
// FULLSCREEN PORTAL OVERLAY for FLYER (2 images)
// ─────────────────────────────────────────────
const FlyerFullscreenPortal: React.FC<{
    title: string;
    images: string[];
    onClose: () => void;
}> = ({ title, images, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    const overlay = (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: 'rgba(0,0,0,0.97)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                padding: '24px',
                boxSizing: 'border-box',
            }}
        >
            {/* Close button */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                }}
            >
                <X size={22} />
            </button>

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <h4 style={{ color: 'white', fontSize: '18px', fontWeight: 600, margin: 0 }}>{title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '4px 0 0' }}>
                    Recto (gauche) / Verso (droite) — Appuyez sur Échap pour fermer
                </p>
            </div>

            {/* Images side-by-side */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    width: '100%',
                    height: 'calc(100vh - 120px)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                }}
            >
                <img
                    src={images[0]}
                    alt="Recto"
                    style={{
                        maxHeight: '100%',
                        maxWidth: '48%',
                        objectFit: 'contain',
                        borderRadius: '12px',
                        boxShadow: '0 8px 48px rgba(0,0,0,0.8)',
                    }}
                />
                <img
                    src={images[1]}
                    alt="Verso"
                    style={{
                        maxHeight: '100%',
                        maxWidth: '48%',
                        objectFit: 'contain',
                        borderRadius: '12px',
                        boxShadow: '0 8px 48px rgba(0,0,0,0.8)',
                    }}
                />
            </div>
        </div>
    );

    return createPortal(overlay, document.body);
};

// ─────────────────────────────────────────────
// FULLSCREEN PORTAL OVERLAY for ARTBOOK (N images)
// ─────────────────────────────────────────────
const ArtbookFullscreenPortal: React.FC<{
    title: string;
    pages: string[]; // padded array with '' for empty half-pages
    currentSpread: number;
    totalSpreads: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSetSpread: (n: number) => void;
    isFlipping: 'next' | 'prev' | null;
}> = ({ title, pages, currentSpread, totalSpreads, onClose, onNext, onPrev, onSetSpread, isFlipping }) => {
    const leftPageIndex = currentSpread * 2;
    const rightPageIndex = currentSpread * 2 + 1;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose, onNext, onPrev]);

    const pageLabel = currentSpread === 0
        ? 'Couverture'
        : currentSpread === totalSpreads - 1
            ? 'Quatrième de couverture'
            : `Pages ${leftPageIndex} – ${rightPageIndex}`;

    const overlay = (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            {/* Top bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                flexShrink: 0,
            }}>
                <div>
                    <h4 style={{ color: 'white', fontSize: '16px', fontWeight: 600, margin: 0 }}>{title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '2px 0 0', fontFamily: 'monospace' }}>
                        {pageLabel} · Flèches ← → pour naviguer · Échap pour fermer
                    </p>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <X size={20} />
                </button>
            </div>

            {/* Book area — fills remaining height */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                gap: '16px',
                minHeight: 0,
            }}>
                {/* Prev arrow */}
                <button
                    onClick={onPrev}
                    disabled={currentSpread === 0 || isFlipping !== null}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: currentSpread === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: currentSpread === 0 ? 'rgba(255,255,255,0.2)' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: currentSpread === 0 ? 'not-allowed' : 'pointer',
                        flexShrink: 0,
                        transition: 'background 0.2s',
                    }}
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Double-page spread */}
                <div style={{
                    display: 'flex',
                    height: '100%',
                    maxHeight: '100%',
                    flex: 1,
                    boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    minWidth: 0,
                }}>
                    {/* Left page */}
                    <div style={{
                        flex: 1,
                        background: '#1a1a1a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        borderRight: '1px solid rgba(0,0,0,0.6)',
                        position: 'relative',
                    }}>
                        {pages[leftPageIndex] ? (
                            <img
                                key={`left-${leftPageIndex}`}
                                src={pages[leftPageIndex]}
                                alt={`Page ${leftPageIndex}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    display: 'block',
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.1)',
                                fontSize: '12px',
                                fontFamily: 'monospace',
                            }}>
                                Jonathan Copine
                            </div>
                        )}
                        {/* Spine shadow */}
                        <div style={{
                            position: 'absolute', right: 0, top: 0, bottom: 0,
                            width: '24px',
                            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.3))',
                            pointerEvents: 'none',
                        }} />
                    </div>

                    {/* Spine line */}
                    <div style={{ width: '2px', background: 'rgba(0,0,0,0.8)', flexShrink: 0 }} />

                    {/* Right page */}
                    <div style={{
                        flex: 1,
                        background: '#1a1a1a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        {pages[rightPageIndex] ? (
                            <img
                                key={`right-${rightPageIndex}`}
                                src={pages[rightPageIndex]}
                                alt={`Page ${rightPageIndex}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    display: 'block',
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.1)',
                                fontSize: '12px',
                                fontFamily: 'monospace',
                            }}>
                                Jonathan Copine
                            </div>
                        )}
                        {/* Spine shadow */}
                        <div style={{
                            position: 'absolute', left: 0, top: 0, bottom: 0,
                            width: '24px',
                            background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.3))',
                            pointerEvents: 'none',
                        }} />
                    </div>
                </div>

                {/* Next arrow */}
                <button
                    onClick={onNext}
                    disabled={currentSpread === totalSpreads - 1 || isFlipping !== null}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: currentSpread === totalSpreads - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: currentSpread === totalSpreads - 1 ? 'rgba(255,255,255,0.2)' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: currentSpread === totalSpreads - 1 ? 'not-allowed' : 'pointer',
                        flexShrink: 0,
                        transition: 'background 0.2s',
                    }}
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Bottom progress bar */}
            <div style={{
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
            }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontFamily: 'monospace' }}>Début</span>
                <input
                    type="range"
                    min={0}
                    max={totalSpreads - 1}
                    value={currentSpread}
                    onChange={(e) => {
                        if (!isFlipping) onSetSpread(Number(e.target.value));
                    }}
                    style={{ width: '200px', accentColor: 'white', cursor: 'pointer' }}
                />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontFamily: 'monospace' }}>Fin</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'monospace', marginLeft: '12px' }}>
                    {currentSpread + 1} / {totalSpreads}
                </span>
            </div>
        </div>
    );

    return createPortal(overlay, document.body);
};

// ─────────────────────────────────────────────
// MAIN FLIPBOOK COMPONENT
// ─────────────────────────────────────────────
export const Flipbook: React.FC<FlipbookProps> = ({ title, images }) => {
    const pages = React.useMemo(() => {
        const padded = ['', ...images];
        if (padded.length % 2 !== 0) padded.push('');
        return padded;
    }, [images]);

    const [currentSpread, setCurrentSpread] = useState(0);
    const [isFlipping, setIsFlipping] = useState<'next' | 'prev' | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const totalSpreads = Math.ceil(pages.length / 2);

    const handleNext = useCallback(() => {
        if (isFlipping || currentSpread >= totalSpreads - 1) return;
        setIsFlipping('next');
        setTimeout(() => {
            setCurrentSpread(prev => prev + 1);
            setIsFlipping(null);
        }, 400);
    }, [isFlipping, currentSpread, totalSpreads]);

    const handlePrev = useCallback(() => {
        if (isFlipping || currentSpread <= 0) return;
        setIsFlipping('prev');
        setTimeout(() => {
            setCurrentSpread(prev => prev - 1);
            setIsFlipping(null);
        }, 400);
    }, [isFlipping, currentSpread]);

    // Auto-play
    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => {
            if (currentSpread < totalSpreads - 1) {
                handleNext();
            } else {
                setIsPlaying(false);
            }
        }, 3000);
        return () => clearInterval(id);
    }, [isPlaying, currentSpread, totalSpreads, handleNext]);

    // Keyboard navigation when NOT in fullscreen (fullscreen handles its own keys)
    useEffect(() => {
        if (isFullscreen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isFullscreen, handleNext, handlePrev]);

    const leftPageIndex = currentSpread * 2;
    const rightPageIndex = currentSpread * 2 + 1;

    // ── FLYER (2 images) ──────────────────────────────────────────────────
    if (images.length === 2) {
        return (
            <>
                {/* Inline Flyer view */}
                <div className="w-full py-12 flex flex-col items-center bg-white/[0.02] border border-white/5 rounded-[32px] my-8 select-none">
                    <div className="text-center mb-8 px-6">
                        <h4 className="text-xl font-display font-medium text-white mb-1">{title}</h4>
                        <p className="text-xs text-gray-500 font-mono">Recto / Verso</p>
                    </div>

                    <div className="w-full max-w-4xl px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            className="rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer hover:border-white/25 transition-all duration-300"
                            onClick={() => setIsFullscreen(true)}
                        >
                            <img src={images[0]} alt="Recto" className="w-full h-auto object-contain block" />
                        </div>
                        <div
                            className="rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer hover:border-white/25 transition-all duration-300"
                            onClick={() => setIsFullscreen(true)}
                        >
                            <img src={images[1]} alt="Verso" className="w-full h-auto object-contain block" />
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-4">
                        <button
                            onClick={() => setIsFullscreen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 cursor-pointer transition-all text-sm"
                            title="Voir en plein écran"
                        >
                            <Maximize2 size={15} />
                            Plein écran
                        </button>
                    </div>
                </div>

                {/* Fullscreen Portal */}
                {isFullscreen && (
                    <FlyerFullscreenPortal
                        title={title}
                        images={images}
                        onClose={() => setIsFullscreen(false)}
                    />
                )}
            </>
        );
    }

    // ── ARTBOOK (N images) ────────────────────────────────────────────────
    const pageLabel = currentSpread === 0
        ? 'Couverture'
        : currentSpread === totalSpreads - 1
            ? 'Quatrième de couverture'
            : `Pages ${leftPageIndex} – ${rightPageIndex}`;

    return (
        <>
            {/* Inline Artbook view */}
            <div className="w-full py-12 flex flex-col items-center bg-white/[0.02] border border-white/5 rounded-[32px] my-8 select-none">
                {/* Header */}
                <div className="text-center mb-6 px-6">
                    <h4 className="text-xl font-display font-medium text-white mb-1">{title}</h4>
                    <p className="text-xs text-gray-500 font-mono">{pageLabel}</p>
                </div>

                {/* Book + arrows */}
                <div className="w-full max-w-4xl px-4 flex items-center justify-center gap-3">
                    {/* Prev */}
                    <button
                        onClick={handlePrev}
                        disabled={currentSpread === 0 || isFlipping !== null}
                        className={`p-3 rounded-full border transition-all flex-shrink-0 ${
                            currentSpread === 0
                                ? 'border-white/5 text-white/20 cursor-not-allowed'
                                : 'border-white/15 text-white/70 hover:bg-white/8 hover:text-white cursor-pointer'
                        }`}
                        aria-label="Page précédente"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* Double-page spread */}
                    <div
                        className="flex-1 aspect-[2/1] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
                        onClick={() => setIsFullscreen(true)}
                        title="Cliquez pour ouvrir en plein écran"
                        style={{ minWidth: 0 }}
                    >
                        <div className="w-full h-full flex">
                            {/* Left page */}
                            <div className="flex-1 bg-[#1a1a1a] overflow-hidden relative border-r border-black/60">
                                {pages[leftPageIndex] ? (
                                    <img
                                        key={`il-${leftPageIndex}`}
                                        src={pages[leftPageIndex]}
                                        alt={`Page ${leftPageIndex}`}
                                        className="w-full h-full object-contain block"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-white/10 font-mono">
                                        Jonathan Copine
                                    </div>
                                )}
                                <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-r from-transparent to-black/30 pointer-events-none" />
                            </div>

                            {/* Spine */}
                            <div className="w-0.5 bg-black/70 flex-shrink-0" />

                            {/* Right page */}
                            <div className="flex-1 bg-[#1a1a1a] overflow-hidden relative">
                                {pages[rightPageIndex] ? (
                                    <img
                                        key={`ir-${rightPageIndex}`}
                                        src={pages[rightPageIndex]}
                                        alt={`Page ${rightPageIndex}`}
                                        className="w-full h-full object-contain block"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-white/10 font-mono">
                                        Jonathan Copine
                                    </div>
                                )}
                                <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-l from-transparent to-black/30 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        onClick={handleNext}
                        disabled={currentSpread === totalSpreads - 1 || isFlipping !== null}
                        className={`p-3 rounded-full border transition-all flex-shrink-0 ${
                            currentSpread === totalSpreads - 1
                                ? 'border-white/5 text-white/20 cursor-not-allowed'
                                : 'border-white/15 text-white/70 hover:bg-white/8 hover:text-white cursor-pointer'
                        }`}
                        aria-label="Page suivante"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Controls */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 px-6">
                    {/* Auto-play */}
                    <button
                        onClick={() => setIsPlaying(p => !p)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 cursor-pointer transition-colors"
                        title={isPlaying ? 'Pause' : 'Lecture automatique'}
                    >
                        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    </button>

                    {/* Progress slider */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-600">Début</span>
                        <input
                            type="range"
                            min={0}
                            max={totalSpreads - 1}
                            value={currentSpread}
                            onChange={(e) => {
                                if (!isFlipping) setCurrentSpread(Number(e.target.value));
                            }}
                            className="w-32 md:w-40 accent-white cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-gray-600">Fin</span>
                    </div>

                    {/* Fullscreen button */}
                    <button
                        onClick={() => setIsFullscreen(true)}
                        className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/8 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 cursor-pointer transition-all text-sm"
                        title="Ouvrir en plein écran"
                    >
                        <Maximize2 size={14} />
                        Plein écran
                    </button>
                </div>

                <p className="mt-3 text-[10px] text-gray-600 font-mono">
                    Cliquez sur le livre ou sur « Plein écran » · Flèches ← → pour naviguer
                </p>
            </div>

            {/* Fullscreen Portal — rendered separately to document.body */}
            {isFullscreen && (
                <ArtbookFullscreenPortal
                    title={title}
                    pages={pages}
                    currentSpread={currentSpread}
                    totalSpreads={totalSpreads}
                    onClose={() => setIsFullscreen(false)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSetSpread={(n) => { if (!isFlipping) setCurrentSpread(n); }}
                    isFlipping={isFlipping}
                />
            )}
        </>
    );
};
