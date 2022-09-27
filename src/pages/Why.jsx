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
            My mission is to empower non coders make art with rgb led
            lightstrips. I feel that not knowing how to code should not stop you
            from creating. I want to empower artist, hobbiest and the curious to
            build amazing things. If you have any feedback or use cases, please
            email me at glaserpower [] gmail.com.
          </p>
          <p>
            The code used to run every on the Arduino is{' '}
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
          <div class="text-center my-5 ratio ratio-16x9">
            <iframe src="//www.youtube.com/embed/xf72kJfU0lk"></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Why;
