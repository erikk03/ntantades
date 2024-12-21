import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ParentPage from './pages/ParentPage';
import NannyPage from './pages/NannyPage';
import "./App.css";
const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/parent" element={<ParentPage />} />
        <Route path="/nanny" element={<NannyPage />} />
      </Routes>
    </div>
  );
};

export default App;

