import React, { useContext } from 'react';
import ProjectShowContext from '../../context/project-show/projectShowContext';

const Description = () => {
  const { state } = useContext(ProjectShowContext);

  return (
    <div className="row">
      <div className="col">
        <pre>{state.description}</pre>
      </div>
    </div>
  );
};

export default Description;
