import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const LiquidGlassCursor = () => {
    // Mouse position state
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring animation for "liquid" lag
    const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Physics - slight scaling and deformation
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Detect clickable elements
            if (target.closest('a, button, input, textarea, [role="button"], label, select, [contenteditable="true"]')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        // Hide cursor when leaving window
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on touch devices
    if (typeof navigator !== 'undefined' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0) {
        return null;
    }

    return (
        <>
            {/* SVG Filter for Glass Distortion */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <filter id="glass-distortion">
                    <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
                </filter>
            </svg>

            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-normal"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                }}
            >
                {/* Main Glass Lens Container */}
                <motion.div
                    animate={{
                        scale: isClicked ? 0.9 : (isHovered ? 1.5 : 1), // Handle click scale
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }}
                    className="relative rounded-full overflow-hidden w-8 h-8" // Base size 32px (20% smaller than 40px)
                >
                    {/* Layer 1: Glass Filter (Distortion + Blur) */}
                    <div
                        className="absolute inset-0 rounded-full z-10"
                        style={{
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)',
                            filter: 'url(#glass-distortion) saturate(120%) brightness(1.15)',
                        }}
                    />

                    {/* Layer 2: Glass Overlay (Tint) - More Transparent */}
                    <motion.div
                        className="absolute inset-0 rounded-full z-20"
                        animate={{
                            backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.01)", // Reduced opacity
                        }}
                    />

                    {/* Layer 3: Specular (Highlights/Shadows) - Subtler */}
                    <motion.div
                        className="absolute inset-0 rounded-full z-30"
                        animate={{
                            boxShadow: isHovered
                                ? "inset 0 0 10px rgba(255, 255, 255, 0.1), inset 0 0 2px rgba(255, 255, 255, 0.4)"
                                : "inset 0 0 6px rgba(255, 255, 255, 0.05), inset 0 0 1px rgba(255, 255, 255, 0.2)"
                        }}
                    />

                    {/* Optional: subtle inner glint/reflection */}
                    <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[40%] h-[20%] bg-gradient-to-b from-white/20 to-transparent rounded-[100%] blur-[2px] z-40 opacity-40" />

                    {/* Border Ring - Thinner/More Transparent */}
                    <motion.div
                        className="absolute inset-0 rounded-full z-50 border border-white/10"
                    />

                </motion.div>
            </motion.div>
        </>
    );
};
