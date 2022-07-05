import React, { useContext } from 'react';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const Player = () => {
  const {
    dispatch,
    state: { currentFrameIndex, frames },
  } = useContext(LedsContext);

  const onPlayerChange = (e) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
      payload: +e.target.value,
    });
  };

  const onBack = () => {
    if (currentFrameIndex > 0) {
      dispatch({
        type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
        payload: currentFrameIndex - 1,
      });
    }
  };

  const onForward = () => {
    if (currentFrameIndex < frames.length - 1) {
      dispatch({
        type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
        payload: currentFrameIndex + 1,
      });
    }
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
            onChange={onPlayerChange}
          />
        </div>
      </div>
      <div className="controls row">
        <div className="col">
          <button onClick={onBack} className="btn">
            Back
          </button>
          <button className="btn">Play / Stop</button>
          <button onClick={onForward} className="btn">
            Forward
          </button>
        </div>
      </div>
    </>
  );
};

export default Player;
