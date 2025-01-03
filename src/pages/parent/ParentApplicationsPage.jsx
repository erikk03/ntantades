import React from 'react';
import { useAuth } from '../../config/AuthContext';
import ParentNavBar from '../../components/ParentNavBar';
import { Button, Card, CardBody, ScrollShadow } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const ParentApplicationsPage = () => {
    const { user } = useAuth();

    const applications = [
        {
            id: "123011Α0",
            name: "ΔΗΜΗΤΡΑΔΗ ΔΗΜΗΤΡΑ",
            submissionDate: "04/01/2024",
            employmentDate: "-",
            status: "ΠΡΟΣΩΡΙΝΑ ΑΠΟΘΗΚΕΥΜΕΝΗ",
        },
        {
            id: "120E54A0",
            name: "ΚΟΥΚΟΥΛΗ ΜΑΡΙΑ",
            submissionDate: "05/01/2024",
            employmentDate: "10/01/2024 - 13/06/2024",
            status: "ΕΓΚΕΚΡΙΜΕΝΗ",
        },
    ];

    const history = [
        {
            id: "1A0",
            name: "ΚΑΛΑΜΠΟΥΚΗ ΕΥΑΓΓΕΛΙΑ",
            employmentDate: "14/01/2023 - 14/06/2023",
            status: "ΟΛΟΚΛΗΡΩΜΕΝΗ",
        },
        {
            id: "1X2",
            name: "ΚΟΝΤΟΣ ΤΑΣΟΣ",
            employmentDate: "09/05/2023 - 09/06/2023",
            status: "ΟΛΟΚΛΗΡΩΜΕΝΗ",
        },
        {
            id: "0N0",
            name: "ΑΣΗΜΕΝΙΑ ΜΑΡΙΑ",
            employmentDate: "03/01/2022 - 03/06/2022",
            status: "ΟΛΟΚΛΗΡΩΜΕΝΗ",
        },
        {
            id: "1E2",
            name: "ΙΒΑΝ ΙΒΑΝΟΒΙΤΣ",
            employmentDate: "-",
            status: "ΑΚΥΡΩΜΕΝΗ",
        },
        {
            id: "0FO",
            name: "ΓΚΟΝΑ ΜΑΡΓΙΚΟΝΑ",
            employmentDate: "20/06/2022 - 20/06/2022",
            status: "ΑΚΥΡΩΜΕΝΗ",
        },
    ];

    return (
        <div className="h-screen bg-[#F2E9EB] flex flex-col">
            {/* Navigation */}
            <ParentNavBar />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                <header className="m-2 flex justify-center items-center">
                    <Button color="danger" size="sm" radius='full'>
                        <Link to="/parent/applications/form1">ΝΕΑ ΑΙΤΗΣΗ</Link>
                    </Button>
                </header>

                <div className="flex-row">
                    {/* Active Applications */}
                    <h2 className="text-md font-bold mb-2">ΟΙ ΑΙΤΗΣΕΙΣ ΜΟΥ</h2>
                    <ScrollShadow hideScrollBar className="w-full max-h-[250px]">
                        {applications.map((app, index) => (
                            <Card className=' mb-4' shadow='sm'>
                                <CardBody>
                                    <div key={index} className='flex flex-col-3 justify-between items-center gap-2'>
                                        <div className='flex flex-col-2 gap-2'>
                                            <div>
                                                <p className="text-sm font-semibold">ΚΩΔ.ΑΙΤΗΣΗΣ: {app?.id}</p>
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΥΠΟΒΟΛΗΣ: {app?.submissionDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{app?.name}</p>
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΑΠΑΣΧΟΛΗΣΗΣ: {app?.employmentDate}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <h3
                                                className={`text-sm mr-20 ${app?.status === "ΕΓΚΕΚΡΙΜΕΝΗ" ? "text-green-500" : "text-gray-800"}`}
                                            >
                                                {app?.status}
                                            </h3>
                                            <Button size="sm">
                                                ΕΠΕΞΕΡΓΑΣΙΑ
                                            </Button>
                                            <Button size="sm" color="danger">
                                                ΔΙΑΓΡΑΦΗ
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
                        {history.map((app, index) => (
                            <Card className='mb-4' shadow='sm'>
                                <CardBody>
                                    <div key={index} className='flex flex-col-3 justify-between items-center gap-2'>
                                        <div className='flex flex-col-2 gap-2'>
                                            <div>
                                                <p className="text-sm font-semibold">ΚΩΔ.ΑΙΤΗΣΗΣ: {app?.id}</p>
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΥΠΟΒΟΛΗΣ: {app?.submissionDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{app?.name}</p>
                                                <p className="text-xs text-gray-500">ΗΜΕΡΟΜΗΝΙΑ ΑΠΑΣΧΟΛΗΣΗΣ: {app?.employmentDate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <h3
                                                className={`text-sm mr-5 ${app?.status === "ΕΓΚΕΚΡΙΜΕΝΗ" ? "text-green-500" : "text-gray-800"}`}
                                            >
                                                {app?.status}
                                            </h3>
                                            <Button size="sm">
                                                ΑΝΑΝΕΩΣΗ
                                            </Button>
                                            <Button size="sm">
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
        </div>
    );
};

export default ParentApplicationsPage;