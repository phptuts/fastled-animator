import { createContext, useReducer } from 'react';
import { initialState } from '../editor/initialState';
import { debounce } from 'lodash/fp';
import editorReducer from '../editor/editorReducer';

const ProjectShowContext = createContext();

export const ProjectShowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState());
  const dispatchDebounce = debounce(5, dispatch);

  return (
    <ProjectShowContext.Provider value={{ state, dispatch, dispatchDebounce }}>
      {children}
    </ProjectShowContext.Provider>
  );
};

export default ProjectShowContext;
