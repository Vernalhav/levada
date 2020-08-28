// NOTE: DON'T ALTER THIS FILE DIRECTLY! SEE /image-generators/README.md!!!
import crotchet from './Crotchet';
import quavers from './Quavers';
import semiquavers from './Semiquavers';
import restSixtSixt from './RestSixtSixt';
import sixtEightSixt from './SixtEightSixt';
import sixtSixtEight from './SixtSixtEight';
import triplets from './Triplets';
import triplets1Rest from './Triplets1Rest';
import triplets2Rest from './Triplets2Rest';
import triplets3Rest from './Triplets3Rest';
import restEight from './RestEight';
import eightRest from './EightRest';
import rest from './Rest';
import eightDotSixt from './EightDotSixt';

interface RhythmElementData {
    type: string; // 'note' or 'rest'
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
    restSixtSixt: restSixtSixt,
    sixtEightSixt: sixtEightSixt,
    sixtSixtEight: sixtSixtEight,
    triplets: triplets,
    triplets1Rest: triplets1Rest,
    triplets2Rest: triplets2Rest,
    triplets3Rest: triplets3Rest,
    restEight: restEight,
    eightRest: eightRest,
    rest: rest,
    eightDotSixt: eightDotSixt,
};

export const RHYTHMIC_FIGURE_NAMES: string[] = Object.keys(RHYTHMIC_FIGURES);
