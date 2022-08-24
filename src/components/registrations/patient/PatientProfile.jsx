import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ROLE } from "../../../constant/role";
import { patientAxios, setAuthToken } from "../../../services/axios";
import { useAuth } from "../../../services/FirebaseAuthContext";
import { handleAccessToken } from "../../../utils/utils";

export default function PatientProfile() {
  const { currentUser } = useAuth();
  const [patient, setPatient] = useState({});
  const token = handleAccessToken(currentUser);
  useEffect(() => {
    const req = {
      role: {
        PATIENT: ROLE.patient,
      },
      email: currentUser.email,
    };
    setAuthToken(patientAxios, token);
    patientAxios
      .post("/getData/" + currentUser.uid, req)
      .then((res) => {
        const dataPatient = res.data["data"];
        if (res.status === 200) {
          // setPatient(data)
          setPatient((user) => ({ ...user, ...dataPatient }));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [currentUser.email, currentUser.uid, token]);
  return (
    <Box sx={{ backgroundColor: "black", width: "100%", height: "100%" }}>
      <Box sx={{ backgroundColor: "white", m: 2, p: 2 }}>{patient.uid}</Box>
    </Box>
  );
}
