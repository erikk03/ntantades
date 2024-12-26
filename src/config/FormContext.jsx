import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState(() => {
        // Load initial data from localStorage
        const storedData = localStorage.getItem('formData');
        return storedData ? JSON.parse(storedData) : { form1: {}, form2: {}, form3: {}, form4: {} };
    });

    const updateForm = (formKey, data) => {
        setFormData((prev) => {
            const updatedData = {
                ...prev,
                [formKey]: {
                    ...prev[formKey],
                    ...data,
                },
            };

            localStorage.setItem('formData', JSON.stringify(updatedData)); // Sync with localStorage
            return updatedData;
        });
    };

    return (
        <FormContext.Provider value={{ formData, updateForm }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);
