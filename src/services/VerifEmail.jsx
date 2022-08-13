import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useAuth } from "./FirebaseAuthContext";

export default function VerifEmail({ children }) {
  const { currentUser, sendEmailVerif } = useAuth();
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  let interval = useRef();

  const checkEmailVerified = useCallback(() => {
    if (interval.current) {
      if (currentUser.emailVerified === emailVerified) {
        setEmailVerified(currentUser.emailVerified);
        setLoading(false);
        clearTimeout(interval.current);
        window.location.reload(false);
      }
    }
  }, [currentUser, emailVerified]);
  useEffect(() => {
    if (currentUser !== null && !currentUser.emailVerified) {
      sendEmailVerif();
      interval.current = setTimeout(checkEmailVerified, 10 * 1000);
    } else {
      console.log(currentUser);
      setEmailVerified(true);
      setLoading(false);
    }
  }, [currentUser, emailVerified, sendEmailVerif, checkEmailVerified]);

  if (currentUser !== null) {
    if (emailVerified && !loading) {
      return <Navigate to={ROUTES.DASHBOARD} />;
    } else {
      return children;
    }
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
}
