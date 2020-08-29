/// <reference types="react-scripts" />

declare module '*.wav' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

interface Window {
    webkitAudioContext: typeof AudioContext;
}
