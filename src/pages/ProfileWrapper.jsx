import React, { useState, useEffect } from "react";
import { useAuth } from "../services/FirebaseAuthContext";
import { handleAccessToken } from "../utils/utils";
import { patientAxios, setAuthToken } from "../services/axios";
import { ROLE } from "../constant/role";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import ProfilePage from "./ProfilePage";
import { CircularProgress, Box } from "@mui/material";

export default function ProfileWrapper() {
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const token = handleAccessToken(currentUser);

  useEffect(() => {
    const checkVerified = () => {
      const req = {
        role: {
          PATIENT: ROLE.patient,
        },
        email: currentUser.email,
      };
      setAuthToken(patientAxios, token);
      patientAxios
        .post(`/getData/${currentUser.uid}`, req)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setData(res.status);
          }
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 404) {
            setData(error.response.status);
          } else {
            alert(error.message);
          }
        });
    };
    let interval = setTimeout(checkVerified, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [currentUser.email, currentUser.uid, token]);

  switch (data) {
    case 404:
      return <Navigate to={ROUTES.REGISTRATION} />;
    case 200:
      return <ProfilePage />;
    default:
      return (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
  }
}
