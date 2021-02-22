import React, { useState } from 'react'
import '../styles/CreatePost.css'
import { FaCamera, FaTags } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import postPosts from '../actions/postPost';
import { useSelector, useDispatch } from "react-redux";

function CreatePost() {
    
    const dispatcher = useDispatch();
    const user = useSelector(((state) => state.postReducer.items ));

    const [caption, setCaption] = useState({ caption: "" })
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [tagClick, setTagClick] = useState(false);
    const [taggedUser, setTaggedUser] = useState({ taggedUser: "" })

    const handleTextChange = e => setCaption(e.target.value)

    const handleFileChange = e => {
        if (e.target.files.length) {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
        }
    };

    const handleTaggedUserInput = e => setTaggedUser(e);

    const handleTagClick = () => setTagClick(!tagClick);

    const handleSubmit = () => {
        dispatcher(postPosts(caption, image.preview, user, "", taggedUser))
    }

    return (
        <div className="container">
        <IconContext.Provider value={{className:"icons"}}>
            <div className='create-post'>
                Create a Post
                <form onSubmit={handleSubmit} className='post'>
                    <textarea
                        type="text"
                        className="post-input"
                        placeholder="Share something..."
                        onChange={handleTextChange}
                        name="post"
                    />
                    <br/>
                    <button className='post-btn' type="submit">Post</button>
                    <div style={{display:"inline"}}>
                        <label htmlFor="file input" >
                            {image.preview ? 
                            (<img src={image.preview} alt="dummy" width="100" height="100"/>) 
                            : (<FaCamera style={{ cursor: 'pointer'}}/>)}
                        </label>
                        <input
                            id="file input"
                            style={{display:'none'}}
                            type={"file"}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="tag input" onClick={handleTagClick} ><FaTags style={{ cursor: 'pointer'}}/></label>
                        <input
                            id="tag input"
                            style={tagClick ? {display:'inline'} : {display:'none'}}
                            type={"text"}
                            onChange={handleTaggedUserInput}
                        />
                    </div>
                </form>
            </div>
        </IconContext.Provider>
        </div>
    );
}

export default CreatePost;