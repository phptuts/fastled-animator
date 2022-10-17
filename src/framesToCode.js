// https://javascript.plainenglish.io/convert-hex-to-rgb-with-javascript-4984d16219c3
function convertToRGB(hex) {
  var aRgbHex = hex.substring(1, 7).match(/.{1,2}/g);
  return [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
}

const ledToCode = ({ color, position }) => {
  const [r, g, b] = convertToRGB(color);
  return `leds[${position}].setRGB(${r}, ${g}, ${b});\n`;
};

const patternCode = (pattern) => {
  switch (pattern) {
    case 'right':
      return 'shiftRight();';
    case 'left':
      return 'shiftLeft();';
    case 'bounce_right':
      return 'bounceRight();';
    default:
      return 'bounceLeft();';
  }
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

  const ledsFrame1 = frames[0].leds
    .map((led) => '\t' + ledToCode(led))
    .join('');
  return `#include <FastLED.h>
#define NUM_LEDS ${numberLeds}
#define DATA_PIN ${analogPin}
#define BOUNCE_SWITCH ${state.frames[0].leds.length + state.addFramesLoop1 - 1}
#define MAX_FRAMES ${frames.length - 1}

CRGB leds[NUM_LEDS];
int frameIndex = 0;

void shiftRight() {
    CRGB tempColor = leds[NUM_LEDS - 1];
    for(int ledIndex = NUM_LEDS - 1; ledIndex > 0; ledIndex -= 1) {
        leds[ledIndex].setRGB(leds[ledIndex - 1].r, leds[ledIndex - 1].g, leds[ledIndex - 1].b);
    }
    leds[0] = tempColor; 
}

void shiftLeft() {
    CRGB tempColor = leds[0];
    for(int ledIndex = 0; ledIndex < NUM_LEDS - 1; ledIndex += 1) {
        leds[ledIndex].setRGB(leds[ledIndex + 1].r, leds[ledIndex + 1].g, leds[ledIndex + 1].b);
    }
    leds[NUM_LEDS - 1] = tempColor; 
}

int nextFrameIndex() {
  if (frameIndex < MAX_FRAMES) {
      return frameIndex + 1;
    } else {
      return 0;
    }
}

void bounceRight() {
  if (frameIndex < BOUNCE_SWITCH) {
      shiftRight();
  } else {
      shiftLeft();
  }
  frameIndex = nextFrameIndex(); 
}

void bounceLeft() {
  if (frameIndex < BOUNCE_SWITCH) {
      shiftLeft();
  } else {
      shiftRight();
  }
  frameIndex = nextFrameIndex(); 
}

void setup() {
    FastLED.addLeds<${chipSet}, DATA_PIN, ${rgbOrder}>(leds, NUM_LEDS);
    FastLED.setBrightness(${brightnessLevel});
    FastLED.clear();
    // Frame 1
${ledsFrame1}
}

void loop() {
    EVERY_N_MILLISECONDS(${millisecondsPerStep}) {
        ${patternCode(patternUsed)}
    }
    FastLED.show();
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
  const ledsFrame1 = frames[0].leds
    .map((led) => '\t' + ledToCode(led))
    .join('');
  const caseStatements = frames
    .map((frame, frameIndex) => {
      let ledsCode = '';
      for (let led of frame.leds) {
        if (frameIndex === 0) {
          ledsCode += '\t\t\t' + ledToCode(led);
          continue;
        }
        const prevLeds = frames[frameIndex - 1].leds;
        const prevLed = prevLeds.find((l) => l.position === led.position);
        if (prevLed.color !== led.color) {
          ledsCode += '\t\t\t' + ledToCode(led);
        }
      }

      return `\t\tcase ${frameIndex}:
${ledsCode}\t\t\tbreak;
`;
    })
    .join('');

  return `#include <FastLED.h>
#define NUM_LEDS ${numberLeds}
#define DATA_PIN ${analogPin}
#define MAX_FRAMES ${frames.length}

CRGB leds[NUM_LEDS];
int frameIndex = 0;

int nextFrameIndex() {
  if (frameIndex < MAX_FRAMES - 1) {
      return frameIndex + 1;
    } else {
      return 0;
    }
}

void setup() {
    FastLED.addLeds<${chipSet}, DATA_PIN, ${rgbOrder}>(leds, NUM_LEDS);
    FastLED.setBrightness(${brightnessLevel});
    // Frame 1
${ledsFrame1}
}



void loop() {
    EVERY_N_MILLISECONDS(${millisecondsPerStep}) {
        frameIndex = nextFrameIndex();
        setColors();
    }
    FastLED.show();
}

void setColors() {
    switch (frameIndex) {
${caseStatements}
    }
}
    `;
};
