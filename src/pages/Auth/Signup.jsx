import React from 'react';
import { Footer, Navbar } from '../../components';

export const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="center-items-container">
        <div className="single-function-page-container">
          <div className="single-page-heading">Signup</div>
          <hr />
          <div className="inputs-container">
            <label htmlFor="email">Email </label>
            <input type="email" placeholder="adarshbalika@gmail.com" />
            <label htmlFor="password">Password </label>
            <input type="password" placeholder="adarshBalika123" />
            <button className="primary-btn">Signup</button>
          </div>
          <hr />
          <div className="extra-buttons-auth">
            <button className="secondary-btn">Signup as Kuldeep</button>
            <button className="secondary-btn">Signup as Bhavya</button>
            <button className="secondary-btn">Signup as Vikrant</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
