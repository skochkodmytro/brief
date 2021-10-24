import React, { FC } from 'react';

import './OptionList.css';

import { OptionItem } from "../OptionItem/OptionItem";
import { Checkbox } from "antd";

type OwnProps = {
    options: Array<OptionType>
    isRadioList: boolean
    countRow: number
    hasCustomField: boolean

    onChange: (options: Array<OptionType>) => void
}

export const OptionList: FC<OwnProps> = ({ options, onChange, countRow, hasCustomField }) => {
    const flexWidth = countRow === 1 ? 100 : 45;

    const handleChangeOption = (option: OptionType, index: number) => {
        const newOptionsList = [...options];
        newOptionsList[index] = option;

        onChange(newOptionsList);
    }

    const deleteOption = (index: number) => {
        const newOptionList = [...options];
        newOptionList.splice(index, 1);

        onChange(newOptionList);
    }

    const renderOptions = () => {
        const flexWidth = countRow === 1 ? 100 : 45;
        return options.map((option, index) => (
            <div key={index} className="option-item-container" style={{ width: flexWidth + '%' }}>
                <OptionItem
                    index={index}
                    option={option}
                    canBeDelete={options.length > 2}
                    onChange={(o) => handleChangeOption(o, index)}
                    onDelete={() => deleteOption(index)}
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
        </div>
    )
}
