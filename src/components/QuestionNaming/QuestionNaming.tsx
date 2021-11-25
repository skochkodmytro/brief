import React, { FC } from 'react';
import { Controller, useFormContext } from "react-hook-form";

import { TextInput } from "../TextInput/TextInput";

import './QuestionNaming.css';

type OwnProps = {
    index: number
}

export const QuestionNaming: FC<OwnProps> = ({ index }) => {
    const { control } = useFormContext();

    return (
        <div className="naming-container">
            <div className="naming-item">
                <Controller
                    control={control}
                    name={`questions.${index}.name`}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <TextInput
                            error={fieldState.isDirty && fieldState.invalid}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Question name"
                        />
                    )}
                />
            </div>
            <div className="naming-item">
                <Controller
                    control={control}
                    name={`questions.${index}.description`}
                    render={({ field, fieldState }) => (
                        <TextInput
                            error={fieldState.isDirty && fieldState.invalid}
                            value={field.value}
                            onChange={field.onChange}
                            fontSize={18}
                            placeholder="Question description"
                        />
                    )}
                />
            </div>
        </div>
    )
}
