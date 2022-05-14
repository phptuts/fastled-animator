import React from 'react';

const Player = ({ frames, currentFrame, onStop, onPlay, onMoveTo }) => {
  const playerChange = (e) => {
    onMoveTo(e.target.value);
  };

  return (
    <div>
      <input
        type="range"
        min={0}
        max={frames.length - 1}
        value={currentFrame}
        onChange={playerChange}
      />
      <button>Play</button>
      <button>Stop</button>
    </div>
  );
};

export default Player;
