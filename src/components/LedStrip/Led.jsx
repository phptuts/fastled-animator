import React, { useContext } from 'react';
import { ACTION_TYPES } from '../../context/editor/editorActions';
import EditorContext from '../../context/editor/editorContext';
import ProjectShowContext from '../../context/project-show/projectShowContext';

const Led = ({ led, editable }) => {
  const {
    dispatch,
    state: { playing, mouseDragSelect, dragMode },
  } = useContext(editable ? EditorContext : ProjectShowContext);

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

  if (editable) {
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
  }
  return (
    <div className="led">
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
