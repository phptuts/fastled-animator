export const generateLeds = (numLeds) => {
  let leds = [];

  for (let i = 0; i < numLeds; i += 1) {
    leds.push(generateLed('#AA00AA', i));
  }
  return leds;
};

export const generateLed = (color, position) => {
  return {
    color,
    position,
  };
};
