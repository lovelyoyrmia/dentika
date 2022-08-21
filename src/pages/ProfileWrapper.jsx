import React, { useState, useEffect } from "react";
import { useAuth } from "../services/FirebaseAuthContext";
import { handleAccessToken } from "../utils/utils";
import { patientAxios, setAuthToken } from "../services/axios";
import { ROLE } from "../constant/role";
import { useNavigate } from "react-router-dom";
import PatientForm from "../components/registrations/patient/PatientForm";

export default function Profile() {
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const token = handleAccessToken(currentUser);
  const navigate = useNavigate();

  // const deleteData = async (role, id, email) => {
  //   try {
  //     setAuthToken(patientAxios, token);
  //     const res = await patientAxios.post(`/deleteId/${id}`, {
  //       role: role,
  //       email: email,
  //     });
  //     if (res.data["message"] === "Success") {
  //       window.location.reload(false);
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  useEffect(() => {
    const checkVerified = async () => {
      try {
        const req = {
          role: {
            PATIENT: ROLE.patient,
          },
          email: currentUser.email,
        };
        setAuthToken(patientAxios, token);
        const res = await patientAxios.post(`/getData/${currentUser.uid}`, req);
        console.log(res.data["data"]);
      } catch (error) {
        setError(true);
        console.log(error.code);
      }
    };
    checkVerified();
  }, [currentUser.email, currentUser.uid, token]);

  if (!error) {
    if (!data.isVerified) {
      return <PatientForm />;
    }
  } else {
    return <div></div>;
  }
}
