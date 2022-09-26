import { debounce } from 'lodash/fp';
import { createContext, useEffect, useReducer } from 'react';
import { initialState } from './initialState';
import ledReducer from './ledReducer';
import localForage from 'localforage';
import { ACTION_TYPES } from './ledActions';
const LedsContext = createContext();

export const LedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ledReducer, initialState());
  const dispatchDebounce = debounce(5, dispatch);
  useEffect(() => {
    localForage.getItem('led_animator_last_state').then((savedState) => {
      savedState.uploadingCode = false;
      savedState.playing = false;
      dispatch({
        type: ACTION_TYPES.SET_SAVED_STATE,
        payload: savedState,
      });
    });
  }, [dispatch]);
  return (
    <LedsContext.Provider value={{ state, dispatch, dispatchDebounce }}>
      {children}
    </LedsContext.Provider>
  );
};

export default LedsContext;
