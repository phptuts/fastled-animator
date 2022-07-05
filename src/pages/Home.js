import React, { useContext } from 'react';
import Leds from '../components/LedStrip/Leds';
import Player from '../components/Player';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const Home = () => {
  const {
    dispatch,
    state: { currentFrameIndex, numberLeds, totalSteps, timePerStep },
  } = useContext(LedsContext);

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Home Page {currentFrameIndex}</h1>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="number-of-leds" className="form-label">
            Number of Leds
          </label>
          <input
            type="number"
            className="form-control"
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
        <div className="col-6">
          <label htmlFor="color-picker" className=" col-form-label">
            Select Led Color
          </label>

          <input
            type="color"
            className="form-control"
            id="color-picker"
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.CHANGE_SELECTED_COLOR_LEDS,
                payload: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="numSteps" className="form-label">
            Number of Steps
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
        <div className="col-6">
          <label htmlFor="seconds-per-step" className="form-label">
            Milliseconds per Step
          </label>
          <input
            type="number"
            className="form-control"
            id="seconds-per-step"
            step="1"
            placeholder="Milliseconds per step"
            value={timePerStep}
            onChange={(e) =>
              dispatch({
                type: ACTION_TYPES.CHANGE,
                payload: e.target.value,
              })
            }
          />
        </div>
      </div>

      <Player />

      <div className="row">
        <div className="col">
          <Leds />
        </div>
      </div>
    </>
  );
};

export default Home;
