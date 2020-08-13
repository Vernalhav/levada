import beatSound from '../assets/sounds/beat.wav';
import snapSound from '../assets/sounds/snap.wav';

const beat = new Audio(beatSound);
const snap = new Audio(snapSound);

export async function playBeat(rhythmicFigure: string): Promise<number> {
    return new Promise((resolve) => {
        resolve(1);
    });
}
