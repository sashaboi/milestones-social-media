import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreatePost,
  Footer,
  Modal,
  Navbar,
  SideBarLeft,
  SideBarRight,
} from '../../components';
import { Myfeed } from '../MyFeed/Myfeed';
// import bgimage from '../../assets/images/bg-homepage.jpg';
import './homepage.css';

export const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      navigate('/auth/login');
    }
  }, []);

  return (
    <div className="app-layout">
      <Modal />
      <Navbar />
      <div className="home-page-container">
        <SideBarLeft />
        <div className="feed-container">
          <CreatePost />
          <hr className="hori-line" />
          <Myfeed />
        </div>
        <SideBarRight />
      </div>
      <Footer />
    </div>
  );
};
