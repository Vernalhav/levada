import React, { useState } from 'react';

import levadaLogo from '../../assets/images/levada-logo-white.svg';
import beatSound from '../../assets/sounds/beat.wav';
import snapSound from '../../assets/sounds/snap.wav';

import RhythmGrid from '../../components/RhythmGrid';
import getRhythmicFigure from '../../utils/getRhythmicFigure';

import './styles.css';

function MainPage(): JSX.Element {
    const [currentBeat, setCurrentBeat] = useState(1);
    const [maxBeats, setMaxBeats] = useState(4);
    const [rhythmicFigures, setRhythmicFigures] = useState(() => {
        const randomArray: string[] = [];
        for (let i = 0; i < maxBeats; i++) randomArray.push(getRhythmicFigure());
        return randomArray;
    });

    const beat = new Audio(beatSound);
    const snap = new Audio(snapSound);

    function handleNewBeat() {
        setRhythmicFigures([...rhythmicFigures, getRhythmicFigure()]);
    }

    function handleRemoveBeat() {
        setRhythmicFigures(rhythmicFigures.slice(0, rhythmicFigures.length - 1));
    }

    return (
        <div id="main-page">
            <header>
                <img src={levadaLogo} alt="logo Levada" />
            </header>

            <div className="center-container">
                <div className="container">
                    <div className="btn-container">
                        <button
                            type="button"
                            onClick={() => {
                                setCurrentBeat(currentBeat + 1);
                                beat.play();
                                snap.play();
                            }}
                        >
                            Next beat
                        </button>
                    </div>
                    <div className="btn-container">
                        <button
                            type="button"
                            onClick={() => {
                                if (maxBeats < 10) {
                                    setMaxBeats(maxBeats + 1);
                                    handleNewBeat();
                                }
                            }}
                        >
                            +
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (maxBeats > 4) {
                                    setMaxBeats(maxBeats - 1);
                                    handleRemoveBeat();
                                }
                            }}
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>

            <RhythmGrid currentBeat={currentBeat} rhythmicFigures={rhythmicFigures} />
        </div>
    );
}

export default MainPage;
