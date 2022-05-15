import React from 'react';
import Strip from './Strip';

const Leds = ({ leds }) => {
  return (
    <div id="leds">
      <Strip leds={leds} direction="left" />
      <Strip
        leds={leds.slice(0, 2).map((l) => {
          return { ...l, color: '#00AA00' };
        })}
        direction="right-down"
      />
      <Strip leds={leds} direction="right" />
    </div>
  );
};

export default Leds;
