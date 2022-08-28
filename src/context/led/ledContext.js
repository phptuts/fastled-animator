import { createContext, useReducer } from 'react';
import { generateFrames } from '../../leds';
import ledReducer from './ledReducer';

const LedsContext = createContext();

export const LedProvider = ({ children }) => {
  const initialState = {
    startDragSelection: false,
    currentFrameIndex: 0,
    totalSteps: 50,
    timePerStep: 500,
    numberLeds: 25,
    playing: false,
    frames: generateFrames(25, 50, []),
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
