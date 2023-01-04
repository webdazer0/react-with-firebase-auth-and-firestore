import { auth, googleProvider, facebookProvider } from "./firebase";

export const loginWithGoogle = () => auth.signInWithPopup(googleProvider);
export const loginWithFacebook = () => auth.signInWithPopup(facebookProvider);
//
export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// USER OPTIONS
export const onStatus = (callback) => auth.onAuthStateChanged(callback);
export const logout = () => auth.signOut();

// EMAIL OPTIONS
export const verifyEmail = () =>
  auth.currentUser
    .sendEmailVerification()
    .then(() => console.log("Email inviata!"));
