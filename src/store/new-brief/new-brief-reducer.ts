import { ADD_QUESTION, ActionTypes, UPDATE_BRIEF } from "./new-brief-actions";

const initialState = {
    name: '' as string,
    description: '' as string,
    questions: [] as Array<QuestionType>
}

export type BriefInitialStateType = typeof initialState;

const newBriefReducer = (state: BriefInitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ADD_QUESTION:
            return { ...state, questions: [...state.questions, action.question] }
        case UPDATE_BRIEF:
            return { ...state, ...action.brief }
        default:
            return state;
    }
}

export default newBriefReducer;
