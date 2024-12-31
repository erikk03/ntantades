import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../config/AuthContext';
import { useFormContext } from '../../config/FormContext';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config/firebase';

// Components
import ParentNavBar from '../../components/ParentNavBar';
import {  Progress } from "@nextui-org/react";
import { Form, Button } from '@nextui-org/react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { Card, Checkbox, RadioGroup, Radio } from "@nextui-org/react";


const ParentForm4 = () => {
    const { user } = useAuth();
    const { formData, updateForm } = useFormContext();
    const [nannies, setNannies] = useState([]);
    const [selectedNanny, setSelectedNanny] = useState(null);
    const navigate = useNavigate();

    // Fetch nannies from Firebase
    useEffect(() => {
        const fetchNannies = async () => {
            try {
                const q = query(collection(db, "users"), where("professional", "==", true));
                const querySnapshot = await getDocs(q);

                const fetchedNannies = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNannies(fetchedNannies);
            } catch (error) {
                console.error("Error fetching nannies:", error);
            }
        };

        fetchNannies();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
    
        if (!selectedNanny) {
            alert("Please select a nanny to proceed.");
            return;
        }

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
                    ΕΠΙΛΟΓΗ ΕΠΙΜΕΛΗΤΗ/ΤΡΙΑΣ
                </h1>

                {/* List of Nannies */}
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <RadioGroup
                        orientation="vertical"
                        value={selectedNanny}
                        onChange={(value) => setSelectedNanny(value)}
                    >
                        {nannies.map((nanny) => (
                            <Card key={nanny?.id} variant="bordered" className="p-4 mb-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div>
                                        <p className="font-bold">{ `${nanny?.name} ${nanny?.surname}`}</p>
                                        <p>ΗΛΙΚΙΑ: {nanny?.age}</p>
                                        <p>ΕΚΠΑΙΔΕΥΣΗ: {nanny?.certificates?.course}</p>
                                        <p>ΠΡΩΤΕΣ ΒΟΗΘΕΙΕΣ: {nanny?.certificates?.firstAid ? "NAI" : "OXI"}</p>
                                        <p>ΚΑΤΑΣΤΑΣΗ {""}</p>
                                        <p>ΤΟΠΟΘΕΣΙΑ ΠΑΡΟΧΗΣ: {""}</p>
                                        <p>ΕΜΠΕΙΡΙΑ: {""}</p>
                                        <p>ΑΠΑΣΧΟΛΗΣΗ: {""}</p>
                                        <p>ΑΜΟΙΒΗ: {nanny?.pay}</p>
                                        <p>ΔΙΑΘΕΣΙΜΟΤΗΤΑ: {"ΔΙΑΘΕΣΙΜΗ"}</p>
                                        <p>ΕΠΙΚΟΙΝΩΝΙΑ: {`${nanny.homephone} ${nanny.cellphone1} ${nanny.EMAIL}`}</p>
                                    </div>
                                    <Radio value={nanny?.id}>Επιλογή</Radio>
                                </div>
                            </Card>
                        ))}
                    </RadioGroup>

                    {/* Form Actions */}
                    <div className="flex justify-end items-end w-full">
                        <Button variant="solid" color="default" size="sm" radius="md">
                            <Link to="/parent/applications/form3">ΠΙΣΩ</Link>
                        </Button>
                        <Button
                            type="submit"
                            variant="solid"
                            color="danger"
                            size="sm"
                            radius="md"
                            className="ml-auto"
                        >
                            ΣΥΝΕΧΕΙΑ
                        </Button>
                    </div>
                </form>
            </main>

        </div>
    );
};

export default ParentForm4;