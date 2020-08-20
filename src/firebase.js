import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCWVqXVNETWfklfau7qThnJmM5y37rKOGE",
  authDomain: "hash-chat-83f51.firebaseapp.com",
  databaseURL: "https://hash-chat-83f51.firebaseio.com",
  projectId: "hash-chat-83f51",
  storageBucket: "hash-chat-83f51.appspot.com",
  messagingSenderId: "160431838368",
  appId: "1:160431838368:web:2adb12a1941febb32065c5",
  measurementId: "G-NR8CSM09DD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();
export { db, auth, provider, storage };
