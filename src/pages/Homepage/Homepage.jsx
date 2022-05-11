import React from 'react';
import { Footer, Navbar } from '../../components';

import './homepage.css';
export const Homepage = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="center-items-container">Homepage</div>
      <Footer />
    </div>
  );
};
