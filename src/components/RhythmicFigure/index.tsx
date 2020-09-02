import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import './styles.css';

import { RHYTHMIC_FIGURES } from '../../assets/RhythmicFigures';

interface RhythmicFigureProps extends HTMLAttributes<HTMLDivElement> {
    type: string;
    isHighlighted?: boolean;
    isShining?: boolean;
}

function RhythmicFigure({ type, isHighlighted, isShining, ...rest }: RhythmicFigureProps): JSX.Element {
    const image = RHYTHMIC_FIGURES[type].image;

    const classes = classNames({
        'rhythmic-figure': true,
        highlighted: isHighlighted,
        shining: isShining,
    });

    return (
        <div className={classes} {...rest}>
            <img src={image} alt={type} />
        </div>
    );
}

export default RhythmicFigure;
