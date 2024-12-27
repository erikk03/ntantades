import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import ParentNavBar from '../../components/ParentNavBar';
import { CheckboxGroup, form, Progress, Textarea } from "@nextui-org/react";
import { Form, Input, Button } from '@nextui-org/react';
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { genders } from '../../data/formData';
import { KidCheckbox } from '../../components/KidCheckBox';

const ParentForm2 = () => {
    const { user, userData } = useAuth();
    const { formData, updateForm } = useFormContext();
    const [submitted, setSubmitted] = React.useState(null);
    const [groupSelected, setGroupSelected] = React.useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
    
        const data = Object.fromEntries(new FormData(e.currentTarget));
        updateForm('form2', data);

        setSubmitted(data);
    }

    return (
        <div className="h-screen bg-pink-100 flex flex-col">
            {/* Navigation */}
            <ParentNavBar />

            {/* Main Content */}
            <main className="flex-grow p-4 rounded-lg">
                {/* Progress Bar */}
                <div className="w-full mb-2">
                    <h1 className="text-xs font-bold text-center mb-2">
                        ΠΡΟΟΔΟΣ ΑΙΤΗΣΗΣ
                    </h1>
                    <Progress
                        aria-label="Progress"
                        color="danger"
                        size="sm"
                        value={40}
                        className="w-1/4 mx-auto"
                    />
                </div>

                {/* Form Title */}
                <h1 className="text-xl font-bold text-center mb-4">
                    ΕΠΙΛΟΓΗ ΚΑΙ ΣΥΜΠΛΗΡΩΣΗ ΣΤΟΙΧΕΙΩΝ ΠΑΙΔΙΟΥ
                </h1>

                {/* Form Content */}
                <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={onSubmit}>
                    <h1 className="text-sm font-bold">ΕΠΙΛΟΓΗ ΠΑΙΔΙΟΥ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <CheckboxGroup
                            classNames={{base: "w-full",}}
                            orientation="horizontal"
                            value={groupSelected}
                            onChange={setGroupSelected}
                        >
                            {/* {userData?.kids?.map((kid) => ( */}
                                <KidCheckbox
                                    key={user?.id}
                                    statusColor="secondary"
                                    user={{
                                        name: userData?.name,
                                        surname: userData?.surname,
                                        avatar: "",
                                        AT: userData?.AT,
                                        birthdate: userData?.birthdate,
                                    }}
                                    value={user?.id}
                                />
                                <KidCheckbox
                                    key={user?.id}
                                    statusColor="secondary"
                                    user={{
                                        name: userData?.name,
                                        surname: userData?.surname,
                                        avatar: "",
                                        AT: userData?.AT,
                                        birthdate: userData?.birthdate,
                                    }}
                                    value={user?.id}
                                />
                            {/* ))} */}
                        </CheckboxGroup>
                    </div>
                    <h1 className="text-sm font-bold">ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <Input
                            isReadOnly
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΟΝΟΜΑ"
                            name="name"
                            defaultValue={userData?.name}
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
                                    window.location.href = "/parent/applications/form2"; // Or use navigate if using React Router
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
