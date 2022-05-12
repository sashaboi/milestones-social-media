import React from 'react';
import {
  CreatePost,
  Footer,
  Navbar,
  SideBarLeft,
  SideBarRight,
} from '../../components';
import { Myfeed } from '../MyFeed/Myfeed';
// import bgimage from '../../assets/images/bg-homepage.jpg';
import './homepage.css';
export const Homepage = () => {
  return (
    <div className="app-layout">
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
