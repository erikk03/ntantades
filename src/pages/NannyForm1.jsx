import React from 'react';
import { useAuth } from '../config/AuthContext';
import NannyNavBar from '../components/NannyNavBar';
import { Progress } from "@nextui-org/react";

const NannyForm1 = () => {
    const { user } = useAuth();

    return (
        <div className="h-screen bg-pink-100 flex flex-col">
            {/* Navigation */}
            <NannyNavBar />

            {/* Main Content */}
            <main className="flex-grow py-6 px-4 rounded-lg">
            {/* Progress Bar */}
            <div className="w-full mb-6">
                <h1 className="text font-bold text-center mb-4">
                    ΠΡΟΟΔΟΣ ΕΓΓΡΑΦΗΣ
                </h1>
                <Progress
                    aria-label="Progress"
                    color="danger"
                    size="sm"
                    value={20}
                    className="w-3/4 mx-auto"
                />
            </div>

            {/* Form Title */}
            <h1 className="text-2xl font-bold text-center mb-4">
                ΣΥΜΠΛΗΡΩΣΗ ΣΤΟΙΧΕΙΩΝ ΕΠΙΜΕΛΗΤΗ/ΤΡΙΑΣ
            </h1>

            {/* Form Content */}
            <form className="max-w-4xl grid gap-6 pl-4">
                {/* Personal Information */}
                <div className="left-0">
                    <h1 className="text-xl font-bold mb-4">
                        ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
                        {/* Όνομα Field */}
                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Όνομα
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                                value="ΜΑΡΙΑ"
                                readOnly
                            />
                        </div>

                        {/* Επώνυμο Field */}
                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Επώνυμο
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                                value="ΚΟΥΚΟΥΛΗ"
                                readOnly
                            />
                        </div>

                        {/* Additional Field */}
                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                                value="example@example.com"
                            />
                        </div>
                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                                value="example@example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="col-span-2 flex justify-end">
                    <button className="bg-pink-500 text-white font-bold py-2 px-6 rounded shadow hover:bg-pink-600">
                        ΣΥΝΕΧΕΙΑ
                    </button>
                </div>
            </form>
        </main>

        </div>
    );
};

export default NannyForm1;
