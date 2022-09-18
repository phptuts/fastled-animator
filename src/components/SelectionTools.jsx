import React, { useContext } from 'react';
import { useState } from 'react';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const SelectionTools = () => {
  const {
    dispatch,
    state: { selectedColor, selectionMode, currentFrameIndex, dragMode },
  } = useContext(LedsContext);

  // Only available on the first frame
  const [pattern, setPattern] = useState('right');

  const onGeneratePattern = (e) => {
    dispatch({ type: ACTION_TYPES.GENERATE_PATTERN, payload: pattern });
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col">
          <h4>Color</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 col-sm-12">
          <label htmlFor="color-picker" className="form-label">
            Color
          </label>

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
        <div className="col col-md-2 col-sm-12">
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
            id="submit-select"
            className="btn btn-success align-text-bottom w-100 "
          >
            Randon Color
          </button>
        </div>
        <div className="col-md-2 col-sm-12">
          <label htmlFor="color-picker" className="form-label">
            Select LEDs
          </label>
          <select
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.SELECTION_MODE,
                payload: e.target.value,
              });
            }}
            value={selectionMode}
            className="form-select"
          >
            <option value="unselect_all">None</option>
            <option value="all">All</option>
            <option value="odd">Odd</option>
            <option value="even">Even</option>
            <option value="thirds">Thirds</option>
            <option value="fourths">Fourths</option>
          </select>
        </div>
        <div className="col col-md-2 col-sm-12">
          <label htmlFor="color-picker" className="form-label">
            Drag Selection Tool
          </label>
          <select
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.CHANGE_DRAG_MODE,
                payload: e.target.value,
              });
            }}
            value={dragMode}
            className="form-select"
          >
            <option value="select">Select</option>
            <option value="unselect">UnSelect</option>
            <option value="paint">Paint</option>
            <option value="erase">Erase</option>
          </select>
        </div>

        <div className="col-md-2 col-sm-12">
          <button
            onClick={() =>
              dispatch({
                type: ACTION_TYPES.SELECTION_MODE,
                payload: 'unselect_all',
              })
            }
            id="submit-select"
            className="btn btn-warning align-text-bottom w-100 "
          >
            Unselect
          </button>
        </div>
      </div>
      {currentFrameIndex === 0 && (
        <>
          <div className="row mt-5">
            <div className="col">
              <h4>Pattern</h4>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-2 col-sm-12">
              <label htmlFor="color-picker" className="form-label">
                Create Pattern
              </label>
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
            <div className="col col-md-2 col-sm-12">
              <button
                id="submit-select"
                onClick={onGeneratePattern}
                className="btn btn-primary align-text-bottom w-100 "
              >
                Generate Pattern
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelectionTools;
