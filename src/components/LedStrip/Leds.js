import React, { useContext } from 'react';
import FullStrip from './FullStrip';
import config from '../../config';
import { chunk } from '../../helpers';
import ledsContext from '../../context/ledContext';

const Leds = () => {
  const { leds } = useContext(ledsContext);

  const ledFullStips = chunk(leds, config.fullStripLength);
  return (
    <div id="leds">
      {ledFullStips &&
        ledFullStips.map((c) => {
          return <FullStrip key={`fullstrip-${c[0].position}`} leds={c} />;
        })}

      {/* <Strip leds={leds} direction="left" />
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
      <Strip leds={leds} direction="right" /> */}
    </div>
  );
};

export default Leds;
