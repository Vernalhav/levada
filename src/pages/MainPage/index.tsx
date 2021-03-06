import React, { useState, useEffect, useMemo } from 'react';

import levadaLogo from '../../assets/images/levada-logo-white.svg';
import githubLogo from '../../assets/images/github-logo.svg';

import RhythmGrid from '../../components/RhythmGrid';
import ControlsMenu from '../../components/ControlsMenu';

import getRhythmicFigure, { getAllFigures } from '../../utils/getRhythmicFigure';
import playBeat, { cancelPlayBeat } from '../../utils/playBeat';
import sleep from '../../utils/sleep';

import './styles.css';

function MainPage(): JSX.Element {
    const INIT_BPM = 80;

    const INIT_MAX_BEATS = 4;
    const MAX_BEATS = 30;
    const MIN_BEATS = 0;
    const BEATS_PER_MEASURE = 4;

    const [currentBeat, setCurrentBeat] = useState(0);
    const [maxBeats, setMaxBeats] = useState(INIT_MAX_BEATS);
    const [bpm, setBpm] = useState(INIT_BPM);

    const [selectedFigures, setSelectedFigures] = useState(getAllFigures());

    const nSelected = useMemo(() => {
        let nSelected = 0;
        for (const [, allowed] of Object.entries(selectedFigures)) {
            nSelected += allowed ? 1 : 0;
        }
        return nSelected;
    }, [selectedFigures]);

    const [rhythmicFigures, setRhythmicFigures] = useState(() => {
        const randomArray: string[] = [];
        for (let i = 0; i < maxBeats; i++) randomArray.push(getRhythmicFigure(selectedFigures));
        return randomArray;
    });

    const [isPlaying, setIsPlaying] = useState(false); // Determines whether or not the main rhythm is playing
    const [isCountingDown, setisCountingDown] = useState(false); // Determines whether or not the initial metronome is playing
    const [enableHighlighting, setEnableHighlighting] = useState(false);

    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false);

    useEffect(() => {
        async function waitForNextBeat() {
            if (!isMuted) playBeat(rhythmicFigures[currentBeat], bpm);
            else playBeat('rest', bpm);
            await sleep(60000 / bpm);

            const nextBeat = !isLooping ? currentBeat + 1 : (currentBeat + 1) % maxBeats;
            setCurrentBeat(nextBeat);
        }

        if (isPlaying && currentBeat < maxBeats) waitForNextBeat();
        else if (isPlaying) endGame();
    }, [isPlaying, currentBeat, maxBeats, rhythmicFigures, bpm, isMuted, isLooping]);

    async function startGame() {
        setCurrentBeat(0);
        setisCountingDown(true);
        await playInitialMeasure();
        setEnableHighlighting(true);
        setIsPlaying(true); // Actually starts rhythm loop
        setisCountingDown(false);
    }

    function endGame() {
        cancelPlayBeat();
        setEnableHighlighting(false);
        setIsPlaying(false);
        setCurrentBeat(0);
    }

    function handleNewBeat(figure?: string) {
        if (maxBeats < MAX_BEATS) {
            setMaxBeats(maxBeats + 1);
            setRhythmicFigures([
                ...rhythmicFigures,
                figure ? getRhythmicFigure(selectedFigures, figure) : getRhythmicFigure(selectedFigures),
            ]);
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
                return getRhythmicFigure(selectedFigures);
            }),
        );
    }

    async function playInitialMeasure() {
        for (let i = 0; i < BEATS_PER_MEASURE; i++) {
            playBeat('rest', bpm);
            setEnableHighlighting(true);
            setTimeout(() => setEnableHighlighting(false), 200);
            await sleep(60000 / bpm);
        }
    }

    function selectFunction(figure: string) {
        setSelectedFigures({ ...selectedFigures, [figure]: !selectedFigures[figure] });
    }

    function chooseFunction(figure: string) {
        handleNewBeat(figure);
    }

    function selectAll() {
        const tempSelected = { ...selectedFigures };
        for (const figure in tempSelected) {
            tempSelected[figure] = true;
        }
        setSelectedFigures(tempSelected);
    }

    function deselectAll() {
        const tempSelected = { ...selectedFigures };
        for (const figure in tempSelected) {
            tempSelected[figure] = false;
        }
        setSelectedFigures(tempSelected);
    }

    return (
        <div id="main-page">
            <header>
                <div className="levada-container">
                    <a href="https://github.com/vernalhav/levada" target="_blank" rel="noopener noreferrer">
                        <img src={levadaLogo} alt="Levada's GitHub page link" />
                    </a>
                </div>
                <div className="github-container">
                    <p>Check out the project on GitHub</p>
                    <a href="https://github.com/vernalhav/levada" target="_blank" rel="noopener noreferrer">
                        <img src={githubLogo} alt="Levada's GitHub page link" />
                    </a>
                </div>
            </header>

            <ControlsMenu
                isPlaying={isPlaying}
                isPlayDisabled={isCountingDown || maxBeats <= 1}
                handlePlayClick={isPlaying ? endGame : startGame}
                isAddBeatDisabled={isCountingDown || nSelected <= 0 || isPlaying || maxBeats >= MAX_BEATS}
                isRemoveBeatDisabled={isCountingDown || isPlaying || maxBeats <= MIN_BEATS}
                handleNewBeat={handleNewBeat}
                handleRemoveBeat={handleRemoveBeat}
                areControlsDisabled={isCountingDown || isPlaying}
                areNoFiguresSelected={nSelected <= 0}
                areMaxBeatsSelected={maxBeats >= MAX_BEATS}
                isMuted={isMuted}
                handleMuteToggle={() => setIsMuted(!isMuted)}
                isLooping={isLooping}
                handleLoopToggle={() => setIsLooping(!isLooping)}
                handleRandomizeBeats={handleRandomizeBeats}
                setBpm={setBpm}
                selectedFigures={selectedFigures}
                chooseFunction={chooseFunction}
                selectFunction={selectFunction}
                selectAll={selectAll}
                deselectAll={deselectAll}
            />

            <RhythmGrid
                currentBeat={currentBeat}
                rhythmicFigures={rhythmicFigures}
                enableHighlighting={enableHighlighting}
            />
        </div>
    );
}

export default MainPage;
