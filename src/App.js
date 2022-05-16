import React from 'react';
import Mockman from 'mockman-js';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Bookmarked, Homepage, Login, Signup, UserProfile,Profile } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/bookmarks" element={<Bookmarked />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/myprofile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
