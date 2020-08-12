import React from 'react';

import RhythmicFigure from '../RhythmicFigure';

import './styles.css';

interface RhythmGridProps {
    currentBeat: number;
    maxBeats: number;
}

function RhythmGrid(props: RhythmGridProps): JSX.Element {
    const rhythmicFigures = [];

    for (let i = 0; i < props.maxBeats; i++) rhythmicFigures.push('quavers');

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
