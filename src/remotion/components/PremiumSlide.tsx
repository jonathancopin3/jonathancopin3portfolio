import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Img } from 'remotion';
import { Project } from '../../types';

interface PremiumSlideProps {
    project: Project;
    active?: boolean; // If true, apply active focus effects
    layout?: 'desktop' | 'mobile';
}

const FONT_FAMILY = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const PremiumSlide: React.FC<PremiumSlideProps> = ({ project, active = true, layout = 'desktop' }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // -- ANIMATIONS --
    // Subtle breathing scale
    const scale = interpolate(frame, [0, 3 * fps], [1.05, 1.0], { extrapolateRight: 'clamp' });

    // Parallax
    const parallaxY = interpolate(frame, [0, 3 * fps], [0, -30], { extrapolateRight: 'clamp' });

    // Opacity fade in
    const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

    // Title slide up
    const textTranslateY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp', easing: (t) => t * (2 - t) });

    // -- STYLES --
    const isMobile = layout === 'mobile';

    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        backgroundColor: '#000000',
        color: 'white',
        fontFamily: FONT_FAMILY,
        overflow: 'hidden',
        position: 'relative',
    };

    // Desktop: Image Left (50%), Mobile: Image Top (60%)
    const imageContainerStyle: React.CSSProperties = {
        width: isMobile ? '100%' : '55%',
        height: isMobile ? '60%' : '100%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
    };

    // Desktop: Text Right (50%), Mobile: Text Bottom (40%)
    const textContainerStyle: React.CSSProperties = {
        width: isMobile ? '100%' : '45%',
        height: isMobile ? '40%' : '100%',
        padding: isMobile ? '40px 30px' : '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 2,
        background: isMobile ? 'black' : 'transparent', // Ensure text contrast on mobile
    };

    const titleStyle: React.CSSProperties = {
        fontSize: isMobile ? '42px' : '64px',
        fontWeight: 700,
        marginBottom: '16px',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #AAAAAA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity: opacity,
        transform: `translateY(${textTranslateY}px)`,
    };

    const descStyle: React.CSSProperties = {
        fontSize: isMobile ? '16px' : '20px',
        color: '#888888',
        marginBottom: '24px',
        maxWidth: '500px',
        lineHeight: 1.5,
        opacity: opacity,
        transform: `translateY(${textTranslateY + 10}px)`,
    };

    const tagStyle: React.CSSProperties = {
        padding: '6px 12px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '100px',
        fontSize: '12px',
        color: '#CCCCCC',
        backdropFilter: 'blur(10px)',
        marginRight: '8px',
        marginBottom: '8px',
        display: 'inline-block',
    };


    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                {project.thumbnailUrl && (
                    <Img
                        src={project.thumbnailUrl}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: `scale(${scale}) translateY(${parallaxY}px)`,
                        }}
                    />
                )}
                {/* Vignette Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
                    pointerEvents: 'none',
                }} />
            </div>

            <div style={textContainerStyle}>
                <h1 style={titleStyle}>{project.title}</h1>
                <p style={descStyle}>{project.description}</p>
                <div style={{ opacity: opacity, transform: `translateY(${textTranslateY + 20}px)` }}>
                    {project.tags.slice(0, 3).map((t, i) => (
                        <span key={i} style={tagStyle}>{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};
