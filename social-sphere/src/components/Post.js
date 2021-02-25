import React from 'react'
import "../styles/Post.css";
import Avatar from '@material-ui/core/Avatar'
import Moment from 'moment'

function Post({username, caption, imageUrl, timestamp}) {

    return (
        <div className="post">
            <div className="post__header">
                <div className="post__user">
                    {/* {Header -> avatar + username} */}
                    <Avatar
                        className="post__avatar"
                        alt={username}
                        src="avatar1.jpg"
                    />
                    <h3 className="post__username">{username}</h3>
                </div>
                <p className="post__timestamp">{Moment(timestamp.toDate()).format('MM/DD/YYYY')}</p>
            </div>

            {/* {Image} */}
            <img src={imageUrl} className="post__image"></img>

            {/* {Username + Caption} */}
            <h4 className="post__caption"><strong>{username}</strong> {caption} </h4>
        </div>
    )
}

export default Post
