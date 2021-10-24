import React, { FC } from 'react';
import { TextInput } from "../TextInput/TextInput";

import './QuestionNaming.css';

type OwnProps = {
    question: QuestionType

    onChangeName: (name: string) => void
    onChangeDescription: (description: string) => void
}

export const QuestionNaming: FC<OwnProps> = ({ question, onChangeName, onChangeDescription }) => {
    return (
        <div className="naming-container">
            <div className="naming-item">
                <TextInput
                    value={question.name}
                    onChange={onChangeName}
                    placeholder="Question name"
                />
            </div>
            <div className="naming-item">
                <TextInput
                    value={question.description}
                    onChange={onChangeDescription}
                    fontSize={18}
                    placeholder="Question description"
                />
            </div>
        </div>
    )
}
