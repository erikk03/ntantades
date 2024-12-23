import React from 'react';
import { useAuth } from '../config/AuthContext';
import ParentNavBar from '../components/ParentNavBar';
import { Button } from '@nextui-org/react';

const ParentPage = () => {
    const { user } = useAuth();

    return (
    <div className="flex flex-col min-h-screen bg-pink-100">
        {/* Navigation */}
        <ParentNavBar />

        {/* Main Content */}
        <main className="flex-grow flex justify-center items-center flex-col">
                {/* Title */}
                <h1 className="text-xl font-bold m-2">
                    Είσαι επιμελητής/τρια που αναζητά εργασία;
                </h1>

                <div className='flex justify-center'>
                    {/* Oval Placeholder for Image */}
                    <div
                        className=" w-[500px] h-[350px] border-4 border-gray-400 bg-white rounded-full flex items-center justify-center m-2"
                    >
                        <p className="text-center text-gray-500 text-sm">φωτογραφία γονέα</p>
                    </div>

                    {/* Text Blocks */}
                    <div className=" m-2 space-y-2">
                        <p className='font-bold'>Δικαίωμα συμμετοχής έχουν:</p>
                        <div className="bg-green-100 p-1 rounded-md shadow">
                            <p>Μητέρες και πατέρες φυσικοί, θετοί ή ανάδοχοι, με βρέφος ή νήπιο, που εργάζονται είτε στο δημόσιο είτε στον ιδιωτικό τομέα, με οποιαδήποτε μορφή απασχόλησης, συμπεριλαμβανομένων και των αυτοαπασχολούμενων και ελεύθερων επαγγελματιών.</p>
                        </div>
                        <div className="bg-green-100 p-1 rounded-md shadow">
                            <p>Μητέρες και πατέρες φυσικοί, θετοί ή ανάδοχοι, με βρέφος ή νήπιο, που είναι εγγεγραμμένοι στα μητρώα της Δ.ΥΠ.Α. (πρώην ΟΑΕΔ) ως άνεργοι.</p>
                        </div>
                        <div className="bg-green-100 p-1 rounded-md shadow">
                            <p>Κάθε πρόσωπο στο οποίο έχει ανατεθεί, με δικαστική απόφαση ή εισαγγελική διάταξη, η αποκλειστική επιμέλεια βρέφους ή νηπίου, που εργάζεται είτε στο δημόσιο είτε στον ιδιωτικό τομέα, με οποιαδήποτε μορφή απασχόλησης, συμπεριλαμβανομένων και των αυτοαπασχολούμενων και ελεύθερων επαγγελματιών.</p>
                        </div>
                        <div className="bg-green-100 p-1 rounded-md shadow">
                            <p>Ωφελούμενοι που έχουν ανήλικο τέκνο δύο (2) μηνών έως δύο (2) ετών και έξι (6) μηνών.</p>
                        </div>
                        <div className="bg-green-100 p-1 rounded-md shadow">
                            <p>Ωφελούμενοι που το ετήσιο ατομικό τους εισόδημά να μην υπερβαίνει το ποσό των 24.000 € για το προηγούμενο φορολογικό έτος (για εισοδήματα που αποκτήθηκαν από 01/01 έως 31/12). </p>
                        </div>
                        <div className="bg-green-100 p-1 rounded-md shadow">
                            <p>Ωφελούμενοι που δεν τελούν υπό καθεστώς άδειας μητρότητας ή άδειας πατρότητας ή άδειας ανατροφής τέκνου ή γονικής άδειας ή ειδικής παροχής προστασίας μητρότητας  ή να μην έχουν διακόψει ή αναστείλει την επαγγελματική τους δραστηριότητα.</p>
                        </div>
                    </div>
                </div>

                {/* Registration Section */}
                <div className="flex justify-center items-center m-2 -translate-x-[130px] translate-y-[40px]">
                    {/* Text */}
                    <p className="font-bold text-lg mb-4 -translate-y-[40px]">ΕΙΣΑΙ ΔΙΚΑΙΟΥΧΟΣ;</p>

                    {/* png Arrow */}
                    <div className="">
                        <img src="../../public/icons/arrow.png" alt="Eligible" className="w-15 h-12 -translate-x-[10px] -translate-y-[10px]"/>
                    </div>

                    {/* Button */}
                    <Button color="success" variant="solid" size='md'>
                        ΔΗΜΙΟΥΡΓΙΑ ΑΙΤΗΣΗΣ
                    </Button>
                </div>
            </main>

            {/* Help Section */}
            <footer className=" p-4 text-gray-600">
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

export default ParentPage;