import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Time } from '@internationalized/date';

import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { query, where, getDocs, updateDoc  } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// Components
import { link, Progress } from '@nextui-org/react';
import { Input, TimeInput, Button } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import NannyNavBar from '../../components/NannyNavBar';

const parseTimeString = (timeString) => {
    if (!timeString) return null; // Handle null or empty values
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Time(hours, minutes); // Return a Time object
};



const NannyForm4 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { formData, updateForm } = useFormContext();
    const [isDirty, setIsDirty] = useState(false);

    const handleNavigation = (path) => {
        if (isDirty) {
            setNextRoute(path);
            setShowSaveModal(true);
        } else {
            navigate(path);
        }
    };

    const onSubmit = async (e) => {
        try {
            // Prevent the default form submission
            e.preventDefault();
    
            // Reference the "adv" subcollection for the logged-in user
            const advCollectionRef = collection(db, `users/${user.uid}/adv`);
    
            // Fetch all documents with status "ΕΝΕΡΓΗ"
            const activeAdsQuery = query(advCollectionRef, where("status", "==", "ΕΝΕΡΓΗ"));
            const activeAdsSnapshot = await getDocs(activeAdsQuery);
    
            // Update the status of each active advertisement to "ΙΣΤΟΡΙΚΟ"
            const updatePromises = activeAdsSnapshot.docs.map(doc => {
                updateDoc(doc.ref, { status: "ΙΣΤΟΡΙΚΟ" })
            });
            await Promise.all(updatePromises);
    
            // Create a new ad document in the "adv" subcollection
            await addDoc(advCollectionRef, {
                //form1
                bio: formData?.form1?.bio,
                gender: formData?.form1?.gender,
                homephone: formData?.form1?.homephone,
                cellphone1: formData?.form1?.cellphone1,
                cellphone2: formData?.form1?.cellphone2,
                email: formData?.form1?.EMAIL,
                perifereia: formData?.form1?.perifereia,
                nomos: formData?.form1?.nomos,
                dimos: formData?.form1?.dimos,
                address: `${formData?.form1?.street} ${formData?.form1?.streetnumber}`,
                city: formData?.form1?.city,
                zipcode: formData?.form1?.zipcode,
                //form2
                certificates: {
                    pathologist: formData?.form2?.pathologistCertificate,
                    dermatologist: formData?.form2?.dermatologistCertificate,
                    psychologist: formData?.form2?.psychologistCertificate,
                    course: formData?.form2?.courseCertificate,
                    language: formData?.form2?.languageCertificate,
                    firstAid: formData?.form2?.firstAidCertificate,
                    criminalRecord: formData?.form2?.criminalRecordCertificate,
                    letter: formData?.form2?.letterCertificate, 
                },
                education: formData?.form2?.educationLevel,
                //form3
                schedule: {
                    monday: {
                        from: formData?.form3?.δευτερα_from,
                        to: formData?.form3?.δευτερα_to,
                    },
                    tuesday: {
                        from: formData?.form3?.τριτη_from,
                        to: formData?.form3?.τριτη_to,
                    },
                    wednesday: {
                        from: formData?.form3?.τεταρτη_from,
                        to: formData?.form3?.τεταρτη_to,
                    },
                    thursday: {
                        from: formData?.form3?.πεμπτη_from,
                        to: formData?.form3?.πεμπτη_to,
                    },
                    friday: {
                        from: formData?.form3?.παρασκευη_from,
                        to: formData?.form3?.παρασκευη_to,
                    },
                    saturday: {
                        from: formData?.form3?.σαββατο_from,
                        to: formData?.form3?.σαββατο_to,
                    },
                    sunday: {
                        from: formData?.form3?.κυριακη_from,
                        to: formData?.form3?.κυριακη_to,
                    },
                    extra: formData?.form3?.extra,
                },
                payment: formData?.form3?.payment,
                facebook: formData?.form3?.facebook,
                instagram: formData?.form3?.instagram,
                linkedin: formData?.form3?.linkedin,
                meetingDays: formData?.form3?.meetingDay,
                meetingTime: formData?.form3?.meetingTime,
                placeOfWork: formData?.form3?.placeOfWork,
                workExperience: formData?.form3?.workExperience,
                // Additional fields
                status: "ΕΝΕΡΓΗ", // Default status for a new ad
                createdAt: new Date(),
            });
    
            console.log("Advertisement successfully created and previous active ads updated to history!");
    
            // Optionally, clear the local storage after submitting
            localStorage.removeItem("formData");
    
            // Redirect to the advertisements page
            navigate("/nanny/advertisments");
    
        } catch (error) {
            console.error("Error submitting advertisement: ", error);
            // Handle submission error (e.g., show a message to the user)
        }
    };
    
    return (
        <div className="h-screen bg-pink-100 flex flex-col">
            {/* Navigation */}
            <NannyNavBar handleNavigation={handleNavigation}/>

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                {/* Progress Bar */}
                <div className="w-full mb-2 flex flex-col items-center justify-center">
                    <Breadcrumbs className='m-1' size="sm" >
                        <BreadcrumbItem href="/nanny/form1">Στοιχεία</BreadcrumbItem>
                        <BreadcrumbItem href="/nanny/form2">Πιστοποιητικά</BreadcrumbItem>
                        <BreadcrumbItem href="/nanny/form3">Πρόγραμμα</BreadcrumbItem>
                        <BreadcrumbItem href="/parent/applications/form5">Υποβολή</BreadcrumbItem>
                    </Breadcrumbs>
                    <Progress
                        aria-label="Progress"
                        color="danger"
                        size="sm"
                        value={100}
                        className="w-1/4"
                    />
                </div>

                {/* Form Title */}
                <h1 className="text-xl font-bold text-center mb-2">
                    ΠΡΟΕΠΙΣΚΟΠΗΣΗ ΚΑΙ ΥΠΟΒΟΛΗ
                </h1>

                <div className="grid grid-cols-3 gap-4 m-2">
                    {/* Certificates */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-1">ΠΙΣΤΟΠΟΙΗΤΙΚΑ</h2>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Παθολόγου" readOnly defaultValue={formData?.form2?.pathologistCertificate}/>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Δερματολόγου" readOnly defaultValue={formData?.form2?.dermatologistCertificate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ψυχικής Υγείας" readOnly defaultValue={formData?.form2?.psychologistCertificate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Εκπαίδευσης" readOnly defaultValue={formData?.form2?.courseCertificate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Γλωσσομάθειας" readOnly defaultValue={formData?.form2?.languageCertificate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Πρώτων Βοηθειών" readOnly defaultValue={formData?.form2?.firstAidCertificate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ποινικού Μητρώου" readOnly defaultValue={formData?.form2?.criminalRecordCertificate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Συστατική Επιστολή" readOnly defaultValue={formData?.form2?.letterCertificate} />
                    </div>

                    {/* Nanny Info */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-1">ΣΤΟΙΧΕΙΑ ΕΠΙΜΕΛΗΤΗ/ΤΡΙΑΣ</h2>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ονοματεπώνυμο" readOnly defaultValue={`${formData?.form1?.name} ${formData?.form1?.surname} `}/>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ημερομηνία Γέννησης" readOnly defaultValue={formData?.form1?.birthdate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Email" readOnly defaultValue={formData?.form1?.EMAIL} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Επικοινωνία" readOnly defaultValue={formData?.form1?.cellphone1}/>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Πόλη" readOnly defaultValue={formData?.form1?.city}/>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Οδός" readOnly defaultValue={formData?.form1?.streetnumber}/>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="ΤΚ" readOnly defaultValue={formData?.form1?.zipcode}/>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αμοιβή Ανά Ώρα" readOnly defaultValue={`${formData?.form3?.payment} €`} />
                    </div>

                    {/* Days and Hours */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-5">ΗΜΕΡΕΣ - ΩΡΕΣ</h2>
                        {[
                            { key: "δευτερα", label: "Δευτέρα" },
                            { key: "τριτη", label: "Τρίτη" },
                            { key: "τεταρτη", label: "Τετάρτη" },
                            { key: "πεμπτη", label: "Πέμπτη" },
                            { key: "παρασκευη", label: "Παρασκευή" },
                            { key: "σαββατο", label: "Σάββατο" },
                            { key: "κυριακη", label: "Κυριακή" },
                        ].map(({ key, label }) => (
                            <div key={key} className="mb-4">
                                <div className="flex gap-4 items-center w-1/2">
                                    <h3 className="font-semibold">{label}</h3>
                                    <TimeInput
                                        label="Από"
                                        size="sm"
                                        radius="sm"
                                        variant="faded"
                                        name={`${key}_from`}
                                        hourCycle={24}
                                        aria-label={`Από (${key})`}
                                        labelPlacement='outside-left'
                                        defaultValue={parseTimeString(formData?.form3?.[`${key}_from`])}
                                    />
                                    <TimeInput
                                        label="Έως"
                                        size="sm"
                                        radius="sm"
                                        variant="faded"
                                        name={`${key}_to`}
                                        hourCycle={24}
                                        aria-label={`Έως (${key})`}
                                        labelPlacement='outside-left'
                                        defaultValue={parseTimeString(formData?.form3?.[`${key}_to`])}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                    
                {/* Buttons */}
                <div className="flex justify-end items-end w-full">
                    <Button variant="solid" color="default" size='sm' radius='md'>
                        <Link to="/nanny/form3">ΠΙΣΩ</Link>
                    </Button>
                    <Button
                        variant="solid"
                        color="danger"
                        size='sm'
                        radius='md'
                        className="ml-auto"
                        onClick={onSubmit}
                    >
                        ΥΠΟΒΟΛΗ
                    </Button>
                </div>
            </main>

        </div>
    );
};

export default NannyForm4;
