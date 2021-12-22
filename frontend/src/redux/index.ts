/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
// import {configureStore} from "@red"
import { persistStore } from "redux-persist";

import rootReducer from "./reducers";
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// Configure store with reducers and create
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export type RootState = ReturnType<typeof store.getState>

const store:any = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export const persistor = persistStore(store);
export const { dispatch } = store;

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;
