import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC1SYnP3iho6mZT_es0te1U3psva3pUlD4",
    authDomain: "malte-goldenlab.firebaseapp.com",
    projectId: "malte-goldenlab",
    storageBucket: "malte-goldenlab.appspot.com",
    messagingSenderId: "325629539566",
    appId: "1:325629539566:web:685e1879366d528e56efff"
};

export const firebaseImpl = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase  = firebase.firestore();
export const firebaseAuth = firebase.auth()