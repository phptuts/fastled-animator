import React, { useContext } from 'react';
import { useState } from 'react';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const SelectionTools = () => {
  const {
    dispatch,
    state: { selectedColor, currentFrameIndex, dragMode, playing },
  } = useContext(LedsContext);

  // Only available on the first frame
  const [pattern, setPattern] = useState('right');

  const onGeneratePattern = (e) => {
    dispatch({ type: ACTION_TYPES.GENERATE_PATTERN, payload: pattern });
  };

  return (
    <>
      <div className="row mt-2">
        <div className="col">
          <h4>Color</h4>
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
              dispatch({
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
        <div className="col col-md-4 col-sm-12">
          <select
            onChange={(e) => {
              setPattern(e.target.value);
            }}
            value={pattern}
            className="form-select"
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="bounce_right">Bounce Right</option>
            <option value="bounce_left">Bounce Left</option>
          </select>
        </div>
        <div className="col col-md-4 col-sm-12">
          <button
            onClick={onGeneratePattern}
            disabled={currentFrameIndex !== 0 || playing}
            className="btn btn-primary align-text-bottom w-100 "
          >
            Generate Pattern
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectionTools;
