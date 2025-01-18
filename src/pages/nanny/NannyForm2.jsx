import React, { useState } from 'react';
import { useAuth } from '../../config/AuthContext';
import NannyNavBar from '../../components/NannyNavBar';
import { Progress } from "@nextui-org/react";
import { Form, Input, Button } from '@nextui-org/react';
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { Paperclip } from 'lucide-react';
import { useFormContext } from '../../config/FormContext';
import { Link } from 'react-router-dom';
import { educationLevel } from '../../data/formData';
import { useNavigate } from 'react-router-dom';


const NannyForm2 = () => {
    const { user, userData } = useAuth();
    const [submitted, setSubmitted] = React.useState(null);
    const [fileAttachments, setFileAttachments] = useState({});
    const [errors, setErrors] = useState({}); 
    const { formData, updateForm } = useFormContext();
    const [isDirty, setIsDirty] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

         const requiredFields = [
            'pathologistCertificate',
            'dermatologistCertificate',
            'psychologistCertificate',
            'courseCertificate',
            'languageCertificate',
            'firstAidCertificate',
            'criminalRecordCertificate',
            'letterCertificate'
        ];


        const newErrors = {};
        requiredFields.forEach((field) => {
            if (!fileAttachments[field] && !formData?.form2?.[field]) {
                newErrors[field] = 'This field is required.';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); 
            return;
        }

        const data = Object.fromEntries(new FormData(e.currentTarget));
        updateForm('form2', data);

        setSubmitted(data);

        window.location.href = '/nanny/advertisments/form3';
    }

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
    
        // Update the state
        setFileAttachments((prev) => ({
            ...prev,
            [fieldName]: file || '', // Store the selected file or reset if empty
        }));
        setErrors((prev) => ({
            ...prev,
            [fieldName]: false, // Clear the error for the field
        }));
    
        e.target.value = '';
    };
    
    const handleNavigation = (path) => {
        // if (isDirty) {
        //     setNextRoute(path);
        //     setShowSaveModal(true);
        // } else {
            navigate(path);
        // }
    };

    return (
        <div className="h-screen bg-pink-100 flex flex-col">
            {/* Navigation */}
            <NannyNavBar handleNavigation={handleNavigation} />

            {/* Main Content */}
            <main className="flex-grow ml-4 mr-4 rounded-lg">
                {/* Progress Bar */}
                <div className="w-full mb-2 flex flex-col items-center justify-center">
                    <Breadcrumbs className='m-1' size="sm" >
                        <BreadcrumbItem href="/nanny/form1">Στοιχεία</BreadcrumbItem>
                        <BreadcrumbItem href="/nanny/form2">Πιστοποιητικά</BreadcrumbItem>
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
                    ΠΡΟΣΘΗΚΗ ΠΙΣΤΟΠΟΙΗΤΙΚΩΝ
                </h1>

                {/* Form Content */}
                <Form className="flex flex-col gap-2" validationBehavior="native" onSubmit={onSubmit}>
                    <h1 className="text-sm font-bold">ΠΙΣΤΟΠΟΙΗΤΙΚΑ ΥΓΕΙΑΣ</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                     {/* Input with Attachment */}
                        <div className="relative w-full ">
                            <Input
                                isRequired
                                isClearable
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Πιστοποιητικό Παθολόγου"
                                name="pathologistCertificate"
                                startContent={
                                    <label htmlFor="pathologist-upload" className="cursor-pointer">
                                        <Paperclip className="w-4 h-4 text-default-400 pointer-events-none" />
                                            <input
                                            id="pathologist-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'pathologistCertificate')} />
                                    </label>
                                }
                                value={fileAttachments.pathologistCertificate?.name}
                                defaultValue={formData?.form2?.pathologistCertificate || ''}
                                placeholder="Επιλέξτε αρχείο"
                                onClear={() => {
                                    setFileAttachments((prev) => ({
                                        ...prev,
                                        pathologistCertificate: '', // Clear the value in the state
                                    }));
                                }}
                            />
                            {errors.pathologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.pathologistCertificate}</p>
                            )}
                        </div>
                        {/* Input with Attachment */}
                        <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10 mr-2"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Πιστοποιητικό Δερματολόγου"
                                name="dermatologistCertificate"
                                startContent={
                                    <label htmlFor="dermatologist-upload" className="cursor-pointer">
                                        <Paperclip className="w-4 h-4 text-default-400 pointer-events-none" />
                                            <input
                                            id="dermatologist-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'dermatologistCertificate')} />
                                    </label>
                                }
                                value={fileAttachments.dermatologistCertificate?.name}
                                defaultValue={formData?.form2?.dermatologistCertificate || ''}
                                placeholder="Επιλέξτε αρχείο"
                                onClear={() => {
                                    setFileAttachments((prev) => ({
                                        ...prev,
                                        dermatologistCertificate: '', 
                                    }));
                                }}
                            />
                            {errors.dermatologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.dermatologistCertificate}</p>
                            )}
                        </div>
                         {/* Input with Attachment */}
                         <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10 mr-2"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Πιστοποιητικό ψυχικής υγείας"
                                name="psychologistCertificate"
                                startContent={
                                    <label htmlFor="psychologist-upload" className="cursor-pointer">
                                        <Paperclip className="w-4 h-4 text-default-400 pointer-events-none" />
                                            <input
                                            id="psychologist-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'psychologistCertificate')} />
                                    </label>
                                }
                                value={fileAttachments.psychologistCertificate?.name}
                                defaultValue={formData?.form2?.psychologistCertificate || ''}
                                placeholder="Επιλέξτε αρχείο"
                                onClear={() => {
                                    setFileAttachments((prev) => ({
                                        ...prev,
                                        psychologistCertificate: '', 
                                    }));
                                }}
                            />
                            {errors.psychologistCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.psychologistCertificate}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="text-sm font-bold mt-4">ΠΙΣΤΟΠΟΙΗΤΙΚΑ ΕΚΠΑΙΔΕΥΣΗΣ</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        {/* Input with Attachment */}
                        <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10 mr-2"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Πιστοποιητικό Εκπαίδευσης"
                                name="courseCertificate"
                                startContent={
                                    <label htmlFor="course-upload" className="cursor-pointer">
                                        <Paperclip className="w-4 h-4 text-default-400 pointer-events-none" />
                                            <input
                                            id="course-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'courseCertificate')} />
                                    </label>
                                }
                                value={fileAttachments.courseCertificate?.name}
                                defaultValue={formData?.form2?.courseCertificate || ''}
                                placeholder="Επιλέξτε αρχείο"
                                onClear={() => {
                                    setFileAttachments((prev) => ({
                                        ...prev,
                                        courseCertificate: '', 
                                    }));
                                }}
                            />
                            {errors.courseCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.courseCertificate}</p>
                            )}
                        </div>
                        {/* Input with Attachment */}
                        <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10 mr-2"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Πιστοποιητικό Γλωσσομάθειας"
                                name="languageCertificate"
                                startContent={
                                    <label htmlFor="language-upload" className="cursor-pointer">
                                        <Paperclip className="w-4 h-4 text-default-400 pointer-events-none" />
                                            <input
                                            id="language-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'languageCertificate')} />
                                    </label>
                                }
                                value={fileAttachments.languageCertificate?.name}
                                defaultValue={formData?.form2?.languageCertificate || ''}
                                placeholder="Επιλέξτε αρχείο"
                                onClear={() => {
                                    setFileAttachments((prev) => ({
                                        ...prev,
                                        languageCertificate: '', 
                                    }));
                                }}
                            />
                            {errors.languageCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.languageCertificate}</p>
                            )}
                        </div>
                         {/* Input with Attachment */}
                         <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10 mr-2"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Πιστοποιητικό Πρώτων Βοηθειών"
                                name="firstAidCertificate"
                                startContent={
                                    <label htmlFor="firstAid-upload" className="cursor-pointer">
                                        <Paperclip className="w-4 h-4 text-default-400 pointer-events-none" />
                                            <input
                                            id="firstAid-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'firstAidCertificate')} />
                                    </label>
                                }
                                value={fileAttachments.firstAidCertificate?.name}
                                defaultValue={formData?.form2?.firstAidCertificate || ''}
                                placeholder="Επιλέξτε αρχείο"
                                onClear={() => {
                                    setFileAttachments((prev) => ({
                                        ...prev,
                                        firstAidCertificate: '', 
                                    }));
                                }}
                            />
                            {errors.firstAidCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.firstAidCertificate}</p>
                            )}
                        </div>
                        <div className='relative w-full'>
                            <Autocomplete
                                isRequired
                                defaultItems={educationLevel}
                                size='sm'
                                variant='faded'
                                radius='sm'
                                label="Εκπαίδευση"
                                labelPlacement="outside"
                                name="educationLevel"
                                defaultInputValue={formData?.form2?.educationLevel || ''}
                            >
                                {(educationLevel) => <AutocompleteItem key={educationLevel.key}>{educationLevel.label}</AutocompleteItem>}
                            </Autocomplete>
                        </div>
                    </div>
                    <h1 className="text-sm font-bold mt-4">ΑΠΟΣΠΑΣΜΑ ΠΟΙΝΙΚΟΥ ΜΗΤΡΩΟΥ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10 mr-2"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Απόσπασμα Ποινικού Μητρώου"
                                name="criminalRecordCertificate"
                                startContent={
                                    <label htmlFor="criminalRecord-upload" className="cursor-pointer">
                                        <Paperclip className="w-4 h-4 text-default-400 pointer-events-none" />
                                            <input
                                            id="criminalRecord-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'criminalRecordCertificate')} />
                                    </label>
                                }
                                value={fileAttachments.criminalRecordCertificate?.name}
                                defaultValue={formData?.form2?.criminalRecordCertificate || ''}
                                placeholder="Επιλέξτε αρχείο"
                                onClear={() => {
                                    setFileAttachments((prev) => ({
                                        ...prev,
                                        criminalRecordCertificate: '', 
                                    }));
                                }}
                            />
                            {errors.criminalRecordCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.criminalRecordCertificate}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="text-sm font-bold mt-4">ΣΥΣΤΑΤΙΚΕΣ ΕΠΙΣΤΟΛΕΣ</h1>
                    <div className='flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <div className="relative w-full">
                            <Input
                                isRequired
                                className="w-full pr-10 mr-2"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Συστατική Επιστολή"
                                name="letterCertificate"
                                startContent={
                                    <label htmlFor="letter-upload" className="cursor-pointer">
                                        <Paperclip className="w-4 h-4 text-default-400 pointer-events-none" />
                                            <input
                                            id="letter-upload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'letterCertificate')} />
                                    </label>
                                }
                                value={fileAttachments.letterCertificate?.name}
                                defaultValue={formData?.form2?.letterCertificate || ''}
                                placeholder="Επιλέξτε αρχείο"
                                onClear={() => {
                                    setFileAttachments((prev) => ({
                                        ...prev,
                                        letterCertificate: '', 
                                    }));
                                }}
                            />
                            {errors.letterCertificate && (
                                <p className="text-red-500 text-xs mt-1">{errors.letterCertificate}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end items-end w-full">
                        <Button variant="solid" color="default" size='sm' radius='md'>
                            <Link to="/nanny/advertisments/form1">ΠΙΣΩ</Link>
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

export default NannyForm2;
