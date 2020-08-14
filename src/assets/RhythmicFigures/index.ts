import crotchet from './Crotchet';
import quavers from './Quavers';
import semiquavers from './Semiquavers';

interface RhythmElementData {
    type: string; // 'note' or 'pause'
    duration: number; // fraction of the semibreve (i.e. 1/4 for crotchets)
}

interface RhythmicFigureData {
    [index: string]: {
        image: string;
        rhythm: RhythmElementData[];
    };
}

export const RHYTHMIC_FIGURES: RhythmicFigureData = {
    crotchet: crotchet,
    quavers: quavers,
    semiquavers: semiquavers,
};

export const RHYTHMIC_FIGURE_NAMES: string[] = Object.keys(RHYTHMIC_FIGURES);
