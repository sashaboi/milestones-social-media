import React from 'react';
import Mockman from 'mockman-js';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Homepage, Login, Signup, UserFeed } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/userfeed" element={<UserFeed />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
