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
import ParentForm2 from './pages/parent/ParentForm2';

// Nanny Pages
import NannyPage from './pages/nanny/NannyPage';
import NannyPaymentsPage from './pages/nanny/NannyPaymentsPage';
import NannyApplicationsPage from './pages/nanny/NannyApplicationsPage';
import NannyAdvertismentsPage from './pages/nanny/NannyAdvertismentsPage';
import NannyForm1 from './pages/nanny/NannyForm1';
import NannyForm2 from './pages/nanny/NannyForm2';


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
        <Route path="/parent/applications/form2" element={<ProtectedRoute> <ParentForm2 /> </ProtectedRoute>} />

        {/* Protected Route Nanny */}
        <Route path="/nanny" element={<ProtectedRoute> <NannyPage /> </ProtectedRoute>} />
        <Route path="/nanny/payments" element={<ProtectedRoute> <NannyPaymentsPage /> </ProtectedRoute>} />
        <Route path="/nanny/applications" element={<ProtectedRoute> <NannyApplicationsPage /> </ProtectedRoute>} />
        <Route path="/nanny/advertisments" element={<ProtectedRoute> <NannyAdvertismentsPage /> </ProtectedRoute>} />
        <Route path="/nanny/form1" element={<ProtectedRoute> <NannyForm1 /> </ProtectedRoute>} />
        <Route path="/nanny/form2" element={<ProtectedRoute> <NannyForm2 /> </ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;

