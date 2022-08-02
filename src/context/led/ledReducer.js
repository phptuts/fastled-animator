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
        playing: false,
      });
    case ACTION_TYPES.RUN_SIMULATION:
      return cloneDeep({
        ...state,
        currentFrameIndex: action.payload,
        playing: true,
      });
    case ACTION_TYPES.STOP_SIMULATION:
      return cloneDeep({
        ...state,
        playing: false,
      });
    case ACTION_TYPES.SELECTION_MODE:
      let { selection_mode, starts_at } = action.payload;

      state.frames[state.currentFrameIndex].leds = state.frames[
        state.currentFrameIndex
      ].leds.map((led, index) => {
        let selected = led.selected;
        const ledPosition = led.position + 1;
        if (ledPosition < starts_at) {
          return { ...led };
        }
        switch (selection_mode) {
          case 'all':
          case 'unselect_all':
            selected = selection_mode === 'all';
            break;
          case 'odd':
            selected = ledPosition % 2 === 1;
            break;
          case 'even':
            selected = ledPosition % 2 === 0;
            break;
          case 'thirds':
            selected = ledPosition % 3 === 0;
            break;
          case 'fourths':
            selected = ledPosition % 4 === 0;
            break;
          default:
        }
        return {
          ...led,
          selected,
        };
      });

      return cloneDeep({
        ...state,
        playing: false,
      });
    case ACTION_TYPES.RESIZE_PIXELS:
      const width = action.payload;
      if (width >= 1400) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 66,
          ledsVertical: 3,
          fullStripLength: 66 * 2 + 3 * 2,
          pixelAreaWidth: 1320,
          rightMarginForRightVertical: 1300,
        });
      } else if (width >= 1200) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 56,
          ledsVertical: 3,
          fullStripLength: 56 * 2 + 3 * 2,
          pixelAreaWidth: 1120,
          rightMarginForRightVertical: 1100,
        });
      } else if (width >= 992) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 48,
          ledsVertical: 3,
          fullStripLength: 48 * 2 + 3 * 2,
          pixelAreaWidth: 960,
          rightMarginForRightVertical: 940,
        });
      } else if (width >= 768) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 36,
          ledsVertical: 3,
          fullStripLength: 36 * 2 + 3 * 2,
          pixelAreaWidth: 720,
          rightMarginForRightVertical: 700,
        });
      } else if (width >= 576) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 27,
          ledsVertical: 3,
          fullStripLength: 27 * 2 + 3 * 2,
          pixelAreaWidth: 540,
          rightMarginForRightVertical: 520,
        });
      } else {
        return cloneDeep({
          ...state,
          ledsHorizontal: 18,
          ledsVertical: 3,
          fullStripLength: 18 * 2 + 3 * 2,
          pixelAreaWidth: 360,
          rightMarginForRightVertical: 340,
        });
      }

    default:
      return state;
  }
};

export default ledReducer;
