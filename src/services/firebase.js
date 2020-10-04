import firebaseConfig from "./config";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const auth = fb.auth();

// export const currentUser = firebase.auth().currentUser;

export const provider = new firebase.auth.GoogleAuthProvider();
export const fbProvider = new firebase.auth.FacebookAuthProvider();
