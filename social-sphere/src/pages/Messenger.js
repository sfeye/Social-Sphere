import React, {useState, useEffect} from 'react';
import '../styles/Messenger.css';
import { db } from '../firebase';
import firebase from 'firebase';
import {Button, Input} from '@material-ui/core';
import {FaRegPaperPlane} from 'react-icons/fa';


function Messenger() {

const [messages, setMessages] = useState([])
const [toUser, setToUser] = useState('')
const [input, setInput] = useState('');

useEffect(() => {
   
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            message: doc.data()
      })));
    })

  }, []);

const handleSendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
        text: input,
        username: toUser,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
}

    return (
        <div className="messenger">
            <div className="messenger__input">
                <Input
                    placeholder="Enter a message..."
                    className="messenger__input-text"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Input
                    placeholder="Enter a username..."
                    className="messenger__input-text"
                    type="text"
                    value={toUser}
                    onChange={(e) => setToUser(e.target.value)}
                />
                <Button onClick={handleSendMessage}><FaRegPaperPlane className="messenger__icon"/></Button>
            </div>
        </div>
    )
}

export default Messenger
