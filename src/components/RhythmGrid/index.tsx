import React from 'react';

import RhythmicFigure from '../RhythmicFigure';

import './styles.css';

function RhythmGrid(): JSX.Element {
    return (
        <div id="rhythm-grid">
            <RhythmicFigure type="quavers" />
            <RhythmicFigure type="crotchet" />
            <RhythmicFigure type="quavers" />
            <RhythmicFigure type="crotchet" />
        </div>
    );
}

export default RhythmGrid;
