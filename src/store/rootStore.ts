import { createStore, combineReducers } from "redux";

import newBriefReducer from "./new-brief/new-brief-reducer";

export const rootReducer = combineReducers({
    newBrief: newBriefReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
