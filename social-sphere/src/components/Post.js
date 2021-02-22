import React from 'react';
import '../styles/Post.css'

function Post(props) {

    return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link' to='/'>
          <figure className='cards__item__pic-wrap' data-category={props.user}>
            <img
              className='cards__item__img'
              onClick={props.onClick}
              src={props.media[0].url}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.caption}</h5>
          </div>
        </div>
      </li>
    </>
    );
}

export default Post;