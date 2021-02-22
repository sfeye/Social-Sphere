import types from "../constants/action-types";

const initialState = {
  response: [],
  success: false,
  loading: false,
  error: null
};

function postsReducer(state = initialState, action) {
  switch(action.type) {
    case types.POST_POSTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.POST_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.payload.response
      };

    case types.POST_POSTS_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload.error,
        response: []
      };

    default:
      return state;
  }
}
export default postsReducer;