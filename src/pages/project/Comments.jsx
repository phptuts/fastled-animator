import React, { useContext } from 'react';
import ProjectShowContext from '../../context/project-show/projectShowContext';
import { DiscussionEmbed } from 'disqus-react';
import { useLocation, useParams } from 'react-router-dom';

const Comments = () => {
  const { state } = useContext(ProjectShowContext);
  const location = useLocation();
  let { projectId } = useParams();

  return (
    <DiscussionEmbed
      shortname="fastled-animator"
      config={{
        url: 'http://fastledanimator.com' + location.pathname,
        identifier: projectId,
        title: state.title,
      }}
    />
  );
};

export default Comments;
