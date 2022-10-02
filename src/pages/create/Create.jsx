import { Outlet, NavLink } from 'react-router-dom';
const Create = () => {
  return (
    <>
      <ul className="nav nav-tabs mb-4 mt-5">
        <li className="nav-item">
          <NavLink className="nav-link" to="/create" end>
            Editor
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/create/upload">
            Upload
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/create/settings">
            Settings
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Create;
