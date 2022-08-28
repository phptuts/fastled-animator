import React, { useContext, useState } from "react";
import { ACTION_TYPES } from "../context/led/ledActions";
import LedsContext from "../context/led/ledContext";

const SelectionTools = () => {
  const {
    dispatch,
    state: { selectedColor },
  } = useContext(LedsContext);

  const [state, setState] = useState({
    make_selection: "none",
    starts_at: 1,
  });

  function onSelectChanged() {
    dispatch({ type: ACTION_TYPES.SELECTION_MODE, payload: state });
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h4>Selection / Color</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-12">
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
        <div className="col-md-3 col-sm-12">
          <label htmlFor="color-picker" className="form-label">
            Selection Mode
          </label>
          <select
            onChange={(e) => {
              setState((s) => {
                return { ...s, selection_mode: e.target.value };
              });
            }}
            value={state.selection_mode}
            className="form-select"
          >
            <option value="none">Click</option>
            <option value="all">All</option>
            <option value="unselect_all">UnSelect All</option>
            <option value="odd">Odd</option>
            <option value="even">Even</option>
            <option value="thirds">Thirds</option>
            <option value="fourths">Fourths</option>
          </select>
        </div>
        <div className="col-md-3 col-sm-12">
          <label htmlFor="starts-at" className="form-label">
            Starts at led
          </label>
          <input
            type="number"
            className="form-control"
            id="starts-at"
            step="1"
            value={state.starts_at}
            placeholder="The led to start the selection"
            onChange={(e) =>
              setState((s) => {
                return { ...s, starts_at: +e.target.value };
              })
            }
          />
        </div>
        <div className="col-md-3 col-sm-12">
          <button
            onClick={onSelectChanged}
            id="submit-select"
            className="btn btn-primary align-text-bottom w-100 "
          >
            Select
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectionTools;
