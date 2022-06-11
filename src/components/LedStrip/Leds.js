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
    </div>
  );
};

export default Leds;
