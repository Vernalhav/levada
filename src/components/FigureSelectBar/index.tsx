import React from 'react';
import classNames from 'classnames';

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
            <div></div>
        </div>
    );
}

export default FigureSelectBar;
