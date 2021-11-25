import React, { FC } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { Slider } from "antd";

import './SliderQuestion.css';
import { TextInput } from "../TextInput/TextInput";

type OwnProps = {
    index: number
}

export const SliderQuestion: FC<OwnProps> = ({ index }) => {
    const { control } = useFormContext();

    return (
        <div className="text-question-container slider-question-container">
            <div>
                <Controller
                    control={control}
                    name={`questions.${index}.from`}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput
                            onChange={field.onChange}
                            value={field.value}
                            placeholder="From"
                            style={{ textAlign: 'center' }}
                        />
                    )}
                />
            </div>
            <Slider defaultValue={50} disabled={true} className="slider-wrapper" />
            <div>
                <Controller
                    control={control}
                    name={`questions.${index}.to`}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput
                            onChange={field.onChange}
                            value={field.value}
                            placeholder="To"
                            style={{ textAlign: 'center' }}
                        />
                    )}
                />
            </div>
        </div>
    )
}
