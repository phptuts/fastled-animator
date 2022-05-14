import React from 'react';
import Led from './Led';
import './Leds.css';

const Leds = ({ leds, width }) => {
  return (
    <div id="leds">
      {leds.map((led) => {
        return (
          <Led
            position={led.position}
            key={led.position}
            color={led.color}
            height={50}
            width={width}
          />
        );
      })}
    </div>
  );
};

export default Leds;
