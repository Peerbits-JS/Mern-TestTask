/* eslint-disable no-case-declarations */
/* eslint-disable import/no-anonymous-default-export */
import { GET_POSTS } from "../constants/action-types";
import { UserData } from "../Actions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ActionTypes } from "../action";

const initialState = {
  progress: false,
  loading: false,
  isLoggedin: false,
  isKencorLoggedin: false,
  isRegisterd: false,
  isForgotpasswordSuccess: false,
  user: {},
  posts: []
};

const reducer = persistReducer(
  { storage, key: "basecode-demo", whitelist: ["authToken"] }, (state: UserData = initialState, action: ActionTypes) => {
    switch (action.type) {
      case GET_POSTS.GET_POSTS_INITIALIZATION:
        return {
          ...state,
          loading: true
        };

      case GET_POSTS.GET_POSTS_SUCCESS:
        const allPost = action.payload; // [{ id: 2, body: "Abcd", title: "title", userId: 3 }, { id: 2, body: "Abcd", title: "title", userId: 3 }];
        return {
          ...state,
          loading: false,
          posts: allPost
        };

      case GET_POSTS.GET_POSTS_ERROR:
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  }
);

export default reducer;
