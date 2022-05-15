import React from 'react';
import Led from './Led';

const Strip = ({ leds, direction }) => {
  return (
    <div className={`strip ${direction}`}>
      {leds.map((led) => {
        return (
          <Led position={led.position} key={led.position} color={led.color} />
        );
      })}
    </div>
  );
};

export default Strip;
