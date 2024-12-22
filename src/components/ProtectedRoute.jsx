import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../config/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // If user is not logged in, redirect to the homepage
        return <Navigate to="/" />;
    }

    // If user is logged in, render the children (protected component)
    return children;
};

export default ProtectedRoute;
