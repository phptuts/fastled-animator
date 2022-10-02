import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/images/logo192.png';
import { AuthContext } from '../context/auth/authContext';
import { getAuth, signOut } from 'firebase/auth';

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(false);

  const onToggleNav = () => {
    setShowNav((prevState) => !prevState);
  };

  const onLogout = async () => {
    const auth = getAuth();
    await signOut(auth);

    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light ">
      <div className="container-fluid">
        <button onClick={onToggleNav} className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink className="navbar-brand" to="/" end>
          <img src={logo} alt="fast led logo" width="30" height="30" />
          FastLED Animator
        </NavLink>
        <div
          className={`collapse navbar-collapse ${showNav && 'show'} `}
          id="navbarTogglerDemo03"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link " to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/create">
                Create
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link " to="/my-projects">
                  My Projects
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link " to="/projects">
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/why">
                Why
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link " to="/tutorial">
                Tutorials
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/feedback">
                Feedback
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link " to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <span onClick={onLogout} className="nav-link ">
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
