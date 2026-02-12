import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, ChevronLeft } from 'lucide-react';
import { content } from '../constants';
import type { Project } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ProjectDetails = () => {
    const { id } = useParams();
    const project = (content.projects.find(p => p.id === id) || content.projects[Number(id)]) as Project;
    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const currentIndex = content.projects.findIndex(p => p.id === id);
    const prevProject = content.projects[currentIndex > 0 ? currentIndex - 1 : content.projects.length - 1];
    const nextProject = content.projects[currentIndex < content.projects.length - 1 ? currentIndex + 1 : 0];

    const allImages = project ? [project.thumbnailUrl, ...(project.gallery || [])] : [];

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
        // ...
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
        <div className="bg-black text-white min-h-screen font-sans selection:bg-primary/30">
            <Navbar />

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

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-semibold tracking-widest uppercase mb-4 block backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-4 py-1 inline-block"
                    >
                        {project.category}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-display font-semibold mb-6 tracking-tight"
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-3xl text-gray-200 font-light"
                    >
                        {project.description}
                    </motion.p>
                </div>
            </section>

            {/* Sticky Nav Bar */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 py-4 transition-all">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to={`/project/${prevProject.id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Previous Project">
                            <ChevronLeft size={20} />
                        </Link>
                        <h2 className="text-sm font-semibold opacity-90 hidden md:block">{project.title}</h2>
                        <Link to={`/project/${nextProject.id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Next Project">
                            <ChevronRight size={20} />
                        </Link>
                    </div>

                    <div className="flex gap-4 items-center">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-primary rounded-full text-xs font-medium text-black hover:bg-primary-hover transition-colors">
                                View Live
                            </a>
                        )}
                        <Link to="/#projects" className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                            All Projects <ChevronRight size={12} />
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
                            {videos.map((vid, idx) => {
                                const videoRef = React.useRef<HTMLVideoElement>(null);
                                const [showPlayButton, setShowPlayButton] = React.useState(false);
                                const [isPlaying, setIsPlaying] = React.useState(false);

                                // Try to autoplay, show button if it fails
                                React.useEffect(() => {
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
                                                // Autoplay blocked, show manual play button
                                                setShowPlayButton(true);
                                            });
                                    }
                                }, []);

                                const handlePlayClick = () => {
                                    const video = videoRef.current;
                                    if (video) {
                                        video.play();
                                        setIsPlaying(true);
                                        setShowPlayButton(false);
                                    }
                                };

                                return (
                                    <div
                                        key={idx}
                                        className={`w-full rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 ${project.mediaAspect === 'square' ? 'aspect-square' :
                                            project.mediaAspect === '9/16' ? 'aspect-[9/16] max-w-md mx-auto' : 'aspect-video'
                                            }`}
                                    >
                                        <video
                                            ref={videoRef}
                                            src={vid}
                                            controls
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-contain cursor-auto bg-black"
                                            style={{ cursor: 'auto' }}
                                            onPlay={() => {
                                                setIsPlaying(true);
                                                setShowPlayButton(false);
                                            }}
                                            onPause={() => setIsPlaying(false)}
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
                            })}
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
                                            <div key={idx} className={`rounded-3xl overflow-hidden relative border border-white/10 ${idx === 0 && project.moreVideos!.videos.length % 2 !== 0 ? 'md:col-span-2 aspect-video' : 'aspect-video'
                                                }`}>
                                                <video
                                                    src={vid}
                                                    controls
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    className="w-full h-full object-contain bg-black"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })()}

                {/* Gallery Grid (Bento) */}
                <h3 className="text-4xl font-display font-semibold mb-12 text-center">Visual Exploration</h3>
                <div className={`grid grid-cols-1 md:grid-cols-2 mb-32 ${project.galleryLayout === 'architecture' ? 'gap-4' : 'gap-8'}`}>
                    {allImages.slice(1).map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedImageIndex(i + 1)}
                            className={`rounded-3xl overflow-hidden cursor-pointer relative group ${project.galleryLayout === 'mixed'
                                ? (i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square')
                                : project.galleryLayout === 'landscape'
                                    ? 'md:col-span-2 aspect-video'
                                    : project.galleryLayout === 'architecture'
                                        ? (i < 2 ? 'aspect-square' : 'md:col-span-2 aspect-video')
                                        : 'aspect-square'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Gallery ${i}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* You May Also Like Section */}
                <div className="border-t border-white/10 pt-24">
                    <h2 className="text-4xl font-display font-semibold mb-12 text-center">You May Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {suggestedProjects.map((p) => (
                            <Link to={`/project/${p.id}`} key={p.id} className="group relative rounded-3xl overflow-hidden aspect-video block">
                                <img
                                    src={p.thumbnailUrl}
                                    alt={p.title}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                <div className="absolute bottom-6 left-6 right-6">
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
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" onClick={() => setSelectedImageIndex(null)}>
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
        </div>
    );
};
