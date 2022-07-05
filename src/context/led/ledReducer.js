import { generateFrames } from '../../leds';
import { ACTION_TYPES } from './ledActions';

import cloneDeep from 'lodash/fp/cloneDeep';

const ledReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_NUMBER_LEDS:
      return cloneDeep({
        ...state,
        numberLeds: action.payload,
        frames: generateFrames(action.payload, state.totalSteps, state.frames),
      });
    case ACTION_TYPES.CHANGE_TOTAL_STEPS:
      return cloneDeep({
        ...state,
        totalSteps: action.payload,
        frames: generateFrames(state.numberLeds, action.payload, state.frames),
      });
    case ACTION_TYPES.CHANGE_TIME_PER_STEP:
      return cloneDeep({
        ...state,
        timePerStep: action.payload,
      });
    case ACTION_TYPES.CHANGE_SELECTED_COLOR_LEDS:
      state.frames[state.currentFrameIndex].leds = state.frames[
        state.currentFrameIndex
      ].leds.reduce((acc, next) => {
        if (next.selected) {
          next.color = action.payload;
        }
        acc.push({ ...next });
        return acc;
      }, []);

      return cloneDeep({
        ...state,
      });
    case ACTION_TYPES.SELECT_LED:
    case ACTION_TYPES.UN_SELECT_LED:
      state.frames[state.currentFrameIndex].leds = [
        ...state.frames[state.currentFrameIndex].leds,
      ].reduce((acc, next) => {
        if (action.payload === next.position) {
          next.selected = action.type === ACTION_TYPES.SELECT_LED;
        }

        acc.push({ ...next });
        return acc;
      }, []);

      return cloneDeep({ ...state });
    case ACTION_TYPES.MOVE_PLAYER_BACKWARD:
    case ACTION_TYPES.MOVE_PLAYER_FORWARD:
      return cloneDeep({ ...state, currentFrameIndex: action.payload });
    case ACTION_TYPES.CHANGE_POSITION_PLAYER:
      return cloneDeep({
        ...state,
        currentFrameIndex: action.payload,
      });
    default:
      return state;
  }
};

export default ledReducer;
