import React from 'react';
import { Sequence, useVideoConfig, AbsoluteFill, interpolate, useCurrentFrame, Easing, Img } from 'remotion';
import { Project } from '../types';
import { LogoIntro } from './components/LogoIntro';
import { Cursor } from './components/Cursor';
import { SlidingCarousel } from './components/SlidingCarousel';

interface DesktopShowreelProps {
    projects: Project[];
}

export const DesktopShowreel: React.FC<DesktopShowreelProps> = ({ projects }) => {
    const { fps, width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    const LOGO_DURATION = 2.5 * fps;

    // -- CAROUSEL TIMING --
    // We want to scroll until the Nomad project is center.
    // We need to calculate exactly when Nomad appears in the center.
    // In SlidingCarousel: 
    // ITEM_WIDTH = width * 0.6
    // GAP = 100
    // center when: -frame * 15 + index * (ITEM_WIDTH + GAP) = 0
    // frame = index * (ITEM_WIDTH + GAP) / 15

    const ITEM_WIDTH = width * 0.6;
    const GAP = 100;
    const SPEED = 25; // Faster speed for "Very fast-paced"

    const nomadIndex = projects.findIndex(p => p.id === 'nomad-apple-watch');
    const nomadProject = projects[nomadIndex];

    // Frame when Nomad is exactly in center
    const NOMAD_CENTER_FRAME = (nomadIndex * (ITEM_WIDTH + GAP)) / SPEED;

    // Interaction Timing
    const INTERACTION_START_FRAME = LOGO_DURATION + NOMAD_CENTER_FRAME - (1.5 * fps); // Start interacting before it centers
    const HOVER_1_TIME = INTERACTION_START_FRAME;
    const HOVER_2_TIME = INTERACTION_START_FRAME + (0.5 * fps);
    const CLICK_TIME = LOGO_DURATION + NOMAD_CENTER_FRAME; // Click exactly when centered
    const EXPAND_DURATION = 5 * fps;

    // -- CURSOR ANIMATION PATH --
    // 1. Off screen
    // 2. Hover Project n-2
    // 3. Hover Project n-1
    // 4. Click Nomad (Project n)

    const cursorX = interpolate(
        frame,
        [0, LOGO_DURATION, HOVER_1_TIME, HOVER_2_TIME, CLICK_TIME],
        [width + 200, width + 200, width * 0.8, width * 0.3, width / 2],
        { extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 1, 0.5, 1) }
    );

    const cursorY = interpolate(
        frame,
        [0, LOGO_DURATION, HOVER_1_TIME, HOVER_2_TIME, CLICK_TIME],
        [height + 200, height + 200, height * 0.5, height * 0.5, height / 2],
        { extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 1, 0.5, 1) }
    );

    const isClicked = frame >= CLICK_TIME && frame < CLICK_TIME + 15;

    // -- FREEZE CAROUSEL --
    // When clicked, we want the carousel to "stop" or fade out, and the specific project to expand.
    // Actually, SlidingCarousel depends on frame. We can't easily stop it without complex state or freezing frame prop.
    // Instead, we will Zoom IN the whole container so the center (Nomad) fills the screen.

    const zoom = interpolate(
        frame,
        [CLICK_TIME, CLICK_TIME + 20],
        [1, 5],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 1, 0.5, 1) }
    );

    // Fade out carousel as we zoom in
    const carouselOpacity = interpolate(
        frame,
        [CLICK_TIME, CLICK_TIME + 15],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const expandedViewOpacity = interpolate(
        frame,
        [CLICK_TIME + 10, CLICK_TIME + 25],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill style={{ backgroundColor: '#000000' }}>
            {/* LOGO INTRO */}
            <Sequence from={0} durationInFrames={LOGO_DURATION}>
                <LogoIntro />
            </Sequence>

            {/* CAROUSEL FLOW */}
            <Sequence from={LOGO_DURATION} durationInFrames={CLICK_TIME + 30}>
                <AbsoluteFill style={{
                    transform: `scale(${zoom})`,
                    opacity: carouselOpacity,
                    transformOrigin: 'center center'
                }}>
                    <SlidingCarousel projects={projects} speed={SPEED} />
                </AbsoluteFill>
            </Sequence>

            {/* EXPANDED VIDEO VIEW (NOMAD) */}
            {nomadProject && (
                <Sequence from={CLICK_TIME} durationInFrames={EXPAND_DURATION}>
                    <AbsoluteFill style={{
                        opacity: expandedViewOpacity,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}>
                        {nomadProject.videoUrl ? (
                            <div style={{ width: '85%', height: '85%', boxShadow: '0 0 100px rgba(255,255,255,0.15)', borderRadius: 20, overflow: 'hidden' }}>
                                {/* In a real scenario, use <Video /> but we might not have the file locally or it might be heavy. Using Img for stability + Text "Video Playing" */}
                                <Img src={nomadProject.thumbnailUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <h2 style={{ color: 'white', fontFamily: 'Inter', fontSize: 60, margin: 0 }}>{nomadProject.title}</h2>
                                    <p style={{ color: '#888', fontFamily: 'Inter', fontSize: 24 }}>Interactive Demo</p>
                                </div>
                            </div>
                        ) : (
                            <Img src={nomadProject.thumbnailUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                    </AbsoluteFill>
                </Sequence>
            )}

            {/* CURSOR */}
            <Sequence from={LOGO_DURATION}>
                <Cursor x={cursorX} y={cursorY} clicked={isClicked} visible={frame < CLICK_TIME + 20} />
            </Sequence>

        </AbsoluteFill>
    );
};
