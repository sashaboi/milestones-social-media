import axios from 'axios';
import React, { useState } from 'react';
import {
  Footer,
  Modal,
  Navbar,
  SideBarLeft,
  SideBarRight,
} from '../../components';
import { useUser } from '../../context/User-context';
import { useNavigate } from 'react-router-dom';
import './profile.css';
export const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const header = { headers: { authorization: token } };
  const { userObj, setUserObj } = useUser();

  const [newFirstName, setNewFirstName] = useState(userObj.firstName);
  const [newLastName, setnewLastName] = useState(userObj.lastName);
  const [newPassword, setnewPassword] = useState(userObj.password);
  const [toggle, settoggle] = useState('password');

  const EditForm = () => {
    const userData = {
      userData: {
        firstName: newFirstName,
        lastName: newLastName,
        password: newPassword,
      },
    };
    axios.post(`/api/users/edit`, userData, header).then(
      response => {
        setUserObj(response.data.user);
        navigate('/');
      },
      error => {
        console.log(error.response.data.message);
      }
    );
  };
  return (
    <div className="app-layout">
      <Modal />
      <Navbar />
      <div className="home-page-container">
        <SideBarLeft />
        <div className="feed-container">
          <h3>Edit Profile</h3>
          <div className="edit-form">
            <div className="form-element">
              <label htmlFor="firstName"> First Name</label>
              <input
                onChange={e => setNewFirstName(e.target.value)}
                type="text"
                placeholder="firstName"
                value={newFirstName}
              />
            </div>
            <div className="form-element">
              <label htmlFor="firstName"> Last Name</label>
              <input
                onChange={e => setnewLastName(e.target.value)}
                type="text"
                placeholder="lastName"
                value={newLastName}
              />
            </div>

            <div className="form-element">
              <label htmlFor="firstName">Password</label>
              <p>
                <input
                  onChange={e => setnewPassword(e.target.value)}
                  type={toggle}
                  placeholder="password"
                  value={newPassword}
                />
                <button
                  onClick={() =>
                    settoggle(toggle === 'password' ? 'text' : 'password')
                  }
                >
                  👁
                </button>
              </p>
            </div>
          </div>
          <button onClick={() => EditForm()} className="primary-btn">
            Save Form
          </button>
        </div>
        <SideBarRight />
      </div>
      <Footer />
    </div>
  );
};
