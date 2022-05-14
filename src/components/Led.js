import React from 'react';
import './Led.css';

const Led = ({ color, width, height, position }) => {
  return (
    <div style={{ width: width + 'px', height: height + 'px' }} className="led">
      <div
        style={{
          backgroundColor: color,
          height: height / 2 + 'px',
          width: height / 2 + 'px',
        }}
        className="light"
      >
        {position}
      </div>
    </div>
  );
};

export default Led;
