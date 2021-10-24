import React, { FC, useState } from "react";
import { MenuItem, Select, SelectChangeEvent, Button } from "@mui/material";

import './AddQuestion.css';
import { QuestionTypesEnum } from "../../enums";

type OwnProps = {
    addQuestion: (type: QuestionTypesEnum) => void
}

export const AddQuestion: FC<OwnProps> = ({ addQuestion }) => {
    const [questionType, setQuestionType] = useState<QuestionTypesEnum>(QuestionTypesEnum.Text);

    const changeQuestionType = (event: SelectChangeEvent<QuestionTypesEnum>) => {
        setQuestionType(event.target.value as QuestionTypesEnum);
    }

    const handleAddQuestion = () => {
        if (questionType !== undefined) {
            addQuestion(questionType);
        }
    }

    return (
        <div className="add-question-control">
            <div>
                <Select
                    value={questionType}
                    label="Question type"
                    onChange={changeQuestionType}
                >
                    <MenuItem value={QuestionTypesEnum.Text}>Text</MenuItem>
                    <MenuItem value={QuestionTypesEnum.Date}>Date</MenuItem>
                    <MenuItem value={QuestionTypesEnum.Slider}>Slider</MenuItem>
                    <MenuItem value={QuestionTypesEnum.Number}>Number</MenuItem>
                    <MenuItem value={QuestionTypesEnum.Checkbox}>Checkbox</MenuItem>
                </Select>
            </div>
            <div>
                <Button
                    variant="contained"
                    disabled={questionType === undefined}
                    onClick={handleAddQuestion}
                >
                    Add Question
                </Button>

            </div>
        </div>
    )
}