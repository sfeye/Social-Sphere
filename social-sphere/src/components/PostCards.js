import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Post from './Post';
import getPosts from '../actions/getPosts';

function PostCards() {
    var maxLength = 10;
    const dispatch = useDispatch();

    function loadPosts() {
        dispatch(getPosts());
      }

    React.useEffect(() => {
        loadPosts();
    }, []);

    function createData(media, user, caption, taggedUser, dateTime, groups) {
        return {media, user, caption, taggedUser, dateTime, groups};
      }

    function createPosts(posts) {
        var tempRows = [];
        var length = posts.length < maxLength ? posts.length : 10;
        if(success) {
            for(var i = length - 1; i >= 0; i--) {
                tempRows.push(createData(
                    posts[i].media,
                    posts[i].user.username,
                    posts[i].caption,
                    posts[i].taggedUsers[0].username,
                    posts[i].dateTime,
                    posts[i].groups[0].name
                ));
            }
            return tempRows;
        }
    }

    const posts = useSelector(((state) => state.postReducer.items ));
    const success = useSelector(((state) => state.postReducer.success ));

    const loading = useSelector(((state) => state.postReducer.loading ));
    const error = useSelector(((state) => state.postReducer.error ));

    if(loading) {
        return(<div>Loading!</div>);
    }
    if(error) {
        return <div>Error! {error}</div>;
    }
    if(success){

        var tempRows = createPosts(posts);
        const listItems = tempRows.map((tempRows, i) => (
            <Post 
                key={i} 
                caption={tempRows.caption}
                user={tempRows.user}
                date={tempRows.dateTime}
                media={tempRows.media}
                />
        ));

        return (
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {listItems}
                    </ul>
                </div>
            </div>
        );
    }
    return (
        <div>
            The feed is empty
        </div>
    );
}

export default PostCards;