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
import ParentForm3 from './pages/parent/ParentForm3';
import ParentForm4 from './pages/parent/ParentForm4';
import ParentForm5 from './pages/parent/ParentForm5';

// Nanny Pages
import NannyPage from './pages/nanny/NannyPage';
import NannyPaymentsPage from './pages/nanny/NannyPaymentsPage';
import NannyApplicationsPage from './pages/nanny/NannyApplicationsPage';
import NannyAdvertismentsPage from './pages/nanny/NannyAdvertismentsPage';
import NannyForm1 from './pages/nanny/NannyForm1';
import NannyForm2 from './pages/nanny/NannyForm2';
import NannyForm3 from './pages/nanny/NannyForm3';
import NannyForm4 from './pages/nanny/NannyForm4';


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
        <Route path="/parent/applications/form3" element={<ProtectedRoute> <ParentForm3 /> </ProtectedRoute>} />
        <Route path="/parent/applications/form4" element={<ProtectedRoute> <ParentForm4 /> </ProtectedRoute>} />
        <Route path="/parent/applications/form5" element={<ProtectedRoute> <ParentForm5 /> </ProtectedRoute>} />


        {/* Protected Route Nanny */}
        <Route path="/nanny" element={<ProtectedRoute> <NannyPage /> </ProtectedRoute>} />
        <Route path="/nanny/payments" element={<ProtectedRoute> <NannyPaymentsPage /> </ProtectedRoute>} />
        <Route path="/nanny/applications" element={<ProtectedRoute> <NannyApplicationsPage /> </ProtectedRoute>} />
        <Route path="/nanny/advertisments" element={<ProtectedRoute> <NannyAdvertismentsPage /> </ProtectedRoute>} />
        <Route path="/nanny/advertisments/form1" element={<ProtectedRoute> <NannyForm1 /> </ProtectedRoute>} />
        <Route path="/nanny/advertisments/form2" element={<ProtectedRoute> <NannyForm2 /> </ProtectedRoute>} />
        <Route path="/nanny/advertisments/form3" element={<ProtectedRoute> <NannyForm3 /> </ProtectedRoute>} />
        <Route path="/nanny/advertisments/form4" element={<ProtectedRoute> <NannyForm4 /> </ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;

