import React, { useEffect, useState } from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Progress, Modal, ModalContent, Button as NextUIButton } from "@nextui-org/react";
import { Form, Input, Textarea, Button } from '@nextui-org/react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { cities, dimoi, genders, nomoi, perifereies, streets } from '../../data/formData';
import { useFormContext } from '../../config/FormContext';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const NannyForm1 = () => {
    const { user, userData } = useAuth();
    const { formData, updateForm } = useFormContext();
    const [isDirty, setIsDirty] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [nextRoute, setNextRoute] = useState(null);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (isDirty) {
            setNextRoute(path);
            setShowSaveModal(true);
        } else {
            navigate(path);
        }
    };

    const handleInputChange = () => {
        if (!isDirty) {
            setIsDirty(true);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = ""; // Trigger browser's native dialog
                setShowSaveModal(true); // Show the custom modal
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isDirty]);

    const saveFormDataToFirebase = async (formDataToSave) => {
        try {
            const advCollectionRef = collection(db, `users/${user.uid}/adv`);
            const data = { ...formDataToSave, status: "SAVED", createdAt: new Date() };
    
            await addDoc(advCollectionRef, data);
            console.log("Form data saved as draft!");
            setIsDirty(false); // Reset the dirty flag after saving
        } catch (error) {
            console.error("Error saving form data:", error);
        }
    };
    
    const handleSaveAndProceed = async () => {
        try {
            const formElement = document.querySelector('form'); 
            const data = Object.fromEntries(new FormData(formElement));
            console.log("Extracted form data:", data);
    
            updateForm('form1', data);
    
            await saveFormDataToFirebase(data);
    
            setShowSaveModal(false);
            if (nextRoute) {
                navigate(nextRoute);
            }
    
            updateForm('form1', {});
            localStorage.removeItem("formData");
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };


    const handleDiscardAndProceed = () => {
        setShowSaveModal(false);
        setIsDirty(false); // Discard unsaved changes
        if (nextRoute) {
            navigate(nextRoute);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        updateForm('form1', data);
        setIsDirty(false);
    };

    return (
        <div className="h-screen bg-pink-100 flex flex-col">
            {/* Navigation */}
            <NannyNavBar handleNavigation={handleNavigation} />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                {/* Progress Bar */}
                <div className="w-full mb-2 flex flex-col items-center justify-center">
                    <Breadcrumbs className='m-1' size="sm">
                        <BreadcrumbItem href="/nanny/form1">Στοιχεία</BreadcrumbItem>
                    </Breadcrumbs>
                    <Progress
                        aria-label="Progress"
                        color="danger"
                        size="sm"
                        value={80}
                        className="w-1/4"
                    />
                </div>

                {/* Form Title */}
                <h1 className="text-xl font-bold text-center mb-4">
                    ΣΥΜΠΛΗΡΩΣΗ ΣΤΟΙΧΕΙΩΝ ΕΠΙΜΕΛΗΤΗΣ/ΤΡΙΑΣ
                </h1>

                {/* Form Content */}
                <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={onSubmit}>
                    <h1 className="text-sm font-bold">ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-2 md:mb-0 gap-4'>
                        <Input
                            isReadOnly
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΟΝΟΜΑ"
                            name="name"
                            defaultValue={userData?.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            isReadOnly
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΕΠΩΝΥΜΟ"
                            name="surname"
                            defaultValue={userData?.surname}
                            onChange={handleInputChange}
                        />
                        <Input
                            isReadOnly
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ"
                            name="birthdate"
                            defaultValue={userData?.birthdate}
                            onChange={handleInputChange}
                        />

                        <Input
                            isReadOnly
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΑΡΙΘΜΟΣ ΤΑΥΤΟΤΗΤΑΣ"
                            name="am"
                            defaultValue={userData?.AT}
                            onChange={handleInputChange}
                        />
                        <Input
                            isReadOnly
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΑΦΜ"
                            name="afm"
                            defaultValue={userData?.AFM}
                            onChange={handleInputChange}
                        />
                        <Input
                            isReadOnly
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΑΜΚΑ"
                            name="amka"
                            defaultValue={userData?.AMKA}
                            onChange={handleInputChange}
                        />
                        <Autocomplete
                            isRequired
                            defaultItems={genders}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΦΥΛΟ"
                            labelPlacement="outside"
                            name="gender"
                            defaultInputValue={ formData?.form1?.gender || user?.gender}
                            onInput={handleInputChange}
                            onSelectionChange={handleInputChange}
                        >
                            {(genders) => <AutocompleteItem key={genders.key}>{genders.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <h1 className="text-sm font-bold">ΣΤΟΙΧΕΙΑ ΕΠΙΚΟΙΝΩΝΙΑΣ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-2 md:mb-0 gap-4'>
                        <Input
                            isRequired
                            size='sm'
                            variant='faded'
                            radius='sm'
                            errorMessage=""
                            label="ΣΤΑΘΕΡΟ ΤΗΛΕΦΩΝΟ"
                            labelPlacement="outside"
                            name="homephone"
                            defaultValue={formData?.form1?.homephone || ''}
                            onChange={handleInputChange}
                        />
                        <Input
                            isRequired
                            size='sm'
                            variant='faded'
                            radius='sm'
                            errorMessage=""
                            label="ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ 1"
                            labelPlacement="outside"
                            name="cellphone1"
                            defaultValue={formData?.form1?.cellphone1 || ''}
                            onChange={handleInputChange}
                        />
                        <Input
                            size='sm'
                            variant='faded'
                            radius='sm'
                            errorMessage=""
                            label="ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ 2"
                            labelPlacement="outside"
                            name="cellphone2"
                            defaultValue={formData?.form1?.cellphone2 || ''}
                            onChange={handleInputChange}
                        />
                        <Input
                            isRequired
                            size='sm'
                            variant='faded'
                            radius='sm'
                            errorMessage="Please enter a valid email"
                            label="EMAIL"
                            labelPlacement="outside"
                            name="EMAIL"
                            defaultValue={ formData?.form1?.EMAIL || user?.email || ''}
                            type="email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <h1 className="text-sm font-bold">ΤΟΠΟΘΕΣΙΑ/ΔΙΕΥΘΥΝΣΗ ΚΑΤΟΙΚΙΑΣ</h1>
                    <div className='flex flex-wrap md:flex-nowrap md:mb-0 gap-4'>
                        <Autocomplete
                            isRequired
                            defaultItems={perifereies}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΠΕΡΙΦΕΡΕΙΑ"
                            labelPlacement="outside"
                            name="perifereia"
                            defaultInputValue={formData?.form1?.perifereia || ''}
                            onInput={handleInputChange}
                            onSelectionChange={handleInputChange}
                        >
                            {(perifereia) => <AutocompleteItem key={perifereia.key}>{perifereia.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            isRequired
                            defaultItems={nomoi}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΝΟΜΟΣ"
                            labelPlacement="outside"
                            name="nomos"
                            defaultInputValue={formData?.form1?.nomos || ''}
                            onInput={handleInputChange}
                            onSelectionChange={handleInputChange}
                        >
                            {(nomos) => <AutocompleteItem key={nomos.key}>{nomos.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            isRequired
                            defaultItems={dimoi}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΔΗΜΟΣ"
                            labelPlacement="outside"
                            name="dimos"
                            defaultInputValue={formData?.form1?.dimos || ''}
                            onInput={handleInputChange}
                            onSelectionChange={handleInputChange}
                        >
                            {(dimos) => <AutocompleteItem key={dimos.key}>{dimos.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            isRequired
                            defaultItems={cities}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΠΟΛΗ"
                            labelPlacement="outside"
                            name="city"
                            defaultInputValue={formData?.form1?.city || ''}
                            onInput={handleInputChange}
                            onSelectionChange={handleInputChange}
                        >
                            {(city) => <AutocompleteItem key={city.key}>{city.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            isRequired
                            defaultItems={streets}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΟΔΟΣ"
                            labelPlacement="outside"
                            name="street"
                            defaultInputValue={formData?.form1?.street || ''}
                            onInput={handleInputChange}
                            onSelectionChange={handleInputChange}
                        >
                            {(street) => <AutocompleteItem key={street.key}>{street.label}</AutocompleteItem>}
                        </Autocomplete>
                        <Input
                            size='sm'
                            variant='faded'
                            radius='sm'
                            errorMessage=""
                            label="ΑΡΙΘΜΟΣ"
                            labelPlacement="outside"
                            name="streetnumber"
                            defaultValue={formData?.form1?.streetnumber || ''}
                            onChange={handleInputChange}
                        />
                        <Input
                            isRequired
                            size='sm'
                            variant='faded'
                            radius='sm'
                            errorMessage=""
                            label="ΤΑΧΥΔΡΟΜΙΚΟΣ ΚΩΔΙΚΑΣ"
                            labelPlacement="outside"
                            name="zipcode"
                            defaultValue={formData?.form1?.zipcode || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <h1 className="text-sm font-bold">ΣΥΝΤΟΜΗ ΠΕΡΙΓΡΑΦΗ</h1>
                    <div className='flex flex-wrap w-full md:flex-nowrap md:mb-0 gap-4 '>
                        <Textarea
                            isRequired
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΠΕΡΙΓΡΑΦΗ"
                            name="bio"
                            defaultValue={formData?.form1?.bio || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex justify-end w-full">
                        <Button
                            type="submit"
                            variant="solid"
                            color="danger"
                            size='sm'
                            radius='md'
                            className="ml-auto"
                        >
                            ΣΥΝΕΧΕΙΑ
                        </Button>
                    </div>
                </Form>

                {/* Save Confirmation Modal */}
                <Modal
                    isOpen={showSaveModal}
                    onClose={() => setShowSaveModal(false)}
                >
                    <ModalContent>
                        <h3>Αποθήκευση Προόδου</h3>
                        <p>Θέλετε να αποθηκεύσετε την πρόοδό σας πριν αποχωρήσετε;</p>
                        <div className="flex justify-end gap-2">
                            <NextUIButton color="default" onClick={handleDiscardAndProceed}>
                                Αγνόηση
                            </NextUIButton>
                            <NextUIButton color="danger" onClick={handleSaveAndProceed}>
                                Αποθήκευση
                            </NextUIButton>
                        </div>
                    </ModalContent>
                </Modal>
            </main>
        </div>
    );
};

export default NannyForm1;
