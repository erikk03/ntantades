import React, {useState, useEffect} from 'react';
import { useAuth } from '../../config/AuthContext';
import { useNavigate } from 'react-router-dom';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';
import { db } from '../../config/firebase';

// components
import AppPreview from '../../components/AppPreview';
import ParentNavBar from '../../components/ParentNavBar';
import { Button, Card, CardBody, ScrollShadow, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { Info } from 'lucide-react';

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
    
    const handleEdit = (app) => {
        try {

            // Transform the data into the correct structure
            const transformedData = {
                form1: {
                    gender: app?.parent?.gender || '',
                    homephone: app?.parent?.homephone || '',
                    cellphone1: app?.parent?.cellphone1 || '',
                    cellphone2: app?.parent?.cellphone2 || '',
                    EMAIL: app?.parent?.EMAIL || '',
                    perifereia: app?.parent?.perifereia || '',
                    nomos: app?.parent?.nomos || '',
                    dimos: app?.parent?.dimos || '',
                    city: app?.parent?.city || '',
                    street: app?.parent?.address?.split(' ')[0] || '',
                    streetnumber: app?.parent?.address?.split(' ')[1] || '',
                    zipcode: app?.parent?.zipcode || '',
                },
                form2: {
                    selectedKid: [ app?.child?.selectedKid[0] || ''],
                    name: app?.child?.name || '',
                    surname: app?.child?.surname || '',
                    AMKA: app?.child?.AMKA || '',
                    AT: app?.child?.AT || '',
                    birthday: app?.child?.birthday || '',
                    gender: app?.child?.gender || '',
                    allergies: app?.child?.allergies || '',
                    diet: app?.child?.diet || '',
                    difficulties: app?.child?.difficulties || '',
                    dislikes: app?.child?.dislikes || '',
                    likes: app?.child?.likes || '',
                    extra: app?.child?.extra || '',
                },
                form3: {
                    δευτερα_from: app?.schedule?.monday?.from || '',
                    δευτερα_to: app?.schedule?.monday?.to || '',
                    τριτη_from: app?.schedule?.tuesday?.from || '',
                    τριτη_to: app?.schedule?.tuesday?.to || '',
                    τεταρτη_from: app?.schedule?.wednesday?.from || '',
                    τεταρτη_to: app?.schedule?.wednesday?.to || '',
                    πεμπτη_from: app?.schedule?.thursday?.from || '',
                    πεμπτη_to: app?.schedule?.thursday?.to || '',
                    παρασκευη_from: app?.schedule?.friday?.from || '',
                    παρασκευη_to: app?.schedule?.friday?.to || '',
                    σαββατο_from: app?.schedule?.saturday?.from || '',
                    σαββατο_to: app?.schedule?.saturday?.to || '',
                    κυριακη_from: app?.schedule?.sunday?.from || '',
                    κυριακη_to: app?.schedule?.sunday?.to || '',
                    extra: app?.schedule?.extra || '',
                },
                form4: {
                    nannyData:{
                        id: app?.nanny?.uid || '',
                    }
                },
            };

            // Store the application ID in localStorage
            localStorage.setItem('applicationId', app.id); // Store the ID for edit mode

            // Store the transformed data in localStorage
            localStorage.setItem('formData', JSON.stringify(transformedData));

            // Perform a hard redirect to the form1 page
            window.location.assign('/parent/applications/form1');
        } catch (error) {
            console.error("Unexpected error", error);
        }
    };
    

    const handleNewApplication = () => {
        if (activeApplications.length > 0) {
            alert('Δεν μπορείτε να δημιουργήσετε νέα αίτηση καθώς υπάρχει αίτηση σε εξέλιξη.');
            return;
        }
        navigate('/parent/applications/form1');
    };

    const handlePreview = (app) => {
        setSelectedApp(app);
        onOpen(); // Open the modal
    };

    const closeModal = () => {
        setSelectedApp(null); // Clear the selected application
        onOpenChange(false); // Close the modal
    };

    return (
        <div className="h-screen bg-[#F2E9EB] flex flex-col">
            {/* Navigation */}
            <ParentNavBar />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                <header className="m-2">
                    <div className='flex justify-center items-center'>
                        <Button color="danger" size="sm" radius='full' onClick={handleNewApplication}>
                            ΝΕΑ ΑΙΤΗΣΗ
                        </Button>
                    </div>
                    <div className='flex justify-end items-center'>
                        <Popover placement="left" showArrow={true} backdrop='opaque'>
                            <PopoverTrigger>
                                <Info className='cursor-pointer text-gray-700'/>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <div className="text-tiny"><b>ΕΝΕΡΓΗ:</b> Η αίτηση έχει υποβληθεί οριστικά και έχει εγκριθεί απο τον/την επιμελητή/τρια, δηλαδή είναι σε ισχύ.</div>
                                    <div className="text-tiny"><b>ΑΠΟΘΗΚΕΥΜΕΝΗ:</b> Η αίτηση έχει αποθηκευτεί προσωρινά και μπορεί να επεξεργαστεί.</div>
                                    <div className="text-tiny"><b>ΥΠΟΒΕΒΛΗΜΕΝΗ:</b> Η αίτηση έχει υποβληθεί οριστικά και αναμένει απάντηση απο τον/την επιμελητή/τρια.</div>
                                    <div className="text-tiny"><b>ΟΛΟΚΛΗΡΩΜΕΝΗ:</b> Η αίτηση έχει ολοκληρωθεί, δηλαδή δεν είναι σε ισχύ. Μπορεί να ανανεωθεί, αρκεί να μην υπάρχει άλλη αίτηση σε ισχύ.</div>
                                    <div className="text-tiny"><b>ΑΚΥΡΩΜΕΝΗ:</b> Η αίτηση έχει ακυρωθεί, είτε απο τον χρήστη, είτε απο τον/την επιμελητή/τρια.</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
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
                                            { (app?.status === "ΑΠΟΘΗΚΕΥΜΕΝΗ" || app?.status === "ΥΠΟΒΕΒΛΗΜΕΝΗ")  && (
                                                <Button size="sm" onClick={() => handleEdit(app)}>
                                                    ΕΠΕΞΕΡΓΑΣΙΑ
                                                </Button>
                                            )}
                                            { app?.status === "ΕΝΕΡΓΗ" && (
                                                <Button size="sm" onClick={() => handlePreview(app)}>
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
                        <AppPreview app={selectedApp} />
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