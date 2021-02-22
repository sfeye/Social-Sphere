import {
    fetchPostsBegin,
    fetchPostsSuccess,
    fetchPostsFailure } from "../rstore/actions/postAction";
  
  export default function fetchPosts() {
    const axios = require('axios');
    return dispatch => {
      dispatch(fetchPostsBegin());
      axios.get('/posts')
        .then(function(response) {
          console.log(response);
          dispatch(fetchPostsSuccess(response.data));
        })
        .catch(function(error) {
          dispatch(fetchPostsFailure(error))
        });
    };
  }