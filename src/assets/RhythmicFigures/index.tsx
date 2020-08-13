import crotchet from './Crotchet';
import quavers from './Quavers';

interface RhythmicFigureData {
    [index: string]: {
        image: string;
    };
}

export const RHYTHMIC_FIGURES: RhythmicFigureData = {
    crotchet: crotchet,
    quavers: quavers,
};

export const RHYTHMIC_FIGURE_NAMES: string[] = Object.keys(RHYTHMIC_FIGURES);
