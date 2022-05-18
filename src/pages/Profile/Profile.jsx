import React, { useState } from 'react';
import {
  Footer,
  Modal,
  Navbar,
  SideBarLeft,
  SideBarRight,
} from '../../components';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { editProfile } from '../../redux-store/alluserSlice/alluserSlice';
export const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.allUsers);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [newFirstName, setNewFirstName] = useState(
    state.loggedinUser.firstName
  );
  const [newLastName, setnewLastName] = useState(state.loggedinUser.lastName);
  const [newPassword, setnewPassword] = useState(state.loggedinUser.password);
  const [toggle, settoggle] = useState('password');

  const EditForm = () => {
    const userDatatosend = {
      userData: {
        firstName: newFirstName,
        lastName: newLastName,
        password: newPassword,
      },
    };
    dispatch(editProfile({ token, profiledata: userDatatosend }));
    navigate('/');
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
