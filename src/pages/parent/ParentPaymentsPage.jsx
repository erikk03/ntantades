import React, {useState, useEffect} from 'react';
import { useAuth } from '../../config/AuthContext';
import ParentNavBar from '../../components/ParentNavBar';
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

const ParentPaymentsPage = () => {
    const { user, userData } = useAuth();
    const [userApplications, setApplications] = useState([]);
    const [pendingPayments, setPendingPayments] = useState([]);
    const [paidPayments, setPaidPayments] = useState([]);
    const [activeVoucher, setActiveVoucher] = useState(null); // To store the active voucher details
    const [voucherCode, setVoucherCode] = useState(generateFirestoreId());

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
                const userApplications = fetchedApplications.filter(app => app.parent?.uid === user.uid);

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

                // Set the active voucher to the first pending payment
                setActiveVoucher(allPendingPayments[0] || null);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, [user.uid]);

    const onPayWithVoucher = async (applicationId, paymentId) => {
        try {
            const paymentDocRef = doc(db, 'applications', applicationId);

            await updateDoc(paymentDocRef, {
                [`payments.${paymentId}.pstatus`]: 'sent',
            });

            setPendingPayments((prev) =>
                prev.map((payment) =>
                    payment.paymentId === paymentId
                        ? { ...payment, pstatus: 'sent' }
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
            <ParentNavBar />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                <div className="flex-row">
                    {/* VOUCHER */}
                    <h2 className="text-md font-bold mt-4 mb-1">voucher</h2>
                    {activeVoucher ? (
                        <>
                        <Card className='shadow-sm' style={{ background: 'linear-gradient(to right, #041539 0%, #540FC2 30%, #C30CB1 60%, #C20609 80%, #000000 100%)'}} >
                            <CardBody>
                                <div className='flex flex-col-2 justify-between items-center gap-2'>
                                    <div className='flex flex-col-5 gap-20'>
                                        <div>
                                            <p className="text-xs font-semibold text-white">ΚΩΔ: {voucherCode}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-white">{`${userData?.name} ${userData?.surname}`}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-white">ΗΜ. ΕΚΔΟΣΗΣ: {formatTimestamp(activeVoucher?.period?.from)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-white">ΗΜ. ΛΗΞΗΣ: {formatTimestamp(activeVoucher?.period?.to)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-white">ΠΟΣΟ: {activeVoucher?.cost}€</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <QrCode color='white' />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <p className='text-xs mb-4'>Αυτοματοποιημένη έκδοση έπειτα απο διασταύρωση στοιχείων και κριτηρίων</p>
                        </>
                    ) : (
                        <p className="text-sm text-gray-500">Μη διαθέσιμο voucher καθώς δεν εκρεμμεί λογαριασμός</p>
                    )}
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
                                                <p className="text-sm font-semibold">{payment?.nannyName}</p>
                                                <p className="text-xs text-gray-500">ΛΗΞΗ ΑΠΑΣΧΟΛΗΣΗΣ: {formatTimestamp(payment?.period?.to)}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <h3 className="text-ΜΔ font-bold">
                                                ΚΟΣΤΟΣ: {payment?.cost} €
                                            </h3>
                                            {payment.pstatus === 'pending' && (
                                                <Button size="sm" color="secondary" onClick={() => onPayWithVoucher(payment.appId, payment.paymentId)}>
                                                    ΠΛΗΡΩΜΗ ΜΕ VOUCHER
                                                </Button>
                                            )}
                                            {payment.pstatus === 'sent' && (
                                                <Button size="sm" isDisabled color="secondary">
                                                    ΕΧΕΙ ΑΠΟΣΤΑΛΕΙ
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
                                                <p className="text-sm font-semibold">{payment?.nannyName}</p>
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

export default ParentPaymentsPage;