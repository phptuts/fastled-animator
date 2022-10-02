import React, { useContext, useRef } from 'react';
import { frameToCode } from '../../framesToCode';
import { saveAs } from 'file-saver';
import EditorContext from '../../context/editor/editorContext';
import { ACTION_TYPES } from '../../context/editor/editorActions';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
import { saveProject, togglePublish } from '../../firebase/db';
import spinner from '../../assets/images/spinner.gif';

const Settings = () => {
  const { state, dispatch } = useContext(EditorContext);
  const { isLoggedIn, userId } = useContext(AuthContext);
  const inputFile = useRef(null);

  const uploadProject = () => {
    inputFile.current.click();
  };
  const onDownloadProject = () => {
    saveAs(
      new Blob([JSON.stringify(state)], { type: 'text/json;charset=utf-8' }),
      `${state.title || 'led-animator'}.json`
    );
  };

  const onSaveProject = async () => {
    dispatch({
      type: ACTION_TYPES.SET_SAVING,
      payload: true,
    });
    try {
      const firebaseId = await saveProject(state, userId);
      dispatch({ type: ACTION_TYPES.SET_FIREBASE_ID, payload: firebaseId });
      toast.success('Project saved to the cloud!');
    } catch (e) {
      toast.error('Error saving project to the cloud');
      console.log(e);
    }

    dispatch({
      type: ACTION_TYPES.SET_SAVING,
      payload: false,
    });
  };

  const onTogglePublish = async () => {
    dispatch({
      type: ACTION_TYPES.SET_SAVING,
      payload: true,
    });
    try {
      const published = !state.published;
      console.log(published);
      await togglePublish(state.firebaseId, published);
      dispatch({ type: ACTION_TYPES.SET_PUBLISHED, payload: published });
      toast.success(
        published
          ? 'Your project visible to the world!'
          : 'You project is now private.'
      );
    } catch (e) {
      toast.error('Error saving project to the cloud');
      console.log(e);
    }

    dispatch({
      type: ACTION_TYPES.SET_SAVING,
      payload: false,
    });
  };

  const onDownloadCode = () => {
    saveAs(
      new Blob([frameToCode(state)], { type: 'text/play;charset=utf-8' }),
      `${state.title || 'led-animator'}.ino`
    );
  };
  const uploadFile = (e) => {
    const files = e.target.files;

    if (files.length !== 1) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      dispatch({
        type: ACTION_TYPES.OPEN_NEW_PROGRAM,
        payload: JSON.parse(reader.result),
      });
      toast.success('Project Open!!');
    };
    reader.readAsText(files[0]);
  };

  return (
    <>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={uploadFile}
      />
      <div className="row">
        <div className="col">
          <label htmlFor="title" className="form-label">
            Project Name
          </label>
          <input
            value={state.title}
            type="text"
            className="form-control"
            id="project-name"
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.CHANGE_PROJECT_NAME,
                payload: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <label htmlFor="title" className="form-label">
            Description
          </label>
          <textarea
            value={state.description}
            className="form-control"
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPES.CHANGE_PROJECT_DESCRIPTION,
                payload: e.target.value,
              });
            }}
            rows={10}
          ></textarea>
        </div>
      </div>
      {state.saving && (
        <>
          <div className="col">
            <h3 className="text-center">Uploading Code</h3>
            <img className="spinner-image" src={spinner} alt="uploading code" />
          </div>
        </>
      )}
      {isLoggedIn && !state.saving && (
        <>
          <div className="row mt-4">
            <div className="col">
              <button onClick={onSaveProject} className="btn btn-success w-100">
                Save to cloud
              </button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <button
                onClick={onTogglePublish}
                className={`btn ${
                  state.published ? 'btn-danger' : 'btn-primary'
                } w-100`}
              >
                {state.published ? 'Make Private' : 'Make Public'}
              </button>
            </div>
          </div>
        </>
      )}
      {!isLoggedIn && (
        <div className="row mt-4">
          <div className="col">
            <div className="alert alert-warning">
              If you want to publish your project you need to{' '}
              <Link to="/login">login</Link>.
            </div>
          </div>
        </div>
      )}
      <div className="row mt-3">
        <div className="col">
          <button onClick={uploadProject} className="btn btn-warning w-100">
            Open Project
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <button
            onClick={onDownloadProject}
            className="btn btn-secondary w-100"
          >
            Download Project File
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <button onClick={onDownloadCode} className="btn btn-secondary w-100">
            Download Arduino Code
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
