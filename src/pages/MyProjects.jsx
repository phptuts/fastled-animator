import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/authContext';
import spinner from '../assets/images/spinner.gif';
import { getProjectsByUserId } from '../firebase/db';
import { useState } from 'react';
import ProjectTable from '../components/ProjectTable';

const MyProjects = () => {
  const { isLoggedIn, userId, firebaseControlled } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (firebaseControlled && userId) {
      getProjectsByUserId(userId)
        .then((projects) => {
          setProjects(projects);
        })
        .catch(console.log);
    }
  }, [isLoggedIn, userId, firebaseControlled]);

  if (!firebaseControlled) {
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
      <div className="row mt-3">
        <div className="col">
          <h1>My Projects</h1>
        </div>
      </div>
      <ProjectTable projects={projects} />
    </>
  );
};

export default MyProjects;
