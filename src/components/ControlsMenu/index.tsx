import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import Select from '../Select';
import FigureSelectBar, { states } from '../FigureSelectBar';
import Tooltip from '@material-ui/core/Tooltip';

import upArrowIcon from '../../assets/images/icons/up_arrow.svg';
import downArrowIcon from '../../assets/images/icons/down_arrow.svg';
import volumeOnIcon from '../../assets/images/icons/volume_on.svg';
import volumeOffIcon from '../../assets/images/icons/volume_off.svg';
import randomizeIcon from '../../assets/images/icons/randomize.svg';
import addIcon from '../../assets/images/icons/add.svg';
import loopIcon from '../../assets/images/icons/loop.svg';
import noLoopIcon from '../../assets/images/icons/no-loop.svg';
import selectIcon from '../../assets/images/icons/select.svg';

import './styles.css';

interface ControlsMenuProps {
    isPlaying: boolean;
    isPlayDisabled: boolean;
    handlePlayClick: () => void;

    isAddBeatDisabled: boolean;
    isRemoveBeatDisabled: boolean;
    handleNewBeat: (figure?: string) => void;
    handleRemoveBeat: () => void;

    areControlsDisabled: boolean;
    areNoFiguresSelected: boolean;
    areMaxBeatsSelected: boolean;

    isMuted: boolean;
    handleMuteToggle: () => void;

    handleRandomizeBeats: () => void;
    setBpm: (newBpm: number) => void;

    isLooping: boolean;
    handleLoopToggle: () => void;

    selectedFigures: { [figure: string]: boolean };
    chooseFunction: (figure: string) => void;
    selectFunction: (figure: string) => void;

    selectAll: () => void;
    deselectAll: () => void;
}

function ControlsMenu({
    isPlaying,
    isPlayDisabled,
    handlePlayClick,
    isAddBeatDisabled,
    isRemoveBeatDisabled,
    handleNewBeat,
    handleRemoveBeat,
    areControlsDisabled,
    areNoFiguresSelected,
    areMaxBeatsSelected,
    isMuted,
    handleMuteToggle,
    isLooping,
    handleLoopToggle,
    handleRandomizeBeats,
    setBpm,
    selectedFigures,
    chooseFunction,
    selectFunction,
    selectAll,
    deselectAll,
}: ControlsMenuProps): JSX.Element {
    const INIT_BPM = 80;
    const MAX_BPM = 140;
    const MIN_BPM = 40;
    const BPM_STEP = 10;
    const N_BPMS = (MAX_BPM - MIN_BPM) / BPM_STEP + 1;

    const TOOLTIP_DELAY = 500;

    const [currentState, setCurrentState] = useState(states.NONE);
    const [prevState, setPrevState] = useState(states.NONE);

    return (
        <div className="center-container">
            <div className="controls-menu">
                <button
                    className="play-btn"
                    type="button"
                    disabled={isPlayDisabled}
                    onClick={() => {
                        if (!isPlaying) {
                            setPrevState(currentState);
                            setCurrentState(states.NONE);
                        }
                        handlePlayClick();
                    }}
                >
                    {isPlaying ? 'Stop' : 'Play'}
                </button>

                <Tooltip
                    title={areNoFiguresSelected ? 'Select at least 1 figure to add new beats' : 'Add new beat'}
                    placement="top"
                    enterNextDelay={TOOLTIP_DELAY}
                    enterDelay={TOOLTIP_DELAY}
                    arrow
                >
                    <button
                        className="add-beat-btn"
                        type="button"
                        disabled={isAddBeatDisabled}
                        onClick={() => {
                            handleNewBeat();
                        }}
                    >
                        <img src={upArrowIcon} alt="Add beat" />
                    </button>
                </Tooltip>

                <Tooltip
                    title="Remove last beat"
                    placement="bottom"
                    enterNextDelay={TOOLTIP_DELAY}
                    enterDelay={TOOLTIP_DELAY}
                    arrow
                >
                    <button
                        className="remove-beat-btn"
                        type="button"
                        disabled={isRemoveBeatDisabled}
                        onClick={handleRemoveBeat}
                    >
                        <img src={downArrowIcon} alt="Remove beat" />
                    </button>
                </Tooltip>

                <Tooltip
                    title={isMuted ? 'Play whole rhythm' : 'Play only metronome'}
                    placement="top"
                    enterNextDelay={TOOLTIP_DELAY}
                    enterDelay={TOOLTIP_DELAY}
                    arrow
                >
                    <button
                        className={classNames({ mute: true, 'is-muted': isMuted })}
                        disabled={areControlsDisabled}
                        onClick={handleMuteToggle}
                    >
                        <img src={isMuted ? volumeOffIcon : volumeOnIcon} alt={isMuted ? 'Unmute' : 'Mute'} />
                    </button>
                </Tooltip>

                <Tooltip
                    title={
                        areNoFiguresSelected
                            ? 'Select at least 1 figure to generate a new rhythm'
                            : 'Generate new rhythm'
                    }
                    placement="top"
                    enterNextDelay={TOOLTIP_DELAY}
                    enterDelay={TOOLTIP_DELAY}
                    arrow
                >
                    <button
                        className="randomize"
                        type="button"
                        disabled={areControlsDisabled || areNoFiguresSelected}
                        onClick={handleRandomizeBeats}
                    >
                        <img src={randomizeIcon} alt="Randomize beats" />
                    </button>
                </Tooltip>

                <Tooltip
                    title={isLooping ? 'Stop after rhythm ends' : 'Loop rhythm'}
                    placement="top"
                    enterNextDelay={TOOLTIP_DELAY}
                    enterDelay={TOOLTIP_DELAY}
                    arrow
                >
                    <button
                        className={classNames({ loop: true, 'isnt-looping': !isLooping })}
                        type="button"
                        disabled={areControlsDisabled}
                        onClick={handleLoopToggle}
                    >
                        <img src={isLooping ? loopIcon : noLoopIcon} alt="Toggle loop rhythm" />
                    </button>
                </Tooltip>

                <Tooltip
                    title={currentState === states.SELECT ? 'Close pane' : 'Select which rhythmic figures can appear'}
                    placement="bottom"
                    enterNextDelay={TOOLTIP_DELAY}
                    enterDelay={TOOLTIP_DELAY}
                    arrow
                >
                    <button
                        className={classNames({ 'allow-figures': true, 'is-active': currentState === states.SELECT })}
                        type="button"
                        disabled={
                            areControlsDisabled || (currentState !== states.NONE && currentState !== states.SELECT)
                        }
                        onClick={() => {
                            setPrevState(currentState);
                            currentState === states.NONE
                                ? setCurrentState(states.SELECT)
                                : setCurrentState(states.NONE);
                        }}
                    >
                        <img src={selectIcon} alt="Choose which figures can appear" />
                    </button>
                </Tooltip>

                <Tooltip
                    title={currentState === states.CHOOSE ? 'Close pane' : 'Choose next rhythmic figure'}
                    placement="bottom"
                    enterNextDelay={TOOLTIP_DELAY}
                    enterDelay={TOOLTIP_DELAY}
                    arrow
                >
                    <button
                        className={classNames({ 'choose-figure': true, 'is-active': currentState === states.CHOOSE })}
                        type="button"
                        disabled={
                            areControlsDisabled ||
                            (areMaxBeatsSelected && currentState !== states.CHOOSE) ||
                            (currentState !== states.NONE && currentState !== states.CHOOSE)
                        }
                        onClick={() => {
                            setPrevState(currentState);
                            currentState === states.NONE
                                ? setCurrentState(states.CHOOSE)
                                : setCurrentState(states.NONE);
                        }}
                    >
                        <img src={addIcon} alt="Choose new rhythmic figure" />
                    </button>
                </Tooltip>

                <div className="bpm">
                    <Select
                        className="bpm-select"
                        label="BPM"
                        defaultValue={INIT_BPM}
                        disabled={areControlsDisabled}
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

            <FigureSelectBar
                state={currentState}
                prevState={prevState}
                selectedFigures={selectedFigures}
                selectFunction={selectFunction}
                chooseFunction={chooseFunction}
                areMaxBeatsSelected={areMaxBeatsSelected}
                selectAll={selectAll}
                deselectAll={deselectAll}
            />
        </div>
    );
}

export default ControlsMenu;
