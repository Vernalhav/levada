import beatSound from '../assets/sounds/beat.wav';
import snapSound from '../assets/sounds/snap.wav';

import sleep from './sleep';

import { RHYTHMIC_FIGURES } from '../assets/RhythmicFigures';

export const beat = new Audio(beatSound);
const snap = new Audio(snapSound);

let isCancelled = true;

export function cancelPlayBeat(val: boolean): void {
    isCancelled = val;
}

export function getBeatSound(tempo = 100): HTMLAudioElement {
    beat.playbackRate = tempo >= 60 ? tempo / 20 : 1;
    return beat;
}

/**
 *
 * @param rhythmicFigure name of the rhythmic figure as per RHYTHMIC_FIGURE keys (see assets/RhythmicFigures/index.ts)
 * @param tempo amount of beats per minute
 * @param beatUnit note value of a beat. (i.e. 4 in 3/4 time)
 */
export default async function playBeat(
    rhythmicFigure: string,
    tempo: number,
    isMuted = false,
    beatUnit = 4,
): Promise<void> {
    //console.log(`Playing ${rhythmicFigure}...`);
    const rhythm = RHYTHMIC_FIGURES[rhythmicFigure].rhythm;

    // Heuristic so that the audio doesn't get overlaid on faster BPMs
    beat.playbackRate = tempo >= 60 ? tempo / 20 : 1;
    snap.playbackRate = tempo >= 60 ? tempo / 20 : 1;

    for (let i = 0; i < rhythm.length; i++) {
        if (isCancelled) return;

        const rhythmElement = rhythm[i];

        const beatFraction = rhythmElement.duration * beatUnit;
        const elementLength = 60000 * (beatFraction / tempo);

        if (i === 0) beat.play();
        if (rhythmElement.type === 'note' && !isMuted) snap.play();

        await sleep(elementLength);
    }
}
