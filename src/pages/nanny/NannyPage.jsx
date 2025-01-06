import React from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';


const NannyPage = () => {
    const { user } = useAuth();

    return (
        <div className="h-screen flex flex-col justify-between bg-pink-100 overflow-hidden">
            {/* Navigation */}
            <NannyNavBar />

            {/* Main Content */}
            <main className="flex-grow relative">
                {/* Title */}
                <h1 className="text-2xl font-bold absolute top-10 left-1/2 transform -translate-x-1/2">
                    Είσαι επιμελητής/τρια που αναζητά εργασία;
                </h1>

                {/* Oval Placeholder for Image */}
                <div
                    className="absolute top-28 left-20 w-[200px] h-[300px] flex items-center justify-center"
                >
                    <img src="../../public/icons/nanny.png" alt="Eligible"/>
                </div>

                {/* Text Blocks */}
                <div className="absolute top-28 left-[300px] space-y-4">
                    <div className="bg-green-100 p-4 rounded-md shadow">
                        <p>Άτομα τα οποία έχουν συμπληρώσει το 18ο έτος της ηλικίας τους.</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-md shadow">
                        <p>
                            Άτομα τα οποία είναι Έλληνες ή αλλοδαποί πολίτες που διαμένουν νόμιμα στην
                            Ελλάδα και έχουν πρόσβαση στην αγορά εργασίας.
                        </p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-md shadow">
                        <p>
                            Όσοι πληρούν τις προϋποθέσεις της υπ’ αριθμ.: 41866/24-04-2023
                            Τροποποίησης της Πρόσκλησης Εκδήλωσης Ενδιαφέροντος προς υποψήφιους/ες
                            Επιμελητές/τριες που είναι διαθέσιμη στις οδηγίες της ιστοσελίδας.
                        </p>
                    </div>
                </div>

                {/* Registration Section */}
                <div className="flex justify-center items-center m-2 -translate-x-[130px] translate-y-[450px]">
                    {/* Text */}
                    <p className="font-bold text-lg mb-4 -translate-y-[40px]">ΕΙΣΑΙ ΔΙΚΑΙΟΥΧΟΣ;</p>

                    {/* png Arrow */}
                    <div className="">
                        <img src="../../public/icons/arrow.png" alt="Eligible" className="w-15 h-12 -translate-x-[10px] -translate-y-[10px]"/>
                    </div>

                    {/* Button */}
                    <Button color="success" variant="solid" size="md" onClick={() => (window.location.href = '/nanny/form1')}>
                        ΔΗΜΙΟΥΡΓΙΑ ΑΙΤΗΣΗΣ
                    </Button>
                </div>
            </main>

            {/* Help Section */}
            <footer className="p-4 text-gray-600">
                <div className="text-center">
                    <p className="font-bold">ΧΡΕΙΑΖΕΣΑΙ ΒΟΗΘΕΙΑ;</p>
                    <p className="text-sm">
                        Μπορείς να <a href="#" className="text-pink-500 underline">επικοινωνήσεις</a> μαζί μας ή να
                        δεις τις <a href="#" className="text-pink-500 underline">οδηγίες</a> για την εγγραφή στο
                        σύστημα
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default NannyPage;
