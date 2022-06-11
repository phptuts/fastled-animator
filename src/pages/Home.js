import React, { useState } from 'react';
import Leds from '../components/LedStrip/Leds';
import Player from '../components/Player';
import { generateLeds, generateFrames } from '../leds';
import LedsContext from '../context/ledContext';

const Home = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);
  const [numberLeds, setNumberLeds] = useState(250);
  const [totalSteps, setTotalSteps] = useState(60);
  const [timePerStep, setTimePerStep] = useState(1);
  const [leds, setLeds] = useState(generateLeds(numberLeds));

  function setNumberOfLeds(e) {
    setNumberLeds(e.target.value);
    setLeds(generateLeds(+e.target.value));
  }

  let frames = generateFrames(50, 3, 100, []);
  console.log(frames);
  frames[0].leds[1].color = '#AA00AA';
  frames[2].leds[1].color = '#BB00AA';
  frames[2].leds[0].color = '#BBCCAA';

  frames = generateFrames(25, 4, 3, frames);
  console.log(frames);

  function onChangeColor(e) {
    setLeds(
      leds.map((l) => {
        if (l.selected) {
          return { ...l, color: e.target.value };
        }
        return l;
      })
    );
  }

  function selectLed(led) {
    const newLeds = [
      ...leds.filter((l) => l.position !== led.position),
      { ...led, selected: !led.selected },
    ];

    newLeds.sort((a, b) => a.position - b.position);
    setLeds(newLeds);
  }

  return (
    <LedsContext.Provider value={{ leds, selectLed }}>
      <div className="row">
        <div className="col">
          <h1>Home Page</h1>
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
        frames={[1, 3, 4]}
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
