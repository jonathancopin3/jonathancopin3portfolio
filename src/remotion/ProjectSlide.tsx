import React, { useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Img } from 'remotion';
import { Project } from '../types';

interface ProjectSlideProps {
    project: Project;
    index: number;
    total: number;
}

const FONT_FAMILY = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const ProjectSlide: React.FC<ProjectSlideProps> = ({ project, index, total }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Animations
    const entrance = spring({
        frame,
        fps,
        config: {
            damping: 200,
            stiffness: 100,
            mass: 0.5,
        },
    });

    const fadeOut = interpolate(
        frame,
        [2.5 * fps, 3 * fps],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const scale = interpolate(entrance, [0, 1], [1.1, 1]);
    const opacity = interpolate(entrance, [0, 1], [0, 1]);
    const translateY = interpolate(entrance, [0, 1], [50, 0]);

    // Image Parallax (Subtle movement)
    const imageTranslateY = interpolate(frame, [0, 3 * fps], [0, -50]);

    // Styles
    const containerStyle: React.CSSProperties = {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        color: 'white',
        fontFamily: FONT_FAMILY,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: fadeOut,
    };

    const imageContainerStyle: React.CSSProperties = {
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    };

    const textContainerStyle: React.CSSProperties = {
        width: '50%',
        padding: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '64px',
        fontWeight: 700,
        marginBottom: '24px',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #AAAAAA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const descriptionStyle: React.CSSProperties = {
        fontSize: '24px',
        color: '#888888',
        marginBottom: '32px',
        lineHeight: 1.5,
        maxWidth: '600px',
    };

    const tagsContainerStyle: React.CSSProperties = {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    };

    const tagStyle: React.CSSProperties = {
        padding: '8px 16px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '100px',
        fontSize: '14px',
        color: '#CCCCCC',
        backdropFilter: 'blur(10px)',
    };

    const indexStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '40px',
        left: '80px',
        fontSize: '14px',
        color: '#444444',
        letterSpacing: '0.1em',
    };

    const renderImage = () => {
        if (!project.thumbnailUrl) return null;
        return (
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <Img
                    src={project.thumbnailUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(${scale}) translateY(${imageTranslateY}px)`,
                    }}
                />
            </div>
        );
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                {renderImage()}
            </div>
            <div style={textContainerStyle}>
                <h1 style={titleStyle}>{project.title}</h1>
                <p style={descriptionStyle}>{project.description}</p>
                <div style={tagsContainerStyle}>
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} style={tagStyle}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div style={indexStyle}>
                    {index + 1} / {total}
                </div>
            </div>
        </div>
    );
};
