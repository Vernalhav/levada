import React, { useState } from 'react';

import RhythmicFigure from '../RhythmicFigure';

import './styles.css';

interface RhythmGridProps {
    currentBeat: number;
    rhythmicFigures: string[];
    enableHighlighting?: boolean;
}

function RhythmGrid({ enableHighlighting = false, ...props }: RhythmGridProps): JSX.Element {
    const maxBeats = props.rhythmicFigures.length;
    const [flash, setFlash] = useState(false);

    function beatAnimation() {
        setFlash(true);
        setTimeout(() => setFlash(false), 100);
    }

    return (
        <div id="rhythm-grid" onClick={beatAnimation}>
            <div className="container">
                {props.rhythmicFigures.map((rhythmicFigure: string, i: number) => {
                    return (
                        <RhythmicFigure
                            type={rhythmicFigure}
                            isHighlighted={enableHighlighting && props.currentBeat % maxBeats === i}
                            isShining={flash}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RhythmGrid;
