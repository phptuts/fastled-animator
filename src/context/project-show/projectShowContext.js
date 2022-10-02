import { createContext, useReducer } from 'react';
import { initialState } from '../editor/initialState';
import projectShowReducer from './projectShowReducer';
import { debounce } from 'lodash/fp';

const ProjectShowContext = createContext();

export const ProjectShowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectShowReducer, initialState());
  const dispatchDebounce = debounce(5, dispatch);

  return (
    <ProjectShowContext.Provider value={{ state, dispatch, dispatchDebounce }}>
      {children}
    </ProjectShowContext.Provider>
  );
};

export default ProjectShowContext;
