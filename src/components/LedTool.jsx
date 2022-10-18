import React, { useContext } from "react";
import { ACTION_TYPES } from "../context/editor/editorActions";
import EditorContext from "../context/editor/editorContext";

const LedTool = () => {
  const {
    dispatch,
    dispatchDebounce,
    state: { numberLeds, type, width, height },
  } = useContext(EditorContext);

  const changeType = (type) => {
    dispatch({ type: ACTION_TYPES.SET_TYPE, payload: type });
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-lg-2 col-md-2 col-sm-12">
          <div
            className="btn-group mt-3"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="type_radio"
              id="strip-option"
              value="strip"
              checked={type === "strip"}
              onChange={() => changeType("strip")}
            />
            <label className="btn btn-outline-primary" htmlFor="strip-option">
              Strip
            </label>

            <input
              type="radio"
              className="btn-check"
              name="type_radio"
              id="matrix-btn"
              value="matrix"
              onChange={() => changeType("matrix")}
              checked={type === "matrix"}
            />
            <label className="btn btn-outline-primary" htmlFor="matrix-btn">
              Matrix
            </label>
          </div>
        </div>
        {type === "strip" && (
          <>
            <div className="col-md-3 col-sm-12">
              <label htmlFor="number-of-leds" className="form-label">
                {numberLeds} LEDs
              </label>
              <input
                type="range"
                className="form-range"
                min={1}
                max={256}
                id="number-of-leds"
                placeholder="Number of leds"
                value={numberLeds}
                onChange={(e) => {
                  dispatchDebounce({
                    type: ACTION_TYPES.CHANGE_NUMBER_LEDS,
                    payload: +e.target.value,
                  });
                }}
              />
            </div>
          </>
        )}
        {type === "matrix" && (
          <>
            <div className="col-md-3 col-sm-12">
              <label htmlFor="leds-wide" className="form-label">
                {width} LEDs wide
              </label>
              <input
                type="range"
                className="form-range"
                min={1}
                max={30}
                id="leds-wide"
                value={width}
                onChange={(e) => {
                  dispatchDebounce({
                    type: ACTION_TYPES.SET_WIDTH,
                    payload: +e.target.value,
                  });
                }}
              />
            </div>
            <div className="col-md-3 col-sm-12">
              <label htmlFor="led-tall" className="form-label">
                {height} LEDs tall
              </label>
              <input
                type="range"
                className="form-range"
                min={1}
                max={30}
                id="led-tall"
                value={height}
                onChange={(e) => {
                  dispatchDebounce({
                    type: ACTION_TYPES.SET_HEIGHT,
                    payload: +e.target.value,
                  });
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LedTool;
