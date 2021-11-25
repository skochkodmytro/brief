import React, { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import './OptionList.css';

import { OptionItem } from "../OptionItem/OptionItem";
import { Checkbox } from "antd";
import { Button } from "@mui/material";

type OwnProps = {
    isRadioList: boolean
    countRow: number | string
    hasCustomField: boolean
    questionIndex: number
}

export const OptionList: FC<OwnProps> = ({ countRow, hasCustomField, questionIndex}) => {
    const { control } = useFormContext();
    const { fields, remove, append } = useFieldArray({
        control,
        name: `questions.${questionIndex}.options`
    });
    const options = useWatch({
        name: `questions.${questionIndex}.options`,
        control
    });

    const countRowAsNumber = typeof countRow === 'string' ? parseInt(countRow) : countRow;
    const flexWidth = countRowAsNumber === 1 ? 100 : 48;

    const addOption = () => {
        append({ name: '', defaultIsChecked: false, image: null });
    }

    const renderOptions = () => {
        return fields.map((option, index) => (
            <div key={option.id} className="option-item-container" style={{ width: flexWidth + '%' }}>
                <OptionItem
                    index={index}
                    questionIndex={questionIndex}
                    canBeDelete={options.length > 2}
                />
            </div>
        ))
    }

    const renderCustomField = (
        <div className="option-item-container" style={{ width: flexWidth + '%' }}>
            <div className="option-item-custom-field">
                <div className="custom-field-checkbox">
                    <Checkbox disabled={true} />
                </div>
                <div className="custom-field-title">
                    This field for custom type
                </div>
            </div>
        </div>
    )

    return (
        <div className="option-list">
            {renderOptions()}
            {hasCustomField ? renderCustomField : null}

            <Button variant="contained" fullWidth onClick={addOption}>
                Add Option
            </Button>
        </div>
    )
}
