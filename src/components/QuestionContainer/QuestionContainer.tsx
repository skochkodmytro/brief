import React, { FC } from 'react';
import { Card } from "@mui/material";

import './QuestionContiner.css';

import { QuestionController } from "../QuestionController/QuestionController";
import { QuestionNaming } from "../QuestionNaming/QuestionNaming";
import { QuestionTypesEnum } from "../../enums";
import { DateQuestion } from "../DateQuestion/DateQuestion";
import { SliderQuestion } from "../SliderQuestion/SliderQuestion";
import { CheckboxQuestion } from "../CheckboxQuestion/CheckboxQuestion";

type OwnProps = {
    question: any
    index: number
}

export const QuestionContainer: FC<OwnProps> = ({ question, index }) => {
    const renderQuestionType = () => {
        switch (question.questionType) {
            case QuestionTypesEnum.Date:
                return <DateQuestion index={index} />
            case QuestionTypesEnum.Slider:
                return <SliderQuestion index={index} />
            case QuestionTypesEnum.Checkbox:
                return <CheckboxQuestion index={index} />
            default:
                return null
        }
    }

    return (
        <div className="question-container">
            <Card sx={{
                bgcolor: 'background.paper',
                boxShadow: 5,
            }}>
                <QuestionController
                    question={question}
                    index={index}
                />
                <div className="question-data">
                    <QuestionNaming
                        index={index}
                    />
                    {renderQuestionType()}
                </div>
            </Card>
        </div>
    )
}
