const noteFreqs = [
  { note: "G4", freq: 392 },
  { note: "C4", freq: 261.63 },
  { note: "E4", freq: 329.63 },
  { note: "A4", freq: 440 },
];

export const getNoteFromFrequency = (freq) => {
  let closest = noteFreqs[0];
  let minDiff = Math.abs(freq - closest.freq);
  for (let i = 1; i < noteFreqs.length; i++) {
    let diff = Math.abs(freq - noteFreqs[i].freq);
    if (diff < minDiff) {
      minDiff = diff;
      closest = noteFreqs[i];
    }
  }
  return closest.note;
};