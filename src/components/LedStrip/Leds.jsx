import React, { useContext } from "react";
import FullStrip from "./FullStrip";
import { chunk } from "../../helpers";
import EditorContext from "../../context/editor/editorContext";
import ProjectShowContext from "../../context/project-show/projectShowContext";
import Strip from "./Strip";

const Leds = ({ editable = true }) => {
  const {
    state: {
      frames,
      currentFrameIndex,
      fullStripLength,
      pixelAreaWidth,
      type,
      width,
    },
  } = useContext(editable ? EditorContext : ProjectShowContext);

  const { leds } = frames[currentFrameIndex];

  const ledFullStips = chunk(leds, fullStripLength);
  const ledMatrix = chunk(leds, width);
  return (
    <>
      {type === "matrix" && (
        <>
          {ledMatrix.map((leds, index) => {
            return (
              <Strip
                key={`matrix-strip-${index}`}
                direction="left"
                leds={leds}
                editable={editable}
              />
            );
          })}
        </>
      )}
      {type === "strip" && (
        <>
          <div style={{ width: `${pixelAreaWidth}px` }} id="leds">
            {ledFullStips &&
              ledFullStips.map((c) => {
                return (
                  <FullStrip
                    editable={editable}
                    key={`fullstrip-${c[0].position}`}
                    leds={c}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Leds;
