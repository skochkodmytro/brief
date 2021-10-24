import React, { FC } from 'react';
import { Button } from "@mui/material";

import './CheckboxQuestion.css';

import { OptionList } from "../OptionList/OptionList";

type OwnTypes = {
    question: QuestionType

    onChange: (question: QuestionType) => void
}

export const CheckboxQuestion: FC<OwnTypes> = ({  question, onChange }) => {

    const handleChangeOptions = (options: Array<OptionType>) => {
        onChange({ ...question, options });
    }

    const addOption = () => {
        onChange({ ...question,
            options: [...question.options as Array<OptionType>, { name: '', defaultIsChecked: false, image: null }] });
    }

    return (
        <>
            <OptionList
                options={question.options || []}
                hasCustomField={question.hasCustomFieldForFill || false}
                countRow={question.countRow || 1}
                isRadioList={false}
                onChange={handleChangeOptions}
            />
            <Button variant="contained" fullWidth onClick={addOption}>
                Add Option
            </Button>
        </>
    )
}
