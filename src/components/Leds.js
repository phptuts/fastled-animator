import React from 'react';
import Led from './Led';
import './Leds.css';

const Leds = () => {
  return (
    <div id="leds">
      <Led color="#00AA00" height={50} width={70} />
      <Led color="#AA0000" height={50} width={70} />
      <Led color="#0000AA" height={50} width={70} />
      <Led color="#AA00AA" height={50} width={70} />
    </div>
  );
};

export default Leds;
