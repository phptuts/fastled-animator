import React from 'react';
import Led from './Led';

const Strip = ({ leds, direction }) => {
  return (
    <div className={`strip ${direction}`}>
      {leds.map((led) => {
        return <Led led={led} key={`led-${led.position}`} />;
      })}
    </div>
  );
};

export default Strip;
