import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import classNames from 'classnames';

import levadaLogo from '../../assets/images/levada-logo-white.svg';

import RhythmGrid from '../../components/RhythmGrid';
import Select from '../../components/Select';

import getRhythmicFigure from '../../utils/getRhythmicFigure';
import playBeat from '../../utils/playBeat';

import './styles.css';

function MainPage(): JSX.Element {
    const INIT_BPM = 100;
    const MAX_BPM = 140;
    const MIN_BPM = 40;
    const BPM_STEP = 10;
    const N_BPMS = (MAX_BPM - MIN_BPM) / BPM_STEP + 1;

    const INIT_MAX_BEATS = 4;
    const MAX_BEATS = 10;
    const MIN_BEATS = 4;

    const [currentBeat, setCurrentBeat] = useState(0);
    const [maxBeats, setMaxBeats] = useState(INIT_MAX_BEATS);
    const [bpm, setBpm] = useState(INIT_BPM);

    const [rhythmicFigures, setRhythmicFigures] = useState(() => {
        const randomArray: string[] = [];
        for (let i = 0; i < maxBeats; i++) randomArray.push(getRhythmicFigure());
        return randomArray;
    });

    const [isPlaying, setIsPlaying] = useState(false);

    const goToNextBeat = useCallback(() => {
        const nextBeat = currentBeat + 1;
        setCurrentBeat((prevState) => {
            // This approach causes the visual bug to occur only if
            // the user pauses on the first beat. If there is a better
            // way to avoid this issue, please open a pull request :)
            if (nextBeat !== prevState + 1) return 0;
            return nextBeat;
        });
    }, [currentBeat]);

    useEffect(() => {
        async function waitForNextBeat() {
            await playBeat(rhythmicFigures[currentBeat], bpm);
            goToNextBeat();
        }

        if (isPlaying && currentBeat < maxBeats) waitForNextBeat();
        else if (isPlaying) {
            setIsPlaying(false);
            setCurrentBeat(0);
        }
    }, [isPlaying, currentBeat, maxBeats, rhythmicFigures, bpm, goToNextBeat]);

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
        setCurrentBeat(0);
    }

    return (
        <div id="main-page">
            <header className={classNames({ 'is-hidden': isPlaying })}>
                <img src={levadaLogo} alt="logo Levada" />
            </header>

            <div className="center-container">
                <div className="container">
                    <div className="btn-container">
                        <button type="button" onClick={handlePlayPause}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                    <div className={classNames({ 'btn-container': true, 'is-hidden': isPlaying })}>
                        <button type="button" disabled={isPlaying || maxBeats >= MAX_BEATS} onClick={handleNewBeat}>
                            +
                        </button>
                        <button type="button" disabled={isPlaying || maxBeats <= MIN_BEATS} onClick={handleRemoveBeat}>
                            -
                        </button>
                        <Select
                            className="bpm-select"
                            label="BPM"
                            defaultValue={INIT_BPM}
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

            <RhythmGrid currentBeat={currentBeat} rhythmicFigures={rhythmicFigures} />
        </div>
    );
}

export default MainPage;
