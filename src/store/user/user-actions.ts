import { ThunkAction } from "redux-thunk";

import { FetchStatus } from "../../enums";
import { AppState } from "../rootStore";
import { client } from "../../api/client";

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_FETCH_STATUS = 'UPDATE_FETCH_STATUS';

export type UpdateUserActionType = {
    type: typeof UPDATE_USER
    user: UserType
}

export const updateUser = (user: UserType): UpdateUserActionType => ({
    type: UPDATE_USER,
    user
});

type UpdateFetchStatusActionType = {
    type: typeof UPDATE_FETCH_STATUS
    status: FetchStatus
}

export const updateFetchStatus = (status: FetchStatus): UpdateFetchStatusActionType => ({
    type: UPDATE_FETCH_STATUS,
    status
});

export const login = (login: string, password: string): ThunkAction<any, AppState, unknown, UserActionTypes> => {
    return async dispatch => {
        dispatch(updateFetchStatus(FetchStatus.PENDING));
        try {
            const data = await client.login(login, password);
            dispatch(updateUser(data.user));
            client.setToken(data.token);
            dispatch(updateFetchStatus(FetchStatus.SUCCESS));
        } catch(e) {
            dispatch(updateFetchStatus(FetchStatus.FAILURE));
        }
    }
}

export type UserActionTypes = UpdateUserActionType | UpdateFetchStatusActionType;
