import React from 'react';

import RhythmicFigure, { RHYTHMIC_FIGURE_NAMES } from '../RhythmicFigure';

import './styles.css';

interface RhythmGridProps {
    currentBeat: number;
    maxBeats: number;
}

function getRandomFigure(): string {
    return RHYTHMIC_FIGURE_NAMES[Math.floor(Math.random() * RHYTHMIC_FIGURE_NAMES.length)];
}

function RhythmGrid(props: RhythmGridProps): JSX.Element {
    const rhythmicFigures = [];

    // Make states?
    for (let i = 0; i < props.maxBeats; i++) rhythmicFigures.push(getRandomFigure());

    return (
        <div id="rhythm-grid">
            <div className="container">
                {rhythmicFigures.map((rhythmicFigure: string, i: number) => {
                    return (
                        <RhythmicFigure
                            type={rhythmicFigure}
                            isHighlighted={(props.currentBeat - 1) % props.maxBeats === i}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RhythmGrid;
