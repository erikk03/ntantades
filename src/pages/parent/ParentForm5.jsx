// General
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Time} from "@internationalized/date";

import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import { db } from '../../config/firebase';  // Import Firebase Firestore
import { collection, addDoc } from 'firebase/firestore';
import { query, where, getDocs, updateDoc } from 'firebase/firestore';

// Components
import {  Progress } from "@nextui-org/react";
import { Input, TimeInput, Button } from '@nextui-org/react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import ParentNavBar from '../../components/ParentNavBar';

const parseTimeString = (timeString) => {
    if (!timeString) return null; // Handle null or empty values
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Time(hours, minutes); // Return a Time object
};

const ParentForm5 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { formData, updateForm } = useFormContext();

    const onSubmit = async (e) => {
        
        try {
            // Prevent the default form submission
            e.preventDefault();

            // Step 1: Query for existing active applications for the parent
            const activeApplicationsQuery = query(
                collection(db, "applications"),
                where("parent.uid", "==", user.uid),
                where("status", "==", "active")
            );

            const activeApplicationsSnapshot = await getDocs(activeApplicationsQuery);

            // Step 2: Update the status of each active application to "finished"
            const updatePromises = activeApplicationsSnapshot.docs.map((doc) =>
                updateDoc(doc.ref, { status: "completed" })
            );

            await Promise.all(updatePromises);

            // Submit the data to Firestore
            const docRef = await addDoc(collection(db, "applications"), {
                parent: {
                    uid: user.uid, // Example: parent uid from authentication
                    name: formData?.form1?.name,
                    surname: formData?.form1?.surname,
                    birthdate: formData?.form1?.birthdate,
                    AT: formData?.form1?.AT,
                    AFM: formData?.form1?.AFM,
                    AMKA: formData?.form1?.AMKA,
                    gender: formData?.form1?.gender,
                    homephone: formData?.form1?.homephone,
                    cellphone1: formData?.form1?.cellphone1,
                    cellphone2: formData?.form1?.cellphone2,
                    EMAIL: formData?.form1?.EMAIL,
                    perifereia: formData?.form1?.perifereia,
                    nomos: formData?.form1?.nomos,
                    dimos: formData?.form1?.dimos,
                    address: `${formData?.form1?.street} ${formData?.form1?.streetnumber}`,
                    city: formData?.form1?.city,
                    zipcode: formData?.form1?.zipcode,
                },
                child: {
                    selectedKid: formData?.form2?.selectedKid,
                    name: formData?.form2?.name,
                    surname: formData?.form2?.surname,
                    birthdate: formData?.form2?.birthdate,
                    AMKA: formData?.form2?.AMKA,
                    AT: formData?.form2?.AT,
                    gender: formData?.form2?.gender,
                    allergies: formData?.form2?.allergies,
                    difficulties: formData?.form2?.difficulties,
                    dislikes: formData?.form2?.dislikes,
                    likes: formData?.form2?.likes,
                    diet: formData?.form2?.diet,
                    extra: formData?.form2?.extra,
                },
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
                nanny: {
                    uid: `${formData?.form4?.nannyData?.id}`,
                    name: `${formData?.form4?.nannyData?.name} ${formData?.form4?.nannyData?.surname}`,
                    birthdate: `${formData?.form4?.nannyData?.birthdate}`,
                    AFM: `${formData?.form4?.nannyData?.AFM}`, 
                    AMKA: `${formData?.form4?.nannyData?.AMKA}`,
                    AT: `${formData?.form4?.nannyData?.AT}`,
                    EMAIL: `${formData?.form4?.nannyData?.EMAIL}`,
                    education: `${formData?.form4?.nannyData?.activeAd?.education}`,
                    wlocation: `${formData?.form4?.nannyData?.activeAd?.placeOfWork}`,
                    experience: `${formData?.form4?.nannyData?.activeAd?.workExperience}`,
                    payment: `${formData?.form4?.nannyData?.activeAd?.payment}`,
                    homephone: `${formData?.form4?.nannyData?.activeAd?.homephone}`,
                    cellphone1: `${formData?.form4?.nannyData?.activeAd?.cellphone1}`,   
                    bio: `${formData?.form4?.nannyData?.activeAd?.bio}`,
                },
                status: "active",
                createdAt: new Date(),
            });

        
            console.log("Document written with ID: ", docRef.id);
            // setSubmitted(data); // Update the form submission status

            // Optionally, clear the local storage after submitting
            localStorage.removeItem("formData");

            // Redirect to the applications page
            navigate("/parent/applications");
            
        } catch (error) {
            console.error("Error submitting application: ", error);
            // Handle submission error (show a message to the user)
        }
    };

    return (
        <div className="h-screen bg-pink-100 flex flex-col">
            {/* Navigation */}
            <ParentNavBar />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                {/* Progress Bar */}
                <div className="w-full mb-2 flex flex-col items-center justify-center">
                    <Breadcrumbs className='m-1' size="sm" >
                        <BreadcrumbItem href="/parent/applications/form1">Γονέας</BreadcrumbItem>
                        <BreadcrumbItem href="/parent/applications/form2">Παιδί</BreadcrumbItem>
                        <BreadcrumbItem href="/parent/applications/form3">Πρόγραμμα</BreadcrumbItem>
                        <BreadcrumbItem href="/parent/applications/form4">Επιμελητής</BreadcrumbItem>
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

                <div className="grid grid-cols-4 gap-4 m-2">
                    {/* Parent Info */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-1">ΣΤΟΙΧΕΙΑ ΓΟΝΕΑ/ΚΗΔΕΜΟΝΑ</h2>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ονοματεπώνυμο" readOnly defaultValue={`${formData?.form1?.name} ${formData?.form1?.surname}`}/>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ημερομηνία Γέννησης" readOnly defaultValue={formData?.form1?.birthdate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αριθμός Αστυνομικής Ταυτότητας" readOnly defaultValue={formData?.form1?.AT} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="ΑΦΜ" readOnly defaultValue={formData?.form1?.AFM} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Διεύθυνση" readOnly defaultValue={`${formData?.form1?.street} ${formData?.form1?.streetnumber}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Πόλη" readOnly defaultValue={formData?.form1?.city} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ταχυδρομικός Κώδικας." readOnly defaultValue={formData?.form1?.zipcode} />
                    </div>

                    {/* Child Info */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-1">ΣΤΟΙΧΕΙΑ ΠΑΙΔΙΟΥ</h2>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ονοματεπώνυμο" readOnly defaultValue={`${formData?.form2?.name} ${formData?.form2?.surname}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ημερομηνία Γέννησης" readOnly defaultValue={formData?.form2?.birthdate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="ΑΜΚΑ." readOnly defaultValue={formData?.form2?.AMKA} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αλλεργίες" readOnly defaultValue={formData?.form2?.allergies || "-"} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Δυσκολίες" readOnly defaultValue={formData?.form2?.difficulties || "-"} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Δυσαρέσκειες" readOnly defaultValue={formData?.form2?.dislikes || "-"} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αρέσκειες" readOnly defaultValue={formData?.form2?.likes || "-"} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Διατροφή" readOnly defaultValue={formData?.form2?.diet || "-"} />
                        {/* <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Σχόλια" readOnly defaultValue={formData?.form2?.extra || "-"} /> */}
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


                    {/* Nanny Info */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-1">ΣΤΟΙΧΕΙΑ ΕΠΙΜΕΛΗΤΗ/ΤΡΙΑΣ</h2>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ονοματεπώνυμο" readOnly defaultValue={`${formData?.form4?.nannyData?.name} ${formData?.form4?.nannyData?.surname}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αριθμός Αστυνομικής Ταυτότητας" readOnly defaultValue={`${formData?.form4?.nannyData?.AT}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ημερομηνία Γέννησης" readOnly defaultValue={`${formData?.form4?.nannyData?.birthdate}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Εκπαίδευση" readOnly defaultValue={`${formData?.form4?.nannyData?.activeAd?.education}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Email" readOnly defaultValue={`${formData?.form4?.nannyData?.EMAIL}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Σταθερό" readOnly defaultValue={`${formData?.form4?.nannyData?.activeAd?.homephone}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Τηλέφωνο" readOnly defaultValue={`${formData?.form4?.nannyData?.activeAd?.cellphone1} ${formData?.form4?.nannyData?.activeAd?.cellphone2}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αμοιβή/Ώρα" readOnly defaultValue={`${formData?.form4?.nannyData?.activeAd?.payment} €`} />
                    </div>
                </div>
                    
                {/* Buttons */}
                <div className="flex justify-end items-end w-full">
                    <Button variant="solid" color="default" size='sm' radius='md'>
                        <Link to="/parent/applications/form4">ΠΙΣΩ</Link>
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

export default ParentForm5;