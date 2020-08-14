import beatSound from '../assets/sounds/beat.wav';
import snapSound from '../assets/sounds/snap.wav';

import sleep from './sleep';

import { RHYTHMIC_FIGURES } from '../assets/RhythmicFigures';

const beat = new Audio(beatSound);
const snap = new Audio(snapSound);

/**
 *
 * @param rhythmicFigure name of the rhythmic figure as per RHYTHMIC_FIGURE keys (see assets/RhythmicFigures/index.ts)
 * @param tempo amount of beats per minute
 * @param beatUnit note value of a beat. (i.e. 4 in 3/4 time)
 */
export default async function playBeat(rhythmicFigure: string, tempo: number, beatUnit?: number): Promise<void> {
    console.log(`Playing ${rhythmicFigure}...`);
}
