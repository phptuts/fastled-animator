import React, { useState } from 'react';
import Leds from '../components/Leds';
import Player from '../components/Player';
const Home = () => {
  const [currentFrame, setCurrentFrame] = useState(1);

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Home Page {currentFrame}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input type="color" name="" id="" />
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
            currentFrame={currentFrame}
            onMoveTo={setCurrentFrame}
            onPlay={() => console.log('onPlay')}
            onStop={() => console.log('onStop')}
          ></Player>
        </div>
      </div>
    </>
  );
};

export default Home;
