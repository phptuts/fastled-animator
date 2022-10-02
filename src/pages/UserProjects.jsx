import React, { useEffect } from 'react';

import spinner from '../assets/images/spinner.gif';
import {
  getPublishedProjectsByUserId,
  getUserDisplayName,
} from '../firebase/db';
import { useState } from 'react';
import ProjectTable from '../components/ProjectTable';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UserProjects = () => {
  const [projects, setProjects] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      getPublishedProjectsByUserId(userId)
        .then((projects) => {
          setProjects(projects);
          setLoading(false);
        })
        .catch((e) => {
          toast.error('Error loading projects');
        });
      getUserDisplayName(userId).then((displayName) => {
        setDisplayName(displayName);
        setLoading(false);
      });
    }
  }, [userId]);
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
      <div className="row mt-3">
        <div className="col">
          <h1>Projects By: {displayName}</h1>
        </div>
      </div>
      <ProjectTable projects={projects} />
    </>
  );
};

export default UserProjects;
