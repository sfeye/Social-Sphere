import types from "../constants/action-types";

const initialState = {
  items: [],
  success: false,
  loading: false,
  error: null,
  type: ""
};

function postsReducer(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_POSTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.payload.posts
      };

    case types.FETCH_POSTS_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

      case types.LOGOUT:

      return {
        items: [],
        loading: false,
        error: null
      };
      case types.POSTS_TYPE:
      return {
        ...state,
        loading: false,
        type: action.payload.tt
      };
    default:
      return state;
  }
}
export default postsReducer;