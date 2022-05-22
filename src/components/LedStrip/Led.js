import React, { useContext } from 'react';
import LedsContext from '../../context/ledContext';

const Led = ({ led }) => {
  const { selectLed } = useContext(LedsContext);

  function onSelectLed() {
    selectLed(led);
  }

  return (
    <div
      onClick={onSelectLed}
      className={`led ${led.selected ? 'selected' : ''} ${led.position}`}
    >
      <div
        style={{
          backgroundColor: led.color,
        }}
        className="light"
      ></div>
    </div>
  );
};

export default Led;
