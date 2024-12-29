import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import ParentNavBar from '../../components/ParentNavBar';
import {  Progress } from "@nextui-org/react";
import { Input, TimeInput, Button } from '@nextui-org/react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {Time} from "@internationalized/date";

const parseTimeString = (timeString) => {
    if (!timeString) return null; // Handle null or empty values
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Time(hours, minutes); // Return a Time object
};

const ParentForm5 = () => {
    const { user, userData, kidsData } = useAuth();
    const { formData, updateForm } = useFormContext();

    const onSubmit = (e) => {
        e.preventDefault();
    
        const data = Object.fromEntries(new FormData(e.currentTarget));
        updateForm('form4', {...data} );

        setSubmitted(data);
    }

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
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ονοματεπώνυμο" readOnly defaultValue="ΚΟΥΚΟΥΛΗ ΜΑΙΡΑ" />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ημερομηνία Γέννησης" readOnly defaultValue="21 Έτη" />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Εκπαίδευση" readOnly defaultValue="ΔΕΥΤ/ΒΑΘΜΙΑ" />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Πρώτες Βοήθειες" readOnly defaultValue="ΝΑΙ" />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Κατάσταση" readOnly defaultValue="ΑΓΑΜΗ" />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Απασχόληση" readOnly defaultValue="ΠΛΗΡΗΣ" />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Επικοινωνία" readOnly defaultValue="69788488388" />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αμοιβή" readOnly defaultValue="5$/ΩΡΑ" />
                    </div>
                </div>
                    
                {/* Buttons */}
                <div className="flex justify-end items-end w-full">
                    <Button variant="solid" color="default" size='sm' radius='md'>
                        <Link to="/parent/applications/form4">ΠΙΣΩ</Link>
                    </Button>
                    <Button
                        type="submit"
                        variant="solid"
                        color="danger"
                        size='sm'
                        radius='md'
                        className="ml-auto"
                        onClick={(e) => {
                            const formElement = e.currentTarget.closest('form'); // Get the form element
                            if (formElement.checkValidity()) {
                                // If the form is valid, navigate to the next page
                                window.location.href = "/parent/applications/form5"; // Or use navigate if using React Router
                            } else {
                                // If the form is invalid, trigger the browser's native validation UI
                                formElement.reportValidity();
                            }
                        }}
                    >
                        ΣΥΝΕΧΕΙΑ
                    </Button>
                </div>
            </main>

        </div>
    );
};

export default ParentForm5;