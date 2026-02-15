import React from 'react';
import { Composition } from 'remotion';
import { DesktopShowreel } from './DesktopShowreel';
import { MobileShowreel } from './MobileShowreel';
import { content } from '../constants';
import '../index.css';

export const RemotionRoot: React.FC = () => {
    const FPS = 30;
    const SLIDE_DURATION = 2 * FPS;
    const LOGO_DURATION = 2 * FPS;

    const TOTAL_DURATION = LOGO_DURATION + (content.projects.length * SLIDE_DURATION);
    // Add some buffer for the interaction expand effect on desktop
    const DESKTOP_DURATION = TOTAL_DURATION + (4 * FPS);

    return (
        <>
            <Composition
                id="DesktopShowreel"
                component={DesktopShowreel}
                durationInFrames={DESKTOP_DURATION}
                fps={FPS}
                width={1920}
                height={1080}
                defaultProps={{
                    projects: content.projects
                }}
            />
            <Composition
                id="MobileShowreel"
                component={MobileShowreel}
                durationInFrames={TOTAL_DURATION}
                fps={FPS}
                width={1080}
                height={1920}
                defaultProps={{
                    projects: content.projects
                }}
            />
        </>
    );
};
