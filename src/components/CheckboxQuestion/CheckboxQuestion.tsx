import React, { FC } from 'react';
import { useFormContext, useWatch } from "react-hook-form";

import './CheckboxQuestion.css';

import { OptionList } from "../OptionList/OptionList";

type OwnTypes = {
    index: number
}

export const CheckboxQuestion: FC<OwnTypes> = ({ index }) => {
    const { control } = useFormContext();

    const question = useWatch({
        name: `questions.${index}`,
        control
    });

    return (
        <OptionList
            questionIndex={index}
            hasCustomField={question.hasCustomFieldForFill || false}
            countRow={question.countRow || 1}
            isRadioList={false}
        />
    )
}
