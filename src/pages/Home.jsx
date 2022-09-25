import { useContext, useEffect } from 'react';
import Leds from '../components/LedStrip/Leds';
import LedTool from '../components/LedTool';
import Player from '../components/Player';
import SelectionTools from '../components/SelectionTools';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const { dispatch } = useContext(LedsContext);
  const navigate = useNavigate();
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
      <div className="row mt-3 mb-2">
        <div className="col">
          <h1>FastLED Animator</h1>
        </div>
      </div>
      <LedTool />

      <div className="row mt-4">
        <div className="col">
          <Leds />
        </div>
      </div>

      <Player />
      <SelectionTools />
      <div className="row mb-3">
        <div className="col">
          <button
            onClick={() => navigate('/upload')}
            className="btn btn-success w-100 btn-lg"
          >
            Upload Code Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
