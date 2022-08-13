import React from "react";
import { useNavigate } from "react-router-dom";
import AppointmentUser from "../components/appointment/AppointmentUser";
import Navbar from "../components/navbar/Navbar";
// import Topbar from "../components/topbar/Topbar";
import { ROUTES } from "../constant/routes";
import { useAuth } from "../services/FirebaseAuthContext";

export default function Home() {
  const { signOut, currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <AppointmentUser />
      {/* <div>{JSON.stringify(currentUser)}</div> */}
    </>
  );
}
