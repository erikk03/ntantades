import React from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Button } from '@nextui-org/react';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";


const NannyPage = () => {
    const { user } = useAuth();

    return (
    <div className="flex flex-col min-h-screen bg-[#F2E9EB]">
        {/* Navigation */}
        <NannyNavBar />

        {/* Main Content */}
        <main className="flex-grow flex justify-center items-center flex-col">
            {/* Title */}
            <h1 className="text-xl font-bold m-2">
                Είσαι επιμελητής/τρια που αναζητά εργασία;
            </h1>

            <div className="flex justify-center">
                
                <div className=" w-[400px] h-[350px] flex items-center justify-center m-2">
                    <img src="/icons/nanny.png" alt="Eligible"/>
                </div>

                {/* Text Blocks */}
                <div className="m-2 space-y-2">
                    <p className='font-bold'>Δικαίωμα συμμετοχής έχουν:</p>
                    <div className="bg-green-100 p-1 rounded-md shadow">
                        <p>Άτομα τα οποία έχουν συμπληρώσει το 18ο έτος της ηλικίας τους.</p>
                    </div>
                    <div className="bg-green-100 p-1 rounded-md shadow">
                        <p>Άτομα τα οποία είναι Έλληνες ή αλλοδαποί πολίτες που διαμένουν νόμιμα στην Ελλάδα και έχουν πρόσβαση στην αγορά εργασίας.</p>
                    </div>
                    <div className="bg-green-100 p-1 rounded-md shadow">
                        <p>Όσοι πληρούν τις προϋποθέσεις της υπ’ αριθμ.: 41866/24-04-2023 Τροποποίησης της Πρόσκλησης Εκδήλωσης Ενδιαφέροντος προς υποψήφιους/ες Επιμελητές/τριες που είναι διαθέσιμη στις οδηγίες της ιστοσελίδας.</p>
                    </div>
                </div>
            </div>

            {/* Registration Section */}
            <div className="flex justify-center items-center m-2 -translate-x-[130px] translate-y-[40px]">
                {/* Text */}
                <p className="font-bold text-lg mb-4 translate-x-[70px] -translate-y-[40px]">ΕΙΣΑΙ ΔΙΚΑΙΟΥΧΟΣ;</p>

                {/* png Arrow */}
                <div className="">
                    <img src="/icons/arrow.png" alt="Eligible" className="w-15 h-12 -translate-x-[10px] -translate-y-[10px]"/>
                </div>

                {/* Button */}
                <Button color="danger" variant="solid" size="md" onClick={() => (window.location.href = '/nanny/advertisments/form1')}>
                    ΔΗΜΙΟΥΡΓΙΑ ΑΓΓΕΛΙΑΣ
                </Button>
            </div>
        </main>

        {/* Help Section */}
        <footer className=" p-4 text-gray-600">
            <div className="text-center">
                <p className="font-bold">ΧΡΕΙΑΖΕΣΑΙ ΒΟΗΘΕΙΑ;</p>
                <div className="text-sm flex flex-center justify-center">
                    <span>Μπορείς να </span>
                    <Popover placement="top" showArrow={true} offset={20} backdrop="opaque">
                        <PopoverTrigger>
                            <span className="text-pink-500 underline cursor-pointer ml-1 mr-1">επικοινωνήσεις</span>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small font-bold">Επικοινωνία</div>
                                <div className="text-tiny">helpdesk@ntantades.gr</div>
                                <div className="text-tiny">210 1244257</div>
                                <div className='text-tiny'>210 2315364</div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <span> μαζί μας ή να δεις τις </span>
                    <Popover placement="top" showArrow={true} offset={20} backdrop="opaque">
                        <PopoverTrigger>
                            <span className="text-pink-500 underline cursor-pointer ml-1 mr-1"> οδηγίες </span>
                        </PopoverTrigger>
                        <PopoverContent className="w-[1080px]">
                            <div>
                                <img src="/images/nanny_help.png" alt="Eligible" />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <span> για την χρήση της πλατφόρμας.</span>
                </div>

            </div>
        </footer>
    </div>
    );
};

export default NannyPage;
