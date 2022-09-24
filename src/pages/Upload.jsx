import React, { useContext } from 'react';
import LedsContext from '../context/led/ledContext';
import { frameToCode } from '../framesToCode';
import { toast } from 'react-toastify';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components';
import 'prismjs/components/prism-c.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords.js';
import { useEffect } from 'react';
import ArduinoConfig from '../components/ArduinoConfig';
import AvrGirlArduino from 'avrgirl-arduino/dist/avrgirl-arduino';
import { ACTION_TYPES } from '../context/led/ledActions';
import spinner from '../assets/images/spinner.gif';

const Upload = () => {
  const { state, dispatch } = useContext(LedsContext);

  const uploadCode = async () => {
    dispatch({ type: ACTION_TYPES.ON_UPLOADING_CODE });
    try {
      const hex = await compileCode();
      const enc = new TextEncoder();
      const avrgirl = new AvrGirlArduino();
      avrgirl.flash(enc.encode(hex), (error) => {
        dispatch({ type: ACTION_TYPES.STOP_UPLOADING_CODE });

        if (!error) {
          toast.success('🦄 Upload Complete!!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else {
          console.log(error);
          toast.error('There was an error uploading your code!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: ACTION_TYPES.STOP_UPLOADING_CODE });
      toast.error('There was an error uploading your code!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const compileCode = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    const code = frameToCode(state);
    const response = await fetch(
      `https://compile.electroblocks.org/upload-code/${state.microController}`,
      {
        method: 'POST',
        body: code,
        headers,
      }
    );

    return await response.text();
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [state]);
  return (
    <>
      <div className="row mb-2 mt-2">
        <div className="col">
          <h2>Upload Code</h2>
        </div>
      </div>
      <ArduinoConfig />
      <div className="row mt-3 mb-3">
        {state.uploadingCode && (
          <div className="col">
            <h3 className="text-center">Uploading Code</h3>
            <img className="spinner-image" src={spinner} alt="uploading code" />
          </div>
        )}
        {!state.uploadingCode && (
          <div className="col">
            <button onClick={uploadCode} className="btn btn-success w-100">
              Upload Code
            </button>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col">
          <h3>Code</h3>
        </div>
      </div>
      <pre className="line-numbers language-c ">
        <code className="language-c">{frameToCode(state)}</code>
      </pre>
    </>
  );
};

export default Upload;
