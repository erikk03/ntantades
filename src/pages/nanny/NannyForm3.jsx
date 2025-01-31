import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import {Time} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

// Components
import NannyNavBar from '../../components/NannyNavBar';
import {Breadcrumbs, BreadcrumbItem, DateRangePicker} from "@nextui-org/react";
import { Progress, Textarea } from "@nextui-org/react";
import { Form, Button } from '@nextui-org/react';
import { TimeInput } from "@nextui-org/react";
import { placeOfWork, meetingDay} from '../../data/formData';
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { Phone,  Mail, Facebook, Instagram, Linkedin  } from 'lucide-react';
import { Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const parseTimeString = (timeString) => {
    if (!timeString) return null; // Handle null or empty values
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Time(hours, minutes); // Return a Time object
};



const days = ["ΔΕΥΤΕΡΑ", "ΤΡΙΤΗ", "ΤΕΤΑΡΤΗ", "ΠΕΜΠΤΗ", "ΠΑΡΑΣΚΕΥΗ", "ΣΑΒΒΑΤΟ", "ΚΥΡΙΑΚΗ"];

const ParentForm3 = () => {
    const { user, userData, kidsData } = useAuth();
    const { formData, updateForm } = useFormContext();
    const [isDirty, setIsDirty] = useState(false);
    const navigate = useNavigate();
    const [workExperience, setWorkExperience] = useState(null);

    // Validate and transform workExperience data from localStorage
useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'))?.form3?.workExperience;
    console.log("Loaded workExperience from localStorage:", storedData); // Debugging log

    if (storedData?.start && storedData?.end) {
        const validStart = storedData.start?.calendar?.identifier === "gregory";
        const validEnd = storedData.end?.calendar?.identifier === "gregory";

        if (validStart && validEnd) {
            setWorkExperience({
                // start: {
                //     year: storedData.start.year || 2024,
                //     month: storedData.start.month || 12,
                //     day: storedData.start.day || 1,
                //     calendar: { identifier: storedData.start.calendar.identifier },
                // },
                // end: {
                //     year: storedData.end.year || 2025,
                //     month: storedData.end.month || 1,
                //     day: storedData.end.day || 1,
                //     calendar: { identifier: storedData.end.calendar.identifier },
                // },
            });
        } else {
            console.warn("Invalid calendar identifiers in storedData. Falling back to defaults.");
            setWorkExperience(null); // Fallback to null if data is invalid
        }
    } else {
        console.warn("Invalid workExperience structure in localStorage. Falling back to defaults.");
        setWorkExperience(null); // Fallback to null if structure is invalid
    }
}, []);


    const onSubmit = (e) => {
        e.preventDefault();
    
        const data = Object.fromEntries(new FormData(e.currentTarget));
        updateForm('form3', {...data, workExperience} );

        setSubmitted(data);
    }

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
                        <BreadcrumbItem href="/nanny/form3">Πρόγραμμα</BreadcrumbItem>
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
                <h1 className="text-xl font-bold text-center mb-5">
                    ΗΜΕΡΕΣ ΚΑΙ ΩΡΕΣ ΦΡΟΝΤΙΔΑΣ
                </h1>

                {/* Form Content */}
                <Form className="flex flex-col gap-2" validationBehavior="native" onSubmit={onSubmit}>
                    {/* Day and Time Fields */}
                    <h1 className="text-sm font-bold">ΔΙΑΘΕΣΙΜΟΤΗΤΑ ΦΡΟΝΤΙΔΑΣ</h1>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        {days.map((day) => (
                            <div key={day} className="flex flex-col items-center">
                                <label className="font-semibold mb-1 bg-gray-100 rounded-small pl-3 pr-3">{day}</label>
                                <div className="flex flex-col gap-2">
                                    <TimeInput
                                        label="Από"
                                        name={`${day.toLowerCase()}_from`}
                                        size="sm"
                                        variant="faded"
                                        radius='sm'
                                        hourCycle={24}
                                        aria-label={`Από (${day})`}
                                        labelPlacement='outside-left'
                                        defaultValue={parseTimeString(formData?.form3?.[`${day.toLowerCase()}_from`])}
                                    />
                                    <TimeInput
                                        label="Έως"
                                        name={`${day.toLowerCase()}_to`}
                                        size="sm"
                                        variant="faded"
                                        radius='sm'
                                        hourCycle={24}
                                        aria-label={`Έως (${day})`}
                                        labelPlacement='outside-left'
                                        defaultValue={parseTimeString(formData?.form3?.[`${day.toLowerCase()}_to`])}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <h1 className="text-sm font-bold">ΤΟΠΟΘΕΣΙΑ/ΑΜΟΙΒΗ</h1>
                    <div className='flex flex-wrap md:flex-nowrap md:mb-0 gap-4'>
                        <I18nProvider locale="el-GR">
                            <DateRangePicker
                                isRequired
                                showMonthAndYearPickers 
                                size='sm'
                                variant="faded"
                                radius='sm'
                                label="ΠΡΟΥΠΗΡΕΣΙΑ"
                                labelPlacement='outside-left'
                                name="workExperience"
                                value={workExperience}
                                onChange={setWorkExperience}

                            />
                        </I18nProvider>

                        <Autocomplete
                            isRequired
                            defaultItems={placeOfWork}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΤΟΠΟΘΕΣΙΑ ΕΡΓΑΣΙΑΣ"
                            labelPlacement="outside-left"
                            name="placeOfWork"
                            defaultInputValue={formData?.form3?.placeOfWork || ''}
                        >
                            {(placeOfWork) => <AutocompleteItem key={placeOfWork.key}>{placeOfWork.label}</AutocompleteItem>}
                        </Autocomplete>

                        <Input
                            isRequired
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside-left"
                            label="AMOIBH/ΩΡΑ"
                            name="payment"
                            defaultValue={formData?.form3?.payment || ''}
                            placeholder="0.00"
                            type="number"
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                  <span className="text-default-400 text-small">€</span>
                                </div>
                            }
                        />
                    </div>

                    <h1 className="text-sm font-bold">ΔΙΑΘΕΣΙΜΟΤΗΤΑ ΡΑΝΤΕΒΟΥ ΓΝΩΡΙΜΙΑΣ</h1>
                    <div className='flex flex-wrap md:flex-nowrap md:mb-0 gap-4'>
                        <Autocomplete
                            defaultItems={meetingDay}
                            size='sm'
                            variant='faded'
                            radius='sm'
                            label="ΗΜΕΡΑ"
                            labelPlacement="outside-left"
                            name="meetingDay"
                            defaultInputValue={formData?.form3?.meetingDay || ''}
                        >
                            {(meetingDay) => <AutocompleteItem key={meetingDay.key}>{meetingDay.label}</AutocompleteItem>}
                        </Autocomplete>

                        <TimeInput
                            label="ΩΡΑ"
                            name= "meetingTime"
                            size="sm"
                            variant="faded"
                            radius='sm'
                            hourCycle={24}
                            labelPlacement='outside-left'
                            defaultValue={parseTimeString(formData?.form3?.meetingTime)}
                        />
                    </div>
                    
                    
                    <h1 className="text-sm font-bold">ΤΡΟΠΟΙ ΕΠΙΚΟΙΝΩΝΙΑΣ</h1>
                    <div className='flex flex-wrap md:flex-nowrap md:mb-0 gap-2 mt-0 items-center'>
                        <div className="relative">
                            <Input
                                readOnly
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                name="cellphone1"
                                startContent={
                                    <Phone className="w-4 h-4 text-default-400 pointer-events-none" />
                                }
                                defaultValue={formData?.form1?.cellphone1 || ''}
                            />
                        </div>
                        <div className="relative">
                            <Input
                                readOnly
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                name="cellphone1"
                                startContent={
                                    <Mail className="w-4 h-4 text-default-400 pointer-events-none" />
                                }
                                defaultValue={ formData?.form1?.EMAIL || user?.email || ''}
                            />
                        </div>
                        <div className="relative">
                            <Input
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                name="facebook"
                                startContent={
                                    <Facebook className="w-4 h-4 text-default-400 pointer-events-none" />
                                }
                                defaultValue={ formData?.form3?.facebook || ''}
                            />
                        </div>
                        <div className="relative">
                            <Input
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                name="instagram"
                                startContent={
                                    <Instagram className="w-4 h-4 text-default-400 pointer-events-none" />
                                }
                                defaultValue={ formData?.form3?.instagram || ''}
                            />
                        </div>
                        <div className="relative">
                            <Input
                                className="w-full pr-10"
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                name="linkedin"
                                startContent={
                                    <Linkedin className="w-4 h-4 text-default-400 pointer-events-none" />
                                }
                                defaultValue={ formData?.form1?.linkedin || ''}
                            />
                        </div>
                    </div>
                    <div className='flex flex-wrap w-full md:flex-nowrap md:mb-0 gap-4'>
                        <Textarea
                            size='sm'
                            variant='faded'
                            radius='sm'
                            labelPlacement="outside"
                            label="ΕΠΙΠΛΕΟΝ ΧΡΗΣΙΜΕΣ ΠΛΗΡΟΦΟΡΙΕΣ"
                            name="extra"
                            defaultValue={formData?.form3?.extra || ''}
                        />
                    </div>
                    <div className="flex justify-end items-end w-full">
                        <Button variant="solid" color="default" size='sm' radius='md'>
                            <Link to="/nanny/advertisments/form2">ΠΙΣΩ</Link>
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
                                    window.location.href = "/nanny/advertisments/form4"; // Or use navigate if using React Router
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

export default ParentForm3;