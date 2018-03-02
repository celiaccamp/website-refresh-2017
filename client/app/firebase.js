/*
    ./client/index.js
    firebase configuration file
*/
import firebase from 'firebase';

const config = {
  apiKey: 'xxxxxxx',
  authDomain: 'camp-celiac.firebaseapp.com',
  databaseURL: 'https://camp-celiac.firebaseio.com',
  projectId: 'camp-celiac',
  storageBucket: 'camp-celiac.appspot.com',
  messagingSenderId: 'xxxxxxxx',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
