import { Alert, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PatientForm from "../components/registrations/patient/PatientForm";
import { ROLE } from "../constant/role";
import { ROUTES } from "../constant/routes";
import { patientAxios, setAuthToken } from "../services/axios";
import { useAuth } from "../services/FirebaseAuthContext";
import { handleAccessToken } from "../utils/utils";

export default function RegistrationPage({ socket }) {
  const { currentUser } = useAuth();
  const [data, setData] = useState("");
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
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
            setLoading(false);
            setError(false);
          }
        })
        .catch((error) => {
          setError(true);
          console.log(error.response.status);
          if (error.response.status === 404) {
            toast.info("You need to register first", {
              position: "top-center",
              pauseOnHover: false,
              autoClose: 3000,
            });
            setData(error.response.status);
            setError(false);
            setLoading(false);
          }
        });
    };
    let interval = setTimeout(checkVerified, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [currentUser.email, currentUser.uid, token]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!loading && !error ? (
          data === 404 ? (
            <PatientForm socket={socket} />
          ) : (
            <Alert severity="info">
              You have registered.{" "}
              <span>
                <Link to={ROUTES.PROFILE}>Click here</Link>{" "}
              </span>
              <span>to go to your profile</span>
            </Alert>
          )
        ) : (
          <CircularProgress />
        )}
      </Box>
      <ToastContainer />
    </>
  );
}
