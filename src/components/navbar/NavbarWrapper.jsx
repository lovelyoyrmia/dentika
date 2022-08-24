import { useAuth } from "../../services/FirebaseAuthContext";
import Navbar from "./Navbar";
import NavbarLanding from "./NavbarLanding";

export default function NavbarWrapper() {
  const { currentUser } = useAuth();

  if (currentUser && currentUser.emailVerified) {
    return <Navbar />;
  } else {
    return <NavbarLanding />;
  }
}
