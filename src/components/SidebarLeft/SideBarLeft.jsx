import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BsBookmarkFill, BsPencil } from 'react-icons/bs';

import './sidebarleft.css';
export const SideBarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <button
        className="sidebar-nav-btn primary-btn"
        onClick={() => navigate('/')}
      >
        <CgProfile />
        Home
      </button>
      <button
        className="sidebar-nav-btn primary-btn"
        onClick={() => navigate('/profile')}
      >
        <CgProfile />
        User profile
      </button>
      <button
        className="sidebar-nav-btn primary-btn"
        onClick={() => navigate('/bookmarks')}
      >
        <BsBookmarkFill /> Bookmarks
      </button>
      <button
        className="sidebar-nav-btn primary-btn"
        onClick={() => navigate('/myprofile')}
      >
        <BsPencil />
        Edit profile
      </button>
    </div>
  );
};
