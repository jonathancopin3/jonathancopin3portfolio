import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Project } from '../types';
import { ProjectSlide } from './ProjectSlide';

interface PortfolioCompositionProps {
    projects: Project[];
}

export const PortfolioComposition: React.FC<PortfolioCompositionProps> = ({ projects }) => {
    const { fps } = useVideoConfig();
    const DURATION_PER_SLIDE = 3 * fps; // 3 seconds per slide

    return (
        <div style={{ flex: 1, backgroundColor: '#000000' }}>
            {projects.map((project, index) => (
                <Sequence
                    key={project.id}
                    from={index * DURATION_PER_SLIDE}
                    durationInFrames={DURATION_PER_SLIDE}
                    name={project.title}
                >
                    <ProjectSlide project={project} index={index} total={projects.length} />
                </Sequence>
            ))}
        </div>
    );
};
