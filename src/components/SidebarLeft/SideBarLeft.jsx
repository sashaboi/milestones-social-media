import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebarleft.css';
export const SideBarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h2>Profile</h2>
      <button onClick={() => navigate('/profile')}>Go to user profile</button>
      <button onClick={() => navigate('/bookmarks')}>Go to Bookmarks</button>
      <button onClick={() => navigate('/myprofile')}>Edit profile</button>
    </div>
  );
};
