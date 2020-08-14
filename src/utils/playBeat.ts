import beatSound from '../assets/sounds/beat.wav';
import snapSound from '../assets/sounds/snap.wav';

import sleep from './sleep';

import { RHYTHMIC_FIGURES } from '../assets/RhythmicFigures';

const beat = new Audio(beatSound);
const snap = new Audio(snapSound);

export default async function playBeat(rhythmicFigure: string, bpm: number): Promise<number> {
    console.log(rhythmicFigure);

    return 1;
}
