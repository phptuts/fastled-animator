import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/authContext';
import { ACTION_TYPES } from '../context/editor/editorActions';
import EditorContext from '../context/editor/editorContext';
import { downloadProjectFile } from '../firebase/db';

const ProjectTable = ({ projects }) => {
  const { userId } = useContext(AuthContext);
  const { dispatch } = useContext(EditorContext);
  const navigate = useNavigate();
  const navigateToView = (project) => {
    navigate(`/projects/${project.userId}/${project.id}`);
  };

  const onEdit = async (project) => {
    const text = await downloadProjectFile(project.userId, project.id);
    dispatch({
      type: ACTION_TYPES.RESIZE_PIXELS,
      payload: window.screen.width,
    });
    dispatch({ type: ACTION_TYPES.SET_SAVED_STATE, payload: JSON.parse(text) });
    navigate('/create');
  };

  return (
    <div className="row mt-3">
      <div className="col">
        <table className="table table-striped  w-100">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Description</th>
              <th scope="col">Published</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => {
              return (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{p.published ? 'yes' : 'no'}</td>
                  <td>
                    <button
                      onClick={() => navigateToView(p)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                  {p.userId === userId && (
                    <td>
                      <button
                        onClick={() => onEdit(p)}
                        className="btn btn-success"
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
