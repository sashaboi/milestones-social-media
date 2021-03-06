/* eslint-disable object-shorthand */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../../components';
import axios from 'axios';
import { SetloggedInUser } from '../../redux-store/alluserSlice/alluserSlice';

import { useDispatch } from 'react-redux';
export const Signup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState('onkar@gmail.com');
  const [password, setPassword] = useState('adarshBalika123');

  const userCred = {
    username: email,
    password: password,
    firstname: 'Fname',
    lastname: 'Lname',
  };
  const SignupClickHandler = () => {
    axios.post('/api/auth/signup', userCred).then(
      response => {
        dispatch(SetloggedInUser(response.data.createdUser))
          .unwrap()
          .then(() => {
            navigate('/');
          })
          .catch(error => {
            console.log(error);
          });
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
          <div className="single-page-heading">Signup</div>
          <hr />
          <div className="inputs-container">
            <label htmlFor="email">Email </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
              placeholder="adarshbalika"
            />
            <label htmlFor="password">Password </label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="adarshBalika123"
            />
            <button
              onClick={() => SignupClickHandler()}
              className="primary-btn"
            >
              Signup
            </button>
          </div>
          <hr />
          <div className="extra-buttons-auth">
            <button
              onClick={() => {
                setEmail('bill.gates@gmail.com');
              }}
              className="secondary-btn"
            >
              Signup as Bill Gates
            </button>
            <button
              onClick={() => {
                setEmail('elon.musk@gmail.com');
              }}
              className="secondary-btn"
            >
              Signup as Elon Musk
            </button>
            <button
              onClick={() => {
                setEmail('sundar@gmail.com');
              }}
              className="secondary-btn"
            >
              Signup as Sundar Pichai
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
