import React, { useContext } from 'react';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const SelectionTools = () => {
  const {
    dispatch,
    dispatchDebounce,
    state: {
      selectedColor,
      currentFrameIndex,
      dragMode,
      removeFramesLoop1,
      removeFramesLoop2,
      playing,
      pattern,
    },
  } = useContext(LedsContext);

  // Only available on the first frame

  const onGeneratePattern = (e) => {
    dispatch({ type: ACTION_TYPES.GENERATE_PATTERN, payload: pattern });
  };

  return (
    <>
      <div className="row mt-2">
        <div className="col">
          <h4>Selected Color</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-sm-12 mb-2">
          <input
            type="color"
            className="form-control form-control-color w-100"
            id="color-picker"
            value={selectedColor}
            onChange={(e) => {
              console.log('called', e.target.value);
              dispatchDebounce({
                type: ACTION_TYPES.CHANGE_SELECTED_COLOR_LEDS,
                payload: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-md-4 col-sm-12">
          <button
            onClick={() => {
              dispatch({
                type: ACTION_TYPES.CHANGE_SELECTED_COLOR_LEDS,
                payload:
                  '#' +
                  ((Math.random() * 0xffffff) << 0)
                    .toString(16)
                    .padStart(6, '0'),
              });
            }}
            className="btn btn-success align-text-bottom w-100 "
          >
            Randon Color
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <h4>Selection Tools</h4>
        </div>
      </div>
      <div className="row">
        <div className="mb-2 col-lg-5 col-md-7 col-sm-12">
          <div
            className="btn-group "
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              onClick={() => {
                dispatch({
                  type: ACTION_TYPES.SELECTION_MODE,
                  payload: 'unselect_all',
                });
              }}
              type="button"
              className="btn btn-outline-dark"
            >
              None
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: ACTION_TYPES.SELECTION_MODE,
                  payload: 'all',
                });
              }}
              type="button"
              className="btn btn-outline-dark"
            >
              All
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: ACTION_TYPES.SELECTION_MODE,
                  payload: 'odd',
                });
              }}
              type="button"
              className="btn btn-outline-dark"
            >
              Odd
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: ACTION_TYPES.SELECTION_MODE,
                  payload: 'even',
                });
              }}
              type="button"
              className="btn btn-outline-dark"
            >
              Even
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: ACTION_TYPES.SELECTION_MODE,
                  payload: 'thirds',
                });
              }}
              type="button"
              className="btn btn-outline-dark"
            >
              Thirds
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: ACTION_TYPES.SELECTION_MODE,
                  payload: 'fourths',
                });
              }}
              type="button"
              className="btn btn-outline-dark"
            >
              Fourths
            </button>
          </div>
        </div>
        <div className="col-lg-4 col-md-5 col-sm-12">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="paint-option"
              value="paint"
              onChange={(e) => {
                dispatch({
                  type: ACTION_TYPES.CHANGE_DRAG_MODE,
                  payload: e.target.value,
                });
              }}
              checked={dragMode === 'paint'}
            />
            <label className="btn btn-outline-primary" htmlFor="paint-option">
              Paint
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="eraser-btn"
              value="erase"
              onChange={(e) => {
                dispatch({
                  type: ACTION_TYPES.CHANGE_DRAG_MODE,
                  payload: e.target.value,
                });
              }}
              checked={dragMode === 'erase'}
            />
            <label className="btn btn-outline-primary" htmlFor="eraser-btn">
              Eraser
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="select-btn"
              value="select"
              onChange={(e) => {
                dispatch({
                  type: ACTION_TYPES.CHANGE_DRAG_MODE,
                  payload: e.target.value,
                });
              }}
              checked={dragMode === 'select'}
            />
            <label className="btn btn-outline-primary" htmlFor="select-btn">
              Select
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="unselect-btn"
              value="unselect"
              onChange={(e) => {
                dispatch({
                  type: ACTION_TYPES.CHANGE_DRAG_MODE,
                  payload: e.target.value,
                });
              }}
              checked={dragMode === 'unselect'}
            />
            <label className="btn btn-outline-primary" htmlFor="unselect-btn">
              Unselect
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <h4>Pattern</h4>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-2 col-sm-12">
          <label htmlFor="pattern-type" className="form-label">
            Pattern Type
          </label>
          <select
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.SET_PATTERN,
                payload: e.target.value,
              });
            }}
            value={pattern}
            id="pattern-type"
            className="form-select"
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="bounce_right">Bounce Right</option>
            <option value="bounce_left">Bounce Left</option>
          </select>
        </div>
        <div className="col-md-2 col-sm-12">
          <label htmlFor="subtract-frames-loop-1" className="form-label">
            Remove Frames Loop 1
          </label>
          <input
            type="number"
            className="form-control"
            id="subtract-frames-loop-1"
            step="1"
            placeholder="Subtract Frames"
            value={removeFramesLoop1}
            onChange={(e) =>
              dispatch({
                type: ACTION_TYPES.CHANGE_REMOVE_FRAMES,
                payload: { frames: e.target.value, loop: 1 },
              })
            }
          />
        </div>

        <div className="col-md-2 col-sm-12">
          <label htmlFor="subtract-frames-loop-2" className="form-label">
            Remove Frames Loop 2
          </label>
          <input
            type="number"
            className="form-control"
            id="subtract-frames-loop-2"
            step="1"
            placeholder="Subtract Frames"
            value={removeFramesLoop2}
            onChange={(e) =>
              dispatch({
                type: ACTION_TYPES.CHANGE_REMOVE_FRAMES,
                payload: { frames: e.target.value, loop: 2 },
              })
            }
          />
        </div>
        <div className="col col-md-4 col-sm-12">
          <button
            onClick={onGeneratePattern}
            disabled={currentFrameIndex !== 0 || playing}
            className="btn btn-primary align-text-bottom w-100 select-btn"
          >
            Create Pattern
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="alert alert-primary mt-3" role="alert">
            Clicking "Create Pattern" will replace everything you have created
            with the pattern.
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectionTools;
