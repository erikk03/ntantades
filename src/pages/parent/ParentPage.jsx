import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Components
import ParentNavBar from '../../components/ParentNavBar';
import { Button } from '@nextui-org/react';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";


const ParentPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeApplications, setActiveApplications] = useState([]);

    // Fetch advertisements from Firestore
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'applications'));
                const fetchedApplications = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Filter applications by parent.id === user.id
                const userApplications = fetchedApplications.filter(app => app.parent?.uid === user.uid);

                // Separate applications based on status
                const active = userApplications.filter(app =>
                    app.status === 'ΕΝΕΡΓΗ' || app.status === 'ΥΠΟΒΕΒΛΗΜΕΝΗ'
                );

                setActiveApplications(active);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const handleNewApplication = () => {
        if (activeApplications.length > 0) {
            alert('Δεν μπορείτε να δημιουργήσετε νέα αίτηση καθώς υπάρχει αίτηση σε εξέλιξη.');
            return;
        }

        navigate('/parent/applications/form1');
    };
    const openWalkthrough = () => {
        return (
            <Popover placement="right">
              <PopoverTrigger>
                <Button>Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Popover Content</div>
                  <div className="text-tiny">This is the popover content</div>
                </div>
              </PopoverContent>
            </Popover>
          );
    }

    return (
    <div className="flex flex-col min-h-screen bg-[#F2E9EB]">
        {/* Navigation */}
        <ParentNavBar />

        {/* Main Content */}
        <main className="flex-grow flex justify-center items-center flex-col">
                {/* Title */}
                <h1 className="text-xl font-bold m-2">
                    Είσαι γονέας και ψάχνεις για βοήθεια;
                </h1>

                <div className='flex justify-center'>
                    <div className=" w-[500px] h-[350px] flex items-center justify-center m-2">
                        <img src="/icons/parent.png" alt="Eligible"/>
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
                    <p className="font-bold text-lg mb-4 translate-x-[70px] -translate-y-[40px]">ΕΙΣΑΙ ΔΙΚΑΙΟΥΧΟΣ;</p>

                    {/* png Arrow */}
                    <div className="">
                        <img src="/icons/arrow.png" alt="Eligible" className="w-15 h-12 -translate-x-[10px] -translate-y-[10px]"/>
                    </div>

                    {/* Button */}
                    <Button color="danger" variant="solid" size='md' onClick={handleNewApplication}>
                        ΔΗΜΙΟΥΡΓΙΑ ΑΙΤΗΣΗΣ
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
                                    <img src="/images/parent_help.png" alt="Eligible" />
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

export default ParentPage;