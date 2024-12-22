import React from 'react';
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import "./App.css";
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ParentPage from './pages/ParentPage';
import NannyPage from './pages/NannyPage';
import ParentPaymentsPage from './pages/ParentPaymentsPage';
import ParentApplicationsPage from './pages/ParentApplicationsPage';


const App = () => {
  return (
    <div className='App'>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route */}
        <Route path="/parent" element={ <ProtectedRoute> <ParentPage /> </ProtectedRoute>} />
        <Route path="/nanny" element={<ProtectedRoute> <NannyPage /> </ProtectedRoute>} />
        <Route path="/parent/payments" element={<ProtectedRoute> <ParentPaymentsPage /> </ProtectedRoute>} />
        <Route path="/parent/applications" element={<ProtectedRoute> <ParentApplicationsPage /> </ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;

