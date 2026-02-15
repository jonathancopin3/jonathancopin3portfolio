import React from 'react';
import { Sequence, useVideoConfig, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Project } from '../types';
import { PremiumSlide } from './components/PremiumSlide';
import { LogoIntro } from './components/LogoIntro';

interface MobileShowreelProps {
    projects: Project[];
}

export const MobileShowreel: React.FC<MobileShowreelProps> = ({ projects }) => {
    const { fps, height } = useVideoConfig();
    const frame = useCurrentFrame();

    const LOGO_DURATION = 2 * fps;

    // Vertical Scroll Configuration
    const ITEM_HEIGHT = height * 0.8; // Each item takes 80% of screen height
    const GAP = 50;
    const SPEED = 15; // Pixels per frame

    const scrollY = -frame * SPEED;

    return (
        <AbsoluteFill style={{ backgroundColor: '#000000' }}>
            <Sequence from={0} durationInFrames={LOGO_DURATION}>
                <LogoIntro />
            </Sequence>

            <Sequence from={LOGO_DURATION}>
                <AbsoluteFill style={{ flexDirection: 'column' }}>
                    {projects.map((project, index) => {
                        const offset = index * (ITEM_HEIGHT + GAP);
                        const currentY = scrollY + offset;

                        // Simple virtual list optimization: only render if roughly on screen
                        if (currentY + ITEM_HEIGHT < -1000 || currentY > height + 1000) return null;

                        // Paralax logic
                        const centerDist = (currentY + ITEM_HEIGHT / 2) - height / 2;
                        const scale = interpolate(Math.abs(centerDist), [0, height], [1, 0.9], { extrapolateRight: 'clamp' });
                        const opacity = interpolate(Math.abs(centerDist), [0, height * 0.8], [1, 0.5], { extrapolateRight: 'clamp' });

                        return (
                            <div
                                key={project.id}
                                style={{
                                    width: '100%',
                                    height: ITEM_HEIGHT,
                                    position: 'absolute',
                                    top: offset + height / 2, // Start below fold
                                    transform: `translateY(${scrollY}px) scale(${scale})`,
                                    opacity,
                                    padding: '20px'
                                }}
                            >
                                <PremiumSlide project={project} layout="mobile" active={Math.abs(centerDist) < 200} />
                            </div>
                        );
                    })}
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
