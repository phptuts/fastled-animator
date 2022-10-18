import { useContext, useEffect } from "react";
import FrameConfig from "../../components/FrameConfig";
import Leds from "../../components/LedStrip/Leds";
import LedTool from "../../components/LedTool";
import Player from "../../components/Player";
import SelectionTools from "../../components/SelectionTools";
import { ACTION_TYPES } from "../../context/editor/editorActions";
import EditorContext from "../../context/editor/editorContext";

const Editor = () => {
  const { dispatch } = useContext(EditorContext);
  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.RESIZE_PIXELS,
      payload: window.outerWidth,
    });
    const resizeWindow = (e) => {
      dispatch({
        type: ACTION_TYPES.RESIZE_PIXELS,
        payload: e.target.outerWidth,
      });
    };
    const mouseDragOn = (e) => {
      dispatch({
        type: ACTION_TYPES.MOUSE_DRAG_ON,
      });
    };
    const mouseDragOff = (e) => {
      dispatch({
        type: ACTION_TYPES.MOUSE_DRAG_OFF,
      });
    };

    window.addEventListener("mousedown", mouseDragOn);
    window.addEventListener("mouseup", mouseDragOff);
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
      window.removeEventListener("mousedown", mouseDragOn);
      window.removeEventListener("mouseup", mouseDragOff);
    };
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <div className="col">
          <p>
            Adjust the settings and use the selection tools to create your own
            led animations to upload to an Arduino or another microcontroller.
          </p>
        </div>
      </div>
      <LedTool />

      <div className="row mt-4">
        <div className="col">
          <Leds editable={true} />
        </div>
      </div>

      <Player editable={true} />
      <FrameConfig />

      <SelectionTools />
      <div className="row mb-3">
        <div className="col">
          <button
            onClick={() => dispatch({ type: ACTION_TYPES.NEW_PROJECT })}
            className="btn btn-danger w-100 btn-lg"
          >
            New Project
          </button>
        </div>
      </div>
    </>
  );
};

export default Editor;
