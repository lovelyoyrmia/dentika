import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase-config";
import Authentication from "./auth";
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signUp = (email, password) => {
    return new Authentication().signUpUser(email, password);
  };
  const signIn = (email, password) => {
    return new Authentication().signInUser(email, password);
  };
  const signOut = () => {
    return new Authentication().logout();
  };
  const sendEmailVerif = () => {
    return new Authentication().sendEmailVerification(currentUser);
  };
  const googleSignIn = () => {
    return new Authentication().signInWithGoogle();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    sendEmailVerif,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
