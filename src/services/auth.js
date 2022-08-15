import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, provider } from "../config/firebase-config";

export default class Authentication {
  constructor() {
    this.role = {
      ADMIN: "ADMIN",
      USER: "USER",
    };
  }
  signUpUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };
  signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  sendEmailVerification = async (user) => {
    await sendEmailVerification(user);
  };
  signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };
  updateProfileEmail = async (user, email) => {
    await updateEmail(user, email);
  };
  updateProfilePassword = async (user, password) => {
    await updatePassword(user, password);
  };
  resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };
  logout = async () => {
    await auth.signOut();
  };
}
