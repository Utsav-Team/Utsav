import React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBowDbf0qIf6OyRa1vw_aVxxnZ_trqmQqs',
  authDomain: 'utsav-2a1af.firebaseapp.com',
  projectId: 'utsav-2a1af',
  storageBucket: 'utsav-2a1af.appspot.com',
  messagingSenderId: '624589678466',
  appId: '1:624589678466:web:7401f866634e8fc12b519b',
  measurementId: 'G-3ZF7LY2QZE',
};

if (!firebase.auth.length) {
  firebase.initializeApp(firebaseConfig);
}

export default () => {
  return {firebase, auth};
};
