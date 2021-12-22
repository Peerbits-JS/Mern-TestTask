import { apiCall, METHOD } from "../../service/baseApiCall";
import { GET_POSTS } from "../constants/action-types";
import { Posts, Store } from "../Actions";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export type ActionTypes =
  | { type: typeof GET_POSTS.GET_POSTS_INITIALIZATION; payload: Posts[] }
  | { type: typeof GET_POSTS.GET_POSTS_SUCCESS; payload: Posts[] }
  | { type: typeof GET_POSTS.GET_POSTS_ERROR; payload: Posts[] }

export const getPosts = (): ThunkAction<void, Store, unknown, Action<string>> => (dispatch) => {
  dispatch(getPostsInit());
};

export const getPostsInit = (): ThunkAction<void, Store, unknown, Action<string>> => async (dispatch) => {
  dispatch({
    type: GET_POSTS.GET_POSTS_INITIALIZATION
  });

  await apiCall(
    "bank-holidays.json",
    {},
    (res: Posts[]) => dispatch(getPostsSuccess(res)),
    (err: any) => dispatch(getPostsError(err)),
    METHOD.GET,
    {}
  );
};

export const getPostsSuccess = (res: any[]): ThunkAction<void, Store, unknown, Action<string>> => (dispatch) => {
  console.log("GET POST DATA", res);
  dispatch({
    type: GET_POSTS.GET_POSTS_SUCCESS,
    payload: res
  });
};

export const getPostsError = (err: any): ThunkAction<void, Store, unknown, Action<string>> => (dispatch) => {
  dispatch({
    type: GET_POSTS.GET_POSTS_ERROR,
    payload: err
  });
};
