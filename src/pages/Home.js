import Leds from '../components/LedStrip/Leds';
import LedTool from '../components/LedTool';
import PatternTool from '../components/PatternTool';
import Player from '../components/Player';
import SelectionTools from '../components/SelectionTools';

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <h1>FastLED Simulator</h1>
        </div>
      </div>
      <LedTool />
      <SelectionTools />
      <PatternTool />
      <Player />

      <div className="row">
        <div className="col">
          <Leds />
        </div>
      </div>
    </>
  );
};

export default Home;
