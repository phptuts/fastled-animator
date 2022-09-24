import React, { useContext } from 'react';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const LedTool = () => {
  const {
    dispatch,
    state: { numberLeds, totalSteps, timePerStep },
  } = useContext(LedsContext);

  return (
    <>
      <div className="row mb-3">
        <div className="col-md-4 col-sm-12">
          <label htmlFor="number-of-leds" className="form-label">
            LEDs {numberLeds}
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
              dispatch({
                type: ACTION_TYPES.CHANGE_NUMBER_LEDS,
                payload: e.target.value,
              });
            }}
          />
        </div>

        <div className="col-md-4 col-sm-12">
          <label htmlFor="numSteps" className="form-label">
            Number of frames
          </label>
          <input
            type="number"
            className="form-control"
            id="numSteps"
            placeholder="Number of steps"
            value={totalSteps}
            onChange={(e) =>
              dispatch({
                type: ACTION_TYPES.CHANGE_TOTAL_STEPS,
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-4 col-sm-12">
          <label htmlFor="seconds-per-step" className="form-label">
            Seconds per frame
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
