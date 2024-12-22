import React from 'react';
import { useAuth } from '../config/AuthContext';
import ParentNavBar from '../components/ParentNavBar';

const ParentPage = () => {
    const { user } = useAuth();

    return (
    <div>
        {/* Navigation */}
        <ParentNavBar />

        {/* Main Content */}
        <main className="">
            <h1>Καλώς ήρθατε, {user.displayName}!</h1>
            <p>Αυτή είναι η σελίδα του γονέα.</p>
        </main>
    </div>
  );
};

export default ParentPage;