// https://javascript.plainenglish.io/convert-hex-to-rgb-with-javascript-4984d16219c3
function convertToRGB(hex) {
  var aRgbHex = hex.substring(1, 7).match(/.{1,2}/g);
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

export const patternFrameToCode = (state) => {
  const {
    chipSet,
    timePerStep,
    analogPin,
    rgbOrder,
    numberLeds,
    brightnessLevel,
    patternUsed,
    frames,
  } = state;
  const millisecondsPerStep = Math.round(timePerStep * 1000);

  let framesToCCode = '';
  let reds =
    'byte reds[] = { ' +
    frames[0].leds.map((l) => convertToRGB(l.color)[0]).join(',') +
    '};';
  let greens =
    'byte greens[] = { ' +
    frames[0].leds.map((l) => convertToRGB(l.color)[1]).join(',') +
    '};';

  let blues =
    'byte blues[] = { ' +
    frames[0].leds.map((l) => convertToRGB(l.color)[2]).join(',') +
    '};';

  if (patternUsed === 'right' || patternUsed === 'left') {
    framesToCCode = `\tfor(int i = 0; i < ${state.frames.length}; i += 1) {
        ${
          patternUsed === 'right'
            ? 'shiftRight(reds, greens, blues);'
            : 'shiftLeft(reds, greens, blues);'
        }
        displayLeds(reds, greens, blues);
    }`;
  }

  if (patternUsed === 'bounce_right' || patternUsed === 'bounce_left') {
    framesToCCode = `
    // This means we already displayed this first time through
    bool firstTime = true;
    for(int i = 0; i < ${
      state.frames[0].leds.length + state.addFramesLoop1
    }; i += 1) {
        if (!firstTime) {
            ${
              patternUsed === 'bounce_right'
                ? 'shiftRight(reds, greens, blues);'
                : 'shiftLeft(reds, greens, blues);'
            }
        }
        firstTime = false;
        displayLeds(reds, greens, blues);
    }
    for(int i = 0; i < ${
      state.frames[0].leds.length + state.addFramesLoop2
    }; i += 1) {
        ${
          patternUsed === 'bounce_right'
            ? 'shiftLeft(reds, greens, blues);'
            : 'shiftRight(reds, greens, blues);'
        }
        displayLeds(reds, greens, blues);
    }
    `;
  }

  return `#include <FastLED.h>
#define NUM_LEDS ${numberLeds}
#define DATA_PIN ${analogPin}

CRGB leds[NUM_LEDS];

void shiftRight(byte reds[], byte greens[], byte blues[]) {
    int tempRed = reds[NUM_LEDS - 1];
    int tempGreen = greens[NUM_LEDS - 1];
    int tempBlue = blues[NUM_LEDS - 1];
    for(int ledIndex = NUM_LEDS - 1; ledIndex > 0; ledIndex -= 1) {
        reds[ledIndex] = reds[ledIndex - 1];
        greens[ledIndex] = greens[ledIndex - 1];
        blues[ledIndex] = blues[ledIndex - 1];
    }
    reds[0] = tempRed;
    greens[0] = tempGreen;
    blues[0] = tempBlue;  
}

void shiftLeft(byte reds[], byte greens[], byte blues[]) {
    int tempRed = reds[0];
    int tempGreen = greens[0];
    int tempBlue = blues[0];
    for(int ledIndex = 0; ledIndex < NUM_LEDS - 1; ledIndex += 1) {
        reds[ledIndex] = reds[ledIndex + 1];
        greens[ledIndex] = greens[ledIndex + 1];
        blues[ledIndex] = blues[ledIndex + 1];
    }
    reds[NUM_LEDS - 1] = tempRed;
    greens[NUM_LEDS - 1] = tempGreen;
    blues[NUM_LEDS - 1] = tempBlue;  
}

void displayLeds(byte reds[], byte greens[], byte blues[]) {
    for(int ledIndex = 0; ledIndex < NUM_LEDS; ledIndex += 1) {
        leds[ledIndex].setRGB(reds[ledIndex], greens[ledIndex], blues[ledIndex]);
    }
    FastLED.show();
    delay(${millisecondsPerStep});
}

void setup() {
    FastLED.addLeds<${chipSet}, DATA_PIN, ${rgbOrder}>(leds, NUM_LEDS);
    FastLED.setBrightness(${brightnessLevel});
}

void loop() {
    // We declare these large values here for memory reasons
    ${reds}
    ${greens}
    ${blues}
    
${framesToCCode}
}
    `;
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
  if (state.patternUsed && state.patternUsed !== 'none') {
    return patternFrameToCode(state);
  }
  let framesToCCode = '';

  for (let frameIndex in frames) {
    frameIndex = parseInt(frameIndex);
    framesToCCode += `\n\t//Frame ${frameIndex + 1}\n`;
    const leds = frames[frameIndex].leds;
    let generateCode = false;

    for (let led of leds) {
      if (frameIndex === 0) {
        generateCode = true;
        framesToCCode += ledToCode(led);
        continue;
      }

      const prevLeds = frames[frameIndex - 1].leds;
      const prevLed = prevLeds.find((l) => l.position === led.position);
      if (prevLed.color !== led.color) {
        framesToCCode += ledToCode(led);
        generateCode = true;
      }
    }

    if (generateCode) {
      framesToCCode += '\tFastLED.show();\n';
    }
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
