import React from 'react';
import {
  CreatePost,
  Footer,
  Navbar,
  SideBarLeft,
  SideBarRight,
} from '../../components';
import { BookmarkedFeed } from '../../components/BookmarkedFeed/BookmarkedFeed';
export const Bookmarked = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="home-page-container">
        <SideBarLeft />
        <div className="feed-container">
          <CreatePost />
          <hr className="hori-line" />
          <BookmarkedFeed />
        </div>
        <SideBarRight />
      </div>
      <Footer />
    </div>
  );
};
