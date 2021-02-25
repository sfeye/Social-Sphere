import React, {useState} from 'react';
import '../styles/ImageUpload.css'
import firebase from 'firebase';
import { db, storage } from '../firebase';
import {Button, Input} from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }   
    }

    const handleUpload = (e) => {
        e.preventDefault();

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                })
            }
        )
    }

    return (
        <div className="image__upload">
            <progress className="image__upload-progress" value={progress} max="100"/>
            <TextareaAutosize 
                className="image__upload-text"
                aria-label="empty textarea" 
                placeholder="Enter a caption..." 
                value={caption}
                onChange={event => setCaption(event.target.value)}
            />
            <Input 
                className="image__upload-image"
                type="file" 
                onChange={handleChange}/>
            <Button className="image__upload-btn" onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
