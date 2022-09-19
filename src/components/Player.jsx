import React, { useContext, useEffect } from 'react';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const Player = () => {
  const {
    dispatch,
    state: { currentFrameIndex, frames, timePerStep, playing },
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

  const togglePlaying = () => {
    if (playing) {
      dispatch({ type: ACTION_TYPES.STOP_SIMULATION });
      return;
    }

    if (currentFrameIndex + 1 >= frames.length) {
      dispatch({
        type: ACTION_TYPES.RUN_SIMULATION,
        payload: 0,
      });
    } else {
      dispatch({
        type: ACTION_TYPES.RUN_SIMULATION,
        payload: currentFrameIndex,
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playing) {
        if (currentFrameIndex + 1 >= frames.length) {
          dispatch({
            type: ACTION_TYPES.RUN_SIMULATION,
            payload: 0,
          });
        } else {
          dispatch({
            type: ACTION_TYPES.RUN_SIMULATION,
            payload: currentFrameIndex + 1,
          });
        }
      } else {
        clearInterval(intervalId);
      }
    }, timePerStep * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [playing, timePerStep, dispatch, frames, currentFrameIndex]);

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
          <button className="btn" onClick={togglePlaying}>
            {playing ? 'Stop' : 'Play'}
          </button>
          <button onClick={onForward} className="btn">
            Forward
          </button>
        </div>
      </div>
    </>
  );
};

export default Player;
