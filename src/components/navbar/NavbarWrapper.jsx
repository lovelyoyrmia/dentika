import { useAuth } from "../../services/FirebaseAuthContext";
import Navbar from "./Navbar";
import NavbarLanding from "./NavbarLanding";
import { io } from "socket.io-client";
import { useEffect } from "react";

export default function NavbarWrapper() {
  const { currentUser } = useAuth();

  useEffect(() => {
    const socket = io("http://localhost:5000");
  }, []);

  if (currentUser) {
    return <Navbar />;
  } else {
    return <NavbarLanding />;
  }
}
