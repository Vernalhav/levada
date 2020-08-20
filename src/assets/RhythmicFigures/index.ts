import crotchet from './Crotchet';
import quavers from './Quavers';
import semiquavers from './Semiquavers';
import sixtSixtEigth from './SixtSixtEigth';
import restSixtSixt from './RestSixtSixt';
import triplets from './Triplets';
import sixtEightSixt from './SixtEightSixt';
import triplets1Rest from './Triplets1Rest';
import triplets3Rest from './Triplets3Rest';
import triplets2Rest from './Triplets2Rest';

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
    sixtEightSixt: sixtEightSixt,
    triplets1Rest: triplets1Rest,
    triplets3Rest: triplets3Rest,
    triplets2Rest: triplets2Rest,
};

export const RHYTHMIC_FIGURE_NAMES: string[] = Object.keys(RHYTHMIC_FIGURES);
