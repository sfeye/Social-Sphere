
  export default function uploadMedia( media, postId) {
    const axios = require('axios');
    var FormData = require('form-data');
  
    const formData = new FormData();
  
    formData.append('files', media);
    formData.append('ref', "Posts");
    formData.append('refId', postId);
    formData.append('field', "media")
  
      var config = {
        method: 'post',
        url: 'http://localhost:1337/upload',
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        data : formData
      };  

    return dispatch => {
      axios(config)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
      }
  }