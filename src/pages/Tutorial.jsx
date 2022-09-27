import React from 'react';

const Tutorial = () => {
  return (
    <>
      <div className="row mb-4 mt-3">
        <div className="col">
          <h1 className="text-left">FastLED Animator Tutorial</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>
            Everything you wanted to know about FastLED Animator but were afraid
            to ask.
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div class="text-center my-5 ratio ratio-16x9">
            <iframe src="//www.youtube.com/embed/K8jEDaRds6A"></iframe>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Uploading Code to Arduino generated from the site</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div class="text-center my-5 ratio ratio-16x9">
            <iframe src="//www.youtube.com/embed/k2DR5a1SokY"></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutorial;
