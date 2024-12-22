import React from 'react';
import { useAuth } from '../config/AuthContext';
import NannyNavBar from '../components/NannyNavBar';

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
                    className="absolute top-28 left-20 w-[200px] h-[300px] border-4 border-gray-400 bg-white rounded-full flex items-center justify-center"
                >
                    <p className="text-center text-gray-500 text-sm">φωτογραφία νταντας</p>
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
                <div className="absolute bottom-[70px] left-[50%] transform -translate-x-1/2 text-center">
                    {/* Text */}
                    <p className="font-bold text-lg mb-4"
                    style={{ transform: 'translate(-180px, 40px)' }}
                    >ΕΙΣΑΙ ΔΙΚΑΙΟΥΧΟΣ;</p>

                    {/* SVG Arrow */}
                    <div className="relative w-full h-16">
                        <svg
                            className="absolute top-[20px] right-[100px] transform"
                            width="200"
                            height="120"
                            viewBox="0 0 200 120"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Dotted Arrow Line */}
                            <path 
                                d="M0 20 C30 90, 12 90, 140 50"
                                stroke="black"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="5,5"
                            />
                            
                            {/* Arrowhead */}
                            <polygon
                                points="140,50 130,40 130,60"
                                fill="black"
                            />

                        </svg>
                    </div>

                    {/* Button */}
                    <button className="bg-pink-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-pink-600 mt-4"
                    style={{ transform: 'translate(-10px, -30px)' }}
                    >
                        ΕΓΓΡΑΦΗ
                    </button>
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
