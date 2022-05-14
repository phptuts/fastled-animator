import React from 'react';
import './Led.css';

const Led = ({ color, width, height }) => {
  return (
    <div style={{ width: width + 'px', height: height + 'px' }} className="led">
      <div
        style={{
          backgroundColor: color,
          height: height / 2 + 'px',
          width: height / 2 + 'px',
        }}
        className="light"
      ></div>
    </div>
  );
};

export default Led;
