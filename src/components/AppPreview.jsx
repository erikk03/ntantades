// General
import React from 'react';
import {Time} from "@internationalized/date";
import { useFormContext } from '../config/FormContext';
import { Input, TimeInput } from '@nextui-org/react';

const parseTimeString = (timeString) => {
    if (!timeString) return null; // Handle null or empty values
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Time(hours, minutes); // Return a Time object
};

const AppPreview = () => {
    const { formData } = useFormContext();

    return (
        <div className="h-auto bg-[#F2E9EB] flex flex-col">

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">

                {/* Form Title */}
                <h1 className="text-xl font-bold text-center mb-2">
                    ΠΡΟΕΠΙΣΚΟΠΗΣΗ
                </h1>

                <div className="grid grid-cols-4 gap-4 m-2">
                    {/* Parent Info */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-1">ΣΤΟΙΧΕΙΑ ΓΟΝΕΑ/ΚΗΔΕΜΟΝΑ</h2>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ονοματεπώνυμο" readOnly defaultValue={`${formData?.parent?.name} ${formData?.parent?.surname}`}/>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ημερομηνία Γέννησης" readOnly defaultValue={formData?.parent?.birthdate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="ΑAT" readOnly defaultValue={formData?.parent?.AT} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="ΑΦΜ" readOnly defaultValue={formData?.parent?.AFM} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Διεύθυνση" readOnly defaultValue={formData?.parent?.address} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Πόλη" readOnly defaultValue={formData?.parent?.city} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ταχυδρομικός Κώδικας." readOnly defaultValue={formData?.parent?.zipcode} />
                    </div>

                    {/* Child Info */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-1">ΣΤΟΙΧΕΙΑ ΠΑΙΔΙΟΥ</h2>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ονοματεπώνυμο" readOnly defaultValue={` ${formData?.child?.name} ${formData?.child?.surname}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ημερομηνία Γέννησης" readOnly defaultValue={formData?.child?.birthdate} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="ΑΜΚΑ." readOnly defaultValue={formData?.child?.AMKA} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αλλεργίες" readOnly defaultValue={formData?.child?.allergies} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Δυσκολίες" readOnly defaultValue={formData?.child?.difficulties} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Δυσαρέσκειες" readOnly defaultValue={formData?.child?.dislikes} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αρέσκειες" readOnly defaultValue={formData?.child?.likes} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Διατροφή" readOnly defaultValue={formData?.child?.diet} />
                    </div>

                    {/* Days and Hours */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-5">ΗΜΕΡΕΣ - ΩΡΕΣ</h2>
                        {[
                            { key: "monday", label: "Δ" },
                            { key: "tuesday", label: "Τ" },
                            { key: "wednesday", label: "Τ" },
                            { key: "thursday", label: "Π" },
                            { key: "friday", label: "Π" },
                            { key: "saturday", label: "Σ" },
                            { key: "sunday", label: "Κ" },
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
                                        labelPlacement='inside'
                                        defaultValue={parseTimeString(formData?.schedule?.[`${key}`]?.from)}
                                    />
                                    <TimeInput
                                        label="Έως"
                                        size="sm"
                                        radius="sm"
                                        variant="faded"
                                        name={`${key}_to`}
                                        hourCycle={24}
                                        aria-label={`Έως (${key})`}
                                        labelPlacement='inside'
                                        defaultValue={parseTimeString(formData?.schedule?.[`${key}`]?.to)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Nanny Info */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="font-bold text-md text-center mb-1">ΣΤΟΙΧΕΙΑ ΕΠΙΜΕΛΗΤΗ/ΤΡΙΑΣ</h2>
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ονοματεπώνυμο" readOnly defaultValue={formData?.nanny?.name} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="ΑTT" readOnly defaultValue={`${formData?.nanny?.AT}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Ημερομηνία Γέννησης" readOnly defaultValue={`${formData?.nanny?.birthdate}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Εκπαίδευση" readOnly defaultValue={`${formData?.nanny?.education}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Email" readOnly defaultValue={`${formData?.nanny?.EMAIL}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Σταθερό" readOnly defaultValue={`${formData?.nanny?.homephone}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Τηλέφωνο" readOnly defaultValue={`${formData?.nanny?.cellphone1} ${formData?.nanny?.cellphone2}`} />
                        <Input size="sm" variant='faded' radius='sm' labelPlacement="outside" label="Αμοιβή/Ώρα" readOnly defaultValue={`${formData?.nanny?.payment} €`} />
                    </div>
                </div>
                    
            </main>

        </div>
    );
};

export default AppPreview;