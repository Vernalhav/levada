import React from 'react';
import classNames from 'classnames';

import RhythmicFigure from '../RhythmicFigure';
import { RHYTHMIC_FIGURE_NAMES } from '../../assets/RhythmicFigures';

import './styles.css';

interface FigureSelectBarProps {
    state: states;
}

export enum states {
    NONE,
    CHOOSE,
    SELECT,
}

function FigureSelectBar({ state }: FigureSelectBarProps): JSX.Element {
    return (
        <div className={classNames({ 'figure-select-bar': true, showing: state !== states.NONE })}>
            <div className="bar-content-container">
                <div>
                    <p>
                        {state !== states.NONE && state === states.SELECT
                            ? 'Select which figures you want to appear'
                            : 'Choose next figure'}
                    </p>
                </div>
                <div className="figures-container">
                    {RHYTHMIC_FIGURE_NAMES.map((figureName, index) => {
                        return <RhythmicFigure type={figureName} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default FigureSelectBar;
