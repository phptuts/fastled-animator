import React, { useContext } from 'react';
import EditorContext from '../../context/editor/editorContext';
import ProjectShowContext from '../../context/project-show/projectShowContext';
import Strip from './Strip';

const FullStrip = ({ leds, editable }) => {
  const {
    state: { ledsHorizontal, ledsVertical },
  } = useContext(editable ? EditorContext : ProjectShowContext);

  const leftLeds = leds.slice(0, ledsHorizontal);
  const rightDownLeds = leds.slice(
    ledsHorizontal,
    ledsHorizontal + ledsVertical
  );
  const rightToLeft = leds.slice(
    ledsHorizontal + ledsVertical,
    ledsHorizontal + ledsVertical + ledsHorizontal
  );
  const leftDown = leds.slice(
    ledsHorizontal + ledsVertical + ledsHorizontal,
    ledsHorizontal + ledsVertical + ledsHorizontal + ledsVertical
  );
  const ledChunks = [
    { leds: leftLeds, direction: 'left' },
    { leds: rightDownLeds, direction: 'right-down' },
    { leds: rightToLeft, direction: 'right' },
    { leds: leftDown, direction: 'left-down' },
  ];

  return (
    <>
      {ledChunks.map((s) => {
        return (
          <Strip
            key={s.direction}
            leds={s.leds}
            editable={editable}
            direction={s.direction}
          />
        );
      })}
    </>
  );
};

export default FullStrip;
