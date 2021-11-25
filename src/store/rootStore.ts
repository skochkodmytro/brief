import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import { init } from "./app/app.actions";

import newBriefReducer from "./new-brief/new-brief-reducer";
import userReducer from "./user/user-reducer";
import appReducer from "./app/app.reducer";

export const rootReducer = combineReducers({
    newBrief: newBriefReducer,
    user: userReducer,
    app: appReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
store.dispatch(init());
