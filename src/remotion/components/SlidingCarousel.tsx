import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Project } from '../../types';
import { PremiumSlide } from './PremiumSlide';

interface SlidingCarouselProps {
    projects: Project[];
    speed?: number; // Pixels per frame
}

export const SlidingCarousel: React.FC<SlidingCarouselProps> = ({ projects, speed = 15 }) => {
    const frame = useCurrentFrame();
    const { width } = useVideoConfig();

    // Calculate total width of the carousel
    const ITEM_WIDTH = width * 0.6; // Each item takes 60% of screen width
    const GAP = 100;
    const TOTAL_WIDTH = projects.length * (ITEM_WIDTH + GAP);

    // Continuous movement
    const translateX = -frame * speed;

    return (
        <AbsoluteFill style={{
            flexDirection: 'row',
            alignItems: 'center',
            perspective: '2000px', // key for 3D effect
            paddingLeft: width / 2 - ITEM_WIDTH / 2 // Start centered
        }}>
            {projects.map((project, index) => {
                const itemOffset = index * (ITEM_WIDTH + GAP);
                const currentPos = translateX + itemOffset + (width / 2 - ITEM_WIDTH / 2);

                // Calculate distance from center for 3D effect
                const distanceFromCenter = currentPos - (width / 2 - ITEM_WIDTH / 2);

                // Rotation based on distance (max +/- 15 degrees)
                const rotateY = interpolate(
                    distanceFromCenter,
                    [-width, 0, width],
                    [15, 0, -15],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                // Scale based on distance (center items larger)
                const scale = interpolate(
                    Math.abs(distanceFromCenter),
                    [0, width],
                    [1.1, 0.9],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                const opacity = interpolate(
                    Math.abs(distanceFromCenter),
                    [0, width * 1.5],
                    [1, 0.3],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                    <div
                        key={project.id}
                        style={{
                            width: ITEM_WIDTH,
                            height: '70%',
                            position: 'absolute',
                            left: itemOffset,
                            transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                            // transition: 'transform 0.1s linear', // handled by remotion frame
                            opacity,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <PremiumSlide project={project} layout="desktop" active={Math.abs(distanceFromCenter) < 200} />
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
