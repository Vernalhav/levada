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
export default async function playBeat(rhythmicFigure: string, tempo: number, beatUnit = 4): Promise<void> {
    console.log(`Playing ${rhythmicFigure}...`);
    const rhythm = RHYTHMIC_FIGURES[rhythmicFigure].rhythm;

    // beat.play();
    for (let i = 0; i < rhythm.length; i++) {
        const rhythmElement = rhythm[i];

        const beatFraction = rhythmElement.duration * beatUnit;
        const elementLength = 60000 * (beatFraction / tempo);

        console.log(`beat frac: ${beatFraction}\nelement length: ${elementLength}`);

        if (i === 0) beat.play();
        if (rhythmElement.type === 'note') snap.play();

        await sleep(elementLength);
    }
}

/**
 * 80 BPM: 4/4
 * 1/8: takes 1/2 of the beat
 * beat takes 6000/tempo ms
 * play or pause until
 */
