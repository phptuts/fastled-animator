import { arduinoMegaPins, arduinoUnoPins } from '../../config';
import { ACTION_TYPES } from '../editor/editorActions';

const projectShowReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_BRIGHTNESS_LEVEL:
      return saveState({
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
      return saveState({
        ...state,
        microController: action.payload,
        analogPin,
      });
    case ACTION_TYPES.CHANGE_ANALOG_PIN:
      return saveState({
        ...state,
        analogPin: action.payload,
      });
    case ACTION_TYPES.CHANGE_RGB_ORDER:
      return saveState({
        ...state,
        rgbOrder: action.payload,
      });
    case ACTION_TYPES.CHANGE_CHIPSET:
      return saveState({
        ...state,
        chipSet: action.payload,
      });
    case ACTION_TYPES.MOVE_PLAYER_BACKWARD:
    case ACTION_TYPES.MOVE_PLAYER_FORWARD:
      return saveState({ ...state, currentFrameIndex: action.payload });
    case ACTION_TYPES.CHANGE_POSITION_PLAYER:
      return saveState({
        ...state,
        currentFrameIndex: action.payload,
        playing: false,
      });
    case ACTION_TYPES.SET_SAVED_STATE:
      return saveState({
        ...action.payload,
        ledsHorizontal: state.ledsHorizontal,
        ledsVertical: state.ledsVertical,
        fullStripLength: state.fullStripLength,
        pixelAreaWidth: state.pixelAreaWidth,
        rightMarginForRightVertical: state.rightMarginForRightVertical,
        startDragSelection: false,
        mouseDragSelect: false,
        uploadingCode: false,
        compilingCode: false,
        playing: false,
        saving: false,
      });

    case ACTION_TYPES.RUN_SIMULATION:
      return saveState({
        ...state,
        currentFrameIndex: action.payload,
        playing: true,
      });
    case ACTION_TYPES.STOP_SIMULATION:
      return saveState({
        ...state,
        playing: false,
      });
    case ACTION_TYPES.RESIZE_PIXELS:
      const width = action.payload;
      if (width >= 1400) {
        return saveState({
          ...state,
          ledsHorizontal: 33,
          ledsVertical: 1,
          fullStripLength: 33 * 2 + 1 * 2,
          pixelAreaWidth: 1320,
          rightMarginForRightVertical: 1280,
        });
      } else if (width >= 1200) {
        return saveState({
          ...state,
          ledsHorizontal: 28,
          ledsVertical: 1,
          fullStripLength: 28 * 2 + 1 * 2,
          pixelAreaWidth: 1120,
          rightMarginForRightVertical: 1080,
        });
      } else if (width >= 992) {
        return saveState({
          ...state,
          ledsHorizontal: 24,
          ledsVertical: 1,
          fullStripLength: 24 * 2 + 1 * 2,
          pixelAreaWidth: 960,
          rightMarginForRightVertical: 920,
        });
      } else if (width >= 768) {
        return saveState({
          ...state,
          ledsHorizontal: 18,
          ledsVertical: 1,
          fullStripLength: 18 * 2 + 1 * 2,
          pixelAreaWidth: 720,
          rightMarginForRightVertical: 680,
        });
      } else if (width >= 576) {
        return saveState({
          ...state,
          ledsHorizontal: 13,
          ledsVertical: 1,
          fullStripLength: 13 * 2 + 1 * 2,
          pixelAreaWidth: 13 * 40,
          rightMarginForRightVertical: 12 * 40,
        });
      } else {
        return saveState({
          ...state,
          ledsHorizontal: 9,
          ledsVertical: 1,
          fullStripLength: 9 * 2 + 1 * 2,
          pixelAreaWidth: 360,
          rightMarginForRightVertical: 320,
        });
      }
    default:
      return state;
  }
};

const saveState = (state) => {
  return state;
};
export default projectShowReducer;
