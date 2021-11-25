import React, { FC } from "react";
import { FormControlLabel, Checkbox, ToggleButtonGroup, ToggleButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useFormContext } from "react-hook-form";

import './QuestionController.css';

import { QuestionTypesEnum } from "../../enums";

type OwnProps = {
    question: QuestionType
    index: number
}

export const QuestionController: FC<OwnProps> = ({ question,
                                                    index }) => {
    const { control } = useFormContext();

    const renderQuestionType = () => {
        switch (question.questionType) {
            case QuestionTypesEnum.Text:
                return 'Text'
            case QuestionTypesEnum.Date:
                return 'Date'
            case QuestionTypesEnum.Slider:
                return 'Slider'
            case QuestionTypesEnum.Number:
                return 'Number'
            case QuestionTypesEnum.Checkbox:
                return 'Checkbox'
            default:
                return 'Some Type'
        }
    }

    const renderCheckboxCustomControls = () => (
        <>
            <div className="controller-item">
                <Controller
                    control={control}
                    name={`questions.${index}.hasCustomFieldForFill`}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox checked={field.value} onChange={field.onChange} />}
                            label="Fill custom field"
                        />
                    )}
                />
            </div>
            <div className="controller-item">
                <Controller
                    control={control}
                    name={`questions.${index}.countRow`}
                    render={({ field }) => (
                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                            value={field.value}
                            onChange={field.onChange}
                        >
                            <ToggleButton value={'1'}>1</ToggleButton>
                            <ToggleButton value={'2'}>2</ToggleButton>
                        </ToggleButtonGroup>
                    )}
                />
            </div>
        </>
    )

    return (
        <div className="question-controller">
            <div className="controller-item controller-item-type">
                {renderQuestionType()}
            </div>
            {question.questionType === QuestionTypesEnum.Checkbox ? renderCheckboxCustomControls() : null}
            <div className="controller-item">
                <Controller
                    control={control}
                    name={`questions.${index}.isRequired`}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox onChange={field.onChange} checked={field.value} />}
                            label="Required"
                        />
                    )}
                />
            </div>
            <div className="controller-item">
                <DeleteIcon
                    style={{ color: 'white', fontSize: 24, cursor: 'pointer' }}
                />
            </div>
        </div>
    )
}

