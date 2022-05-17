import React from 'react';
import Strip from './Strip';
import config from '../../config';

const Leds = ({ leds }) => {
  return (
    <div id="leds">
      <Strip leds={leds} direction="left" />
      <Strip
        leds={leds.slice(0, 3).map((l) => {
          return { ...l, color: '#00AA00' };
        })}
        direction="right-down"
      />
      <Strip leds={leds} direction="right" />
      <Strip
        leds={leds.slice(0, 3).map((l) => {
          return { ...l, color: '#00AA00' };
        })}
        direction="left-down"
      />
      <Strip leds={leds} direction="left" />
      <Strip
        leds={leds.slice(0, 3).map((l) => {
          return { ...l, color: '#00AA00' };
        })}
        direction="right-down"
      />
      <Strip leds={leds} direction="right" />
    </div>
  );
};

export default Leds;
