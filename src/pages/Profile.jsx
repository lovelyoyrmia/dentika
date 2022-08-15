import React, { useState, useEffect } from "react";
import { useAuth } from "../services/FirebaseAuthContext";
import axios from "axios";
import { handleAccessToken } from "../utils/utils";
import { CircularProgress, Alert } from "@mui/material";

export default function Profile() {
  const { signOut, currentUser } = useAuth();
  const [data, setData] = useState([]);
  const token = handleAccessToken(currentUser);

  const deleteData = async (role, id, email) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/deleteId/${id}`,
        {
          role: role,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data["message"] === "Success") {
        window.location.reload(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const getDataEmail = async () => {
      const req = { role: "USER", email: currentUser.email };

      const res = await axios.post(
        "http://localhost:5000/api/getDataByEmail",
        req,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
              deleteData("USER", appoint.docId, appoint.email);
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
