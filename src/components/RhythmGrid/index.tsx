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

    console.log(props.currentBeat);

    return (
        <div className="container">
            <div id="rhythm-grid">
                {rhythmicFigures.map((rhythmicFigure: string, i: number) => {
                    return (
                        <RhythmicFigure
                            type={rhythmicFigure}
                            isHighlighted={props.currentBeat % props.maxBeats === i - 1}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RhythmGrid;
