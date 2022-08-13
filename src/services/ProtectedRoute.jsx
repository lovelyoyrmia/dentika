import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useAuth } from "./FirebaseAuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser != null ? (
    currentUser.emailVerified ? (
      children
    ) : (
      <Navigate to={ROUTES.EMAILVERIF} />
    )
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
}
