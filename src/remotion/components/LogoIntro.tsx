import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const LogoIntro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const opacity = spring({
        frame,
        fps,
        config: { mass: 0.5, damping: 10, stiffness: 100 },
    });

    const scale = interpolate(frame, [0, 60], [1.1, 1], { extrapolateRight: 'clamp' });

    // Light sweep effect
    const sweep = interpolate(frame, [10, 50], [-100, 200], { extrapolateRight: 'clamp' });

    const containerStyle: React.CSSProperties = {
        flex: 1,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    };

    const textStyle: React.CSSProperties = {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 300,
        fontSize: width > 1080 ? '80px' : '60px', // Responsive font size
        color: 'white',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        opacity: opacity,
        transform: `scale(${scale})`,
        position: 'relative',
        overflow: 'hidden',
    };

    const gradientStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`,
        transform: `skewX(-20deg) translateX(${sweep}%)`,
        pointerEvents: 'none',
    };

    return (
        <div style={containerStyle}>
            <div style={textStyle}>
                Jonathan Copin
                <div style={gradientStyle} />
            </div>
            <div style={{
                ...textStyle,
                fontSize: width > 1080 ? '24px' : '18px',
                marginTop: '120px',
                position: 'absolute',
                opacity: interpolate(frame, [20, 40], [0, 0.7])
            }}>
                Portfolio Showreel
            </div>
        </div>
    );
};
