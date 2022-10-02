import React, { useContext } from 'react';
import ProjectShowContext from '../../context/project-show/projectShowContext';
import { frameToCode } from '../../framesToCode';
import { saveAs } from 'file-saver';

const Downloads = () => {
  const { state } = useContext(ProjectShowContext);

  const onDownloadCode = () => {
    saveAs(
      new Blob([frameToCode(state)], { type: 'text/play;charset=utf-8' }),
      `${state.title || 'led-animator'}.ino`
    );
  };
  const onDownloadProject = () => {
    saveAs(
      new Blob([JSON.stringify(state)], { type: 'text/json;charset=utf-8' }),
      `${state.title || 'led-animator'}.json`
    );
  };
  return (
    <>
      <div className="row mt-3">
        <div className="col">
          <button
            onClick={onDownloadProject}
            className="btn w-100 btn-lg btn-primary"
          >
            Download Project File
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <button
            onClick={onDownloadCode}
            className="btn w-100 btn-lg btn-success"
          >
            Download Arduino Code
          </button>
        </div>
      </div>
    </>
  );
};

export default Downloads;
