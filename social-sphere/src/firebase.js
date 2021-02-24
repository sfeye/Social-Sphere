import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBv3rMJTvZtiHoVROuvkKEyhlMS_m83V5k",
  authDomain: "social-sphere-ec08b.firebaseapp.com",
  databaseURL: "https://social-sphere-ec08b-default-rtdb.firebaseio.com",
  projectId: "social-sphere-ec08b",
  storageBucket: "social-sphere-ec08b.appspot.com",
  messagingSenderId: "830146310537",
  appId: "1:830146310537:web:e2328f102e10bdccfcb158"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};