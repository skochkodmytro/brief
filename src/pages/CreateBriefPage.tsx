import React, { FC } from 'react';
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';

import "./CreateBriefPage.css";

import { addQuestion, updateBrief } from "../store/new-brief/new-brief-actions";

import { AppState } from "../store/rootStore";
import { TextInput } from "../components/TextInput/TextInput";
import { AddQuestion } from "../components/AddQuestion/AddQuestion";
import { QuestionTypesEnum } from "../enums";
import { QuestionContainer } from "../components/QuestionContainer/QuestionContainer";

type MapStatePropsType = {
    brief: BriefType
}

type MapDispatchPropsType = {
    addQuestion: (question: QuestionType) => void
    updateBrief: (brief: BriefType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const CreateBriefPage: FC<PropsType> = ({ brief, updateBrief, addQuestion}) => {
    const { control, register, handleSubmit } = useForm();

    const handleChangeBriefName = (name: string) => {
        updateBrief({ ...brief, name });
    }

    const handleChangeBriefDesc = (description: string) => {
        updateBrief({ ...brief, description });
    }

    const handleAddQuestion = (type: QuestionTypesEnum) => {
        let newQuestion: QuestionType = { name: '', description: '', questionType: type, isRequired: true };

        if (type === QuestionTypesEnum.Slider) {
            newQuestion.from = '';
            newQuestion.to = '';
        }

        if (type === QuestionTypesEnum.Checkbox) {
            newQuestion.countRow = 1;
            newQuestion.hasCustomFieldForFill = false;
            newQuestion.options = [{ name: '', defaultIsChecked: false, image: null },
                { name: '', defaultIsChecked: false, image: null }];
        }

        updateBrief({ ...brief, questions: [...brief.questions, newQuestion] });
    }

    const handleUpdateQuestion = (q: QuestionType, index: number) => {
        const updatedQuestions = [...brief.questions];
        updatedQuestions[index] = q;

        updateBrief({ ...brief, questions: updatedQuestions });
    }

    const handleRemoveQuestion = (index: number) => {
        const questionsList = [...brief.questions];
        questionsList.splice(index, 1);

        updateBrief({ ...brief, questions: questionsList });
    }

    const renderQuestionsList = () => {
        return brief.questions.map((q: QuestionType, index: number) => (
            <QuestionContainer
                key={index}
                question={q}
                index={index}
                changeQuestion={(q: QuestionType) => handleUpdateQuestion(q, index)}
                removeQuestion={handleRemoveQuestion}
            />
        ))
    }

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <div className="container create-brief-page">
            <form>
                <div className="brief-wrapper">
                    <header className="create-brief-page-header">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="create-brief-page-header-item">
                                <TextInput
                                    value={brief.name}
                                    placeholder="Brief name"
                                    onChange={handleChangeBriefName}
                                    fontSize={32}
                                />
                            </div>
                            <div className="create-brief-page-header-item">
                                <TextInput
                                    value={brief.description}
                                    onChange={handleChangeBriefDesc}
                                    placeholder="Description"
                                />
                            </div>
                            <Button variant="contained" type="submit">Submit</Button>
                        </form>
                    </header>

                    <div className="questions-container">
                        {renderQuestionsList()}
                    </div>

                    <Button variant="contained">Create brief</Button>
                </div>
            </form>

            <AddQuestion addQuestion={handleAddQuestion} />
        </div>
    )
}

let mapStateToProps = (state: AppState): MapStatePropsType => {
    return {
        brief: state.newBrief
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppState>(mapStateToProps, { addQuestion, updateBrief })(CreateBriefPage);
