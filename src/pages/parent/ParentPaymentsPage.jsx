import React from 'react';
import { useAuth } from '../../config/AuthContext';
import ParentNavBar from '../../components/ParentNavBar';

const ParentPaymentsPage = () => {
    const { user } = useAuth();

    return (
    <div>
        {/* Navigation */}
        <ParentNavBar />

        {/* Main Content */}
        <main className="">
            <h1>Καλώς ήρθατε, {user.displayName}!</h1>
            <p>Αυτή είναι η σελίδα όπου θα γίνονται οι πληρωμές.</p>
        </main>
    </div>
  );
};

export default ParentPaymentsPage;