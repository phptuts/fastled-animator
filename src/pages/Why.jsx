import React from 'react';

const Why = () => {
  return (
    <>
      <div className="row mb-4 mt-3">
        <div className="col">
          <h1 className="text-left">Why FastLED Animator?</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>
            My mission is to empower noncoders to make art with RGB-led light
            strips. Not knowing how to code should not stop you from creating. I
            want to enable artists, hobbyists, and the curious to build amazing
            things. If you have any feedback or use cases, please email me at
            glaserpower [] gmail.com.
          </p>
          <p>
            The code used to run the rgb LEDs on the Arduino is{' '}
            <a href="https://fastled.io/">FastLED Library</a>. It's a free,
            open-source project. I would not have been able to build the website
            without them. Thank you{' '}
            <a href="https://github.com/focalintent">focalintent</a> and{' '}
            <a href="https://github.com/kriegsman">kriegsman</a> for this making
            possible!
          </p>
          <p>
            The <a href="https://github.com/phptuts/fastled-animator"> code</a>{' '}
            for this site is open source. If you would like to contribute please
            create an issue, make pull request or just email me. :)
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h2>Origin Story :)</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="text-center my-5 ratio ratio-16x9">
            <iframe
              title="Origin Story for fastled animator"
              src="//www.youtube.com/embed/g6CkVp1Gexc"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Why;
