import React, {useState, useEffect} from 'react'
import { db } from '../firebase';
import firebase from 'firebase';
import "../styles/Post.css";
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import {Button, Input} from '@material-ui/core';
import {FaRegPaperPlane} from 'react-icons/fa';



function Post({postId, username, caption, imageUrl, timestamp, user}) {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db.collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => (doc.data())))})
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

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
                <div className="post__timestamp">
                    {timestamp?.toDate() ? (
                        <div>
                            {Moment(timestamp.toDate()).format('LL')}
                        <br/>
                            {Moment(timestamp.toDate()).format('h:mm a')}
                        </div>
                    ) : ( <div></div> )}
                </div>
            </div>

            {/* {Image} */}
            <a href={imageUrl} rel="noopener noreferrer" target="_blank"><img src={imageUrl} className="post__image"></img></a>

            {/* {Username + Caption} */}
            <h4 className="post__caption"><strong>{username}</strong> {caption} </h4>

            
            <div>
                {comments.map((comment, index) =>(
                    <p key={index} className="indiv__comment">
                        <strong>{comment.username}</strong> {comment.text}
                    </p>))}
            </div>

            <form className="comment__input">
                <Input
                    className="comment__input-text"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    className="comment__input-btn"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    <FaRegPaperPlane className="comment__input-icon"/>
                </Button>
            </form>
        </div>
    )
}

export default Post
