import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useAuth } from "./FirebaseAuthContext";

export default function VerifEmail({ children }) {
  const { currentUser, sendEmailVerif } = useAuth();
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    let sendInterval;
    if (currentUser !== null && !currentUser.emailVerified) {
      sendInterval = setTimeout(() => {
        sendEmailVerif();
      }, 1000);
      interval = setInterval(() => {
        if (currentUser.emailVerified === emailVerified) {
          setEmailVerified(currentUser.emailVerified);
          setLoading(false);
          window.location.reload(false);
        }
      }, 20 * 1000);
      console.log(currentUser.emailVerified);
    } else {
      setEmailVerified(true);
      setLoading(false);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(sendInterval);
    };
  }, [currentUser, emailVerified, sendEmailVerif]);

  if (currentUser !== null) {
    if (emailVerified && !loading) {
      return <Navigate to={ROUTES.PROFILE} />;
    } else {
      return children;
    }
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
}
