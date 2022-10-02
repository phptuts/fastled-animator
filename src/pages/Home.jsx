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
          <div className="text-center ">
            <iframe
              width="560"
              height="430"
              src="https://www.youtube.com/embed/900u02AsfJQ"
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
