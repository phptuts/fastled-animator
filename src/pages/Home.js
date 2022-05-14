import React, { useState } from 'react';
import Leds from '../components/Leds';
import Player from '../components/Player';
import { generateLeds } from '../leds';
const Home = () => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);
  const [numberLeds, setNumberLeds] = useState(30);
  const [leds, setLeds] = useState(generateLeds(numberLeds));
  const [width, setWidth] = useState(50);

  function setNumberOfLeds(e) {
    console.log(e.target);
    setNumberLeds(e.target.value);
    setLeds(generateLeds(+e.target.value));
    setWidth((1200 - 2 * +e.target.value) / +e.target.value);
    console.log((1200 - 2 * +e.target.value) / +e.target.value);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Home Page {numberLeds}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="color" name="" id="" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Leds leds={leds} width={width} />
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
    </>
  );
};

export default Home;
