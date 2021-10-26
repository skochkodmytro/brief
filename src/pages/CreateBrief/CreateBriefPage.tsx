import React, { FC, useState } from 'react';
import { connect } from "react-redux";
import { Alert, Button, Snackbar } from "@mui/material";

import "./CreateBriefPage.css";

import { addQuestion, updateBrief } from "../../store/new-brief/new-brief-actions";

import { AppState } from "../../store/rootStore";
import { TextInput } from "../../components/TextInput/TextInput";
import { AddQuestion } from "../../components/AddQuestion/AddQuestion";
import { QuestionTypesEnum } from "../../enums";
import { QuestionContainer } from "../../components/QuestionContainer/QuestionContainer";

type MapStatePropsType = {
    brief: BriefType
}

type MapDispatchPropsType = {
    addQuestion: (question: QuestionType) => void
    updateBrief: (brief: BriefType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const CreateBriefPage: FC<PropsType> = ({ brief, updateBrief, addQuestion}) => {
    const [showErrors, setShowErrors] = useState<boolean>(false)
    const [showErrorSnackBar, setShowErrorSnackBar] = useState<boolean>(false)

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
                showErrors={showErrors}
                index={index}
                changeQuestion={(q: QuestionType) => handleUpdateQuestion(q, index)}
                removeQuestion={handleRemoveQuestion}
            />
        ))
    }

    const handleCloseSnackBar = () => {
        setShowErrorSnackBar(false);
    }

    const onSubmit = () => {
        const { name, description, questions } = brief;
        let isError = false;

        if (!name || !description || questions.some(q => !q.name)) {
            isError = true
        }

        questions.forEach(q => {
            if (q.options && q.options.some(o => !o.name)) {
                isError = true
            }

            if ((q.from !== undefined && q.to !== undefined) && (!q.from || !q.to)) {
                isError = true;
            }
        })

        if (isError) {
            setShowErrors(true);
            setShowErrorSnackBar(true);
        } else {
            setShowErrors(false);
            console.log(1);
        }
    }

    return (
        <div className="create-brief-page">
            <form>
                <div className="brief-wrapper">
                    <header className="create-brief-page-header">
                        <div className="create-brief-page-header-item">
                            <TextInput
                                error={showErrors && !brief.name}
                                value={brief.name}
                                placeholder="Brief name"
                                onChange={handleChangeBriefName}
                                fontSize={32}
                            />
                        </div>
                        <div className="create-brief-page-header-item">
                            <TextInput
                                error={showErrors && !brief.description}
                                value={brief.description}
                                onChange={handleChangeBriefDesc}
                                placeholder="Description"
                            />
                        </div>
                    </header>

                    <div className="questions-container">
                        {renderQuestionsList()}
                    </div>

                    <Button variant="contained" onClick={onSubmit}>Create brief</Button>
                </div>
            </form>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showErrorSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
            >
                <Alert severity="error">Brief is not fill</Alert>
            </Snackbar>

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
