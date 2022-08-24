import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ROLE } from "../constant/role";
import { patientAxios } from "../services/axios";
import { useAuth } from "../services/FirebaseAuthContext";
import { Outlet } from "react-router-dom";
import SidebarProfile from "../components/sidebar/SidebarProfile";

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [data, setData] = useState({});
  useEffect(() => {
    let interval = setTimeout(() => {
      const req = {
        role: {
          PATIENT: ROLE.patient,
        },
        email: currentUser.email,
      };
      patientAxios
        .post("/getData/" + currentUser.uid, req)
        .then((res) => {
          if (res.status === 200) {
            setData((prev) => ({ ...prev, ...res.data["data"] }));
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [currentUser.email, currentUser.uid]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SidebarProfile />
        <Outlet />
      </Box>
    </>
  );
}
