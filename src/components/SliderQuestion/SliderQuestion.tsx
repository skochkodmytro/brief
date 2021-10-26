import React, { FC } from 'react';

import './SliderQuestion.css';
import { TextInput } from "../TextInput/TextInput";
import { Slider } from "antd";

type OwnProps = {
    question: QuestionType
    showErrors: boolean

    onChangeQuestion: (question: QuestionType) => void
}

export const SliderQuestion: FC<OwnProps> = ({ question, onChangeQuestion, showErrors }) => {

    const handleChangeFrom = (from: string) => {
        onChangeQuestion({ ...question, from });
    }

    const handleChangeTo = (to: string) => {
        onChangeQuestion({ ...question, to });
    }

    return (
        <div className="text-question-container slider-question-container">
            <div>
                <TextInput
                    error={showErrors && !question.from}
                    value={question.from || ''}
                    onChange={handleChangeFrom}
                    placeholder="From" style={{ textAlign: 'center' }}
                />
            </div>
            <Slider defaultValue={50} disabled={true} className="slider-wrapper" />
            <div>
                <TextInput
                    error={showErrors && !question.to}
                    value={question.to || ''}
                    onChange={handleChangeTo}
                    placeholder="To" style={{ textAlign: 'center' }}
                />
            </div>
        </div>
    )
}
