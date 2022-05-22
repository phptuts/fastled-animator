import React, { useState } from 'react';
import Leds from '../components/LedStrip/Leds';
import Player from '../components/Player';
import { generateLeds } from '../leds';
import LedsContext from '../context/ledContext';

const Home = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);
  const [numberLeds, setNumberLeds] = useState(250);
  const [leds, setLeds] = useState(generateLeds(numberLeds));

  function setNumberOfLeds(e) {
    setNumberLeds(e.target.value);
    setLeds(generateLeds(+e.target.value));
  }

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
          <h1>Home Page {numberLeds}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="color" onChange={onChangeColor} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Leds />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Player
            frames={[1, 3, 4]}
            currentFrame={currentFrameIndex}
            onMoveTo={setCurrentFrameIndex}
            onPlay={() => console.log('onPlay')}
            onStop={() => console.log('onStop')}
          ></Player>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="mb-3">
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
        </div>
      </div>
    </LedsContext.Provider>
  );
};

export default Home;
