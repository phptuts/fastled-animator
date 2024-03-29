import React, { useContext, useEffect } from 'react';
import { ACTION_TYPES } from '../context/editor/editorActions';
import EditorContext from '../context/editor/editorContext';
import ProjectShowContext from '../context/project-show/projectShowContext';

const Player = ({ editable }) => {
  const {
    dispatch,
    dispatchDebounce,
    state: { currentFrameIndex, frames, timePerStep, playing },
  } = useContext(editable ? EditorContext : ProjectShowContext);

  const onPlayerChange = (e) => {
    dispatchDebounce({
      type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
      payload: +e.target.value,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onBack = () => {
    if (currentFrameIndex > 0) {
      dispatch({
        type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
        payload: currentFrameIndex - 1,
      });
    } else {
      dispatch({
        type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
        payload: frames.length - 1,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onForward = () => {
    if (currentFrameIndex < frames.length - 1) {
      dispatch({
        type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
        payload: currentFrameIndex + 1,
      });
    } else {
      dispatch({
        type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
        payload: 0,
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
  useEffect(() => {
    return () => {
      dispatch({ type: ACTION_TYPES.STOP_SIMULATION });
    };
  }, [dispatch]);

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        onForward();
      }
      if (e.key === 'ArrowLeft') {
        onBack();
      }
    };

    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, [onForward, onBack]);

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
      <div className="row mt-2">
        <div className="col">
          <h4 className="text-center">Frame {currentFrameIndex + 1}</h4>
        </div>
      </div>
    </>
  );
};

export default Player;
