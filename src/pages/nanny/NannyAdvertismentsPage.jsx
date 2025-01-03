import React, { useEffect, useState } from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Button } from '@nextui-org/react';
import { db } from '../../config/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
        <span key={index}>{index < rating ? '⭐' : '☆'}</span>
    ));
};

const Section = ({ title, ads, userDetails, onView, onEdit }) => (
    <div className="p-2 rounded-lg mb-2 max-h-[calc(28vh)] overflow-hidden bg-gray-100 shadow-sm">
        <h2 className="text-sm font-semibold mb-2">{title}</h2>
        {ads.map((ad, index) => (
            <div
                key={index}
                className="bg-white p-2 rounded-lg shadow-sm mb-2 flex justify-between items-center"
            >
                <div className="text-xs">
                    <h3 className="font-bold mb-1">
                        {userDetails?.name} {userDetails?.surname}
                    </h3>
                    <p>ΗΜΕΡΟΜΗΝΙΑ ΔΗΜΙΟΥΡΓΙΑΣ: {ad.createdDate || ad.submittedDate}</p>
                    {ad.rating !== undefined && (
                        <p className="flex items-center">
                            ΒΑΘΜΟΛΟΓΙΑ: {renderStars(ad.rating)} ({ad.ratingCount})
                        </p>
                    )}
                </div>
                <div className="flex gap-1">
                    <Button size="sm" variant="ghost" color="success" onClick={() => onView(ad)}>
                        ΠΡΟΒΟΛΗ
                    </Button>
                    <Button size="sm" variant="ghost" color="primary" onClick={() => onEdit(ad)}>
                        ΕΠΕΞΕΡΓΑΣΙΑ
                    </Button>
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
    const navigate = useNavigate();
    const [advertisements, setAdvertisements] = useState({ active: [], saved: [], history: [] });
    const [userDetails, setUserDetails] = useState({ name: '', surname: '' });
    const [selectedAd, setSelectedAd] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchUserData = async () => {
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserDetails({ name: userData.name, surname: userData.surname });
            } else {
                console.error("No user document found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchAdvertisements = async () => {
        try {
            const advCollectionRef = collection(db, `users/${user.uid}/adv`);
            const advSnapshot = await getDocs(advCollectionRef);

            const fetchedAds = advSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdDate: data.createdAt
                        ? data.createdAt.toDate().toLocaleString('el-GR', {
                              dateStyle: 'long',
                              timeStyle: 'short',
                          })
                        : null,
                };
            });

            const groupedAds = {
                active: fetchedAds.filter((ad) => ad.status === "ΕΝΕΡΓΗ"),
                saved: fetchedAds.filter((ad) => ad.status === "SAVED"),
                history: fetchedAds.filter((ad) => ad.status === "ΙΣΤΟΡΙΚΟ"),
            };

            setAdvertisements(groupedAds);
        } catch (error) {
            console.error("Error fetching advertisements:", error);
        }
    };

    const fetchAdDataAndRedirect = async (ad) => {
        try {
            const advDocRef = doc(db, `users/${user.uid}/adv`, ad.id);
            const advDoc = await getDoc(advDocRef);
    
            if (advDoc.exists()) {
                const adData = advDoc.data();
    
                // Transform the data into the correct structure
                const transformedData = {
                    form1: {
                        bio: adData.bio || '',
                        gender: adData.gender || '',
                        homephone: adData.homephone || '',
                        cellphone1: adData.cellphone1 || '',
                        cellphone2: adData.cellphone2 || '',
                        EMAIL: adData.email || '',
                        perifereia: adData.perifereia || '',
                        nomos: adData.nomos || '',
                        dimos: adData.dimos || '',
                        city: adData.city || '',
                        street: adData.address?.split(' ')[0] || '',
                        streetnumber: adData.address?.split(' ')[1] || '',
                        zipcode: adData.zipcode || '',
                    },
                    form2: {
                        pathologistCertificate: adData.certificates?.pathologist || '',
                        dermatologistCertificate: adData.certificates?.dermatologist || '',
                        psychologistCertificate: adData.certificates?.psychologist || '',
                        courseCertificate: adData.certificates?.course || '',
                        languageCertificate: adData.certificates?.language || '',
                        firstAidCertificate: adData.certificates?.firstAid || '',
                        criminalRecordCertificate: adData.certificates?.criminalRecord || '',
                        letterCertificate: adData.certificates?.letter || '',
                        educationLevel: adData.education || '',
                    },
                    form3: {
                        δευτερα_from: adData.schedule?.monday?.from || '',
                        δευτερα_to: adData.schedule?.monday?.to || '',
                        τριτη_from: adData.schedule?.tuesday?.from || '',
                        τριτη_to: adData.schedule?.tuesday?.to || '',
                        τεταρτη_from: adData.schedule?.wednesday?.from || '',
                        τεταρτη_to: adData.schedule?.wednesday?.to || '',
                        πεμπτη_from: adData.schedule?.thursday?.from || '',
                        πεμπτη_to: adData.schedule?.thursday?.to || '',
                        παρασκευη_from: adData.schedule?.friday?.from || '',
                        παρασκευη_to: adData.schedule?.friday?.to || '',
                        σαββατο_from: adData.schedule?.saturday?.from || '',
                        σαββατο_to: adData.schedule?.saturday?.to || '',
                        κυριακη_from: adData.schedule?.sunday?.from || '',
                        κυριακη_to: adData.schedule?.sunday?.to || '',
                        extra: adData.schedule?.extra || '',
                        payment: adData.payment || '',
                        facebook: adData.facebook || '',
                        instagram: adData.instagram || '',
                        linkedin: adData.linkedin || '',
                        meetingDay: adData.meetingDays || '',
                        meetingTime: adData.meetingTime || '',
                        placeOfWork: adData.placeOfWork || '',
                        workExperience: adData.workExperience || '',
                    },
                };
    
                // Store the transformed data in localStorage
                localStorage.setItem('formData', JSON.stringify(transformedData));
    
                // Redirect to form1
                navigate('/nanny/form1');
            } else {
                console.error("No advertisement data found!");
            }
        } catch (error) {
            console.error("Error fetching advertisement data:", error);
        }
    };
    
    useEffect(() => {
        fetchUserData();
        fetchAdvertisements();
    }, [user.uid]);

    const handleView = (ad) => {
        setSelectedAd(ad);
        onOpen();
    };

    const handleEdit = (ad) => {
        fetchAdDataAndRedirect(ad); // Fetch data and redirect
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col">
            {/* Navigation */}
            <NannyNavBar />

            {/* Main Content */}
            <main className="p-2 flex-grow flex flex-col gap-2">
                <h1 className="text-lg font-bold text-center mb-2">ΑΓΓΕΛΙΕΣ</h1>

                <Button size="sm" color="danger" className="mb-2 w-auto mx-auto">
                    ΔΗΜΙΟΥΡΓΙΑ ΑΓΓΕΛΙΑΣ
                </Button>

                <div className="flex flex-col gap-2 flex-grow">
                    <Section
                        title="ΕΝΕΡΓΗ ΑΓΓΕΛΙΑ"
                        ads={advertisements.active}
                        userDetails={userDetails}
                        onView={handleView}
                        onEdit={handleEdit}
                    />
                    <Section
                        title="ΠΡΟΣΩΡΙΝΑ ΑΠΟΘΗΚΕΥΜΕΝΕΣ"
                        ads={advertisements.saved}
                        userDetails={userDetails}
                        onView={handleView}
                        onEdit={handleEdit}
                    />
                    <Section
                        title="ΙΣΤΟΡΙΚΟ ΑΓΓΕΛΙΩΝ"
                        ads={advertisements.history}
                        userDetails={userDetails}
                        onView={handleView}
                        onEdit={handleEdit}
                    />
                </div>
            </main>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>ΠΡΟΒΟΛΗ ΑΓΓΕΛΙΑΣ</ModalHeader>
                    <ModalBody>
                        {selectedAd ? (
                            <>
                                <p><strong>Περιγραφή:</strong> {selectedAd.bio}</p>
                                <p><strong>Ημερομηνία Δημιουργίας:</strong> {selectedAd.createdDate}</p>
                                <p><strong>Αμοιβή:</strong> {selectedAd.payment} €</p>
                                <p><strong>Τοποθεσία:</strong> {selectedAd.address}</p>
                                <p><strong>Διαθεσιμότητα:</strong> {selectedAd.status}</p>
                            </>
                        ) : (
                            <p>No details available.</p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose}>ΚΛΕΙΣΙΜΟ</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default NannyAdvertismentsPage;
