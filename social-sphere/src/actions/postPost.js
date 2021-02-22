import {
    postPostsBegin,
    postPostsSuccess,
    postPostsFailure } from "../rstore/actions/createPostAction";
  
  export default function postPosts(caption, media, user, groups, taggedUsers) {
    const axios = require('axios');

    var data = JSON.stringify(
        {"caption":caption,
        "user": {
            "id": 1,
            "username": "joelitoscano",
            "email": "joeli.toscano@gmail.com",
            "provider": "local",
            "confirmed": false,
            "blocked": false,
            "role": 1,
            "address": "5011 Wyandotte St Unit 2S, Kansas City MO, 64112",
            "birthday": "1998-02-10",
            "anniversary": null,
            "phoneNumber": "(813) 480-8972",
            "firstName": "Joeli",
            "lastName": "Toscano",
            "created_at": "2021-02-21T19:00:26.528Z",
            "updated_at": "2021-02-21T19:01:33.013Z"
        },
        "media": [{"url": media }],
        "groups":groups,
        "taggedUsers":taggedUsers});

    var config = {
        method: 'post',
        url: 'http://localhost:1337/posts',
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