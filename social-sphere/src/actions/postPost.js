import {
    postPostsBegin,
    postPostsSuccess,
    postPostsFailure } from "../rstore/actions/createPostAction";
  
  export default function postPosts(caption, user, link, location, groups, taggedUsers) {
    const axios = require('axios');

    var data = JSON.stringify(
        {"caption":caption,
        "user":user,
        "link":link,
        "location":location,
        "groups":groups,
        "taggedUsers":taggedUsers});
        
    var config = {
        method: 'post',
        url: '/posts',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

    return dispatch => {
      dispatch(postPostsBegin());
      axios(config)
        .then(function(response) {
          console.log(response);
          dispatch(postPostsSuccess(response.data));
        })
        .catch(function(error) {
          dispatch(postPostsFailure(error))
        });
    };
  }