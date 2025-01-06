import React, {useState, useEffect} from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Button, Card, CardBody, ScrollShadow } from '@nextui-org/react';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { QrCode } from 'lucide-react';

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

const generateFirestoreId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let firestoreId = '';
    for (let i = 0; i < 20; i++) {
        firestoreId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return firestoreId;
};

const NannyPaymentsPage = () => {
    const { user, userData } = useAuth();
    const [userApplications, setApplications] = useState([]);
    const [pendingPayments, setPendingPayments] = useState([]);
    const [paidPayments, setPaidPayments] = useState([]);

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
                const userApplications = fetchedApplications.filter(app => app.nanny?.uid === user.uid);

                setApplications(userApplications);

                // Separate pending and paid payments
                const allPendingPayments = [];
                const allPaidPayments = [];

                userApplications.forEach(app => {
                    // Check if payments map exists
                    const payments = app.payments;
                    if (payments) {
                        // Iterate over the payments map
                        Object.values(payments).forEach(payment => {
                            if (payment.status === 'ΕΚΡΕΜΕΙ' && payment?.period?.from?.seconds < Date.now() / 1000) {
                                allPendingPayments.push(payment);
                            } else if (payment.status === 'ΕΞΟΦΛΗΜΕΝΗ') {
                                allPaidPayments.push(payment);
                            }
                        });
                    }
                });

                // Sort pending payments by 'from' timestamp in period (newest first)
                allPendingPayments.sort((a, b) => {
                    const fromA = a.period?.from?.seconds || 0; // Use 'from' timestamp for sorting
                    const fromB = b.period?.from?.seconds || 0;
                    return fromB - fromA; // Newest first
                });

                // Sort paid payments by 'from' timestamp in period (newest first)
                allPaidPayments.sort((a, b) => {
                    const fromA = a.period?.from?.seconds || 0;
                    const fromB = b.period?.from?.seconds || 0;
                    return fromB - fromA; // Newest first
                });

                // Set the payments in the respective states
                setPendingPayments(allPendingPayments);
                setPaidPayments(allPaidPayments);

            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, [user.uid]);

    const acceptPayWithVoucher = async (applicationId, paymentId) => {
        try {
            const paymentDocRef = doc(db, 'applications', applicationId);

            await updateDoc(paymentDocRef, {
                [`payments.${paymentId}.status`]: 'ΕΞΟΦΛΗΜΕΝΗ',
                [`payments.${paymentId}.pstatus`]: 'accepted',
            });

            setPendingPayments((prev) =>
                prev.map((payment) =>
                    payment.paymentId === paymentId
                        ? { ...payment, pstatus: 'accepted' }
                        : payment
                )
            );
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };

    return (
        <div className="h-screen bg-[#F2E9EB] flex flex-col">
            {/* Navigation */}
            <NannyNavBar />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                <div className="flex-row">
                    
                    {/* Active Applications */}
                    <h2 className="text-md font-bold mb-2">ΕΚΡΕΜΕΙΣ ΠΛΗΡΩΜΕΣ</h2>
                    <ScrollShadow hideScrollBar className="w-full max-h-[200px]">
                        {pendingPayments.map((payment, index) => (
                            <Card key={index} className=' mb-4' shadow='sm'>
                                <CardBody>
                                    <div className='flex flex-col-3 justify-between items-center gap-2'>
                                        <div className='flex flex-col-2 gap-4'>
                                            <div>
                                                <p className="text-sm font-semibold">ΚΩΔ.ΑΙΤΗΣΗΣ: {payment?.appId}</p>
                                                <p className="text-xs text-gray-500">ΕΝΑΡΞΗ ΑΠΑΣΧΟΛΗΣΗΣ: {formatTimestamp(payment?.period?.from)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">ΑΠΟ: {payment?.parentName}</p>
                                                <p className="text-xs text-gray-500">ΛΗΞΗ ΑΠΑΣΧΟΛΗΣΗΣ: {formatTimestamp(payment?.period?.to)}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <h3 className="text-ΜΔ font-bold">
                                                ΚΟΣΤΟΣ: {payment?.cost} €
                                            </h3>
                                            {payment.pstatus === 'pending' && (
                                                <Button size="sm" isDisabled>
                                                    ΑΝΑΜΟΝΗ ΠΛΗΡΩΜΗΣ
                                                </Button>
                                            )}
                                            {payment.pstatus === 'sent' && (
                                                <Button size="sm" color="secondary" onClick={() => acceptPayWithVoucher(payment.appId, payment.paymentId)}>
                                                    ΑΠΟΔΟΧΗ ΠΛΗΡΩΜΗΣ
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </ScrollShadow>

                    {/* Application History */}
                    <h2 className="text-md font-bold mb-2">ΙΣΤΟΡΙΚΟ ΠΛΗΡΩΜΩΝ</h2>
                    <ScrollShadow hideScrollBar className="w-full max-h-[250px]">
                        {paidPayments.map((payment, index) => (
                            <Card key={index} className='mb-4' shadow='sm'>
                                <CardBody>
                                    <div className='flex flex-col-3 justify-between items-center gap-2'>
                                        <div className='flex flex-col-2 gap-4'>
                                            <div>
                                                <p className="text-sm font-semibold">ΚΩΔ.ΑΙΤΗΣΗΣ: {payment?.appId}</p>
                                                <p className="text-xs text-gray-500">ΕΝΑΡΞΗ ΑΠΑΣΧΟΛΗΣΗΣ: {formatTimestamp(payment?.period?.from)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">ΑΠΟ: {payment?.parentName}</p>
                                                <p className="text-xs text-gray-500">ΛΗΞΗ ΑΠΑΣΧΟΛΗΣΗΣ: {formatTimestamp(payment?.period?.to)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <h3 className={`text-sm line-through font-semibold mr-5 text-gray-800`}>
                                                ΚΟΣΤΟΣ {payment?.cost} €
                                            </h3>
                                            <h3 className={`text-sm font-semibold mr-5 text-red-600`}>
                                                ΕΞΟΦΛΗΜΕΝΗ
                                            </h3>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            
                        ))}
                    </ScrollShadow>
                </div>
            </main>
        </div>
    );
};

export default NannyPaymentsPage;