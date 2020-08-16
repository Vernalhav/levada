import React, { useState } from 'react';

import RhythmicFigure from '../RhythmicFigure';

import './styles.css';

interface RhythmGridProps {
    currentBeat: number;
    rhythmicFigures: string[];
}

function RhythmGrid(props: RhythmGridProps): JSX.Element {
    const maxBeats = props.rhythmicFigures.length;
    const [userBeat, setUserBeat] = useState(false);

    function beatAnimation() {
        setUserBeat(true);
        setTimeout(() => setUserBeat(false), 100);
    }

    return (
        <div id="rhythm-grid" onClick={beatAnimation}>
            <div className="container">
                {props.rhythmicFigures.map((rhythmicFigure: string, i: number) => {
                    return (
                        <RhythmicFigure
                            type={rhythmicFigure}
                            isCurrentBeat={props.currentBeat % maxBeats === i}
                            isShining={userBeat}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RhythmGrid;
