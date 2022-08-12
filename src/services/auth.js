import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase-config";

export default class Authentication {
  constructor() {
    this.role = {
      ADMIN: "ADMIN",
      USER: "USER",
    };
  }

  jsonAuth = (uid, email, role) => {
    return {
      uid: uid,
      email: email,
      role: role,
    };
  };

  signUpAdmin = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return this.jsonAuth(user.uid, user.email, this.role.ADMIN);
    } catch (error) {
      console.log(error);
    }
  };
  signInAdmin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return this.jsonAuth(user.uid, user.email, this.role.ADMIN);
    } catch (error) {
      console.log(error);
    }
  };
  signUpUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };
  signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  sendEmailVerification = async (user) => {
    await sendEmailVerification(user);
  };

  logout = async () => {
    await auth.signOut();
  };
}
