import { debounce } from 'lodash/fp';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState } from './initialState';
import editorReducer from './editorReducer';
import localForage from 'localforage';
import { ACTION_TYPES } from './editorActions';
import { AuthContext } from '../auth/authContext';
import { downloadProjectFile } from '../../firebase/db';
const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState());
  const { isLoggedIn, userId } = useContext(AuthContext);
  const dispatchDebounce = debounce(5, dispatch);
  useEffect(() => {
    localForage.getItem('led_animator_last_state').then((savedState) => {
      if (savedState) {
        dispatch({
          type: ACTION_TYPES.SET_SAVED_STATE,
          payload: savedState,
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && state.firebaseId) {
      downloadProjectFile(userId, state.firebaseId).then((text) => {
        const serverState = JSON.parse(text);

        if (serverState.savedTime > state.savedTime) {
          dispatch({
            type: ACTION_TYPES.SET_SAVED_STATE,
            payload: serverState,
          });
        }
      });
    }
  }, [isLoggedIn, state.firebaseId, userId, state.savedTime]);

  return (
    <EditorContext.Provider value={{ state, dispatch, dispatchDebounce }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;
