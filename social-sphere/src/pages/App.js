import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import '../styles/App.css';
import Post from '../components/Post';
import ImageUpload from '../components/ImageUpload';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';
import {FaRegEnvelope, FaPlusSquare, FaPowerOff, FaRegUserCircle, FaCalendarAlt} from 'react-icons/fa';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        console.log(authUser);
        setUser(authUser);

        if(authUser.displayName) {

        } else {
          return authUser.updateProfile({
            displayName: username
          });
        }
      } else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
   
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })

  }, []);

  const handleSignup = (e) => {
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      setOpen(false);

      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
  }

  const handleSignin = (e) => {
    e.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">

      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
          <h3> Register </h3>
          <br/>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignup}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
          <h3> Login </h3>
          <br/>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignin}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openPost}
        onClose={() => setOpenPost(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="app__signup">
            <h3> Upload a post </h3>
            <br/>
            {user?.displayName ? (
              <ImageUpload username={user.displayName}/>
            ) : (<div>Please login to upload a post...</div>)}
          </div>
        </div>
      </Modal>

      {/* {Header} */}
      <div className="app__header">
        <h1 className="app__header-h1">social sphere</h1>

        {user ? (
          <div className="app__login-btns">
            <Button onClick={() => setOpenPost(true)}><FaPlusSquare className="app__icons"/></Button>
            <Button onClick={() => setOpenMessages(true)}><FaRegEnvelope className="app__icons"/></Button>
            <Button onClick={() => setOpenMessages(true)}><FaRegUserCircle className="app__icons"/></Button>
            <Button onClick={() => auth.signOut()}><FaPowerOff className="app__icons"/></Button>
          </div>
        ) : (
          <div className="app__login-btns">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {user ? (
          posts.map(({id, post}) => (
            <div className="app__posts-post">
              <Post key={id} 
                    postId={id}
                    username={post.username} 
                    caption={post.caption} 
                    imageUrl={post.imageUrl}
                    timestamp={post.timestamp}
                    user={user}/>
            </div>
          ))
        ) : (
          <div>Please sign in</div>
        )}
      </div>
    </div>
  );
}

export default App;
