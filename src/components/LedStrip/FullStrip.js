import React from 'react';
import Strip from './Strip';
import config from '../../config';

const FullStrip = ({ leds }) => {
  const leftLeds = leds.slice(0, config.ledsHorizontal);
  const rightDownLeds = leds.slice(
    config.ledsHorizontal,
    config.ledsHorizontal + config.ledsVertical
  );
  const rightToLeft = leds.slice(
    config.ledsHorizontal + config.ledsVertical,
    config.ledsHorizontal + config.ledsVertical + config.ledsHorizontal
  );
  const leftDown = leds.slice(
    config.ledsHorizontal + config.ledsVertical + config.ledsHorizontal,
    config.ledsHorizontal +
      config.ledsVertical +
      config.ledsHorizontal +
      config.ledsVertical
  );

  return (
    <>
      <Strip leds={leftLeds} direction="left" />
      <Strip
        leds={rightDownLeds.map((l) => {
          return { ...l, color: '#00AA00' };
        })}
        direction="right-down"
      />
      <Strip leds={rightToLeft} direction="right" />
      <Strip
        leds={leftDown.map((l) => {
          return { ...l, color: '#00AA00' };
        })}
        direction="left-down"
      />
    </>
  );
};

export default FullStrip;
