import crotchet from './Crotchet';
import quavers from './Quavers';

interface RhythmElementData {
    type: string; // 'note' or 'pause'
    duration: number; // fraction of the beat (i.e. 1/4 for crotchets)
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
};

export const RHYTHMIC_FIGURE_NAMES: string[] = Object.keys(RHYTHMIC_FIGURES);
