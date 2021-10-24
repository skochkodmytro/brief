import React, { FC } from "react";
import { FormControlLabel, Checkbox, ToggleButtonGroup, ToggleButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import './QuestionController.css';

import { QuestionTypesEnum } from "../../enums";

type OwnProps = {
    question: QuestionType

    removeQuestion: () => void
    onChange: (question: QuestionType) => void
}

export const QuestionController: FC<OwnProps> = ({ question,
                                                     onChange, removeQuestion }) => {

    const changeRequired = () => {
        onChange({ ...question, isRequired: !question.isRequired });
    }

    const handleChangeCountRow = (event: React.MouseEvent<HTMLElement>, value: number) => {
        onChange({ ...question, countRow: value });
    }

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

    const toggleCanBeCustomField = () => {
        onChange({ ...question, hasCustomFieldForFill: !question.hasCustomFieldForFill });
    }

    const renderCheckboxCustomControls = () => (
        <>
            <div className="controller-item">
                <FormControlLabel
                    control={<Checkbox checked={question.hasCustomFieldForFill} onChange={toggleCanBeCustomField} />}
                    label="Fill custom field"
                />
            </div>
            <div className="controller-item">
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={question.countRow}
                    onChange={handleChangeCountRow}
                >
                    <ToggleButton value={1}>1</ToggleButton>
                    <ToggleButton value={2}>2</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    )

    return (
        <div className="question-controller">
            {question.questionType === QuestionTypesEnum.Checkbox ? renderCheckboxCustomControls() : null}
            <div className="controller-item">
                {renderQuestionType()}
            </div>
            <div className="controller-item">
                <FormControlLabel
                    control={<Checkbox onChange={changeRequired} checked={question.isRequired} />}
                    label="Required"
                />
            </div>
            <div className="controller-item">
                <DeleteIcon
                    onClick={removeQuestion}
                    style={{ color: 'white', fontSize: 24, cursor: 'pointer' }}
                />
            </div>
        </div>
    )
}

