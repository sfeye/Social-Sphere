import React from 'react'
import "../styles/Post.css"
import Avatar from '@material-ui/core/Avatar'

function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                {/* {Header -> avatar + username} */}
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="avatar1.jpg"
                />
                <h3 className="post__username">{username}</h3>
            </div>

            {/* {Image} */}
            <img src={imageUrl} className="post__image"></img>

            {/* {Username + Caption} */}
            <h4 className="post__caption"><strong>{username}</strong> {caption} </h4>
        </div>
    )
}

export default Post
