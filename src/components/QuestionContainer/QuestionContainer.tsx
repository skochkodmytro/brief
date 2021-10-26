import React, { FC } from 'react';
import { Card } from "@mui/material";

import { QuestionController } from "../QuestionController/QuestionController";
import { QuestionNaming } from "../QuestionNaming/QuestionNaming";
import { QuestionTypesEnum } from "../../enums";
import { TextQuestion } from "../TextQuestion/TextQuestion";
import { DateQuestion } from "../DateQuestion/DateQuestion";
import { SliderQuestion } from "../SliderQuestion/SliderQuestion";
import { NumberQuestion } from "../NmberQuestion/NmberQuestion";
import { CheckboxQuestion } from "../CheckboxQuestion/CheckboxQuestion";

type OwnProps = {
    question: QuestionType
    index: number
    showErrors: boolean

    changeQuestion: (question: QuestionType) => void
    removeQuestion: (index: number) => void
}

export const QuestionContainer: FC<OwnProps> = ({ question, index, changeQuestion,
                                                    showErrors,
                                                    removeQuestion }) => {

    const handleChangeNameQuestion = (name: string) => {
        changeQuestion({ ...question, name });
    }

    const handleChangeDescriptionQuestion = (description: string) => {
        changeQuestion({ ...question, description });
    }

    const handleRemoveQuestion = () => {
        removeQuestion(index);
    }

    const handleChangeCheckboxQuestion = (updatedQuestion: QuestionType) => {
        changeQuestion(updatedQuestion);
    }

    const handleChangeController = (question: QuestionType) => {
        changeQuestion(question);
    }

    const renderQuestionType = () => {
        switch (question.questionType) {
            case QuestionTypesEnum.Text:
                return <TextQuestion question={question} />
            case QuestionTypesEnum.Date:
                return <DateQuestion question={question} />
            case QuestionTypesEnum.Slider:
                return <SliderQuestion
                    question={question}
                    showErrors={showErrors}
                    onChangeQuestion={(q: QuestionType) => changeQuestion(q)}
                />
            case QuestionTypesEnum.Number:
                return <NumberQuestion />
            case QuestionTypesEnum.Checkbox:
                return <CheckboxQuestion showErrors={showErrors} question={question} onChange={handleChangeCheckboxQuestion} />
            default:
                return <div>Some unknown type</div>
        }
    }

    return (
        <div className="text-question-container">
            <Card sx={{
                bgcolor: 'background.paper',
                boxShadow: 5,
            }}>
                <QuestionController
                    question={question}
                    onChange={handleChangeController}
                    removeQuestion={handleRemoveQuestion}
                />
                <div className="question-data">
                    <QuestionNaming
                        question={question}
                        showErrors={showErrors}
                        onChangeName={handleChangeNameQuestion}
                        onChangeDescription={handleChangeDescriptionQuestion}
                    />
                    {renderQuestionType()}
                </div>
            </Card>
        </div>
    )
}
