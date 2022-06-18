import React, { useContext } from 'react';
import ledsContext from '../context/ledContext';

const Player = () => {
  const { frames, currentFrameIndex, setCurrentFrameIndex } =
    useContext(ledsContext);

  console.log(frames);
  const playerChange = (e) => {
    setCurrentFrameIndex(e.target.value);
  };

  const back = () => {
    setCurrentFrameIndex((index) => {
      if (index === 0) {
        return 0;
      }

      return index - 1;
    });
  };

  const forward = () => {
    setCurrentFrameIndex((index) => {
      if (index >= frames.length - 1) {
        return frames.length - 1;
      }

      return index + 1;
    });
  };

  return (
    <>
      <div className="row player mt-5">
        <div className="col">
          <input
            type="range"
            min={0}
            max={frames.length - 1}
            value={currentFrameIndex}
            onChange={playerChange}
          />
        </div>
      </div>
      <div className="controls row">
        <div className="col">
          <button onClick={back} className="btn">
            Back
          </button>
          <button className="btn">Play / Stop</button>
          <button onClick={forward} className="btn">
            Forward
          </button>
        </div>
      </div>
    </>
  );
};

export default Player;
