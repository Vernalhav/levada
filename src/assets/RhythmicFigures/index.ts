import crotchet from './Crotchet';
import quavers from './Quavers';
import semiquavers from './Semiquavers';
import sixtSixtEigth from './SixtSixtEigth';
import restSixtSixt from './RestSixtSixt';
import triplets from './Triplets';

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
    sixtSixtEigth: sixtSixtEigth,
    restSixtSixt: restSixtSixt,
    triplets: triplets,
};

export const RHYTHMIC_FIGURE_NAMES: string[] = Object.keys(RHYTHMIC_FIGURES);
