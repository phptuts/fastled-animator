import React, { useContext } from 'react';
import LedsContext from '../../context/led/ledContext';
import Strip from './Strip';

const FullStrip = ({ leds }) => {
  const {
    state: { ledsHorizontal, ledsVertical },
  } = useContext(LedsContext);

  const leftLeds = leds.slice(0, ledsHorizontal);
  const rightDownLeds = leds.slice(
    ledsHorizontal,
    ledsHorizontal + ledsVertical
  );
  const rightToLeft = leds.slice(
    ledsHorizontal + ledsVertical,
    ledsHorizontal + ledsVertical + ledsHorizontal
  );
  const leftDown = leds.slice(
    ledsHorizontal + ledsVertical + ledsHorizontal,
    ledsHorizontal + ledsVertical + ledsHorizontal + ledsVertical
  );

  return (
    <>
      <Strip leds={leftLeds} direction="left" />
      <Strip leds={rightDownLeds} direction="right-down" />
      <Strip leds={rightToLeft} direction="right" />
      <Strip leds={leftDown} direction="left-down" />
    </>
  );
};

export default FullStrip;
