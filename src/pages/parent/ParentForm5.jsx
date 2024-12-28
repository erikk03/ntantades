import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import ParentNavBar from '../../components/ParentNavBar';
import {  Progress, Textarea } from "@nextui-org/react";
import { Form, Button } from '@nextui-org/react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";


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

                {/* Form Content */}
                <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={onSubmit}>
                    
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
                </Form>
            </main>

        </div>
    );
};

export default ParentForm5;