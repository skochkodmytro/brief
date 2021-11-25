import { UPDATE_FETCH_STATUS, UPDATE_USER, UserActionTypes } from "./user-actions";
import { FetchStatus } from "../../enums";

const initialState = {
    user: null as null | UserType,
    fetchStatus: null as null | FetchStatus
}

export type UserInitialStateType = typeof initialState;

const userReducer = (state: UserInitialStateType = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, user: action.user };
        case UPDATE_FETCH_STATUS:
            return { ...state, fetchStatus: action.status };
        default:
            return state;
    }
}

export default userReducer;
