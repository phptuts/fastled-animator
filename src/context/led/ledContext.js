import { createContext, useReducer } from 'react';
import { initialState } from './initialState';
import ledReducer from './ledReducer';

const LedsContext = createContext();

export const LedProvider = ({ children }) => {
  const firstState = localStorage.getItem('led_animator_last_state')
    ? JSON.parse(localStorage.getItem('led_animator_last_state'))
    : initialState;

  firstState.uploadingCode = false;
  firstState.playing = false;

  const [state, dispatch] = useReducer(ledReducer, firstState);

  return (
    <LedsContext.Provider value={{ state, dispatch }}>
      {children}
    </LedsContext.Provider>
  );
};

export default LedsContext;
