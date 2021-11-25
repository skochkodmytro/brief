import { AppActionTypes, SET_LOADING } from "./app.actions";

const initState = {
    isLoading: false as boolean
}

export type AppStateType = typeof initState

const appReducer = (state: AppStateType = initState, action: AppActionTypes) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
}

export default appReducer;
