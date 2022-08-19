import React, { useState, useEffect } from "react";
import { useAuth } from "../services/FirebaseAuthContext";
import { handleAccessToken } from "../utils/utils";
import { CircularProgress, Alert } from "@mui/material";
import { setAuthToken, userAxios } from "../services/axios";
import { ROLE } from "../constant/role";

export default function Profile() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const token = handleAccessToken(currentUser);

  const deleteData = async (role, id, email) => {
    try {
      setAuthToken(userAxios, token);
      const res = await userAxios.post(`/deleteId/${id}`, {
        role: role,
        email: email,
      });
      if (res.data["message"] === "Success") {
        window.location.reload(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const getDataEmail = async () => {
      const req = { role: ROLE.PATIENT, email: currentUser.email };
      setAuthToken(userAxios, token);
      const res = await userAxios.post("/getDataByEmail", req);
      setData(res.data["data"]);
    };
    getDataEmail();
  }, [currentUser, token]);
  if (data && currentUser) {
    return (
      <div>
        {data.map((appoint) => (
          <div
            key={appoint.docId}
            onClick={() => {
              deleteData(ROLE.PATIENT, appoint.docId, appoint.email);
            }}
          >
            {appoint.name}
          </div>
        ))}
      </div>
    );
  } else if (!data && currentUser) {
    return (
      <div
        style={{
          height: "100vh",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          // fontSize: ''
        }}
      >
        <Alert severity="info">There is no data!</Alert>
      </div>
    );
  }
  return (
    <div
      style={{
        height: "100vh",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
    </div>
  );
}
