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

  return (
    <>
      <Strip leds={leftLeds} editable={editable} direction="left" />
      <Strip leds={rightDownLeds} editable={editable} direction="right-down" />
      <Strip leds={rightToLeft} editable={editable} direction="right" />
      <Strip leds={leftDown} editable={editable} direction="left-down" />
    </>
  );
};

export default FullStrip;
