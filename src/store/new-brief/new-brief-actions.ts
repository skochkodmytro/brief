export const ADD_QUESTION = 'ADD_QUESTION';
export const UPDATE_BRIEF = 'UPDATE_BRIEF';

type AddQuestionActionType = {
    type: typeof ADD_QUESTION
    question: QuestionType
}

export const addQuestion = (question: QuestionType): AddQuestionActionType => ({
    type: ADD_QUESTION,
    question
});

type UpdateBriefActionType = {
    type: typeof UPDATE_BRIEF
    brief: BriefType
}

export const updateBrief = (brief: BriefType): UpdateBriefActionType => ({
    type: UPDATE_BRIEF,
    brief
});

export type ActionTypes = AddQuestionActionType | UpdateBriefActionType;
