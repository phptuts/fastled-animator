import { generateFrames } from '../../leds';

export const initialState = () => {
  return {
    startDragSelection: false,
    dragMode: 'paint',
    chipSet: 'WS2811',
    microController: 'uno',
    addFramesLoop1: 0,
    addFramesLoop2: 0,
    analogPin: 'A0',
    rgbOrder: 'GRB',
    brightnessLevel: 10,
    currentFrameIndex: 0,
    totalSteps: 50,
    timePerStep: 0.5,
    numberLeds: 30,
    playing: false,
    frames: generateFrames(30, 50, []),
    ledsHorizontal: 33,
    ledsVertical: 1,
    fullStripLength: 66,
    pixelAreaWidth: 1000,
    selectedColor: '#AA0000',
    mouseDragSelect: false,
    selectionMode: 'none',
    rightMarginForRightVertical: 960,
    uploadingCode: false,
    compilingCode: false,
    pattern: 'right',
  };
};
