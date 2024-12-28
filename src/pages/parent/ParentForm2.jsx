import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import ParentNavBar from '../../components/ParentNavBar';
import { CheckboxGroup, Progress, Textarea } from "@nextui-org/react";
import { Form, Input, Button } from '@nextui-org/react';
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { genders } from '../../data/formData';
import { KidCheckbox } from '../../components/KidCheckBox';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

const ParentForm2 = () => {
    const { user, userData, kidsData } = useAuth();
    const { formData, updateForm } = useFormContext();
    const [groupSelected, setGroupSelected] = React.useState([]);
    const [selectedKidId, setSelectedKidId] = React.useState([]);
    const [selectedKid, setSelectedKid] = React.useState(null);

    // Update selectedKid when selectedKidId changes
    React.useEffect(() => {
        const kid = kidsData?.find((kid) => selectedKidId.includes(kid.id)); // Check if kid.id is in selectedKidId array
        setSelectedKid(kid); // Set the selectedKid based on selectedKidId
    }, [selectedKidId, kidsData]); // Re-run this effect when selectedKidId or kidsData changes

    const onSubmit = (e) => {
        e.preventDefault();
    
        const data = Object.fromEntries(new FormData(e.currentTarget));
        updateForm('form2', { ...data, selectedKid: selectedKidId }); // Include selected kid in form data

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
                <h1 className="text-xl font-bold text-center mb-2">
                    ΕΠΙΛΟΓΗ ΚΑΙ ΣΥΜΠΛΗΡΩΣΗ ΣΤΟΙΧΕΙΩΝ ΠΑΙΔΙΟΥ
                </h1>

                {/* Form Content */}
                <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={onSubmit}>
                    <h1 className="text-sm font-bold">ΕΠΙΛΟΓΗ ΠΑΙΔΙΟΥ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <CheckboxGroup
                            isRequired
                            classNames={{ base: "w-full" }}
                            orientation="horizontal"
                            value={selectedKidId}
                            onChange={setSelectedKidId}
                        >
                            {kidsData?.map((kid) => (
                                <KidCheckbox
                                    key={kid?.id}
                                    statusColor="secondary"
                                    user={{
                                        name: kid?.name,
                                        surname: kid?.surname,
                                        avatar: kid?.avatar || '', // Add avatar URL if available
                                        AT: kid?.AT,
                                        birthdate: kid?.birthdate,
                                    }}
                                    value={kid?.id} // Set the checkbox value to the kid's ID
                                />
                            ))}
                        </CheckboxGroup>
                    </div>
                    <h1 className="text-sm font-bold">ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</h1>
                    {selectedKid ? (
                    <>    
                        <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <Input
                                isReadOnly
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΟΝΟΜΑ"
                                name="name"
                                defaultValue={selectedKid?.name}
                            />
                            <Input
                                isReadOnly
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΕΠΩΝΥΜΟ"
                                name="surname"
                                defaultValue={selectedKid?.surname}
                            />
                            <Input
                                isReadOnly
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ"
                                name="birthdate"
                                defaultValue={selectedKid?.birthdate}
                            />
                            <Input
                                isReadOnly
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΑΡΙΘΜΟΣ ΤΑΥΤΟΤΗΤΑΣ"
                                name="am"
                                defaultValue={selectedKid?.AT}
                            />
                            <Input
                                isReadOnly
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΑΜΚΑ"
                                name="amka"
                                defaultValue={selectedKid?.AMKA}
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
                                defaultInputValue={ formData?.form2?.gender || user?.gender}
                            >
                                {(gender) => <AutocompleteItem key={gender.key}>{gender.label}</AutocompleteItem>}
                            </Autocomplete>
                        </div>
                        <h1 className="text-sm font-bold">ΙΔΙΑΙΤΕΡΟΤΗΤΕΣ</h1>
                        <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <Input
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΑΛΛΕΡΓΙΕΣ"
                                name="allergies"
                                defaultValue={formData?.form2?.allergies || ''}
                            />
                            <Input
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΔΥΣΚΟΛΙΕΣ"
                                name="difficulties"
                                defaultValue={formData?.form2?.difficulties || ''}
                            />
                            <Input
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΔΥΣΑΡΕΣΚΕΙΕΣ"
                                name="dislikes"
                                defaultValue={formData?.form2?.dislikes || ''}
                            />
                            <Input
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΑΡΕΣΚΕΙΕΣ"
                                name="likes"
                                defaultValue={formData?.form2?.likes || ''}
                            />
                            <Input
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΔΙΑΤΡΟΦΗ"
                                name="diet"
                                defaultValue={formData?.form2?.diet || ''}
                            />
                        </div>
                        <div className='flex flex-wrap w-full md:flex-nowrap md:mb-0 gap-4'>
                            <Textarea
                                size='sm'
                                variant='faded'
                                radius='sm'
                                labelPlacement="outside"
                                label="ΕΠΙΠΛΕΟΝ ΧΡΗΣΙΜΕΣ ΠΛΗΡΟΦΟΡΙΕΣ"
                                name="extra"
                                defaultValue={formData?.form2?.extra || ''}
                            />
                        </div>
                    </>
                    ) : (
                        <p className='text-sm'>Επιλέξτε το παιδί για το οποίο επιθυμείτε να υποβάλλετε την αίτηση</p> // You can add a loading message if selectedKid is still null
                    )}
                    <div className="flex justify-end items-end w-full">
                        <Button variant="solid" color="default" size='sm' radius='md'>
                            <Link to="/parent/applications/form1">ΠΙΣΩ</Link>
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
                                    window.location.href = "/parent/applications/form3"; // Or use navigate if using React Router
                                } else {
                                    // If the form is invalid, trigger the browser's native validation UI
                                    formElement.reportValidity();
                                }
                            }}
                        >
                            ΣΥΝΕΧΕΙΑ
                        </Button>
                    </div>
                </Form>
            </main>

        </div>
    );
};

export default ParentForm2;