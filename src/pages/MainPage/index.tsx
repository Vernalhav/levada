import React, { useState, useEffect } from 'react';

import levadaLogo from '../../assets/images/levada-logo-white.svg';

import RhythmGrid from '../../components/RhythmGrid';
import ControlsMenu from '../../components/ControlsMenu';

import getRhythmicFigure from '../../utils/getRhythmicFigure';
import playBeat, { cancelPlayBeat, getBeatSound } from '../../utils/playBeat';

import './styles.css';
import sleep from '../../utils/sleep';

function MainPage(): JSX.Element {
    const INIT_BPM = 80;

    const INIT_MAX_BEATS = 4;
    const MAX_BEATS = 30;
    const MIN_BEATS = 4;
    const BEATS_PER_MEASURE = 4;

    const [currentBeat, setCurrentBeat] = useState(0);
    const [maxBeats, setMaxBeats] = useState(INIT_MAX_BEATS);
    const [bpm, setBpm] = useState(INIT_BPM);

    const [rhythmicFigures, setRhythmicFigures] = useState(() => {
        const randomArray: string[] = [];
        for (let i = 0; i < maxBeats; i++) randomArray.push(getRhythmicFigure());
        return randomArray;
    });

    const [isPlaying, setIsPlaying] = useState(false); // Determines whether or not the main rhythm is playing
    const [isCountingDown, setisCountingDown] = useState(false); // Determines whether or not the metronome is playing

    const [enableHighlighting, setEnableHighlighting] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        async function waitForNextBeat() {
            await playBeat(rhythmicFigures[currentBeat], bpm, isMuted);
            const nextBeat = currentBeat + 1;

            // This is required in case the user stops the playback
            // early and the beat's value is not updated properly,
            // since prevState will always contain the most updated value
            setCurrentBeat((prevState) => {
                if (nextBeat !== prevState + 1) return 0; // In case the user stopped playing
                return nextBeat;
            });
        }

        if (isPlaying && currentBeat < maxBeats) waitForNextBeat();
        else if (isPlaying) endGame();
    }, [isPlaying, currentBeat, maxBeats, rhythmicFigures, bpm, isMuted]);

    async function startGame() {
        setCurrentBeat(0);
        cancelPlayBeat(false);
        setisCountingDown(true);
        await playInitialMeasure();
        setEnableHighlighting(true);
        setIsPlaying(true); // Actually starts rhythm loop
        setisCountingDown(false);
    }

    function endGame() {
        cancelPlayBeat(true);
        setEnableHighlighting(false);
        setIsPlaying(false);
        setCurrentBeat(0);
    }

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

    function handleRandomizeBeats() {
        setRhythmicFigures(
            rhythmicFigures.map(() => {
                return getRhythmicFigure();
            }),
        );
    }

    async function playInitialMeasure() {
        const beat = getBeatSound(bpm);

        for (let i = 0; i < BEATS_PER_MEASURE; i++) {
            beat.play();
            setEnableHighlighting(true);
            setTimeout(() => setEnableHighlighting(false), 100);
            await sleep(60000 / bpm);
        }
    }

    return (
        <div id="main-page">
            <header>
                <div>
                    <a href="https://github.com/vernalhav/levada" target="_blank" rel="noopener noreferrer">
                        <img src={levadaLogo} alt="Levada's GitHub page link" />
                    </a>
                </div>
            </header>

            <ControlsMenu />

            <RhythmGrid
                currentBeat={currentBeat}
                rhythmicFigures={rhythmicFigures}
                enableHighlighting={enableHighlighting}
            />
        </div>
    );
}

export default MainPage;
