import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, ChevronLeft } from 'lucide-react';
import { content } from '../constants';
import type { Project } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Flipbook } from '../components/ui/Flipbook';
import { LockedModal } from '../components/LockedModal';
import { MultiLayerSlider } from '../components/MultiLayerSlider';
import { useRef } from 'react';

const BeforeAfterSlider = ({ before, after, title }: { before: string; after: string; title?: string }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
        }
    };

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="w-full mx-auto my-8">
            {title && <h4 className="text-xl font-display font-medium mb-6 text-center text-white/80">{title}</h4>}
            <div 
                ref={containerRef}
                className="relative w-full rounded-3xl overflow-hidden select-none cursor-ew-resize border border-white/10"
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                {/* After Image (Determines container height dynamically based on real aspect ratio) */}
                <img 
                    src={after} 
                    alt="After" 
                    className="w-full h-auto block pointer-events-none"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 z-10 border border-white/10">
                    Composite
                </div>

                {/* Before Image (Overlay with clip path) */}
                <div 
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                    <img 
                        src={before} 
                        alt="Before" 
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 z-10 border border-white/10">
                    Clay
                </div>

                {/* Slider Line & Handle */}
                <div 
                    className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20 flex items-center justify-center"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="w-10 h-10 rounded-full bg-white text-black shadow-2xl flex items-center justify-center border border-white/20 pointer-events-none transform -translate-x-[1px]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProjectDetails = () => {
    const touchStartX = useRef<number>(0);
    const isSwiping = useRef<boolean>(false);
    const { id } = useParams();
    const project = (content.projects.find(p => p.id === id) || content.projects[Number(id)]) as Project;
    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [showLockModal, setShowLockModal] = useState(() => !!project?.protected);

    const currentIndex = content.projects.findIndex(p => p.id === id);
    const prevProject = content.projects[currentIndex > 0 ? currentIndex - 1 : content.projects.length - 1];
    const nextProject = content.projects[currentIndex < content.projects.length - 1 ? currentIndex + 1 : 0];

    const allImages = project ? [project.thumbnailUrl, ...(project.gallery || []), ...(project.photoGrid || [])] : [];

    // Reset lock modal state when project changes
    useEffect(() => {
        setShowLockModal(!!project?.protected);
    }, [id, project]);

    // Scroll to top on project change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const suggestedProjects = useMemo(() => {
        const otherProjects = content.projects.filter(p => p.id !== id);
        // Return first 2 projects that aren't the current one
        return otherProjects.slice(0, 2);
    }, [id]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return; // Only if lightbox is open
            if (e.key === 'ArrowLeft') {
                setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : allImages.length - 1);
            } else if (e.key === 'ArrowRight') {
                setSelectedImageIndex(prev => prev! < allImages.length - 1 ? prev! + 1 : 0);
            } else if (e.key === 'Escape') {
                setSelectedImageIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, allImages.length]);

    if (!project) return <div>Project not found</div>;

    return (
        <div className="bg-black min-h-screen text-white/90 selection:bg-white/20">
            <Navbar />
            <AnimatePresence>
                {showLockModal && (
                    <LockedModal onUnlock={() => setShowLockModal(false)} />
                )}
            </AnimatePresence>
            {!showLockModal && (
                <>
            {/* Hero Section */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={project.heroUrl || project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: project.heroObjectPosition || 'center' }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                <div className="relative z-10 text-center max-w-3xl px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase mb-6 block backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-3.5 py-1 inline-block font-medium"
                    >
                        {project.category}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-4xl md:text-6xl font-display font-light mb-6 tracking-wide text-white"
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        {project.description}
                    </motion.p>
                </div>
            </section>

            {/* Sticky Nav Bar */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 md:py-4 transition-all">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link to={`/project/${prevProject.id}`} className="p-3 md:p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation" title="Previous Project">
                            <ChevronLeft size={20} />
                        </Link>
                        <h2 className="text-sm font-semibold opacity-90 hidden md:block">{project.title}</h2>
                        <Link to={`/project/${nextProject.id}`} className="p-3 md:p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation" title="Next Project">
                            <ChevronRight size={20} />
                        </Link>
                    </div>

                    <div className="flex gap-3 md:gap-4 items-center">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary rounded-full text-xs font-medium text-black hover:bg-primary-hover transition-colors touch-manipulation">
                                View Live
                            </a>
                        )}
                        <Link
                            to="/"
                            state={{ scrollTo: 'projects' }}
                            className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors touch-manipulation"
                        >
                            <span className="hidden sm:inline">All Projects</span> <ChevronRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-24 max-w-6xl">

                {/* Content Blocks Definition */}
                {(() => {
                    const TextSection = (
                        <div className="grid md:grid-cols-12 gap-12 mb-32">
                            <div className="md:col-span-4 space-y-8">
                                <div className="glass-apple p-8 rounded-3xl">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="glass-apple p-8 rounded-3xl">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Creation Date</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                                            {project.creationDate}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-8">
                                <h3 className="text-4xl font-display font-semibold mb-8 text-white">The Story</h3>
                                <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed max-w-none font-light">
                                    <p className="whitespace-pre-line">{project.longDescription || project.description}</p>
                                </div>
                            </div>
                        </div>
                    );

                    const videos = (Array.isArray(project.videoUrl) ? project.videoUrl : [project.videoUrl]).filter(Boolean) as string[];

                    const VideoSection = (
                        <div className="space-y-8 mb-32">
                            {videos.map((vid, idx) => (
                                <VideoPlayer key={idx} vid={vid} project={project} />
                            ))}
                        </div>
                    );

                    return (
                        <>
                            {project.mediaOrder === 'video-first' ? (
                                <>
                                    {project.videoUrl && VideoSection}
                                    {TextSection}
                                </>
                            ) : (
                                <>
                                    {TextSection}
                                    {project.videoUrl && VideoSection}
                                </>
                            )}

                            {/* More Videos Section (Rig/Modeling) */}
                            {project.moreVideos && (
                                <div className="mb-32">
                                    <h3 className="text-4xl font-display font-semibold mb-12 text-center">{project.moreVideos.title}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {project.moreVideos.videos.map((vid, idx) => (
                                            <div key={idx} className={`${idx === 0 && project.moreVideos!.videos.length % 2 !== 0 ? 'md:col-span-2' : ''}`}>
                                                <VideoPlayer vid={vid} project={project} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })()}


                {/* Photo Grid (IKEA Lockers style) */}
                {project.photoGrid && project.photoGrid.length > 0 && (
                    <div className="mb-32">
                        <h3 className="text-4xl font-display font-semibold mb-12 text-center">Visual Exploration</h3>
                        <div className="flex flex-col gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedImageIndex(1)}
                                className="w-full rounded-2xl overflow-hidden cursor-pointer relative group aspect-[21/9]"
                            >
                                <img
                                    src={project.photoGrid[0]}
                                    alt="Hero"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            </motion.div>
                            
                            {Array.from({ length: Math.ceil((project.photoGrid.length - 1) / 2) }).map((_, rowIndex) => {
                                const idx1 = 1 + rowIndex * 2;
                                const idx2 = idx1 + 1;
                                return (
                                    <div key={rowIndex} className="grid grid-cols-2 gap-4">
                                        {[idx1, idx2].map((imgIdx, localIdx) => 
                                            imgIdx >= project.photoGrid!.length ? null : (
                                            <motion.div
                                                key={imgIdx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-40px' }}
                                                transition={{ delay: localIdx * 0.07 }}
                                                onClick={() => setSelectedImageIndex(imgIdx + 1)}
                                                className="rounded-2xl overflow-hidden cursor-pointer relative group aspect-[4/3]"
                                            >
                                                <img
                                                    src={project.photoGrid![imgIdx]}
                                                    alt={`Photo ${imgIdx + 1}`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                            </motion.div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Gallery (Liminal style) */}
                {project.gallery && project.gallery.length > 0 && allImages.slice(1).length > 0 && (!project.photoGrid || project.photoGrid.length === 0) && (
                    <div className="mb-32">
                        <h3 className="text-4xl font-display font-semibold mb-12 text-center">Visual Exploration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {allImages.slice(1).map((img, i) => {
                                // For premium-window-frame, display all images 2 by 2 (don't force full width on comparatifs)
                                const isComparatif = img.toLowerCase().includes('comparatif') && project.id !== 'premium-window-frame';
                                const isLiminal = project.id === 'tfe-liminal';
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ delay: (i % 4) * 0.07 }}
                                        onClick={() => setSelectedImageIndex(i + 1)}
                                        className={`rounded-2xl overflow-hidden cursor-pointer relative group ${isComparatif ? 'md:col-span-2 aspect-[21/9]' : isLiminal ? 'aspect-[2048/858]' : ''}`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Gallery ${i + 1}`}
                                            loading="lazy"
                                            decoding="async"
                                            className={`w-full object-cover block transition-transform duration-700 group-hover:scale-105 ${isLiminal ? 'h-full' : 'h-auto'}`}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}


                {/* Breakdown - Before/After (beforeAfters array) */}
                {(project.beforeAfters?.length || project.beforeAfter) && (() => {
                    const sliders = project.beforeAfters ?? (project.beforeAfter ? [project.beforeAfter] : []);
                    const tfeLayers = [
                        { src: "/Images_Projets/TFE/GIF_compressed/V_clay.jpg", label: "Clay Render" },
                        { src: "/Images_Projets/TFE/GIF_compressed/V_texture_camap.jpg", label: "Texture & Camera Map" },
                        { src: "/Images_Projets/TFE/GIF_compressed/V_NO_PP_1.6.2.jpg", label: "Sans Post-Process" },
                        { src: "/Images_Projets/TFE/GIF_compressed/V_expo+contraste_1.6.3.jpg", label: "Exposition + Contraste" },
                        { src: "/Images_Projets/TFE/GIF_compressed/V_balance_B+sat_1.6.4.jpg", label: "Balance des Blancs + Saturation" },
                        { src: "/Images_Projets/TFE/GIF_compressed/V_LUT_1.6.5.jpg", label: "LUT Color Grade" },
                        { src: "/Images_Projets/TFE/GIF_compressed/V_finale_compo_1.6.6.jpg", label: "Rendu Final Composité" }
                    ];

                    return (
                        <div className="mb-32 border-t border-white/10 pt-16 md:pt-24">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-8 md:mb-14"
                            >
                                <h3 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-white">Breakdown</h3>
                                <p className="text-sm text-gray-400 font-light max-w-xl mx-auto px-4">
                                    Compare the clay render with the final render, and explore each compositing layer.
                                </p>
                            </motion.div>
                            <div className="space-y-10 md:space-y-16">
                                {sliders.map((s, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ delay: idx * 0.08 }}
                                    >
                                        <BeforeAfterSlider before={s.before} after={s.after} title={s.title} />
                                    </motion.div>
                                ))}
                            </div>
                            
                            {project.id === 'tfe-liminal' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <MultiLayerSlider layers={tfeLayers} />
                                </motion.div>
                            )}
                        </div>
                    );
                })()}


                {/* Flipbooks Section */}

                {project.flipbooks && project.flipbooks.length > 0 && (
                    <div className="my-32 border-t border-white/10 pt-24">
                        <h2 className="text-4xl font-display font-semibold mb-6 text-center">Interactive Booklets</h2>
                        <p className="text-sm text-gray-400 text-center max-w-xl mx-auto mb-16 font-light">
                            Explore the printed design of this project. Turn the pages interactively to read the artbook and flyers.
                        </p>
                        <div className="space-y-16">
                            {project.flipbooks.map((fb, idx) => (
                                <Flipbook 
                                    key={idx} 
                                    title={fb.title} 
                                    images={fb.images} 
                                    aspectRatio={fb.aspectRatio} 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* You May Also Like Section */}
                <div className="border-t border-white/10 pt-24">
                    <h2 className="text-4xl font-display font-semibold mb-12 text-center">You May Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {suggestedProjects.map((p) => (
                            <Link to={`/project/${p.id}`} key={p.id} className="group relative rounded-3xl overflow-hidden aspect-video block">
                                <img
                                    src={p.thumbnailUrl}
                                    alt={p.title}
                                    loading="lazy"
                                    decoding="async"
                                    className={`w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 ${p.protected ? 'blur-md opacity-80' : ''}`}
                                />
                                {p.protected && (
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-sm z-10 gap-3">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
                                            <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <h3 className="text-2xl font-display font-semibold text-white mb-1">{p.title}</h3>
                                    <p className="text-sm text-gray-300">{p.category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
                        onTouchStart={(e) => {
                            touchStartX.current = e.touches[0].clientX;
                            isSwiping.current = false;
                        }}
                        onTouchEnd={(e) => {
                            const swipeDistance = e.changedTouches[0].clientX - touchStartX.current;
                            if (Math.abs(swipeDistance) > 50) {
                                isSwiping.current = true;
                                if (swipeDistance < -50) {
                                    setSelectedImageIndex(prev => prev! < allImages.length - 1 ? prev! + 1 : 0);
                                } else {
                                    setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : allImages.length - 1);
                                }
                            }
                        }}
                        onClick={() => {
                            if (!isSwiping.current) setSelectedImageIndex(null);
                            isSwiping.current = false;
                        }}
                    >
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}>
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : allImages.length - 1); }}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(prev => prev! < allImages.length - 1 ? prev! + 1 : 0); }}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <motion.img
                            key={selectedImageIndex}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0, x: 0 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, { offset }) => {
                                const swipe = offset.x;
                                if (swipe < -50) {
                                    // Swipe Left -> Next Image
                                    setSelectedImageIndex(prev => prev! < allImages.length - 1 ? prev! + 1 : 0);
                                } else if (swipe > 50) {
                                    // Swipe Right -> Prev Image
                                    setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : allImages.length - 1);
                                }
                            }}
                            src={allImages[selectedImageIndex]}
                            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-lg cursor-grab active:cursor-grabbing"
                        />
                        <div className="absolute bottom-8 text-white/50 font-mono text-sm">
                            {selectedImageIndex + 1} / {allImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </>
            )}
        </div>
    );
};


// Helper: extract YouTube video ID from a URL
const getYouTubeId = (url: string): string | null => {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/
    );
    return match ? match[1] : null;
};

const VideoPlayer = ({ vid, project }: { vid: string, project: Project }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [showPlayButton, setShowPlayButton] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const youtubeId = getYouTubeId(vid);

    // Try to autoplay for local videos, show button if it fails
    React.useEffect(() => {
        if (youtubeId) return; // YouTube iframes handle their own playback
        const video = videoRef.current;
        if (!video) return;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                    setShowPlayButton(false);
                })
                .catch(() => {
                    setShowPlayButton(true);
                });
        }
    }, [youtubeId]);

    const handlePlayClick = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
            setIsPlaying(true);
            setShowPlayButton(false);
        }
    };

    const containerClass = `w-full rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 ${
        project.mediaAspect === 'square' ? 'aspect-square' :
        project.mediaAspect === '9/16' ? 'aspect-[9/16] max-w-md mx-auto' : 'aspect-video'
    }`;

    // --- YouTube embed ---
    if (youtubeId) {
        return (
            <div className={containerClass}>
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                />
            </div>
        );
    }

    // --- Local / hosted video ---
    return (
        <div className={containerClass}>
            <video
                ref={videoRef}
                src={vid}
                poster={project.thumbnailUrl}
                controls
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-contain cursor-auto bg-black"
                style={{ cursor: 'auto' }}
                onPlay={() => {
                    setIsPlaying(true);
                    setShowPlayButton(false);
                }}
                onPause={() => setIsPlaying(false)}
                onError={(e) => {
                    console.error('Video error:', e);
                    setShowPlayButton(true);
                }}
                onLoadedMetadata={() => {
                    console.log('Video metadata loaded');
                }}
            />
            {/* Manual Play Button for Mobile */}
            {showPlayButton && !isPlaying && (
                <button
                    onClick={handlePlayClick}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity hover:bg-black/60 cursor-pointer z-10"
                    style={{ cursor: 'pointer' }}
                    aria-label="Play video"
                >
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                        <svg
                            className="w-10 h-10 text-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </button>
            )}
        </div>
    );
};
