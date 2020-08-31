import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

import Select from '../Select';

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
    handleNewBeat: () => void;
    handleRemoveBeat: () => void;

    areControlsDisabled: boolean;

    isMuted: boolean;
    handleMuteToggle: () => void;

    handleRandomizeBeats: () => void;
    setBpm: (newBpm: number) => void;

    isLooping: boolean;
    handleLoopToggle: () => void;
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
    isMuted,
    handleMuteToggle,
    isLooping,
    handleLoopToggle,
    handleRandomizeBeats,
    setBpm,
}: ControlsMenuProps): JSX.Element {
    const INIT_BPM = 80;
    const MAX_BPM = 140;
    const MIN_BPM = 40;
    const BPM_STEP = 10;
    const N_BPMS = (MAX_BPM - MIN_BPM) / BPM_STEP + 1;

    return (
        <div className="center-container">
            <div className="controls-menu">
                <button className="play-btn" type="button" disabled={isPlayDisabled} onClick={handlePlayClick}>
                    {isPlaying ? 'Stop' : 'Play'}
                </button>

                <button className="add-beat-btn" type="button" disabled={isAddBeatDisabled} onClick={handleNewBeat}>
                    <img src={upArrowIcon} alt="Add beat" />
                </button>

                <button
                    className="remove-beat-btn"
                    type="button"
                    disabled={isRemoveBeatDisabled}
                    onClick={handleRemoveBeat}
                >
                    <img src={downArrowIcon} alt="Remove beat" />
                </button>

                <button
                    className={classNames({ mute: true, 'is-muted': isMuted })}
                    disabled={areControlsDisabled}
                    onClick={handleMuteToggle}
                >
                    <img src={isMuted ? volumeOffIcon : volumeOnIcon} alt={isMuted ? 'Unmute' : 'Mute'} />
                </button>

                <button
                    className="randomize"
                    type="button"
                    disabled={areControlsDisabled}
                    onClick={handleRandomizeBeats}
                >
                    <img src={randomizeIcon} alt="Randomize beats" />
                </button>

                <button
                    className={classNames({ loop: true, 'isnt-looping': !isLooping })}
                    type="button"
                    disabled={areControlsDisabled}
                    onClick={handleLoopToggle}
                >
                    <img src={isLooping ? loopIcon : noLoopIcon} alt="Toggle loop rhythm" />
                </button>

                <button
                    className="allow-figures"
                    type="button"
                    disabled={areControlsDisabled}
                    onClick={handleRandomizeBeats}
                >
                    <img src={selectIcon} alt="Choose which figures can appear" />
                </button>

                <button
                    className="choose-figure"
                    type="button"
                    disabled={areControlsDisabled}
                    onClick={handleRandomizeBeats}
                >
                    <img src={addIcon} alt="Choose new rhythmic figure" />
                </button>

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
        </div>
    );
}

export default ControlsMenu;
