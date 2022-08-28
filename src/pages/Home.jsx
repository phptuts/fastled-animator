import { useContext, useEffect } from 'react';
import Leds from '../components/LedStrip/Leds';
import LedTool from '../components/LedTool';
import Player from '../components/Player';
import SelectionTools from '../components/SelectionTools';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';

const Home = () => {
  const {
    dispatch,
    state: { currentFrameIndex },
  } = useContext(LedsContext);
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
    const mouseDragOn = (e) => {
      dispatch({
        type: ACTION_TYPES.MOUSE_DRAG_ON,
      });
    };
    const mouseDragOff = (e) => {
      dispatch({
        type: ACTION_TYPES.MOUSE_DRAG_OFF,
      });
    };

    window.addEventListener('mousedown', mouseDragOn);
    window.addEventListener('mouseup', mouseDragOff);
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
      window.removeEventListener('mousedown', mouseDragOn);
      window.removeEventListener('mouseup', mouseDragOff);
    };
  }, [dispatch]);
  return (
    <>
      <div className="row mt-3">
        <div className="col">
          <h1>LED Animator</h1>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h2>Frame {currentFrameIndex + 1}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Leds />
        </div>
      </div>
      <Player />
      <SelectionTools />
      <LedTool />
    </>
  );
};

export default Home;
