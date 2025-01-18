import React, {useState, useEffect} from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Button, Card, CardBody, ScrollShadow, Modal, ModalContent, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import {collection, getDocs, updateDoc, doc, serverTimestamp} from 'firebase/firestore';
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

const calculateMonthlyHours = (schedule) => {
    // Helper function to parse "HH:mm:ss" and convert to hours
    const parseTimeToHours = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours + minutes / 60 + seconds / 3600;
    };

    // Calculate weekly hours based on the schedule
    let weeklyHours = 0;

    for (const day in schedule) {
        if (day !== 'extra' && schedule[day]?.from && schedule[day]?.to) {
            const fromHours = parseTimeToHours(schedule[day].from);
            const toHours = parseTimeToHours(schedule[day].to);
            weeklyHours += toHours - fromHours;
        }
    }

    // Calculate monthly hours by multiplying weekly hours by 4.33 (average weeks per month)
    const monthlyHours = weeklyHours * 4.33;

    return monthlyHours.toFixed(2); // Return monthly hours rounded to 2 decimal places
};

const NannyApplicationsPage = () => {
    const { user } = useAuth();
    const [activeApplications, setActiveApplications] = useState([]);
    const [historyApplications, setHistoryApplications] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedApp, setSelectedApp] = useState(null);

    // Fetch advertisements from Firestore
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'applications')); // Replace 'applications' with your Firestore collection name
                const fetchedApplications = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Filter applications by nanny.id === user.id
                const userApplications = fetchedApplications.filter(app => app?.nanny?.uid === user?.uid);

                // Separate applications based on status
                const active = userApplications.filter(app =>
                    app.status === 'ΕΝΕΡΓΗ' || app.status === 'ΥΠΟΒΕΒΛΗΜΕΝΗ'
                );
                const history = userApplications.filter(app =>
                    app.status === 'ΟΛΟΚΛΗΡΩΜΕΝΗ'
                );

                setActiveApplications(active);
                setHistoryApplications(history);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const handleAccept = async (applicationId, nannyHourlyRate, hoursPerMonth, nannyName, parentName) => {
        try {
            // Step 1: Get the current timestamp for the application start date
            const startDate = new Date();
    
            // Step 2: Calculate the end date (6 months later)
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 6);
    
            // Step 3: Create payment periods (6 monthly payments, each 30 days long)
            const payments = {};
            let currentStartDate = new Date(startDate);
    
            for (let i = 0; i < 6; i++) {
                // Calculate the period's end date (30 days after currentStartDate)
                const currentEndDate = new Date(currentStartDate);
                currentEndDate.setDate(currentEndDate.getDate() + 30);
    
                // Calculate the cost for the payment period
                const cost = nannyHourlyRate * hoursPerMonth; // Assuming hourly rate * monthly hours
    
                // Generate a unique ID for this payment
                const paymentId = doc(collection(db, 'random')).id;
    
                // Add payment to the payments map
                payments[paymentId] = {
                    appId: applicationId,
                    cost: cost.toString(),
                    nannyName: nannyName,
                    parentName: parentName,
                    paymentId: paymentId,
                    period: {
                        from: currentStartDate,
                        to: currentEndDate,
                    },
                    pstatus: "pending",
                    status: "ΕΚΡΕΜΕΙ",
                };
    
                // Move to the next period (start date = end date + 1 day)
                currentStartDate = new Date(currentEndDate);
                currentStartDate.setDate(currentStartDate.getDate() + 1);
            }
    
            // Step 4: Update Firestore with the application status and payments
            const applicationDocRef = doc(db, 'applications', applicationId);
            await updateDoc(applicationDocRef, {
                status: 'ΕΝΕΡΓΗ',
                applicationPeriod: {
                    from: startDate,
                    to: endDate,
                },
                payments: payments, // Add the generated payments map
                updatedAt: serverTimestamp(), // Optional: Track update timestamp
            });
            
            // Re-fetch applications to reflect the changes
            const querySnapshot = await getDocs(collection(db, 'applications'));
            const fetchedApplications = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Filter applications by nanny.id === user.id
            const userApplications = fetchedApplications.filter(app => app?.nanny?.uid === user?.uid);

            const active = userApplications.filter(app =>
                app.status === 'ΕΝΕΡΓΗ' || app.status === 'ΥΠΟΒΕΒΛΗΜΕΝΗ'
            );
            const history = userApplications.filter(app =>
                app.status === 'ΟΛΟΚΛΗΡΩΜΕΝΗ'
            );

            setActiveApplications(active);
            setHistoryApplications(history);

            alert('Η αίτηση έγινε αποδεκτή επιτυχώς και δημιουργήθηκαν οι πληρωμές!');
    
        } catch (error) {
            console.error('Error while accepting the application and creating payments:', error);
            alert('Σφάλμα κατά την αποδοχή της αίτησης.');
        }
    };

    const handleCancel = async (applicationId) => {
        try {
            // Update the status of the selected application to 'ΔΙΕΓΡΑΜΕΝΗ'
            const applicationDocRef = doc(db, 'applications', applicationId);
            await updateDoc(applicationDocRef, {
                status: 'ΟΛΟΚΛΗΡΩΜΕΝΗ',
            });

            // Re-fetch applications to reflect the changes
            const querySnapshot = await getDocs(collection(db, 'applications'));
            const fetchedApplications = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Filter applications by nanny.id === user.id
            const userApplications = fetchedApplications.filter(app => app?.nanny?.uid === user?.uid);

            const active = userApplications.filter(app =>
                app.status === 'ΕΝΕΡΓΗ' || app.status === 'ΥΠΟΒΕΒΛΗΜΕΝΗ'
            );
            const history = userApplications.filter(app =>
                app.status === 'ΟΛΟΚΛΗΡΩΜΕΝΗ'
            );

            setActiveApplications(active);
            setHistoryApplications(history);

            alert('Η αίτηση ολοκληρώθηκε με επιτυχία!');
        } catch (error) {
            console.error('Error finalising application:', error);
            alert('Σφάλμα κατά την ολοκλήρωση της αίτησης.');
        }
    };

    const handlePreview = (app) => {
        setSelectedApp(app); // Set the selected application
        onOpen(); // Open the modal
    };

    const closeModal = () => {
        setSelectedApp(null); // Clear the selected application
        onOpenChange(false); // Close the modal
    };

    return (
        <div className="h-screen bg-[#F2E9EB] flex flex-col">
            {/* Navigation */}
            <NannyNavBar />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">

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
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΑΠΑΣΧΟΛΗΣΗΣ: {app?.employmentDate || "-"}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <h3
                                                className={`text-sm font-semibold mr-20 ${app?.status === "ΕΝΕΡΓΗ" ? "text-green-500" : "text-gray-800"}`}
                                            >
                                                {app?.status}
                                            </h3>
                                            { app?.status === "ΥΠΟΒΕΒΛΗΜΕΝΗ"  && (
                                                <Button size="sm" color="success" variant='ghost' onClick={() => handleAccept(app.id, app?.nanny?.payment, calculateMonthlyHours(app?.schedule), app?.nanny?.name, `${app?.parent?.name} ${app?.parent?.surname}`)}>
                                                    ΑΠΟΔΟΧΗ
                                                </Button>
                                            )}
                                            <Button size="sm" onClick={() => handlePreview(app)}>
                                                ΠΡΟΕΠΙΣΚΟΠΗΣΗ
                                            </Button>
                                            <Button size="sm" color="danger" onClick={() => handleCancel(app.id)}>
                                                ΑΠΟΡΡΙΨΗ
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
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΑΠΑΣΧΟΛΗΣΗΣ: {app?.employmentDate || "-"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <h3
                                                className={`text-sm font-semibold mr-5 text-red-600`}
                                            >
                                                {app?.status}
                                            </h3>
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
                        <AppPreview app={selectedApp}/>
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

export default NannyApplicationsPage;