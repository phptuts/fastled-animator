import { createContext, useReducer } from 'react';
import { generateFrames } from '../../leds';
import ledReducer from './ledReducer';

const LedsContext = createContext();

export const LedProvider = ({ children }) => {
  const initialState = {
    startDragSelection: false,
    dragMode: 'paint',
    chipSet: 'WS2811',
    microController: 'uno',
    analogPin: 'A0',
    rgbOrder: 'GRB',
    brightnessLevel: 10,
    currentFrameIndex: 0,
    totalSteps: 50,
    timePerStep: 0.5,
    numberLeds: 30,
    playing: false,
    frames: generateFrames(30, 50, []),
    ledsHorizontal: 33,
    ledsVertical: 3,
    fullStripLength: 66,
    pixelAreaWidth: 1000,
    selectedColor: '#AA0000',
    mouseDragSelect: false,
    selectionMode: 'none',
    rightMarginForRightVertical: 960,
  };

  const [state, dispatch] = useReducer(ledReducer, initialState);

  return (
    <LedsContext.Provider value={{ state, dispatch }}>
      {children}
    </LedsContext.Provider>
  );
};

export default LedsContext;
