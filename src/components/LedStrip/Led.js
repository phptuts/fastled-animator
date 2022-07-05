import React, { useContext } from 'react';
import { ACTION_TYPES } from '../../context/led/ledActions';
import LedsContext from '../../context/led/ledContext';

const Led = ({ led }) => {
  const { dispatch } = useContext(LedsContext);

  function onSelectLed() {
    dispatch({
      type: !led.selected
        ? ACTION_TYPES.SELECT_LED
        : ACTION_TYPES.UN_SELECT_LED,
      payload: led.position,
    });
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
