import { useContext, useEffect } from 'react';
import Leds from '../components/LedStrip/Leds';
import LedTool from '../components/LedTool';
import PatternTool from '../components/PatternTool';
import Player from '../components/Player';
import SelectionTools from '../components/SelectionTools';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const Home = () => {
  const { dispatch } = useContext(LedsContext);
  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.RESIZE_PIXELS,
      payload: window.outerWidth,
    });
    const resizeWindow = (e) => {
      dispatch({
        type: ACTION_TYPES.RESIZE_PIXELS,
        payload: e.target.outerWidth,
      });
    };
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [dispatch]);
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
