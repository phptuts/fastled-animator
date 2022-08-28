import { createContext, useReducer } from "react";
import { generateFrames } from "../../leds";
import ledReducer from "./ledReducer";

const LedsContext = createContext();

export const LedProvider = ({ children }) => {
  const initialState = {
    currentFrameIndex: 0,
    totalSteps: 5,
    timePerStep: 50,
    numberLeds: 25,
    playing: false,
    frames: generateFrames(25, 5, []),
    ledsHorizontal: 50,
    ledsVertical: 3,
    fullStripLength: 106,
    pixelAreaWidth: 1000,
    selectedColor: "#AA0000",
    rightMarginForRightVertical: 980,
  };

  const [state, dispatch] = useReducer(ledReducer, initialState);

  return (
    <LedsContext.Provider value={{ state, dispatch }}>
      {children}
    </LedsContext.Provider>
  );
};

export default LedsContext;
