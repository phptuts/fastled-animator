import React, { useContext } from 'react';
import { ACTION_TYPES } from '../context/editor/editorActions';
import EditorContext from '../context/editor/editorContext';

const LedTool = () => {
  const {
    dispatch,
    dispatchDebounce,
    state: { numberLeds, totalSteps, timePerStep },
  } = useContext(EditorContext);

  return (
    <>
      <div className="row mb-3">
        <div className="col-md-4 col-sm-12">
          <label htmlFor="number-of-leds" className="form-label">
            {numberLeds} LEDs
          </label>
          <input
            type="range"
            className="form-range"
            min={1}
            max={250}
            id="number-of-leds"
            placeholder="Number of leds"
            value={numberLeds}
            onChange={(e) => {
              dispatchDebounce({
                type: ACTION_TYPES.CHANGE_NUMBER_LEDS,
                payload: +e.target.value,
              });
            }}
          />
        </div>

        <div className="col-md-4 col-sm-12">
          <label htmlFor="numSteps" className="form-label">
            {totalSteps} frames
          </label>
          <input
            type="range"
            className="form-range"
            id="numSteps"
            step="1"
            min="1"
            max="500"
            placeholder="Number of steps"
            value={totalSteps}
            onChange={(e) =>
              dispatchDebounce({
                type: ACTION_TYPES.CHANGE_TOTAL_STEPS,
                payload: +e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-4 col-sm-12">
          <label htmlFor="seconds-per-step" className="form-label">
            {timePerStep} seconds per frame
          </label>
          <input
            type="number"
            className="form-control"
            id="seconds-per-step"
            step=".01"
            placeholder="Milliseconds per step"
            value={timePerStep}
            onChange={(e) =>
              dispatch({
                type: ACTION_TYPES.CHANGE_TIME_PER_STEP,
                payload: e.target.value,
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default LedTool;
