import React, { useState } from 'react';

export const useForm = () => {
    const [fields, setFields] = useState<any>({});

    const register = (name: string) => {
        const newListFields = { ...fields };

        if(!newListFields[name]) {
            newListFields[name] = {};
        }

        setFields(newListFields);
    }

    return { register, fields };
}