import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreatePost,
  Footer,
  Navbar,
  SideBarLeft,
  SideBarRight,
} from '../../components';
import { UserFeed } from '../Userfeed/UserFeed';

export const UserProfile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      navigate('/auth/login');
    }
  }, []);
  return (
    <div className="app-layout">
      <Navbar />
      <div className="home-page-container">
        <SideBarLeft />
        <div className="feed-container">
          <CreatePost />
          <hr className="hori-line" />
          <UserFeed />
        </div>
        <SideBarRight />
      </div>
      <Footer />
    </div>
  );
};
