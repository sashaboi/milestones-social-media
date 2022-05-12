import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
export const Navbar = () => {
  const navigate = useNavigate();
  const LogoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };
  const token = localStorage.getItem('token');
  console.log(token);
  return (
    <div className="navbar-parent">
      <div className="logo-container">
        {/* <img src="" alt="" /> */}
        MileStones
      </div>
      <div className="nav-options-container">
        <Link to={'/'}>
          <div className="nav-option">Home</div>
        </Link>
        {token ? (
          <div>
            <div className="nav-option">Hello User </div>
            <div onClick={() => LogoutHandler()} className="nav-option">
              Logout{' '}
            </div>
          </div>
        ) : (
          <>
            <Link to={'/auth/login'}>
              <div className="nav-option">Login</div>
            </Link>
            <Link to={'/auth/signup'}>
              <div className="nav-option">Signup</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
