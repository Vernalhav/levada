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

            <div className="center-container">
                <div className="container">
                    <div className="btn-container">
                        <button
                            type="button"
                            onClick={() => {
                                setCurrentBeat(currentBeat + 1);
                            }}
                        >
                            Next beat
                        </button>
                    </div>
                    <div className="btn-container">
                        <button
                            type="button"
                            onClick={() => {
                                if (maxBeats < 10) setMaxBeats(maxBeats + 1);
                            }}
                        >
                            +
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (maxBeats > 4) setMaxBeats(maxBeats - 1);
                            }}
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>

            <RhythmGrid currentBeat={currentBeat} maxBeats={maxBeats} />
        </div>
    );
}

export default MainPage;
