import React, { useContext } from 'react';
import FullStrip from './FullStrip';
import config from '../../config';
import { chunk } from '../../helpers';
import ledsContext from '../../context/led/ledContext';

// TODO Dynamically Set the config in and have it control by state
// Set the width programatically to show right number of pixels

const Leds = () => {
  const {
    state: { frames, currentFrameIndex },
  } = useContext(ledsContext);

  const { leds } = frames[currentFrameIndex];

  const ledFullStips = chunk(leds, config.fullStripLength);
  return (
    <div style={{ width: `1000px` }} id="leds">
      {ledFullStips &&
        ledFullStips.map((c) => {
          return <FullStrip key={`fullstrip-${c[0].position}`} leds={c} />;
        })}
    </div>
  );
};

export default Leds;
