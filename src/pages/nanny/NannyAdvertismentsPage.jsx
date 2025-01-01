import React, { useEffect, useState } from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Button } from '@nextui-org/react';
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
        <span key={index}>{index < rating ? '⭐' : '☆'}</span>
    ));
};

const Section = ({ title, ads }) => (
    <div className="bg-pink-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {ads.map((ad, index) => (
            <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center"
            >
                <div>
                    <h3 className="text-md font-bold">{ad.name}</h3>
                    <p className="text-sm">
                        ΗΜΕΡΟΜΗΝΙΑ ΔΗΜΙΟΥΡΓΙΑΣ: {ad.createdDate || ad.submittedDate}
                    </p>
                    {ad.rating !== undefined && (
                        <p className="text-sm flex items-center">
                            ΒΑΘΜΟΛΟΓΙΑ: {renderStars(ad.rating)} ({ad.ratingCount})
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    {ad.status === "ΕΝΕΡΓΗ" && (
                        <Button size="sm" variant="ghost" color="success">
                            ΠΡΟΒΟΛΗ
                        </Button>
                    )}
                    {ad.status === "ΑΠΟΘΗΚΕΥΜΕΝΗ" && (
                        <Button size="sm" variant="ghost" color="primary">
                            ΕΠΕΞΕΡΓΑΣΙΑ
                        </Button>
                    )}
                    <Button size="sm" variant="ghost" color="danger">
                        ΔΙΑΓΡΑΦΗ
                    </Button>
                </div>
            </div>
        ))}
    </div>
);

const NannyAdvertismentsPage = () => {
    const { user } = useAuth();
    const [advertisements, setAdvertisements] = useState({ active: [], saved: [], history: [] });

    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const advCollectionRef = collection(db, `users/${user.uid}/adv`);
                const advSnapshot = await getDocs(advCollectionRef);

                const fetchedAds = advSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdDate: data.createdAt ? data.createdAt.toDate().toLocaleString('el-GR', { 
                            dateStyle: 'long', 
                            timeStyle: 'short' 
                        }) : null,
                    };
                });

                const groupedAds = {
                    active: fetchedAds.filter(ad => ad.status === "ΕΝΕΡΓΗ"),
                    saved: fetchedAds.filter(ad => ad.status === "ΑΠΟΘΗΚΕΥΜΕΝΗ"),
                    history: fetchedAds.filter(ad => ad.status === "ΙΣΤΟΡΙΚΟ"),
                };

                setAdvertisements(groupedAds);
            } catch (error) {
                console.error("Error fetching advertisements:", error);
            }
        };

        fetchAdvertisements();
    }, [user.uid]);

    return (
        <div className="h-screen overflow-hidden">
            {/* Navigation */}
            <NannyNavBar />

            {/* Main Content */}
            <main className="p-4">
                <h1 className="text-2xl font-bold text-center mb-6">ΑΓΓΕΛΙΕΣ</h1>

                <Button size="lg" color="danger" className="mb-4">
                    ΔΗΜΙΟΥΡΓΙΑ ΑΓΓΕΛΙΑΣ
                </Button>

                <Section title="ΕΝΕΡΓΗ ΑΓΓΕΛΙΑ" ads={advertisements.active} />
                <Section title="ΠΡΟΣΩΡΙΝΑ ΑΠΟΘΗΚΕΥΜΕΝΕΣ" ads={advertisements.saved} />
                <Section title="ΙΣΤΟΡΙΚΟ ΑΓΓΕΛΙΩΝ" ads={advertisements.history} />
            </main>
        </div>
    );
};

export default NannyAdvertismentsPage;
