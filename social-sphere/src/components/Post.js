import React from 'react';
import '../styles/Post.css'

function Post(props) {

    return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link' to='/'>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt={props.media[0].name}
              onClick={props.onClick}
              src={props.media[0].url}
            />
          </figure>
          <div className='cards__item__info'>
              {props.user}
            <h5 className='cards__item__text'>{props.caption}</h5>
            <a href={props.link}>{props.link}</a>
          </div>
        </div>
      </li>
    </>
    );
}

export default Post;