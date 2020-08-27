import beatSound from '../assets/sounds/beat.wav';
import snapSound from '../assets/sounds/snap.wav';

import sleep from './sleep';

import { RHYTHMIC_FIGURES } from '../assets/RhythmicFigures';

export const beat = new Audio(beatSound);
const snap = new Audio(snapSound);

let isCancelled = true;
const MIN_PLAYBACK_RATE = 2;
const MAX_PLAYBACK_RATE = 4;

export function cancelPlayBeat(val: boolean): void {
    isCancelled = val;
}

/**
 * Return x if x is in range [a, b] or the
 * closest interval extreme if it isn't
 * @param a Lower bound
 * @param x Clamped element
 * @param b Upper bound
 */
function clamp(a: number, x: number, b: number): number {
    return Math.min(Math.max(x, a), b);
}

export function getBeatSound(tempo = 100): HTMLAudioElement {
    beat.playbackRate = clamp(MIN_PLAYBACK_RATE, tempo / 20, MAX_PLAYBACK_RATE);
    return beat;
}

/**
 *
 * @param rhythmicFigure name of the rhythmic figure as per RHYTHMIC_FIGURE keys (see assets/RhythmicFigures/index.ts)
 * @param tempo amount of beats per minute
 * @param isMuted whether to play the snaps or only the beats
 * @param beatUnit note value of a beat. (i.e. 4 in 3/4 time)
 */
export default async function playBeat(
    rhythmicFigure: string,
    tempo: number,
    isMuted = false,
    beatUnit = 4,
): Promise<void> {
    const rhythm = RHYTHMIC_FIGURES[rhythmicFigure].rhythm;

    // Heuristic so that the audio doesn't get overlapped on faster BPMs
    beat.playbackRate = clamp(MIN_PLAYBACK_RATE, tempo / 20, MAX_PLAYBACK_RATE);
    snap.playbackRate = clamp(MIN_PLAYBACK_RATE, tempo / 20, MAX_PLAYBACK_RATE);

    beat.currentTime = 0;
    beat.play();
    for (let i = 0; i < rhythm.length; i++) {
        if (isCancelled) return;

        const rhythmElement = rhythm[i];

        const beatFraction = rhythmElement.duration * beatUnit;
        const elementLength = 60000 * (beatFraction / tempo);

        if (rhythmElement.type === 'note' && !isMuted) {
            snap.currentTime = 0;
            snap.play();
        }

        await sleep(elementLength);
    }
}
