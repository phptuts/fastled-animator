import React, { useEffect, useState } from 'react';
import Leds from '../components/LedStrip/Leds';
import Player from '../components/Player';
import { generateFrames } from '../leds';
import LedsContext from '../context/ledContext';

const Home = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [numberLeds, setNumberLeds] = useState(250);
  const [totalSteps, setTotalSteps] = useState(60);
  const [timePerStep, setTimePerStep] = useState(1);
  const [frames, setFrames] = useState(
    generateFrames(numberLeds, totalSteps, timePerStep, [])
  );

  function setNumberOfLeds(e) {
    setNumberLeds(e.target.value);
  }

  useEffect(() => {
    setFrames((frames) => {
      return generateFrames(numberLeds, totalSteps, timePerStep, frames);
    });
  }, [numberLeds, totalSteps, timePerStep]);

  //   let frames = generateFrames(50, 3, 100, []);
  //   console.log(frames);
  //   frames[0].leds[1].color = '#AA00AA';
  //   frames[2].leds[1].color = '#BB00AA';
  //   frames[2].leds[0].color = '#BBCCAA';

  //   frames = generateFrames(25, 4, 3, frames);
  //   console.log(frames);

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
        if (next.position === 0) {
          console.log(next.selected, next, 'before');
        }
        if (position === next.position) {
          next.selected = selected;
        }
        if (next.position === 0) {
          console.log(next.selected, next, 'after');
        }
        acc.push({ ...next });
        return acc;
      }, []);

      return [...frames];
    });
  }

  return (
    <LedsContext.Provider value={{ frames, currentFrameIndex, selectLed }}>
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

      <Player
        frames={frames}
        currentFrame={currentFrameIndex}
        onMoveTo={setCurrentFrameIndex}
        onPlay={() => console.log('onPlay')}
        onStop={() => console.log('onStop')}
      ></Player>

      <div className="row">
        <div className="col">
          <Leds />
        </div>
      </div>
    </LedsContext.Provider>
  );
};

export default Home;
