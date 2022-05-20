/* eslint-disable object-shorthand */
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Footer, Navbar } from '../../components';
import LoadingSpin from 'react-loading-spin';
import { SetloggedInUser } from '../../redux-store/alluserSlice/alluserSlice';
import './auth.css';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.allUsers);
  const navigate = useNavigate();
  const [email, setEmail] = useState('adarshbalika');
  const [password, setPassword] = useState('adarshBalika123');

  const userCred = {
    username: email,
    password: password,
  };
  const LoginClickHandler = () => {
    dispatch(SetloggedInUser(userCred))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
    console.log('loading before navigating', state.loading);
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
            <button
              onClick={() => LoginClickHandler()}
              className="primary-btn horizontal-align"
            >
              <div>Login</div>
              <div className="small-loader"></div>
            </button>
            {state.loading && <LoadingSpin size={20} />}
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
