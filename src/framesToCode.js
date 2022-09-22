// https://javascript.plainenglish.io/convert-hex-to-rgb-with-javascript-4984d16219c3
function convertToRGB(hex) {
  var aRgbHex = hex.substring(1, 6).match(/.{1,2}/g);
  var aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
  return aRgb;
}

const ledToCode = ({ color, position }) => {
  const [r, g, b] = convertToRGB(color);
  return `\tleds[${position}].setRGB(${r}, ${g}, ${b});\n`;
};

export const frameToCode = (state) => {
  const {
    chipSet,
    timePerStep,
    analogPin,
    rgbOrder,
    numberLeds,
    brightnessLevel,
    frames,
  } = state;
  const millisecondsPerStep = Math.round(timePerStep * 1000);

  let framesToCCode = '';

  for (let frameIndex in frames) {
    frameIndex = parseInt(frameIndex);
    framesToCCode += `\n\t//Frame ${frameIndex + 1}\n`;
    const leds = frames[frameIndex].leds;
    for (let led of leds) {
      if (frameIndex === 0) {
        framesToCCode += ledToCode(led);
        continue;
      }

      const prevLeds = frames[frameIndex - 1].leds;
      const prevLed = prevLeds.find((l) => l.position === led.position);

      if (prevLed.color !== led.color) {
        framesToCCode += ledToCode(led);
      }
    }
    framesToCCode += '\tFastLED.show();\n';
    framesToCCode += `\tdelay(${millisecondsPerStep});\n`;
  }

  return `#include <FastLED.h>
#define NUM_LEDS ${numberLeds}
#define DATA_PIN ${analogPin}
CRGB leds[NUM_LEDS];

void setup() {
    FastLED.addLeds<${chipSet}, DATA_PIN, ${rgbOrder}>(leds, NUM_LEDS);
    FastLED.setBrightness(${brightnessLevel});
}

void loop() {
${framesToCCode}
}
    `;
};
