import React, { useContext } from 'react';
import { ACTION_TYPES } from '../../context/led/ledActions';
import LedsContext from '../../context/led/ledContext';

const Led = ({ led }) => {
  const {
    dispatch,
    state: { playing, mouseDragSelect, dragMode },
  } = useContext(LedsContext);

  function onSelectLed() {
    dispatch({
      type: ACTION_TYPES.LED_DRAG_MODE,
      payload: led.position,
    });
  }

  function onMouseOver() {
    if (mouseDragSelect) {
      dispatch({
        type: ACTION_TYPES.LED_DRAG_MODE,
        payload: led.position,
      });
    }
  }

  return (
    <div
      onMouseOver={onMouseOver}
      onClick={onSelectLed}
      onTouchEnd={onSelectLed}
      onTouchStart={onSelectLed}
      className={`led ${led.selected && !playing ? 'selected' : ''} ${
        led.position
      } mode-${dragMode}`}
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
