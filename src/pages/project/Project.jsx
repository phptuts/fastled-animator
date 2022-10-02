import React, { useState } from 'react';
import { useContext } from 'react';
import Leds from '../../components/LedStrip/Leds';
import Player from '../../components/Player';
import spinner from '../../assets/images/spinner.gif';

import ProjectShowContext from '../../context/project-show/projectShowContext';
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { downloadProjectFile } from '../../firebase/db';
import { ACTION_TYPES } from '../../context/editor/editorActions';
import { DiscussionEmbed } from 'disqus-react';
import { toast } from 'react-toastify';

const Project = () => {
  const { state, dispatch } = useContext(ProjectShowContext);
  const location = useLocation();
  const navigate = useNavigate();
  let { projectId, userId } = useParams();
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    downloadProjectFile(userId, projectId)
      .then((text) => {
        dispatch({
          type: ACTION_TYPES.SET_SAVED_STATE,
          payload: JSON.parse(text),
        });
        setLoadPage(true);
      })
      .catch((e) => {
        toast.error('This project is private!');
        navigate('/');
      });
  }, [projectId, userId, dispatch, navigate]);

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
      <ul className="nav nav-tabs mb-4 mt-5">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/projects/${userId}/${projectId}`}
            end
          >
            Description
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
      <hr className="mb-3" />

      <DiscussionEmbed
        shortname="fastled-animator"
        config={{
          url: 'http://fastledanimator.com' + location.pathname,
          identifier: projectId,
          title: state.title,
        }}
      />
    </>
  );
};

export default Project;
