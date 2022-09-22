import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ACTION_TYPES } from '../context/led/ledActions';
import LedsContext from '../context/led/ledContext';
import { frameToCode } from '../framesToCode';
import { saveAs } from 'file-saver';

const Navigation = () => {
  const { pathname } = useLocation();
  const { state, dispatch } = useContext(LedsContext);
  const inputFile = useRef(null);

  const uploadProject = () => {
    inputFile.current.click();
  };

  const onDownloadProject = () => {
    saveAs(
      new Blob([JSON.stringify(state)], { type: 'text/json;charset=utf-8' }),
      'led-animator.json'
    );
  };

  const onDownloadCode = () => {
    saveAs(
      new Blob([frameToCode(state)], { type: 'text/play;charset=utf-8' }),
      'led-animator.ino'
    );
  };

  const uploadFile = (e) => {
    const files = e.target.files;

    if (files.length !== 1) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      dispatch({
        type: ACTION_TYPES.OPEN_NEW_PROGRAM,
        payload: JSON.parse(reader.result),
      });
    };
    reader.readAsText(files[0]);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light ">
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={uploadFile}
      />

      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          LED Animator
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${pathname === '/' && 'active'}`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${pathname === '/upload' && 'active'}`}
                to="/upload"
              >
                Upload
              </Link>
            </li>

            <li>
              <span onClick={uploadProject} className="nav-link">
                Open
              </span>
            </li>
            <li>
              <span onClick={onDownloadProject} className="nav-link">
                Download Project
              </span>
            </li>
            <li>
              <span onClick={onDownloadCode} className="nav-link">
                Download Code
              </span>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${pathname === '/about' && 'active'}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${pathname === '/contact' && 'active'}`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
