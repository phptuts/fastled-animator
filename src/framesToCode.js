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

  const framesToCCode = frames
    .map((frame, index) => {
      return (
        `    // Frame ${index + 1}\n` +
        frame.leds
          .map(({ color, position }) => {
            const [r, g, b] = convertToRGB(color);
            return `\tsetFastLEDColor(${position}, {${r}, ${g}, ${b}});\n`;
          })
          .join('') +
        `    FastLED.show();
    delay(${millisecondsPerStep});
          `
      );
    })
    .join(`\n`);

  return `
struct RGB {
  int red;
  int green;
  int blue;
};

#include <FastLED.h>
#define NUM_LEDS ${numberLeds}
#define DATA_PIN ${analogPin}
CRGB leds[NUM_LEDS];

void setFastLEDColor(int pos, struct RGB color) {
    leds[pos].setRGB(color.red, color.green, color.blue);
}

void setup() {

    FastLED.addLeds<${chipSet}, DATA_PIN, ${rgbOrder}>(leds, NUM_LEDS);
    FastLED.setBrightness(${brightnessLevel});

}

void loop() {
${framesToCCode}
}
    `;
};
