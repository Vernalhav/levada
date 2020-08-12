import React, { useState } from 'react';

import levadaLogo from '../../assets/images/levada-logo-white.svg';
import RhythmGrid from '../../components/RhythmGrid';

import './styles.css';

function MainPage(): JSX.Element {
    const [currentBeat, setCurrentBeat] = useState(1);
    const [maxBeats, setMaxBeats] = useState(4);

    return (
        <div id="main-page">
            <header>
                <img src={levadaLogo} alt="logo Levada" />
            </header>

            <div>
                <button
                    type="button"
                    onClick={() => {
                        setCurrentBeat(currentBeat + 1);
                    }}
                >
                    Next beat
                </button>
                <input
                    type="number"
                    max="10"
                    min="4"
                    onChange={(e) => {
                        setMaxBeats(Number(e.target.value));
                    }}
                />
            </div>
            <RhythmGrid currentBeat={currentBeat} maxBeats={maxBeats} />
        </div>
    );
}

export default MainPage;
