import React, { useState } from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Progress } from "@nextui-org/react";
import { Form, Input, Button } from '@nextui-org/react';
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { Paperclip } from 'lucide-react';
import { cities, dimoi, genders, nomoi, perifereies, streets} from '../../data/formData';

const NannyForm1 = () => {
    const { user, userData } = useAuth();
    const [submitted, setSubmitted] = React.useState(null);
    const [fileAttachments, setFileAttachments] = useState({});
    const [errors, setErrors] = useState({}); 

    const onSubmit = (e) => {
        e.preventDefault();

         const requiredFields = [
            'pathologistCertificate',
            'dermatologistCertificate',
            'psychologistCertificate',
        ];


        const newErrors = {};
        requiredFields.forEach((field) => {
            if (!fileAttachments[field]) {
                newErrors[field] = 'This field is required.';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); 
            return;
        }
    
        const data = Object.fromEntries(new FormData(e.currentTarget));

        setSubmitted(data);

        window.location.href = '/nanny/form1';
    }

    const handleFileChange = (e, fieldName) => {
        setFileAttachments((prev) => ({
            ...prev,
            [fieldName]: e.target.files[0],
        }));
        setErrors((prev) => ({
            ...prev,
            [fieldName]: false, 
        }));
    };

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
                        value={40}
                        className="w-1/4 mx-auto"
                    />
                </div>

                {/* Form Title */}
                <h1 className="text-xl font-bold text-center mb-4">
                    ΠΡΟΣΘΗΚΗ ΠΙΣΤΟΠΟΙΗΤΙΚΩΝ
                </h1>

                {/* Form Content */}
                <Form className="flex flex-col gap-5" validationBehavior="native" onSubmit={onSubmit}>
                    <h1 className="text-sm font-bold">ΠΙΣΤΟΠΟΙΗΤΙΚΑ ΥΓΕΙΑΣ</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                     {/* Input with Attachment */}
                        <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΠΑΘΟΛΟΓΟΥ"
                                name="pathologistCertificate"
                                readOnly
                                value={fileAttachments.pathologistCertificate?.name || ''}
                                placeholder="Επιλέξτε αρχείο"
                            />
                            <div className="absolute inset-y-9 right-11 flex items-center">
                                <label htmlFor="pathologist-upload" className="cursor-pointer">
                                    <Paperclip />
                                    <input
                                        id="pathologist-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'pathologistCertificate')}
                                    />
                                </label>
                            </div>
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                        {/* Input with Attachment */}
                        <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΔΕΡΜΑΤΟΛΟΓΟΥ"
                                name="dermatologistCertificate"
                                readOnly
                                value={fileAttachments.dermatologistCertificate?.name || ''}
                                placeholder="Επιλέξτε αρχείο"
                            />
                            <div className="absolute inset-y-9 right-11 flex items-center">
                                <label htmlFor="dermatologist-upload" className="cursor-pointer">
                                    <Paperclip />
                                    <input
                                        id="dermatologist-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'dermatologistCertificate')}
                                    />
                                </label>
                            </div>
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                         {/* Input with Attachment */}
                         <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΨΥΧΙΚΗΣ ΥΓΕΙΑΣ"
                                name="psychologistCertificate"
                                readOnly
                                value={fileAttachments.pathologistCertificate?.name || ''}
                                placeholder="Επιλέξτε αρχείο"
                            />
                            <div className="absolute inset-y-9 right-11 flex items-center">
                                <label htmlFor="psychologist-upload" className="cursor-pointer">
                                    <Paperclip />
                                    <input
                                        id="psychologist-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'psychologistCertificate')}
                                    />
                                </label>
                            </div>
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="text-sm font-bold mt-4">ΠΙΣΤΟΠΟΙΗΤΙΚΑ ΕΚΠΑΙΔΕΥΣΗΣ</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        {/* Input with Attachment */}
                        <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΠΑΘΟΛΟΓΟΥ"
                                name="pathologistCertificate"
                                readOnly
                                value={fileAttachments.pathologistCertificate?.name || ''}
                                placeholder="Επιλέξτε αρχείο"
                            />
                            <div className="absolute inset-y-9 right-11 flex items-center">
                                <label htmlFor="pathologist-upload" className="cursor-pointer">
                                    <Paperclip />
                                    <input
                                        id="pathologist-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'pathologistCertificate')}
                                    />
                                </label>
                            </div>
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                        {/* Input with Attachment */}
                        <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΠΑΘΟΛΟΓΟΥ"
                                name="pathologistCertificate"
                                readOnly
                                value={fileAttachments.pathologistCertificate?.name || ''}
                                placeholder="Επιλέξτε αρχείο"
                            />
                            <div className="absolute inset-y-9 right-11 flex items-center">
                                <label htmlFor="pathologist-upload" className="cursor-pointer">
                                    <Paperclip />
                                    <input
                                        id="pathologist-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'pathologistCertificate')}
                                    />
                                </label>
                            </div>
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                         {/* Input with Attachment */}
                         <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΠΑΘΟΛΟΓΟΥ"
                                name="pathologistCertificate"
                                readOnly
                                value={fileAttachments.pathologistCertificate?.name || ''}
                                placeholder="Επιλέξτε αρχείο"
                            />
                            <div className="absolute inset-y-9 right-11 flex items-center">
                                <label htmlFor="pathologist-upload" className="cursor-pointer">
                                    <Paperclip />
                                    <input
                                        id="pathologist-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'pathologistCertificate')}
                                    />
                                </label>
                            </div>
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="text-sm font-bold mt-4">ΑΠΟΣΠΑΣΜΑ ΠΟΙΝΙΚΟΥ ΜΗΤΡΩΟΥ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΠΑΘΟΛΟΓΟΥ"
                                name="pathologistCertificate"
                                readOnly
                                value={fileAttachments.pathologistCertificate?.name || ''}
                                placeholder="Επιλέξτε αρχείο"
                            />
                            <div className="absolute inset-y-9 right-11 flex items-center">
                                <label htmlFor="pathologist-upload" className="cursor-pointer">
                                    <Paperclip />
                                    <input
                                        id="pathologist-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'pathologistCertificate')}
                                    />
                                </label>
                            </div>
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="text-sm font-bold mt-4">ΑΠΟΣΠΑΣΜΑ ΠΟΙΝΙΚΟΥ ΜΗΤΡΩΟΥ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΠΑΘΟΛΟΓΟΥ"
                                name="pathologistCertificate"
                                readOnly
                                value={fileAttachments.pathologistCertificate?.name || ''}
                                placeholder="Επιλέξτε αρχείο"
                            />
                            <div className="absolute inset-y-9 right-11 flex items-center">
                                <label htmlFor="pathologist-upload" className="cursor-pointer">
                                    <Paperclip />
                                    <input
                                        id="pathologist-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, 'pathologistCertificate')}
                                    />
                                </label>
                            </div>
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex -mt-8 justify-end w-full">
                        <Button type="submit" variant="solid" color='danger' className="ml-auto">
                            ΣΥΝΕΧΕΙΑ
                        </Button>
                    </div>
                </Form>
            </main>

        </div>
    );
};

export default NannyForm1;
