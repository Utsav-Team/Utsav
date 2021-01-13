import React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHNZsw0DF9ljSAZ49amQPOsSrtLfI9cgA',
  authDomain: 'utsav-b38ac.firebaseapp.com',
  projectId: 'utsav-b38ac',
  storageBucket: 'utsav-b38ac.appspot.com',
  messagingSenderId: '125629524973',
  appId: '1:125629524973:web:ba1be23c4a8821af0055e4',
  measurementId: 'G-7ZBRT62H06',
};

if (!firebase.auth.length) {
  firebase.initializeApp(firebaseConfig);
}

export default () => {
  return {firebase, auth, firebaseConfig};
};
