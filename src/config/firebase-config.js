// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL2KVDrLAR3xua9gBjo6VTfzpcC7hY6bI",
  authDomain: "clinic-83bd4.firebaseapp.com",
  projectId: "clinic-83bd4",
  storageBucket: "clinic-83bd4.appspot.com",
  messagingSenderId: "883610270489",
  appId: "1:883610270489:web:dcf14fab872c522d226388",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
