/* eslint-disable object-shorthand */
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Footer, Navbar } from '../../components';
import axios from 'axios';
import { useUser } from '../../context/User-context';

import './auth.css';
const Login = () => {
  const { setUserObj } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('adarshbalika');
  const [password, setPassword] = useState('adarshBalika123');

  const userCred = {
    username: email,
    password: password,
  };
  const LoginClickHandler = () => {
    axios.post('/api/auth/login', userCred).then(
      response => {
        console.log(response);
        setUserObj(response.data.foundUser);
        localStorage.setItem('token', response.data.encodedToken);
        navigate('/');
      },
      error => {
        console.log(error.response.data.errors[0]);
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
              type="text"
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
          {/* <div className="extra-buttons-auth">
            <button
              onClick={() => {
                setEmail('bill.gates@gmail.com');
                setPassword('adarshBalika123');
              }}
              className="secondary-btn"
            >
              Login as Bill Gates
            </button>
            <button
              onClick={() => {
                setEmail('elon.musk@gmail.com');
                setPassword('adarshBalika123');
              }}
              className="secondary-btn"
            >
              Login as Elon Musk
            </button>
            <button
              onClick={() => {
                setEmail('sundar@gmail.com');
                setPassword('adarshBalika123');
              }}
              className="secondary-btn"
            >
              Login as Sundar Pichai
            </button>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Login };
