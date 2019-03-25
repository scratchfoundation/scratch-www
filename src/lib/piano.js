const tone = require('tone');

tone.Master.volume.value = -25;

const synthPiano = new tone.MonoSynth({
    oscillator: {
        type: 'square'
    },
    filter: {
        Q: 2,
        type: 'lowpass',
        rolloff: -12
    },
    envelope: {
        attack: 0.005,
        decay: 3,
        sustain: 0,
        release: 0.45
    },
    filterEnvelope: {
        attack: 0.5,
        decay: 0.32,
        sustain: 0.9,
        release: 3,
        baseFrequency: 700,
        octaves: 2.3
    }
}).toMaster();

const synthSaw = new tone.Synth({
    oscillator: {
        type: 'fatsawtooth',
        count: 3,
        spread: 30
    },
    envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.5,
        release: 0.4,
        attackCurve: 'exponential'
    }
}).toMaster();

const synthWah = new tone.MonoSynth({
    oscillator: {
        type: 'pwm',
        modulationFrequency: 1
    },
    filter: {
        Q: 6,
        rolloff: -24
    },
    envelope: {
        attack: 0.025,
        decay: 0.3,
        sustain: 0.9,
        release: 2
    },
    filterEnvelope: {
        attack: 0.245,
        decay: 0.131,
        sustain: 0.5,
        release: 2,
        baseFrequency: 20,
        octaves: 7.2,
        exponent: 2
    }
}).toMaster();

const piano = (noteNumber, instrument) => {
    const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

    if (instrument === 0) {
        synthPiano.triggerAttackRelease(notes[noteNumber % 8], '16n');
    } else if (instrument === 1) {
        synthSaw.triggerAttackRelease(notes[noteNumber % 8], '8n');
    } else if (instrument === 2) {
        synthWah.triggerAttackRelease(notes[noteNumber % 8], '4n');
    }
};

module.exports = piano;
