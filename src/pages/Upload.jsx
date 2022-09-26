import React, { useContext, useEffect, useRef } from 'react';
import LedsContext from '../context/led/ledContext';
import { frameToCode } from '../framesToCode';
import { toast } from 'react-toastify';
import ArduinoConfig from '../components/ArduinoConfig';
import AvrGirlArduino from 'avrgirl-arduino/dist/avrgirl-arduino';
import { ACTION_TYPES } from '../context/led/ledActions';
import spinner from '../assets/images/spinner.gif';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import Code from '../components/Code';
import { useState } from 'react';

const Upload = () => {
  const { state, dispatch } = useContext(LedsContext);
  const isMounted = useRef(false);

  const [codeState, setCodeState] = useState('loading');
  const [hasError, setHasError] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!isMounted.current) {
      let currentCode = frameToCode(state);
      if (currentCode.split(/\r\n|\r|\n/).length > 2000) {
        setCodeState('no-code');
      } else {
        setCodeState('code');
        setCode(frameToCode(state));
      }
    } else {
      if (codeState === 'code') {
        setCode(frameToCode(state));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const downloadCode = () => {
    saveAs(
      new Blob([frameToCode(state)], { type: 'text/play;charset=utf-8' }),
      'led-animator.ino'
    );
  };
  const uploadCode = async () => {
    dispatch({ type: ACTION_TYPES.ON_UPLOADING_CODE });
    try {
      const hex = await compileCode();
      const enc = new TextEncoder();
      const avrgirl = new AvrGirlArduino();
      // This is a fail safe in case it stuck or in error state
      // that the function can not catch
      setTimeout(() => {
        if (state.uploadingCode) {
          dispatch({ type: ACTION_TYPES.STOP_UPLOADING_CODE });
          setHasError(true);
        }
      }, 25000);
      avrgirl.flash(enc.encode(hex), (error) => {
        dispatch({ type: ACTION_TYPES.STOP_UPLOADING_CODE });

        if (!error) {
          setHasError(false);
          toast.success('🦄 Upload Complete!!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else {
          console.log(error, 'avrgirl-error');
          setHasError(true);
          toast.error('There was an error uploading your code!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      });
    } catch (e) {
      console.log(e, 'compiling error');
      setHasError(true);
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
        {!state.uploadingCode && codeState === 'code' && !hasError && (
          <div className="col">
            <button onClick={uploadCode} className="btn btn-success w-100">
              Upload Code
            </button>
          </div>
        )}
        {hasError && (
          <div className="col">
            <div className="alert alert-danger mt-3" role="alert">
              <strong>Error</strong> Error trying uplaod your code. Consider{' '}
              <span className="clickable" onClick={downloadCode}>
                downloading the code
              </span>
              . You can use the <Link to="/tutorial">tutorial page</Link> to
              learn how to upload the code using the Arduino IDE.
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col">
          <h3>Code</h3>
        </div>
      </div>
      {codeState === 'no-code' && (
        <div className="row">
          <div className="col">
            <div className="alert alert-warning mt-3" role="alert">
              The code is too large to upload web. Consider{' '}
              <span className="clickable" onClick={downloadCode}>
                downloading the code
              </span>
              . You can use the <Link to="/tutorial">tutorial page</Link> to
              learn how to upload the code using the Arduino IDE.
            </div>
          </div>
        </div>
      )}
      {codeState === 'loading' && (
        <div className="col">
          <h3 className="text-center">Generating Code</h3>
          <img className="spinner-image" src={spinner} alt="uploading code" />
        </div>
      )}
      {codeState === 'code' && code && <Code code={code} />}
    </>
  );
};

export default Upload;
