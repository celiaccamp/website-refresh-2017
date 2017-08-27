/*
    ./client/index.js
    firebase configuration file
*/
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDrintM7gHBXQvNb6GcACLgePTcL-82Sj0',
  authDomain: 'camp-celiac.firebaseapp.com',
  databaseURL: 'https://camp-celiac.firebaseio.com',
  projectId: 'camp-celiac',
  storageBucket: 'camp-celiac.appspot.com',
  messagingSenderId: '91921914286',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
