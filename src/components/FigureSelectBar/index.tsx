import React from 'react';
import classNames from 'classnames';

import RhythmicFigure from '../RhythmicFigure';
import { RHYTHMIC_FIGURE_NAMES } from '../../assets/RhythmicFigures';

import './styles.css';

interface FigureSelectBarProps {
    prevState: states;
    state: states;
}

export enum states {
    NONE,
    CHOOSE,
    SELECT,
}

function FigureSelectBar({ prevState, state }: FigureSelectBarProps): JSX.Element {
    function displayTitle(): string {
        if (state === states.NONE)
            return prevState === states.SELECT ? 'Select which figures you want to appear' : 'Choose next figure';
        return state === states.SELECT ? 'Select which figures you want to appear' : 'Choose next figure';
    }

    return (
        <div className={classNames({ 'figure-select-bar': true, showing: state !== states.NONE })}>
            <div className="bar-content-container">
                <div>
                    <p>{displayTitle()}</p>
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
