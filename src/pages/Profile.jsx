import React, { useState, useEffect } from "react";
import { useAuth } from "../services/FirebaseAuthContext";
import axios from "axios";
import { handleAccessToken } from "../utils/utils";
import { CircularProgress } from "@mui/material";

export default function Profile() {
  const { signOut, currentUser } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDataEmail = async () => {
      const req = { role: "USER", email: currentUser.email };
      const token = handleAccessToken(currentUser);

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
  }, [currentUser]);
  if (data && currentUser) {
    return (
      <div>
        {data.map((appoint) => (
          <div>{appoint.appointmentDate}</div>
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
        }}
      >
        No Data.
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
