import React from 'react'
import '../styles/CreatePost.css'
import { FaCamera, FaTags } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import postPosts from '../actions/postPost';

function CreatePost() {

    return (
        <div className="container">
        <IconContext.Provider value={{className:"icons"}}>
            <div className='create-post'>
                Create a Post
                <form method={postPosts("","","","","","")} className='post'>
                    <textarea
                        type="text"
                        className="post-input"
                        placeholder="Share something..."
                        name="post"
                    />
                    <br/>
                    <button className='post-btn' type="submit">Post</button>
                </form>
                <FaCamera />
                <FaTags/>
            </div>
        </IconContext.Provider>
        </div>
    );
}

export default CreatePost;