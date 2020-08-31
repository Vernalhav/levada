import { AudioContext, IAudioBufferSourceNode, IAudioContext } from 'standardized-audio-context';

import beatSound from '../assets/sounds/beat.wav';
import snapSound from '../assets/sounds/snap.wav';

import { RHYTHMIC_FIGURES } from '../assets/RhythmicFigures';

import clamp from './clamp';

const audioContext = new AudioContext();

type soundBuffers = { [name: string]: AudioBuffer };
const sounds = {} as soundBuffers;
initializeAudioBuffers();

const MIN_PLAYBACK_RATE = 2.5;
const MAX_PLAYBACK_RATE = 2.5;

// Contains an array with all source nodes played in the current beat.
let currentBeatSources: Array<IAudioBufferSourceNode<IAudioContext>> = []; // Used to cancel the current beat

async function initializeAudioBuffers(): Promise<void> {
    sounds['beat'] = await getAudioBuffer(beatSound);
    sounds['snap'] = await getAudioBuffer(snapSound);
}

async function getAudioBuffer(audio: string): Promise<AudioBuffer> {
    const response = await fetch(audio);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

export function cancelPlayBeat(): void {
    currentBeatSources.forEach((source) => {
        source.stop();
    });
}

/**
 * Plays audio buffer
 * @param audioName string representing which buffer to play (for now it's only beat or snap)
 * @param time time to play the audio according to audioContext's time coordinates
 * @param playbackRate speed at which to play the audio (keep lower than 4 for browser compatibility)
 */
function playAudio(audioName: string, time: number, playbackRate = 1): void {
    const source = audioContext.createBufferSource();
    source.buffer = sounds[audioName];
    source.playbackRate.value = playbackRate;

    source.connect(audioContext.destination);
    source.start(time);
    currentBeatSources.push(source);
}

/**
 *
 * @param rhythmicFigure name of the rhythmic figure as per RHYTHMIC_FIGURE keys (see assets/RhythmicFigures/index.ts)
 * @param tempo amount of beats per minute
 * @param beatUnit note value of a beat. (i.e. 4 in 3/4 time)
 */
export default async function playBeat(rhythmicFigure: string, tempo: number, beatUnit = 4): Promise<void> {
    currentBeatSources = [];
    const rhythm = RHYTHMIC_FIGURES[rhythmicFigure].rhythm;

    const playbackRate = clamp(MIN_PLAYBACK_RATE, tempo / 40, MAX_PLAYBACK_RATE);

    let currentElementTime = audioContext.currentTime + 0.1;
    playAudio('beat', currentElementTime - 0.01, playbackRate); // Not an ideal solution

    for (let i = 0; i < rhythm.length; i++) {
        const rhythmElement = rhythm[i];

        const beatFraction = rhythmElement.duration * beatUnit;
        const elementLength = 60 * (beatFraction / tempo);

        if (rhythmElement.type === 'note') {
            playAudio('snap', currentElementTime, playbackRate);
        }

        currentElementTime += elementLength;
    }
}
