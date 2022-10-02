import React, { useContext } from 'react';
import EditorContext from '../../context/editor/editorContext';
import Led from './Led';

const Strip = ({ leds, direction, editable }) => {
  const {
    state: { rightMarginForRightVertical },
  } = useContext(EditorContext);

  return (
    <div
      style={{
        marginLeft:
          direction === 'right-down' ? rightMarginForRightVertical : 0,
      }}
      className={`strip ${direction}`}
    >
      {leds.map((led) => {
        return (
          <Led editable={editable} led={led} key={`led-${led.position}`} />
        );
      })}
    </div>
  );
};

export default Strip;
