import React from 'react';
import { Footer, Navbar } from '../../components';

import './auth.css';
const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="center-items-container">
        <div className="single-function-page-container">
          <div className="single-page-heading">Login</div>
          <hr />
          <div className="inputs-container">
            <label htmlFor="email">Email </label>
            <input type="email" placeholder="adarshbalika@gmail.com" />
            <label htmlFor="password">Password </label>
            <input type="password" placeholder="adarshBalika123" />
            <button className="primary-btn">Login</button>
          </div>
          <hr />
          <div className="extra-buttons-auth">
            <button className="secondary-btn">Login as Onkar</button>
            <button className="secondary-btn">Login as Ravi</button>
            <button className="secondary-btn">Login as Darshan</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Login };
