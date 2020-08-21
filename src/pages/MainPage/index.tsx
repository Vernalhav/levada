import React, { useState, useEffect, ChangeEvent } from 'react';
import classNames from 'classnames';

import levadaLogo from '../../assets/images/levada-logo-white.svg';
import refreshIcon from '../../assets/images/icons/refresh.svg';
import upArrowIcon from '../../assets/images/icons/up_arrow.svg';
import downArrowIcon from '../../assets/images/icons/down_arrow.svg';
import volumeOnIcon from '../../assets/images/icons/volume_on.svg';
import volumeOffIcon from '../../assets/images/icons/volume_off.svg';

import RhythmGrid from '../../components/RhythmGrid';
import Select from '../../components/Select';

import getRhythmicFigure from '../../utils/getRhythmicFigure';
import playBeat, { cancelPlayBeat, getBeatSound } from '../../utils/playBeat';

import './styles.css';
import sleep from '../../utils/sleep';

function MainPage(): JSX.Element {
    const INIT_BPM = 100;
    const MAX_BPM = 140;
    const MIN_BPM = 40;
    const BPM_STEP = 10;
    const N_BPMS = (MAX_BPM - MIN_BPM) / BPM_STEP + 1;

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
            setCurrentBeat((prevState) => {
                // This approach causes the visual bug to occur only if
                // the user pauses on the first beat. If there is a better
                // way to avoid this issue, please open a pull request :)
                if (nextBeat !== prevState + 1) return 0;
                return nextBeat;
            });
        }

        if (isPlaying && currentBeat < maxBeats) waitForNextBeat();
        else if (isPlaying) endGame();
    }, [isPlaying, currentBeat, maxBeats, rhythmicFigures, bpm, isMuted]);

    async function startGame() {
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

    function handleRandomizeBeats() {}

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
                <img src={levadaLogo} alt="logo Levada" />
            </header>

            <div className="center-container">
                <div className="container">
                    <button
                        type="button"
                        className="play-btn"
                        disabled={isCountingDown}
                        onClick={isPlaying ? endGame : startGame}
                    >
                        {isPlaying ? 'Stop' : 'Play'}
                    </button>
                    <div className={classNames({ 'beat-btn-container': true })}>
                        <button
                            type="button"
                            disabled={isCountingDown || isPlaying || maxBeats >= MAX_BEATS}
                            onClick={handleNewBeat}
                        >
                            <img src={upArrowIcon} alt="Add beat" />
                        </button>
                        <button
                            type="button"
                            disabled={isCountingDown || isPlaying || maxBeats <= MIN_BEATS}
                            onClick={handleRemoveBeat}
                        >
                            <img src={downArrowIcon} alt="Remove beat" />
                        </button>
                    </div>

                    <button
                        className="mute"
                        disabled={isCountingDown || isPlaying}
                        onClick={() => {
                            setIsMuted(!isMuted);
                        }}
                    >
                        <img src={isMuted ? volumeOffIcon : volumeOnIcon} alt={isMuted ? 'Unmute' : 'Mute'} />
                    </button>

                    <button
                        type="button"
                        className="randomize"
                        disabled={isCountingDown || isPlaying}
                        onClick={handleRandomizeBeats}
                    >
                        <img src={refreshIcon} alt="Randomize beats" />
                    </button>

                    <div className="bpm">
                        <Select
                            className="bpm-select"
                            label="BPM"
                            defaultValue={INIT_BPM}
                            disabled={isCountingDown || isPlaying}
                            name="bpm"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setBpm(Number(e.currentTarget.value))}
                            options={Array.from(Array<number>(N_BPMS).keys(), (index) => {
                                const optValue = index * BPM_STEP + MIN_BPM;
                                return {
                                    optKey: optValue + '',
                                    optLabel: optValue + '',
                                };
                            })}
                        />
                    </div>
                </div>
            </div>

            <RhythmGrid
                currentBeat={currentBeat}
                rhythmicFigures={rhythmicFigures}
                enableHighlighting={enableHighlighting}
            />
        </div>
    );
}

export default MainPage;
