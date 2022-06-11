export const generateFrames = (
  numLeds,
  numSteps,
  millisecondsPerStep,
  currentFrames = []
) => {
  const frames = currentFrames.map((f) => {
    if (f.leds.length === numLeds) {
      return f;
    }

    if (f.leds.length > numLeds) {
      const leds = f.leds.slice(0, numLeds);
      return { ...f, leds };
    }

    let leds = f.leds;
    for (let i = numLeds - f.leds.length - 1; i < numLeds; i += 1) {
      leds.push(generateLed('#000000'), i);
    }
    return { ...f, leds };
  });

  if (frames.length === numSteps) {
    return frames;
  }

  if (frames.length === 0) {
    let frames = [];
    for (let i = 0; i < numSteps; i += 1) {
      frames.push(generateFrame(numLeds));
    }
    return frames;
  } else if (frames.length < numSteps) {
    const lastFrame = { ...frames[frames.length - 1] };
    for (let i = frames.length; i < numSteps; i += 1) {
      frames.push({ ...lastFrame });
    }
    return frames;
  }

  return frames.slice(0, frames.length + 1);
};

const generateFrame = (numLeds) => {
  const leds = generateLeds(numLeds);
  return { leds };
};

export const generateLeds = (numLeds) => {
  let leds = [];

  for (let i = 0; i < numLeds; i += 1) {
    leds.push(generateLed('#000000', i));
  }
  return leds;
};

export const generateLed = (color, position) => {
  return {
    color,
    position,
    selected: false,
  };
};
