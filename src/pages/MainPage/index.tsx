import React, { useState } from 'react';

import levadaLogo from '../../assets/images/levada-logo-white.svg';

import RhythmGrid from '../../components/RhythmGrid';

import getRhythmicFigure from '../../utils/getRhythmicFigure';
import playBeat from '../../utils/playBeat';

import './styles.css';

function MainPage(): JSX.Element {
    const [currentBeat, setCurrentBeat] = useState(0);
    const [maxBeats, setMaxBeats] = useState(4);
    const [bpm, setBpm] = useState(60);
    const [rhythmicFigures, setRhythmicFigures] = useState(() => {
        const randomArray: string[] = [];
        for (let i = 0; i < maxBeats; i++) randomArray.push(getRhythmicFigure());
        return randomArray;
    });

    function handleNewBeat() {
        setRhythmicFigures([...rhythmicFigures, getRhythmicFigure()]);
    }

    function handleRemoveBeat() {
        setRhythmicFigures(rhythmicFigures.slice(0, rhythmicFigures.length - 1));
    }

    async function handleNextBeat() {
        setCurrentBeat((currentBeat + 1) % maxBeats);
        await playBeat(rhythmicFigures[currentBeat], bpm);
        await playBeat(rhythmicFigures[currentBeat], bpm);
    }

    return (
        <div id="main-page">
            <header>
                <img src={levadaLogo} alt="logo Levada" />
            </header>

            <div className="center-container">
                <div className="container">
                    <div className="btn-container">
                        <button type="button" onClick={handleNextBeat}>
                            Next beat
                        </button>
                    </div>
                    <div className="btn-container">
                        <button
                            type="button"
                            onClick={() => {
                                if (maxBeats < 10) {
                                    setMaxBeats(maxBeats + 1);
                                    setCurrentBeat(currentBeat % maxBeats);
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
                                    setCurrentBeat(currentBeat % maxBeats);
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
