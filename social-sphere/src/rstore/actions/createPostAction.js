import types from "../constants/action-types";

export const postPostsBegin = () => ({
  type: types.POST_POSTS_BEGIN
});

export const postPostsSuccess = response => ({
  type: types.POST_POSTS_SUCCESS,
  payload: { response }
});

export const postPostsFailure = error => ({
  type: types.POST_POSTS_FAILURE,
  payload: { error }
});