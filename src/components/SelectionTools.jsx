import React, { useContext, useState } from 'react';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const SelectionTools = () => {
  const { dispatch } = useContext(LedsContext);

  const [state, setState] = useState({
    make_selection: 'none',
    starts_at: 0,
  });

  return (
    <div className="row">
      <div className="col-3">
        <label htmlFor="color-picker" className=" col-form-label">
          Color
        </label>

        <input
          type="color"
          className="form-control form-control-color w-100"
          id="color-picker"
          value="#AA00FF"
          onChange={(e) => {
            dispatch({
              type: ACTION_TYPES.CHANGE_SELECTED_COLOR_LEDS,
              payload: e.target.value,
            });
          }}
        />
      </div>
      <div className="col-3">
        <label htmlFor="color-picker" className=" col-form-label">
          Selection Mode
        </label>
        <select
          onChange={(e) => {
            setState((s) => {
              return { ...s, selection_mode: e.target.value };
            });
          }}
          value={state.make_selection}
          className="form-select"
        >
          <option value="all">All</option>
          <option value="odd">Odd</option>
          <option value="even">Even</option>
          <option value="thirds">Thirds</option>
          <option value="fourths">Fourths</option>
        </select>
      </div>
      <div className="col-3">
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
              return { ...s, starts_at: e.target.value };
            })
          }
        />
      </div>
      <div className="col-3">
        <button className="btn btn-primary align-text-bottom">Select</button>
      </div>
    </div>
  );
};

export default SelectionTools;
