import { createContext, useReducer } from 'react';
import { generateFrames } from '../../leds';
import ledReducer from './ledReducer';

const LedsContext = createContext();

export const LedProvider = ({ children }) => {
  const initialState = {
    currentFrameIndex: 0,
    totalSteps: 5,
    timePerStep: 50,
    numberLeds: 250,
    playing: false,
    frames: generateFrames(250, 5, []),
  };

  const [state, dispatch] = useReducer(ledReducer, initialState);

  return (
    <LedsContext.Provider value={{ state, dispatch }}>
      {children}
    </LedsContext.Provider>
  );
};

export default LedsContext;
