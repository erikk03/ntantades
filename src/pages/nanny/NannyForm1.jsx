import React from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Progress } from "@nextui-org/react";
import { Form, Input, Button } from '@nextui-org/react';
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { cities, dimoi, genders, nomoi, perifereies, streets} from '../../data/formData';

const NannyForm1 = () => {
    const { user, userData } = useAuth();
    const [submitted, setSubmitted] = React.useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
    
        const data = Object.fromEntries(new FormData(e.currentTarget));

        setSubmitted(data);
    }
    return (
        <div className="h-screen bg-pink-100 flex flex-col">
            {/* Navigation */}
            <NannyNavBar />

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
                        value={20}
                        className="w-1/4 mx-auto"
                    />
                </div>

                {/* Form Title */}
                <h1 className="text-xl font-bold text-center mb-4">
                    ΣΥΜΠΛΗΡΩΣΗ ΣΤΟΙΧΕΙΩΝ ΓΟΝΕΑ/ΚΗΔΕΜΟΝΑ
                </h1>

                {/* Form Content */}
                <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={onSubmit}>
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
                            defaultValue={userData?.gender}
                        >
                            {(genders) => <AutocompleteItem key={genders.key}>{genders.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <h1 className="text-sm font-bold mt-4">ΣΤΟΙΧΕΙΑ ΕΠΙΚΟΙΝΩΝΙΑΣ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <Input
                            isRequired
                            size='sm'
                            variant='faded'
                            radius='sm'
                            errorMessage=""
                            label="ΣΤΑΘΕΡΟ ΤΗΛΕΦΩΝΟ"
                            labelPlacement="outside"
                            name="homephone"
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
                        />
                        <Input
                            size='sm'
                            variant='faded'
                            radius='sm'
                            errorMessage=""
                            label="ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ 2"
                            labelPlacement="outside"
                            name="cellphone2"
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
                            defaultValue={user?.email}
                            type="email"
                        />
                    </div>
                    <h1 className="text-sm font-bold mt-4">ΤΟΠΟΘΕΣΙΑ/ΔΙΕΥΘΥΝΣΗ ΚΑΤΟΙΚΙΑΣ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <Autocomplete
                            isRequired
                            defaultItems={perifereies}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΠΕΡΙΦΕΡΕΙΑ"
                            labelPlacement="outside"
                            name="perifereia"
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
                        />
                    </div>
                    <div className="flex py-9 justify-end w-full">
                        <Button type="submit" variant="solid" color='danger' className="ml-auto" onClick={() => (window.location.href = '/nanny/form2')}>
                            ΣΥΝΕΧΕΙΑ
                        </Button>
                    </div>
                </Form>
            </main>

        </div>
    );
};

export default NannyForm1;
