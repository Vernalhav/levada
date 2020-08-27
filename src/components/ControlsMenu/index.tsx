import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

import Select from '../Select';

import upArrowIcon from '../../assets/images/icons/up_arrow.svg';
import downArrowIcon from '../../assets/images/icons/down_arrow.svg';
import volumeOnIcon from '../../assets/images/icons/volume_on.svg';
import volumeOffIcon from '../../assets/images/icons/volume_off.svg';
import refreshIcon from '../../assets/images/icons/refresh.svg';

import './styles.css';

interface ControlsMenuProps {
    isPlaying: boolean;
    isPlayDisabled: boolean; // {isCountingDown}
    handlePlayClick: () => void; // {isPlaying ? endGame : startGame}

    isAddBeatDisabled: boolean; // {isCountingDown || isPlaying || maxBeats >= MAX_BEATS}
    isRemoveBeatDisabled: boolean; // {isCountingDown || isPlaying || maxBeats <= MIN_BEATS}
    handleNewBeat: () => void;
    handleRemoveBeat: () => void;

    areControlsDisabled: boolean; // {isCountingDown || isPlaying}

    isMuted: boolean;
    handleMute: () => void; // setIsMuted(!isMuted);

    handleRandomizeBeats: () => void;
    setBpm: (newBpm: number) => void;
}

function ControlsMenu({
    isPlaying,
    isPlayDisabled,
    handlePlayClick,
    isAddBeatDisabled,
    isRemoveBeatDisabled,
    handleNewBeat,
    handleRemoveBeat,
    isMuted,
    areControlsDisabled,
    handleMute,
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
            <div className="container">
                <button type="button" className="play-btn" disabled={isPlayDisabled} onClick={handlePlayClick}>
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
                    onClick={handleMute}
                >
                    <img src={isMuted ? volumeOffIcon : volumeOnIcon} alt={isMuted ? 'Unmute' : 'Mute'} />
                </button>

                <button
                    type="button"
                    className="randomize"
                    disabled={areControlsDisabled}
                    onClick={handleRandomizeBeats}
                >
                    <img src={refreshIcon} alt="Randomize beats" />
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
