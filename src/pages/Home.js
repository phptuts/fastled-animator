import React, { useEffect, useState } from 'react';
import Leds from '../components/LedStrip/Leds';
import Player from '../components/Player';
import { generateFrames } from '../leds';
import LedsContext from '../context/ledContext';

const Home = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [numberLeds, setNumberLeds] = useState(250);
  const [totalSteps, setTotalSteps] = useState(5);
  const [timePerStep, setTimePerStep] = useState(1);
  const [frames, setFrames] = useState(
    generateFrames(numberLeds, totalSteps, [])
  );

  function setNumberOfLeds(e) {
    setNumberLeds(e.target.value);
  }

  useEffect(() => {
    setFrames((frames) => {
      return generateFrames(numberLeds, totalSteps, frames);
    });
  }, [numberLeds, totalSteps]);

  function onChangeColor(e) {
    setFrames((frames) => {
      const { leds } = frames[currentFrameIndex];

      frames[currentFrameIndex].leds = leds.reduce((acc, next) => {
        if (next.selected) {
          next.color = e.target.value;
        }
        acc.push({ ...next });
        return acc;
      }, []);

      return [...frames];
    });
  }

  function selectLed(position, selected) {
    setFrames((frames) => {
      const { leds } = frames[currentFrameIndex];

      frames[currentFrameIndex].leds = leds.reduce((acc, next) => {
        if (position === next.position) {
          next.selected = selected;
        }

        acc.push({ ...next });
        return acc;
      }, []);

      return [...frames];
    });
  }

  return (
    <LedsContext.Provider
      value={{ frames, currentFrameIndex, setCurrentFrameIndex, selectLed }}
    >
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
            onChange={setNumberOfLeds}
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
            onChange={onChangeColor}
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
            onChange={(e) => setTotalSteps(+e.target.value)}
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
            onChange={(e) => setTimePerStep(+e.target.value)}
          />
        </div>
      </div>

      <Player frames={frames} currentFrame={currentFrameIndex}></Player>

      <div className="row">
        <div className="col">
          <Leds />
        </div>
      </div>
    </LedsContext.Provider>
  );
};

export default Home;
