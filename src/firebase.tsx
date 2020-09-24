import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDr5C_Zc8KMoXz0T-K-uu76jIv07RrmijU',
  authDomain: 'pulse-ff145.firebaseapp.com',
  databaseURL: 'https://pulse-ff145.firebaseio.com',
  projectId: 'pulse-ff145',
  storageBucket: 'pulse-ff145.appspot.com',
  messagingSenderId: '16320546894',
  appId: '1:16320546894:web:def2388d44ab7c65e85b1f',
  measurementId: 'G-DPGH01GWJR',
};
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestoreDB = firebase.firestore();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  return auth.signInWithPopup(googleAuthProvider);
};

export const loginWithEmail = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export default firebase;
