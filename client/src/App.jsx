// client/src/App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { autoCorrelate } from './utils/pitchDetection';
import TunerDisplay from './components/TunerDisplay';

export default function App() {
  const [isListening, setIsListening] = useState(false);
  const [frequency, setFrequency] = useState(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    if (!isListening) return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      const buffer = new Float32Array(analyserRef.current.fftSize);
      source.connect(analyserRef.current);

      const updatePitch = () => {
        analyserRef.current.getFloatTimeDomainData(buffer);
        const detectedPitch = autoCorrelate(buffer, audioContextRef.current.sampleRate);
        setFrequency(detectedPitch);
        requestAnimationFrame(updatePitch);
      };

      updatePitch();
    });
  }, [isListening]);

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>🎸 Ukulele Tuner</h1>
      <button onClick={() => setIsListening(true)}>Start Tuning</button>
      <TunerDisplay frequency={frequency} />
    </div>
  );
}
