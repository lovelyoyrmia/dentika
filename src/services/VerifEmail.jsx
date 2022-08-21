import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useAuth } from "./FirebaseAuthContext";

export default function VerifEmail({ children }) {
  const { currentUser, sendEmailVerif } = useAuth();
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  let interval = useRef();

  useEffect(() => {
    if (currentUser !== null && !currentUser.emailVerified) {
      setTimeout(sendEmailVerif, 500);
      interval.current = setTimeout(() => {
        if (interval.current) {
          if (currentUser.emailVerified === emailVerified) {
            setEmailVerified(currentUser.emailVerified);
            setLoading(false);
            clearTimeout(interval.current);
            // window.location.reload(false);
          }
        }
      }, 10 * 1000);
      console.log(currentUser.emailVerified);
    } else {
      setEmailVerified(true);
      setLoading(false);
    }
    return () => {
      clearTimeout(interval.current);
    };
  }, [currentUser, emailVerified, sendEmailVerif]);

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
