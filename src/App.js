import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Homepage, Login, Signup } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
