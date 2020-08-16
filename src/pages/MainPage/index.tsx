import React, { useState, useEffect } from 'react';

import levadaLogo from '../../assets/images/levada-logo-white.svg';

import RhythmGrid from '../../components/RhythmGrid';

import getRhythmicFigure from '../../utils/getRhythmicFigure';
import playBeat from '../../utils/playBeat';

import './styles.css';

function MainPage(): JSX.Element {
    const INIT_BPM = 80;
    const INIT_MAX_BEATS = 4;
    const MAX_BEATS = 10;
    const MIN_BEATS = 4;

    const [currentBeat, setCurrentBeat] = useState(0);
    const [maxBeats, setMaxBeats] = useState(INIT_MAX_BEATS);
    const bpm = INIT_BPM;

    const [rhythmicFigures, setRhythmicFigures] = useState(() => {
        const randomArray: string[] = [];
        for (let i = 0; i < maxBeats; i++) randomArray.push(getRhythmicFigure());
        return randomArray;
    });

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        async function waitForNextBeat() {
            await playBeat(rhythmicFigures[currentBeat], bpm);
            const nextBeat = (currentBeat + 1) % maxBeats;
            setCurrentBeat(nextBeat);
        }

        if (isPlaying) waitForNextBeat();
    });

    useEffect(() => {
        setCurrentBeat(currentBeat % maxBeats);
    }, [currentBeat, maxBeats]);

    function handleNewBeat() {
        if (maxBeats < MAX_BEATS) {
            setMaxBeats(maxBeats + 1);
            setRhythmicFigures([...rhythmicFigures, getRhythmicFigure()]);
        }
    }

    function handleRemoveBeat() {
        if (maxBeats > MIN_BEATS) {
            setMaxBeats(maxBeats - 1);
            setRhythmicFigures(rhythmicFigures.slice(0, rhythmicFigures.length - 1));
        }
    }

    function handlePlayPause() {
        setIsPlaying(!isPlaying);
    }

    return (
        <div id="main-page">
            <header>
                <img src={levadaLogo} alt="logo Levada" />
            </header>

            <div className="center-container">
                <div className="container">
                    <div className="btn-container">
                        <button type="button" onClick={handlePlayPause}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                    <div className="btn-container">
                        <button type="button" disabled={isPlaying} onClick={handleNewBeat}>
                            +
                        </button>
                        <button type="button" disabled={isPlaying} onClick={handleRemoveBeat}>
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
