import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
export const Navbar = () => {
  return (
    <div className="navbar-parent">
      <div className="logo-container">
        {/* <img src="" alt="" /> */}
        Brag-A-lot
      </div>
      <div className="nav-options-container">
        <Link to={'/'}>
          <div className="nav-option">Home</div>
        </Link>
        <Link to={'/auth/login'}>
          <div className="nav-option">Login</div>
        </Link>
        <Link to={'/auth/signup'}>
          <div className="nav-option">Signup</div>
        </Link>
      </div>
    </div>
  );
};
