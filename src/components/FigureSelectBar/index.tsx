import React from 'react';
import classNames from 'classnames';

import RhythmicFigure from '../RhythmicFigure';
import { RHYTHMIC_FIGURE_NAMES } from '../../assets/RhythmicFigures';

import './styles.css';

interface FigureSelectBarProps {
    prevState: states;
    state: states;
    selectedFigures: { [figure: string]: boolean };
    chooseFunction: (figure: string) => void;
    selectFunction: (figure: string) => void;
}

export enum states {
    NONE,
    CHOOSE,
    SELECT,
}

const statesMessages = {
    [states.NONE]: 'Something went wrong',
    [states.CHOOSE]: 'Choose next figure',
    [states.SELECT]: 'Select which figures you want to appear',
};

function FigureSelectBar({
    prevState,
    state,
    chooseFunction,
    selectFunction,
    selectedFigures,
}: FigureSelectBarProps): JSX.Element {
    function displayTitle(): string {
        if (state === states.NONE) return statesMessages[prevState];
        return statesMessages[state];
    }

    function isHighlighted(figureName: string): boolean {
        if (state === states.CHOOSE) return true;
        return selectedFigures[figureName];
    }

    return (
        <div className={classNames({ 'figure-select-bar': true, showing: state !== states.NONE })}>
            <div className="bar-content-container">
                <div>
                    <p>{displayTitle()}</p>
                </div>
                <div className="figures-container">
                    {RHYTHMIC_FIGURE_NAMES.map((figureName, index) => {
                        return (
                            <RhythmicFigure
                                type={figureName}
                                key={index}
                                isHighlighted={isHighlighted(figureName)}
                                onClick={() => {
                                    if (state === states.CHOOSE) chooseFunction(figureName);
                                    else if (state === states.SELECT) selectFunction(figureName);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FigureSelectBar;
