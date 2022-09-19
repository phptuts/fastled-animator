import { generateFrames, generatePattern } from '../../leds';
import { ACTION_TYPES } from './ledActions';

import cloneDeep from 'lodash/fp/cloneDeep';
import { arduinoMegaPins, arduinoUnoPins } from '../../config';

const ledReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_BRIGHTNESS_LEVEL:
      return cloneDeep({
        ...state,
        brightnessLevel: action.payload,
      });
    case ACTION_TYPES.CHANGE_MICROCONTROLLER:
      let analogPin = state.analogPin;
      if (action.payload === 'uno') {
        analogPin = arduinoUnoPins.includes(analogPin) ? analogPin : 'A0';
      } else if (action.payload === 'mega') {
        analogPin = arduinoMegaPins.includes(analogPin) ? analogPin : 'A0';
      }
      return cloneDeep({
        ...state,
        microController: action.payload,
        analogPin,
      });
    case ACTION_TYPES.CHANGE_ANALOG_PIN:
      return cloneDeep({
        ...state,
        analogPin: action.payload,
      });
    case ACTION_TYPES.CHANGE_RGB_ORDER:
      return cloneDeep({
        ...state,
        rgbOrder: action.payload,
      });
    case ACTION_TYPES.CHANGE_CHIPSET:
      return cloneDeep({
        ...state,
        chipSet: action.payload,
      });
    case ACTION_TYPES.CHANGE_NUMBER_LEDS:
      return cloneDeep({
        ...state,
        numberLeds: action.payload,
        frames: generateFrames(action.payload, state.totalSteps, state.frames),
      });
    case ACTION_TYPES.MOUSE_DRAG_OFF:
      return cloneDeep({
        ...state,
        mouseDragSelect: false,
      });
    case ACTION_TYPES.MOUSE_DRAG_ON:
      return cloneDeep({
        ...state,
        mouseDragSelect: true,
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
    case ACTION_TYPES.GENERATE_PATTERN:
      const direction = action.payload;
      return generatePattern(direction, state);
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
        selectedColor: action.payload,
      });
    case ACTION_TYPES.CHANGE_DRAG_MODE:
      return cloneDeep({
        ...state,
        dragMode: action.payload,
      });
    case ACTION_TYPES.LED_DRAG_MODE:
      state.frames[state.currentFrameIndex].leds = [
        ...state.frames[state.currentFrameIndex].leds,
      ].reduce((acc, next) => {
        if (action.payload === next.position) {
          switch (state.dragMode) {
            case 'select':
              next.selected = true;
              break;
            case 'unselect':
              next.selected = false;
              break;
            case 'paint':
              next.color = state.selectedColor;
              break;
            case 'erase':
              next.color = '#000000';
              next.selected = false;
              break;
            default:
              console.error(state.dragMode, 'not found');
          }
        }

        acc.push({ ...next });
        return acc;
      }, []);

      return cloneDeep({ ...state });
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
      state.frames[state.currentFrameIndex].leds = state.frames[
        state.currentFrameIndex
      ].leds.map((led, index) => {
        let selected = led.selected;
        const ledPosition = led.position + 1;

        switch (action.payload) {
          case 'all':
            selected = true;
            break;
          case 'unselect_all':
            selected = false;
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
        selectionMode: action.payload,
        playing: false,
      });
    case ACTION_TYPES.RESIZE_PIXELS:
      const width = action.payload;
      if (width >= 1400) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 33,
          ledsVertical: 3,
          fullStripLength: 33 * 2 + 3 * 2,
          pixelAreaWidth: 1320,
          rightMarginForRightVertical: 1280,
        });
      } else if (width >= 1200) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 28,
          ledsVertical: 3,
          fullStripLength: 28 * 2 + 3 * 2,
          pixelAreaWidth: 1120,
          rightMarginForRightVertical: 1080,
        });
      } else if (width >= 992) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 24,
          ledsVertical: 3,
          fullStripLength: 24 * 2 + 3 * 2,
          pixelAreaWidth: 960,
          rightMarginForRightVertical: 920,
        });
      } else if (width >= 768) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 18,
          ledsVertical: 3,
          fullStripLength: 18 * 2 + 3 * 2,
          pixelAreaWidth: 720,
          rightMarginForRightVertical: 680,
        });
      } else if (width >= 576) {
        return cloneDeep({
          ...state,
          ledsHorizontal: 13,
          ledsVertical: 3,
          fullStripLength: 13 * 2 + 3 * 2,
          pixelAreaWidth: 13 * 40,
          rightMarginForRightVertical: 12 * 40,
        });
      } else {
        return cloneDeep({
          ...state,
          ledsHorizontal: 9,
          ledsVertical: 3,
          fullStripLength: 9 * 2 + 3 * 2,
          pixelAreaWidth: 360,
          rightMarginForRightVertical: 320,
        });
      }

    default:
      return state;
  }
};

export default ledReducer;
