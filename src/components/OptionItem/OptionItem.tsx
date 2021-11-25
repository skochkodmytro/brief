import React, { ChangeEvent, FC, useRef } from 'react';
import { FileImageOutlined, DeleteOutlined } from '@ant-design/icons';
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Card, CardContent, Checkbox } from "@mui/material";

import './OptionItem.css';

import { TextInput } from "../TextInput/TextInput";
import { ImagePreview } from "../ImagePreview/ImagePreview";

type OwnProps = {
    index: number
    questionIndex: number
    canBeDelete: boolean

    removeOption: (index: number) => void
}

export const OptionItem: FC<OwnProps> = ({ index, questionIndex, canBeDelete, removeOption }) => {
    const { control, setValue } = useFormContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const option = useWatch({
        name: `questions.${questionIndex}.options.${index}`,
        control
    });

    const openInputElementOrDeleteImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const onChangeImage = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        if (input.files) {
            setValue(`questions.${questionIndex}.options.${index}.image`, input.files[0]);
        }
    }

    const handleRemoveOption = () => {
        removeOption(index);
    }

    return (
        <Card sx={{ boxShadow: 8 }}>
            {option.image &&
                <div className="option-preview-container">
                    <ImagePreview file={option.image} />
                </div>
            }
            <CardContent>
                <div className="option-container">
                    <div>
                        <Controller
                            control={control}
                            name={`questions.${questionIndex}.options.${index}.defaultIsChecked`}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <div className="option-container-input">
                        <Controller
                            control={control}
                            name={`questions.${questionIndex}.options.${index}.name`}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <TextInput
                                    error={fieldState.isDirty && fieldState.invalid}
                                    value={field.value}
                                    placeholder={'Option ' + (index + 1)}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <div className="option-container-right">
                        <input
                            type="file"
                            className="option-input-file"
                            ref={inputRef}
                            onChange={onChangeImage}
                        />
                        <div className="option-container-icon" onClick={openInputElementOrDeleteImage}>
                            <FileImageOutlined />
                        </div>
                        {
                            canBeDelete &&
                            <div className="option-container-icon" onClick={handleRemoveOption}>
                                <DeleteOutlined />
                            </div>
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
