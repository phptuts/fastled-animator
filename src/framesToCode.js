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
  let showNextFrameControlDirection = ``;
  const colorHexArray =
    "{" +
    frames[0].leds.map(({ color }) => `0x${color.substring(1, 7)}`).join(",") +
    "}";

  switch (patternUsed) {
    case "right":
      showNextFrameControlDirection = `shiftRight(colors);`;
      break;
    case "left":
      showNextFrameControlDirection = `shiftLeft(colors);`;
      break;
    case "bounce_right":
      showNextFrameControlDirection = `
      if (frame < BOUNCE_SWITCH) {
            shiftRight(colors);
            Serial.println("CALLED SHIFT RIGHT | FRAME " + String(frame) + " | FRAME INDEX " + String(frameIndex));
      } else {
            shiftLeft(colors);
            Serial.println("CALLED SHIFT LEFT  | FRAME " + String(frame) + " | FRAME INDEX " + String(frameIndex));
      }
      `;
      break;
    default:
      showNextFrameControlDirection = `
      if (frame < BOUNCE_SWITCH) {
          shiftLeft(colors);
          Serial.println("CALLED SHIFT LEFT  | FRAME " + String(frame) + " | FRAME INDEX " + String(frameIndex));
      } else {
          shiftRight(colors);
          Serial.println("CALLED SHIFT RIGHT | FRAME " + String(frame) + " | FRAME INDEX " + String(frameIndex));
      }
      `;
  }

  let showNextFramFunction = `
void showFrame(uint32_t colors[], int frameIndex) {
  if (frameIndex == 0) {
      displayLeds(colors);
      return;
  }

  for (int frame = 0; frame < MAX_FRAMES; frame += 1) {
    // This because 0 should not shift the frame
    if (frame == 0) {
      continue;
    }
    
    ${showNextFrameControlDirection}

    if (frame == frameIndex) {
      displayLeds(colors);
      return;
    }
  }
}
  `;

  return `#include <FastLED.h>
#define NUM_LEDS ${numberLeds}
#define DATA_PIN ${analogPin}
#define BOUNCE_SWITCH ${state.frames[0].leds.length + state.addFramesLoop1}
#define MAX_FRAMES ${frames.length}

CRGB leds[NUM_LEDS];
int frameIndex = 0;
long nextMillis = 0;

void shiftRight(uint32_t colors[]) {
    uint32_t tempColor = colors[NUM_LEDS - 1];
    for(int ledIndex = NUM_LEDS - 1; ledIndex > 0; ledIndex -= 1) {
        colors[ledIndex] = colors[ledIndex - 1];
    }
    colors[0] = tempColor; 
}

void shiftLeft(uint32_t colors[]) {
    uint32_t tempColor = colors[0];
    
    for(int ledIndex = 0; ledIndex < NUM_LEDS - 1; ledIndex += 1) {
        colors[ledIndex] = colors[ledIndex + 1];
    }
    colors[NUM_LEDS - 1] = tempColor;
}

void displayLeds(uint32_t colors[]) {
    for(int ledIndex = 0; ledIndex < NUM_LEDS; ledIndex += 1) {
        Serial.println("LED " + String(ledIndex) + " | COLOR " + String(colors[ledIndex]));
        leds[ledIndex] = CRGB(colors[ledIndex]);
    }
    FastLED.show();
}

void setup() {
    Serial.begin(115200);
    FastLED.addLeds<${chipSet}, DATA_PIN, ${rgbOrder}>(leds, NUM_LEDS);
    FastLED.setBrightness(${brightnessLevel});
    FastLED.clear();
}

int nextFrameIndex(int frameIndex) {
  if (frameIndex < MAX_FRAMES - 1) {
      return frameIndex + 1;
    } else {
      return 0;
    }
}

${showNextFramFunction}

void loop() {
     
      if (millis() > nextMillis) {
        Serial.println("FRAME INDEX: " + String(frameIndex));
        // We declare these large values here for memory reasons
        uint32_t startColors[] = ${colorHexArray};
        showFrame(startColors, frameIndex);
        frameIndex = nextFrameIndex(frameIndex);
        nextMillis = ${millisecondsPerStep} + millis();
      }
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
  if (state.patternUsed && state.patternUsed !== "none") {
    return patternFrameToCode(state);
  }
  let framesToCCode = "";

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
      framesToCCode += "\tFastLED.show();\n";
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
