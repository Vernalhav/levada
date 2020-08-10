import React from 'react';

import levadaLogo from '../../assets/images/levada-logo-white.svg';
import RhythmGrid from '../../components/RhythmGrid';

import './styles.css';

function MainPage(): JSX.Element {
    return (
        <div id="main-page">
            <header>
                <img src={levadaLogo} alt="logo Levada" />
            </header>

            <RhythmGrid />
        </div>
    );
}

export default MainPage;
