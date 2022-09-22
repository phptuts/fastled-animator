import React, { useContext } from 'react';
import {
  arduinoMegaPins,
  arduinoUnoPins,
  chipSets,
  rgbOptions,
} from '../config';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const ArduinoConfig = () => {
  const {
    dispatch,
    state: { rgbOrder, chipSet, microController, analogPin, brightnessLevel },
  } = useContext(LedsContext);
  return (
    <>
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <label htmlFor="seconds-per-step" className="form-label">
            Chipset
          </label>
          <select
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.CHANGE_CHIPSET,
                payload: e.target.value,
              });
            }}
            className="form-select"
            value={chipSet}
          >
            {chipSets.map((o) => {
              return (
                <option value={o} key={o}>
                  {o}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-3 col-sm-12">
          <label htmlFor="seconds-per-step" className="form-label">
            Chip Color Order
          </label>
          <select
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.CHANGE_RGB_ORDER,
                payload: e.target.value,
              });
            }}
            className="form-select"
            value={rgbOrder}
          >
            {rgbOptions.map((o) => {
              return (
                <option value={o} key={o}>
                  {o}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-3 col-sm-12 ">
          <label htmlFor="brightnessLevel" className="form-label">
            Brightness Level
          </label>
          <input
            type="number"
            className="form-control"
            id="brightnessLevel"
            placeholder="Brightness Level"
            value={brightnessLevel}
            onChange={(e) =>
              dispatch({
                type: ACTION_TYPES.CHANGE_BRIGHTNESS_LEVEL,
                payload: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 col-sm-12">
          <label htmlFor="microcontroller" className="form-label">
            Microcontroller
          </label>
          <select
            id="microcontroller"
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.CHANGE_MICROCONTROLLER,
                payload: e.target.value,
              });
            }}
            className="form-select"
            value={microController}
          >
            <option value="uno">Arduino Uno</option>
            <option value="mega">Arduino Mega</option>
          </select>
        </div>
        <div className="col-md-3 col-sm-12 ">
          <label htmlFor="analogPin" className="form-label">
            Analog Pin
          </label>
          <select
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.CHANGE_ANALOG_PIN,
                payload: e.target.value,
              });
            }}
            className="form-select"
            value={analogPin}
            id="analogPin"
          >
            {microController === 'uno' &&
              arduinoUnoPins.map((p) => {
                return (
                  <option value={p} key={p}>
                    {p}
                  </option>
                );
              })}
            {microController === 'mega' &&
              arduinoMegaPins.map((p) => {
                return (
                  <option value={p} key={p}>
                    {p}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </>
  );
};

export default ArduinoConfig;
