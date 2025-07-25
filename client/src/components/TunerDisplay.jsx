import React from "react";

const TunerDisplay = ({ note, frequency }) => {
  if (!note || !frequency) return <p>Listening...</p>;
  return (
    <div>
      <h2>Note: {note}</h2>
      <h3>Frequency: {frequency.toFixed(2)} Hz</h3>
    </div>
  );
};

export default TunerDisplay;
