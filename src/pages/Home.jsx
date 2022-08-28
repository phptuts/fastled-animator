import { useContext, useEffect } from "react";
import Leds from "../components/LedStrip/Leds";
import LedTool from "../components/LedTool";
import PatternTool from "../components/PatternTool";
import Player from "../components/Player";
import SelectionTools from "../components/SelectionTools";
import { ACTION_TYPES } from "../context/led/ledActions";
import LedsContext from "../context/led/ledContext";

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
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <div className="col">
          <h1>LED Animator</h1>
        </div>
      </div>
      <LedTool />
      <SelectionTools />
      <PatternTool />
      <div className="row">
        <div className="col">
          {/* Controls the frames one by one */}
          {/* Double the size of the led component  */}
          {/* Slide select */}
          <button>Back</button>
          <button>Forward</button>
          <button>Random Color</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Leds />
        </div>
      </div>
      <Player />
    </>
  );
};

export default Home;
