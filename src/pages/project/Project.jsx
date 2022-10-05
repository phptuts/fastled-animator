import React, { useState } from 'react';
import { useContext } from 'react';
import Leds from '../../components/LedStrip/Leds';
import Player from '../../components/Player';
import spinner from '../../assets/images/spinner.gif';

import ProjectShowContext from '../../context/project-show/projectShowContext';
import {
  useParams,
  NavLink,
  Outlet,
  useNavigate,
  Link,
} from 'react-router-dom';
import { useEffect } from 'react';
import { downloadProjectFile, getUserDisplayName } from '../../firebase/db';
import { ACTION_TYPES } from '../../context/editor/editorActions';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const Project = () => {
  const { state, dispatch } = useContext(ProjectShowContext);
  const navigate = useNavigate();
  let { projectId, userId } = useParams();
  const [loadPage, setLoadPage] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const cacheKey = useRef('');
  useEffect(() => {
    if (cacheKey.current === `${userId}-${projectId}`) {
      return;
    }
    cacheKey.current = `${userId}-${projectId}`;
    downloadProjectFile(userId, projectId)
      .then(async (text) => {
        console.log('new download');
        const newState = JSON.parse(text);
        dispatch({
          type: ACTION_TYPES.SET_SAVED_STATE,
          payload: newState,
        });

        dispatch({
          type: ACTION_TYPES.CHANGE_POSITION_PLAYER,
          payload: 0,
        });

        try {
          const displayName = await getUserDisplayName(userId);
          setDisplayName(displayName);
        } catch (e) {}

        setLoadPage(true);
      })
      .catch((e) => {
        toast.error('This project is private!');
        navigate('/');
      });
  }, [projectId, userId, dispatch, navigate, state.firebaseId]);

  if (!loadPage) {
    return (
      <div className="row mt-4">
        <div className="col">
          <h3 className="text-center">Loading Project</h3>
          <img className="spinner-image" src={spinner} alt="Loading Project" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <h1>{state.title}</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <Leds editable={false} />
        </div>
      </div>
      <Player editable={false} />
      <div className="row ">
        <div className="col">
          <h3 className="mb-3">
            Created By: <Link to={`/projects/${userId}`}>{displayName}</Link>
          </h3>

          <pre>{state.description}</pre>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4 mt-5">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/projects/${userId}/${projectId}`}
            end
          >
            Comments
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/projects/${userId}/${projectId}/upload`}
          >
            Upload
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/projects/${userId}/${projectId}/downloads`}
          >
            Downloads
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </>
  );
};

export default Project;
