import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appointment from "../components/appointment/Appointment";
import Topbar from "../components/topbar/Topbar";
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
    <div>
      <Appointment />
    </div>
  );
}
