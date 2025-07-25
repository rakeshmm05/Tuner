import React, { useEffect, useState } from "react";
import { getNoteFromFrequency } from "./utils/pitchUtils";
import TunerDisplay from "./components/TunerDisplay";
import {detectPitch} from "pitchy";
// client/src/App.jsx

function App() {
  const [frequency, setFrequency] = useState(null);
  const [note, setNote] = useState('');
  const [clarity, setClarity] = useState(null);

  useEffect(() => {
    const startTuner = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const processor = context.createScriptProcessor(2048, 1, 1);

      source.connect(processor);
      processor.connect(context.destination);

      processor.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        const [detectedFreq, detectedClarity] = Pitchy.detectPitch(input, context.sampleRate);

        if (detectedClarity > 0.95) {
          setFrequency(detectedFreq.toFixed(2));
          setClarity(detectedClarity.toFixed(2));
        }
      };
    };

    startTuner();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎵 Ukulele Tuner</h1>
      <p><strong>Frequency:</strong> {frequency ? `${frequency} Hz` : 'Detecting...'}</p>
      <p><strong>Clarity:</strong> {clarity}</p>
    </div>
  );
}

export default App;
