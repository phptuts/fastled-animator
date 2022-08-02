import React, { useContext } from 'react';
import LedsContext from '../../context/led/ledContext';
import Led from './Led';

const Strip = ({ leds, direction }) => {
  const {
    state: { rightMarginForRightVertical },
  } = useContext(LedsContext);

  return (
    <div
      style={{
        marginLeft:
          direction === 'right-down' ? rightMarginForRightVertical : 0,
      }}
      className={`strip ${direction}`}
    >
      {leds.map((led) => {
        return <Led led={led} key={`led-${led.position}`} />;
      })}
    </div>
  );
};

export default Strip;
