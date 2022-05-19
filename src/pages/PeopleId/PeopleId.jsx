import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Footer,
  Modal,
  Navbar,
  SideBarLeft,
  SideBarRight,
} from '../../components';
import './peopleid.css';
export const PeopleId = () => {
  const personId = useParams();
  const state = useSelector(state => state.allUsers);

  const userToShow = state.users.find(obj => obj.username === personId.id);

  return (
    <div className="app-layout">
      <Modal />
      <Navbar />
      <div className="home-page-container">
        <SideBarLeft />
        <div className="feed-container">
          <br />
          <br />
          <br />
          <h3>User Profile</h3>
          <h1 className="people-name">
            <div className="profile-pic-letters">
              {userToShow.firstName.slice(0, 1)}
              {userToShow.lastName.slice(0, 1)}
            </div>

            <p>
              {userToShow.firstName}
              {userToShow.lastName}
            </p>
          </h1>
          <br />
          <br />
          <h5>{userToShow.bio}</h5>
        </div>
        <SideBarRight />
      </div>
      <Footer />
    </div>
  );
};
