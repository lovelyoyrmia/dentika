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
  const updateEmail = (email) => {
    return new Authentication().updateProfileEmail(currentUser, email);
  };
  const updatePassword = (password) => {
    return new Authentication().updateProfilePassword(currentUser, password);
  };
  const googleSignIn = () => {
    return new Authentication().signInWithGoogle();
  };
  const resetPasswordUser = (email) => {
    return new Authentication().resetPassword(email);
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
    updateEmail,
    updatePassword,
    resetPasswordUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
