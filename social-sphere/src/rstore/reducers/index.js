import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import loginReducer from './loginReducer';
import postReducer from './postReducer';
import createPostReducer from './createPostReducer';

export default combineReducers({
  form: reduxFormReducer,
  loginReducer,
  postReducer,
  createPostReducer
});