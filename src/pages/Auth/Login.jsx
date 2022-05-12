/* eslint-disable object-shorthand */
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Footer, Navbar } from '../../components';
import axios from 'axios';

import './auth.css';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('adarshbalika@gmail.com');
  const [password, setPassword] = useState('adarshBalika123');

  const userCred = {
    email: email,
    password: password,
  };
  const LoginClickHandler = () => {
    axios.post('/api/auth/login', userCred).then(
      response => {
        localStorage.setItem('token', response.data.encodedToken);
        navigate('/');
      },
      error => {
        console.log(error);
      }
    );
  };
  return (
    <div>
      <Navbar />
      <div className="center-items-container">
        <div className="single-function-page-container">
          <div className="single-page-heading">Login</div>
          <hr />
          <div className="inputs-container">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="adarshbalika@gmail.com"
            />
            <label htmlFor="password">Password </label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="adarshBalika123"
            />
            <button onClick={() => LoginClickHandler()} className="primary-btn">
              Login
            </button>
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
