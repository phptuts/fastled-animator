import { cloneDeep } from 'lodash';

export const generateFrames = (numLeds, numSteps, currentFrames = []) => {
  const frames = currentFrames.map((f) => {
    if (f.leds.length === numLeds) {
      return f;
    }

    if (f.leds.length > numLeds) {
      const leds = f.leds.slice(0, numLeds);
      return { ...f, leds };
    }

    let leds = f.leds;
    for (let i = f.leds.length; i < numLeds; i += 1) {
      leds.push(generateLed('#000000', i));
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

  // If it's less
  return frames.slice(0, numSteps);
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

const moveLeds = (direction, leds) => {
  if (direction === 'right') {
    const lastTempLed = leds.pop();
    leds.unshift(lastTempLed);
  } else {
    const firstLed = leds.shift();
    leds.push(firstLed);
  }

  leds = leds.map((led, index) => {
    return { ...led, position: index };
  });

  return { leds: cloneDeep(leds) };
};

const getDirection = (direction, loop) => {
  if (loop === 1 && direction === 'bounce_right') {
    return 'right';
  } else if (loop === 2 && direction === 'bounce_right') {
    return 'left';
  } else if (loop === 1 && direction === 'bounce_left') {
    return 'left';
  } else if (loop === 2 && direction === 'bounce_left') {
    return 'right';
  }

  return direction;
};

export const generatePattern = (direction, previousState) => {
  const firstFrame = previousState.frames[0];
  const newFrames = [cloneDeep(firstFrame)];
  let frameLength = firstFrame.leds.length - 1;
  const useLongerLength = direction.indexOf('bounce') === -1;
  for (let i = 0; i < frameLength; i += 1) {
    const leds = cloneDeep(newFrames[newFrames.length - 1].leds);
    newFrames.push(moveLeds(getDirection(direction, 1), leds));
  }
  frameLength += useLongerLength ? 1 : -1;
  for (let i = 0; i < frameLength; i += 1) {
    const leds = cloneDeep(newFrames[newFrames.length - 1].leds);
    newFrames.push(moveLeds(getDirection(direction, 2), leds));
  }

  return cloneDeep({
    ...previousState,
    frames: newFrames,
    totalSteps: newFrames.length,
  });
};
