import React from 'react';
import classNames from 'classnames';

import quaversImage from '../../assets/images/rhythms/quavers.png';
import crotchetImage from '../../assets/images/rhythms/crotchet.png';

import './styles.css';

interface RhythmicFigureProps {
    type: string;
    isHighlighted?: boolean;
}

interface RhythmicFigureData {
    [index: string]: {
        image: string;
    };
}

export const RHYTHMIC_FIGURE_NAMES: string[] = ['crotchet', 'quavers'];

const RHYTHMIC_FIGURES: RhythmicFigureData = {
    crotchet: {
        image: crotchetImage,
    },
    quavers: {
        image: quaversImage,
    },
};

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
