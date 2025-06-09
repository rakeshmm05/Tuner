// client/src/components/TunerDisplay.jsx
import React from 'react';

const ukuleleNotes = [
  { note: 'G4', freq: 392.00 },
  { note: 'C4', freq: 261.63 },
  { note: 'E4', freq: 329.63 },
  { note: 'A4', freq: 440.00 },
];

function getClosestNote(freq) {
  if (!freq) return null;
  return ukuleleNotes.reduce((prev, curr) =>
    Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev
  );
}

export default function TunerDisplay({ frequency }) {
  const closest = getClosestNote(frequency);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Detected Frequency: {frequency ? frequency.toFixed(2) + ' Hz' : 'Waiting...'}</h2>
      <h3>
        Closest Note:{' '}
        {closest ? `${closest.note} (${closest.freq.toFixed(2)} Hz)` : 'Detecting...'}
      </h3>
    </div>
  );
}
