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
                // Force cursor visible — overrides global "cursor: none !important"
                cursor: 'default',
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
            <div style={{ textAlign: 'center', marginBottom: '16px', pointerEvents: 'none' }}>
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
    pages: string[];
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

    // Shared style for overlaid icon buttons
    const iconBtn = (disabled: boolean): React.CSSProperties => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.18)',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: disabled ? 'rgba(255,255,255,0.2)' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.3 : 1,
        transition: 'opacity 0.2s, background 0.2s',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
    });

    const overlay = (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: '#000',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                // Force cursor visible — overrides global "cursor: none !important"
                cursor: 'default',
            }}
        >
            {/* ── BOOK: fills entire viewport, NO padding ── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
            }}>
                {/* Left page */}
                <div style={{
                    flex: 1,
                    background: '#111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRight: '2px solid #000',
                }}>
                    {pages[leftPageIndex] ? (
                        <img
                            key={`fl-${leftPageIndex}`}
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
                            color: 'rgba(255,255,255,0.05)',
                            fontSize: '13px',
                            fontFamily: 'monospace',
                            userSelect: 'none',
                        }}>
                            Jonathan Copine
                        </div>
                    )}
                    {/* Spine gradient */}
                    <div style={{
                        position: 'absolute', right: 0, top: 0, bottom: 0,
                        width: '32px',
                        background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.5))',
                        pointerEvents: 'none',
                    }} />
                </div>

                {/* Right page */}
                <div style={{
                    flex: 1,
                    background: '#111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    {pages[rightPageIndex] ? (
                        <img
                            key={`fr-${rightPageIndex}`}
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
                            color: 'rgba(255,255,255,0.05)',
                            fontSize: '13px',
                            fontFamily: 'monospace',
                            userSelect: 'none',
                        }}>
                            Jonathan Copine
                        </div>
                    )}
                    {/* Spine gradient */}
                    <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: '32px',
                        background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.5))',
                        pointerEvents: 'none',
                    }} />
                </div>
            </div>

            {/* ── OVERLAY: top-left info pill ── */}
            <div style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                padding: '6px 14px',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '12px',
                fontFamily: 'monospace',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 20,
            }}>
                {title} · {pageLabel} · ← → pour naviguer · Échap pour fermer
            </div>

            {/* ── OVERLAY: top-right close button ── */}
            <button
                onClick={onClose}
                title="Fermer (Échap)"
                style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 20,
                }}
            >
                <X size={20} />
            </button>

            {/* ── OVERLAY: left arrow (vertically centered, absolute) ── */}
            <button
                onClick={onPrev}
                disabled={currentSpread === 0 || isFlipping !== null}
                title="Page précédente (←)"
                style={{
                    ...iconBtn(currentSpread === 0 || isFlipping !== null),
                    left: '14px',
                }}
            >
                <ChevronLeft size={28} />
            </button>

            {/* ── OVERLAY: right arrow (vertically centered, absolute) ── */}
            <button
                onClick={onNext}
                disabled={currentSpread === totalSpreads - 1 || isFlipping !== null}
                title="Page suivante (→)"
                style={{
                    ...iconBtn(currentSpread === totalSpreads - 1 || isFlipping !== null),
                    right: '14px',
                }}
            >
                <ChevronRight size={28} />
            </button>

            {/* ── OVERLAY: bottom progress bar ── */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 80px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                zIndex: 20,
                pointerEvents: 'none',
            }}>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontFamily: 'monospace' }}>1</span>
                <input
                    type="range"
                    min={0}
                    max={totalSpreads - 1}
                    value={currentSpread}
                    onChange={(e) => {
                        if (!isFlipping) onSetSpread(Number(e.target.value));
                    }}
                    style={{
                        width: '220px',
                        accentColor: 'white',
                        cursor: 'pointer',
                        pointerEvents: 'all',
                    }}
                />
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontFamily: 'monospace' }}>{totalSpreads}</span>
                <span style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    marginLeft: '10px',
                    userSelect: 'none',
                }}>
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

    // Keyboard navigation for inline view (fullscreen handles its own keys)
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
                        >
                            <Maximize2 size={15} />
                            Plein écran
                        </button>
                    </div>
                </div>

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
                <div className="text-center mb-6 px-6">
                    <h4 className="text-xl font-display font-medium text-white mb-1">{title}</h4>
                    <p className="text-xs text-gray-500 font-mono">{pageLabel}</p>
                </div>

                {/* Book + arrows */}
                <div className="w-full max-w-4xl px-4 flex items-center justify-center gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={currentSpread === 0 || isFlipping !== null}
                        className={`p-3 rounded-full border transition-all flex-shrink-0 ${
                            currentSpread === 0
                                ? 'border-white/5 text-white/20 cursor-not-allowed'
                                : 'border-white/15 text-white/70 hover:bg-white/8 hover:text-white cursor-pointer'
                        }`}
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* Double-page spread preview */}
                    <div
                        className="flex-1 aspect-[2/1] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
                        onClick={() => setIsFullscreen(true)}
                        title="Cliquez pour ouvrir en plein écran"
                        style={{ minWidth: 0 }}
                    >
                        <div className="w-full h-full flex">
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

                            <div className="w-0.5 bg-black/70 flex-shrink-0" />

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

                    <button
                        onClick={handleNext}
                        disabled={currentSpread === totalSpreads - 1 || isFlipping !== null}
                        className={`p-3 rounded-full border transition-all flex-shrink-0 ${
                            currentSpread === totalSpreads - 1
                                ? 'border-white/5 text-white/20 cursor-not-allowed'
                                : 'border-white/15 text-white/70 hover:bg-white/8 hover:text-white cursor-pointer'
                        }`}
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Controls */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 px-6">
                    <button
                        onClick={() => setIsPlaying(p => !p)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 cursor-pointer transition-colors"
                        title={isPlaying ? 'Pause' : 'Lecture automatique'}
                    >
                        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    </button>

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

                    <button
                        onClick={() => setIsFullscreen(true)}
                        className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/8 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 cursor-pointer transition-all text-sm"
                    >
                        <Maximize2 size={14} />
                        Plein écran
                    </button>
                </div>

                <p className="mt-3 text-[10px] text-gray-600 font-mono">
                    Cliquez sur le livre ou « Plein écran » · Flèches ← → pour naviguer
                </p>
            </div>

            {/* Fullscreen Portal — rendered directly into document.body */}
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
