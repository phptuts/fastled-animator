import React, { useContext } from 'react';
import { ACTION_TYPES } from '../../context/led/ledActions';
import LedsContext from '../../context/led/ledContext';

const Led = ({ led }) => {
  const {
    dispatch,
    state: { playing, mouseDragSelect },
  } = useContext(LedsContext);

  function onSelectLed() {
    if (playing) {
      return;
    }
    dispatch({
      type: !led.selected
        ? ACTION_TYPES.SELECT_LED
        : ACTION_TYPES.UN_SELECT_LED,
      payload: led.position,
    });
  }

  function onMouseOver() {
    if (mouseDragSelect) {
      dispatch({
        type: ACTION_TYPES.SELECT_LED,
        payload: led.position,
      });
    }
  }

  return (
    <div
      onMouseOver={onMouseOver}
      onClick={onSelectLed}
      className={`led ${led.selected && !playing ? 'selected' : ''} ${
        led.position
      }`}
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
