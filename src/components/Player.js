import React from 'react';

const Player = ({ frames, currentFrame, onStop, onPlay, onMoveTo }) => {
  const playerChange = (e) => {
    onMoveTo(e.target.value);
  };

  return (
    <>
      <div className="row player mt-5">
        <div className="col">
          <input
            type="range"
            min={0}
            max={frames.length - 1}
            value={currentFrame}
            onChange={playerChange}
          />
        </div>
      </div>
      <div className="controls row">
        <div className="col">
          <button className="btn">Back</button>
          <button className="btn">Play / Stop</button>
          <button className="btn">Forward</button>
        </div>
      </div>
    </>
  );
};

export default Player;
