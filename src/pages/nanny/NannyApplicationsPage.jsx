import React from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';

const NannyApplicationsPage = () => {
    const { user } = useAuth();

    return (
    <div>
        {/* Navigation */}
        <NannyNavBar />

        {/* Main Content */}
        <main className="">
            <h1>Καλώς ήρθατε, {user.displayName}!</h1>
            <p>Αυτή είναι η σελίδα όπου βρίσκονται οι αιτήσεις της νταντάς.</p>
        </main>
    </div>
  );
};

export default NannyApplicationsPage;