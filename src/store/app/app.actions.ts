import { ThunkAction } from "redux-thunk";
import { AppState } from "../rootStore";
import { client } from "../../api/client";
import { updateUser, UpdateUserActionType } from "../user/user-actions";

export const SET_LOADING = 'SET_LOADING';

type SetLoadingActionType = {
    type: typeof SET_LOADING
    isLoading: boolean
}

export const setLoading = (isLoading: boolean): SetLoadingActionType => ({
    type: SET_LOADING,
    isLoading
});

export const init = (): ThunkAction<any, AppState, unknown, AppActionTypes> => {
    return async dispatch => {
        try {
            if (client.getToken()) {
                await dispatch(setLoading(true));
                const data = await client.checkToken();
                dispatch(updateUser(data.user));
                dispatch(setLoading(false));
            }
        } catch(e) {
            client.logout();
            dispatch(setLoading(false));
        }
    }
}

export type AppActionTypes = SetLoadingActionType | UpdateUserActionType;
