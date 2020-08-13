import React from 'react';
import classNames from 'classnames';

import './styles.css';

import { RHYTHMIC_FIGURES } from '../../assets/RhythmicFigures';

interface RhythmicFigureProps {
    type: string;
    isHighlighted?: boolean;
}

function RhythmicFigure(props: RhythmicFigureProps): JSX.Element {
    const image = RHYTHMIC_FIGURES[props.type].image;

    const classes = classNames({
        'rhythmic-figure': true,
        highlighted: props.isHighlighted,
    });

    return (
        <div className={classes}>
            <img src={image} alt={`$(this.type)`} />
        </div>
    );
}

export default RhythmicFigure;
