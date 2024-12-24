import React from 'react';
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import "./App.css";
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

// Parent Pages
import ParentPage from './pages/parent/ParentPage';
import ParentPaymentsPage from './pages/parent/ParentPaymentsPage';
import ParentApplicationsPage from './pages/parent/ParentApplicationsPage';
import ParentForm1 from './pages/parent/ParentForm1';

// Nanny Pages
import NannyPage from './pages/NannyPage';
import NannyPaymentsPage from './pages/NannyPaymentsPage';
import NannyApplicationsPage from './pages/NannyApplicationsPage';
import NannyAdvertismentsPage from './pages/NannyAdvertismentsPage';
import NannyForm1 from './pages/NannyForm1';


const App = () => {
  return (
    <div className='App'>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route Parent */}
        <Route path="/parent" element={ <ProtectedRoute> <ParentPage /> </ProtectedRoute>} />
        <Route path="/parent/payments" element={<ProtectedRoute> <ParentPaymentsPage /> </ProtectedRoute>} />
        <Route path="/parent/applications" element={<ProtectedRoute> <ParentApplicationsPage /> </ProtectedRoute>} />
        <Route path="/parent/applications/form1" element={<ProtectedRoute> <ParentForm1 /> </ProtectedRoute>} />

        {/* Protected Route Nanny */}
        <Route path="/nanny" element={<ProtectedRoute> <NannyPage /> </ProtectedRoute>} />
        <Route path="/nanny/payments" element={<ProtectedRoute> <NannyPaymentsPage /> </ProtectedRoute>} />
        <Route path="/nanny/applications" element={<ProtectedRoute> <NannyApplicationsPage /> </ProtectedRoute>} />
        <Route path="/nanny/advertisments" element={<ProtectedRoute> <NannyAdvertismentsPage /> </ProtectedRoute>} />
        <Route path="/nanny/form1" element={<ProtectedRoute> <NannyForm1 /> </ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;

