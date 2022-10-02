import React, { useState } from 'react';
import { useEffect } from 'react';
import { getMostRecentProjects } from '../firebase/db';
import spinner from '../assets/images/spinner.gif';
import { toast } from 'react-toastify';
import ProjectTable from '../components/ProjectTable';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMostRecentProjects(50)
      .then((projects) => {
        setProjects(projects);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);

        toast.error('Error loading projects :<');
      });
  }, []);

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
      <div className="row mt-3 mb-3">
        <div className="col">
          <h1>Recently Published Projects</h1>
        </div>
      </div>
      <ProjectTable projects={projects} />
    </>
  );
};

export default Projects;
