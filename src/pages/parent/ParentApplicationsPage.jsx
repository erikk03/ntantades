import React, {useState, useEffect} from 'react';
import { useAuth } from '../../config/AuthContext';
import ParentNavBar from '../../components/ParentNavBar';
import { Button, Card, CardBody, ScrollShadow, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';
import { db } from '../../config/firebase';
import AppPreview from '../../components/AppPreview';

const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A'; // Handle cases where timestamp is undefined or null

    // Convert Firestore timestamp to JavaScript Date object
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

    // Format the date to "DD/MM/YYYY"
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const ParentApplicationsPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeApplications, setActiveApplications] = useState([]);
    const [historyApplications, setHistoryApplications] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Fetch advertisements from Firestore
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'applications')); // Replace 'applications' with your Firestore collection name
                const fetchedApplications = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Filter applications by parent.id === user.id
                const userApplications = fetchedApplications.filter(app => app?.parent?.uid === user?.uid);

                // Separate applications based on status
                const active = userApplications.filter(app =>
                    app.status === 'ΕΝΕΡΓΗ' || app.status === 'ΑΠΟΘΗΚΕΥΜΕΝΗ' || app.status === 'ΥΠΟΒΕΒΛΗΜΕΝΗ'
                );
                const history = userApplications.filter(app =>
                    app.status === 'ΟΛΟΚΛΗΡΩΜΕΝΗ' || app.status === 'ΑΚΥΡΩΜΕΝΗ'
                );

                setActiveApplications(active);
                setHistoryApplications(history);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const handleRenew = async (applicationId) => {
        try {
            // Check if there's an active application
            if (activeApplications.length > 0) {
                alert('Δεν μπορείτε να ανανεώσετε την αίτηση καθώς υπάρχει αίτηση σε εξέλιξη.');
                return;
            }

            // Update the status of the selected application in Firestore
            const applicationDocRef = doc(db, 'applications', applicationId);
            await updateDoc(applicationDocRef, {
                status: 'ΥΠΟΒΕΒΛΗΜΕΝΗ',
            });

            // Re-fetch applications to reflect the changes
            const querySnapshot = await getDocs(collection(db, 'applications'));
            const fetchedApplications = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            const active = fetchedApplications.filter(app =>
                app.status === 'ΕΝΕΡΓΗ' || app.status === 'ΑΠΟΘΗΚΕΥΜΕΝΗ' || app.status === 'ΥΠΟΒΕΒΛΗΜΕΝΗ'
            );
            const history = fetchedApplications.filter(app =>
                app.status === 'ΟΛΟΚΛΗΡΩΜΕΝΗ' || app.status === 'ΑΚΥΡΩΜΕΝΗ'
            );

            setActiveApplications(active);
            setHistoryApplications(history);

            alert('Η αίτηση υποβλήθηκε προς ανανέωση!');
        } catch (error) {
            console.error('Error renewing application:', error);
            alert('Σφάλμα κατά την ανανέωση της αίτησης.');
        }
    };

    const handleCancel = async (applicationId) => {
        try {
            // Update the status of the selected application to 'ΔΙΕΓΡΑΜΕΝΗ'
            const applicationDocRef = doc(db, 'applications', applicationId);
            await updateDoc(applicationDocRef, {
                status: 'ΑΚΥΡΩΜΕΝΗ',
            });

            // Re-fetch applications to reflect the changes
            const querySnapshot = await getDocs(collection(db, 'applications'));
            const fetchedApplications = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            const active = fetchedApplications.filter(app =>
                app.status === 'ΕΝΕΡΓΗ' || app.status === 'ΑΠΟΘΗΚΕΥΜΕΝΗ' || app.status === 'ΥΠΟΒΕΒΛΗΜΕΝΗ'
            );
            const history = fetchedApplications.filter(app =>
                app.status === 'ΟΛΟΚΛΗΡΩΜΕΝΗ' || app.status === 'ΑΚΥΡΩΜΕΝΗ'
            );

            setActiveApplications(active);
            setHistoryApplications(history);

            alert('Η αίτηση ακυρώθηκε με επιτυχία!');
        } catch (error) {
            console.error('Error canceling application:', error);
            alert('Σφάλμα κατά την ακύρωση της αίτησης.');
        }
    };

    // const handleEdit = (app) => {
    //     // Save application data to localStorage
    //     localStorage.setItem('formData', JSON.stringify(app));
    //     // Navigate to the edit form
    //     navigate('/parent/applications/form1');
    // };

    const handleNewApplication = () => {
        if (activeApplications.length > 0) {
            alert('Δεν μπορείτε να δημιουργήσετε νέα αίτηση καθώς υπάρχει αίτηση σε εξέλιξη.');
            return;
        }

        navigate('/parent/applications/form1');
    };

    const handlePreview = (app) => {
        localStorage.setItem('formData', JSON.stringify(app));
        onOpen(); // Open the modal
    };

    const closeModal = () => {
        localStorage.removeItem('formData');
        onOpenChange(false); // Close the modal
    };

    return (
        <div className="h-screen bg-[#F2E9EB] flex flex-col">
            {/* Navigation */}
            <ParentNavBar />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                <header className="m-2 flex justify-center items-center">
                    <Button color="danger" size="sm" radius='full' onClick={handleNewApplication}>
                        ΝΕΑ ΑΙΤΗΣΗ
                    </Button>
                </header>

                <div className="flex-row">
                    {/* Active Applications */}
                    <h2 className="text-md font-bold mb-2">ΟΙ ΑΙΤΗΣΕΙΣ ΜΟΥ</h2>
                    <ScrollShadow hideScrollBar className="w-full max-h-[250px]">
                        {activeApplications.map((app) => (
                            <Card key={app.id} className=' mb-4' shadow='sm'>
                                <CardBody>
                                    <div className='flex flex-col-3 justify-between items-center gap-2'>
                                        <div className='flex flex-col-2 gap-4'>
                                            <div>
                                                <p className="text-sm font-semibold">ΚΩΔ.ΑΙΤΗΣΗΣ: {app?.id}</p>
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΥΠΟΒΟΛΗΣ: {formatTimestamp(app?.createdAt)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{app?.nanny?.name}</p>
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΑΠΑΣΧΟΛΗΣΗΣ: {`${formatTimestamp(app?.applicationPeriod?.from)} - ${formatTimestamp(app?.applicationPeriod?.to)}`|| "-"}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <h3
                                                className={`text-sm font-semibold mr-10 ${app?.status === "ΕΝΕΡΓΗ" ? "text-green-500" : "text-gray-800"}`}
                                            >
                                                {app?.status}
                                            </h3>
                                            { app?.status === "ΑΠΟΘΗΚΕΥΜΕΝΗ" || app?.status === "ΥΠΟΒΕΒΛΗΜΕΝΗ"  && (
                                                <Button size="sm" onClick={() => handleEdit(app)}>
                                                    ΕΠΕΞΕΡΓΑΣΙΑ
                                                </Button>
                                            )}
                                            { app?.status === "ΕΝΕΡΓΗ" && (
                                                <Button size="sm" onClick={() => handlePreview(app.id)}>
                                                    ΠΡΟΕΠΙΣΚΟΠΗΣΗ
                                                </Button>
                                            )}
                                            <Button size="sm" color="danger" onClick={() => handleCancel(app.id)}>
                                                ΑΚΥΡΩΣΗ
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </ScrollShadow>

                    {/* Application History */}
                    <h2 className="text-md font-bold mb-2">ΙΣΤΟΡΙΚΟ ΑΙΤΗΣΕΩΝ</h2>
                    <ScrollShadow hideScrollBar className="w-full max-h-[250px]">
                        {historyApplications.map((app) => (
                            <Card key={app.id} className='mb-4' shadow='sm'>
                                <CardBody>
                                    <div className='flex flex-col-3 justify-between items-center gap-2'>
                                        <div className='flex flex-col-2 gap-4'>
                                            <div>
                                                <p className="text-sm font-semibold">ΚΩΔ.ΑΙΤΗΣΗΣ: {app?.id}</p>
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΥΠΟΒΟΛΗΣ: {formatTimestamp(app?.createdAt)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{app?.nanny?.name}</p>
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΑΠΑΣΧΟΛΗΣΗΣ: {`${formatTimestamp(app?.applicationPeriod?.from)} - ${formatTimestamp(app?.applicationPeriod?.to)}`|| "-"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <h3
                                                className={`text-sm font-semibold mr-5 ${app?.status === "ΑΚΥΡΩΜΕΝΗ" ? "text-red-600" : "text-gray-800"}`}
                                            >
                                                {app?.status}
                                            </h3>
                                            <Button size="sm" onClick={() => handleRenew(app.id)}>
                                                ΑΝΑΝΕΩΣΗ
                                            </Button>
                                            <Button size="sm" onPress={() => handlePreview(app)}>
                                                ΠΡΟΕΠΙΣΚΟΠΗΣΗ
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            
                        ))}
                    </ScrollShadow>
                </div>
            </main>

            {/* Modal for Preview */}
            <Modal size='5xl' placement='center' isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        <AppPreview />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={closeModal}>
                            Κλείσιμο
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
};

export default ParentApplicationsPage;