import React from 'react';

import RhythmicFigure from '../RhythmicFigure';

import './styles.css';

interface RhythmGridProps {
    currentBeat: number;
    rhythmicFigures: string[];
}

function RhythmGrid(props: RhythmGridProps): JSX.Element {
    const maxBeats = props.rhythmicFigures.length;

    return (
        <div id="rhythm-grid">
            <div className="container">
                {props.rhythmicFigures.map((rhythmicFigure: string, i: number) => {
                    return (
                        <RhythmicFigure
                            type={rhythmicFigure}
                            isHighlighted={(props.currentBeat - 1) % maxBeats === i}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RhythmGrid;
