import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Post from './Post';
import getPosts from '../actions/getPosts';

function PostCards() {

    const dispatch = useDispatch();

    function loadPosts() {
        dispatch(getPosts());
      }

    React.useEffect(() => {
        loadPosts();
    }, []);

    function createData(media, user, link, caption, taggedUser, dateTime, location, groups) {
        return {media, user, link, caption, taggedUser, dateTime, location, groups};
      }

    function createPosts(posts) {
        var tempRows = [];
        if(success) {
            for(var i = 0; i < posts.length; i++) {
                tempRows.push(createData(
                    posts[i].media,
                    posts[i].user.username,
                    posts[i].link,
                    posts[i].caption,
                    posts[i].taggedUsers[0].username,
                    posts[i].dateTime,
                    posts[i].location,
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
                link={tempRows.link}
                />
        ));

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
    return (
        <div>
            The feed is empty
        </div>
    );
}

export default PostCards;