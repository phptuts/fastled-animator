import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col text-center">
          <h1>FastLED Animator</h1>
          <p>Make amazing led art without having to learn how to code!</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Demo</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="text-center ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/E4Oqn3NQUi4?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <Link to="/create" className="btn btn-primary w-100 btn-lg">
            Create
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <Link to="/tutorial" className="btn btn-success w-100 btn-lg">
            Tutorial
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
