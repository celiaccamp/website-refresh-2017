/*
    ./client/index.js
    firebase configuration file
    using dotenv to not expose API key, etc.
*/
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'camp-celiac.firebaseapp.com',
  databaseURL: 'https://camp-celiac.firebaseio.com',
  projectId: 'camp-celiac',
  storageBucket: 'camp-celiac.appspot.com',
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
