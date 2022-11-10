import { firebase } from "../../Core/firebaseConfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// Documentacion de auth https://firebase.google.com/docs/reference/js/auth.md#auth_package

const auth = getAuth(firebase);

export const userSignUp = (email, password, onSuccess) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      console.log("user created:", credential.user);
      onSuccess(credential.user);
    })
    .catch((err) => {
      console.log(err.message);
      return false;
    });
};

export const userLogin = (email, password, onSuccess) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      console.log("user logged in:", credential.user);
      onSuccess(credential.user);
    })
    .catch((err) => {
      console.log(err.message);
      return false;
    });
};

export const userSignOut = (onSuccess) => {
  signOut(auth)
    .then(() => {
      console.log("user signed out");
      onSuccess();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const userStateChanged = (onSuccess) => {
  onAuthStateChanged((user) => {
    console.log("user state changed");
    //onSuccess();
  });
};

/*
export const authChange = () => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
      navigation.replace("Home")
    }
  })

  return unsubscribe
}*/
