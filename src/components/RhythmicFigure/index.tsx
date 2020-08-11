import React from 'react';

import quaversImage from '../../assets/images/rhythms/quavers.png';
import crotchetImage from '../../assets/images/rhythms/crotchet.png';

import './styles.css';

interface RhythmicFigureProps {
    type: string;
}

interface RhythmicFigureData {
    [index: string]: {
        image: string;
    };
}

const RHYTHMIC_FIGURES: RhythmicFigureData = {
    crotchet: {
        image: crotchetImage,
    },
    quavers: {
        image: quaversImage,
    },
};

class RhythmicFigure extends React.Component<RhythmicFigureProps> {
    image: string;
    type: string;

    constructor(props: RhythmicFigureProps) {
        super(props);

        this.type = RHYTHMIC_FIGURES.hasOwnProperty(props.type) ? props.type : 'crotchet';

        this.image = RHYTHMIC_FIGURES[this.type].image;
    }

    render(): JSX.Element {
        return (
            <div className="rhythmic-figure">
                <img src={this.image} alt={`$(this.type)`} />
            </div>
        );
    }
}

export default RhythmicFigure;
