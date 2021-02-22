import React, {useState} from 'react';
import '../styles/Home.css';
import SearchBar from '../components/SearchBar';
import CreatePost from '../components/CreatePost';
import PostCards from '../components/PostCards';

function Home() {

  return (
    <>
      <div className="App">
        <CreatePost/>
        <SearchBar/>
        <div className="header">
            <p className="feed">Feed</p>
          <PostCards/>
        </div>
      </div>
    </>
  );
}

export default Home;
