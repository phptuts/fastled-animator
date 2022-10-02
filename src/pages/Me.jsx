import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/authContext';
import spinner from '../assets/images/spinner.gif';
import {
  getProjectsByUserId,
  getUserDisplayName,
  saveUser,
} from '../firebase/db';
import { useState } from 'react';
import ProjectTable from '../components/ProjectTable';
import { toast } from 'react-toastify';

const Me = () => {
  const { isLoggedIn, userId, firebaseControlled } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (firebaseControlled && userId) {
      getProjectsByUserId(userId)
        .then((projects) => {
          setProjects(projects);
          setLoading(false);
        })
        .catch((e) => {
          toast.error('Error loading projects');
          setLoading(false);
        });

      getUserDisplayName(userId).then((displayName) => {
        setDisplayName(displayName);
      });
    }
  }, [isLoggedIn, userId, firebaseControlled]);

  async function saveDisplayName() {
    try {
      await saveUser(userId, displayName);
      toast.success('Display Name save!');
    } catch (e) {
      toast.error('Error saving display name. :(');
      console.log(e);
    }
  }

  if (loading) {
    return (
      <div className="row mt-4">
        <div className="col">
          <h3 className="text-center">Loading Projects</h3>
          <img className="spinner-image" src={spinner} alt="Loading Project" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Me</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="title" className="form-label">
            Display Name
          </label>
          <input
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            type="text"
            className="form-control"
            id="display-name"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            onClick={saveDisplayName}
            className="btn btn-success w-100 mt-3"
          >
            Save
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h2>My Projects</h2>
        </div>
      </div>
      <ProjectTable showPublished={true} projects={projects} />
    </>
  );
};

export default Me;
