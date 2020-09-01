import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import './styles.css';

import { RHYTHMIC_FIGURES } from '../../assets/RhythmicFigures';

interface RhythmicFigureProps extends HTMLAttributes<HTMLDivElement> {
    type: string;
    isCurrentBeat?: boolean;
    isShining?: boolean;
}

function RhythmicFigure({ type, isCurrentBeat, isShining }: RhythmicFigureProps): JSX.Element {
    const image = RHYTHMIC_FIGURES[type].image;

    const classes = classNames({
        'rhythmic-figure': true,
        highlighted: isCurrentBeat,
        shining: isShining,
    });

    return (
        <div className={classes}>
            <img src={image} alt={type} />
        </div>
    );
}

export default RhythmicFigure;
