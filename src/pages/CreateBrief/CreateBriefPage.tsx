import React, { FC } from 'react';
import moment from 'moment';
import { Controller, FieldArrayWithId, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@mui/material";

import "./CreateBriefPage.css";

import { TextInput } from "../../components/TextInput/TextInput";
import { AddQuestion } from "../../components/AddQuestion/AddQuestion";
import { QuestionTypesEnum } from "../../enums";
import { QuestionContainer } from "../../components/QuestionContainer/QuestionContainer";

export const CreateBriefPage: FC = () => {
    const methods = useForm({
        mode: "onChange"
    })
    const { control, handleSubmit, formState } = methods;
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "questions",
    });

    const handleAddQuestion = (type: QuestionTypesEnum) => {
        let newQuestion: QuestionType = { name: '', description: '', questionType: type, isRequired: true };

        if (type === QuestionTypesEnum.Slider) {
            newQuestion.from = '';
            newQuestion.to = '';
        }

        if (type === QuestionTypesEnum.Checkbox) {
            newQuestion.countRow = '1';
            newQuestion.hasCustomFieldForFill = false;
            newQuestion.options = [{ name: '', defaultIsChecked: false, image: null },
                { name: '', defaultIsChecked: false, image: null }];
        }

        if (type === QuestionTypesEnum.Date) {
            newQuestion.defaultDate = moment().add(7, 'd');;
        }

        append(newQuestion);
    }

    const renderQuestionsList = () => {
        return fields.map((q: FieldArrayWithId<QuestionType>, index: number) => (
            <QuestionContainer
                key={q.id}
                question={q}
                index={index}
            />
        ))
    }

    const submitForm = (data: any) => {
        console.log(data);
    }

    return (
        <div className="create-brief-page">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="brief-wrapper">
                        <header className="create-brief-page-header">
                            <div className="create-brief-page-header-item">
                                <Controller
                                    name={"name"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <TextInput
                                            error={fieldState.isDirty && fieldState.invalid}
                                            value={field.value}
                                            placeholder="Brief name"
                                            onChange={field.onChange}
                                            fontSize={32}
                                        />
                                    )}
                                />
                            </div>
                            <div className="create-brief-page-header-item">
                                <Controller
                                    name={"description"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <TextInput
                                            error={fieldState.isDirty && fieldState.invalid}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Description"
                                        />
                                    )}
                                />
                            </div>
                        </header>

                        <div className="questions-container">
                            {renderQuestionsList()}
                        </div>

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={!formState.isValid}
                        >
                            Create brief
                        </Button>
                    </div>
                </form>
            </FormProvider>

            <AddQuestion addQuestion={handleAddQuestion} />
        </div>
    )
}
