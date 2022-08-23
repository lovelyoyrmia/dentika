import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Dashboard";
import { AuthProvider } from "./services/FirebaseAuthContext";
import ProtectedRoute from "./services/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { ROUTES } from "./constant/routes";
import { CircularProgress } from "@mui/material";
import VerifEmail from "./services/VerifEmail";
import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./pages/ForgotPassword";
import NavbarWrapper from "./components/navbar/NavbarWrapper";
import ProfileWrapper from "./pages/ProfileWrapper";
import RegistrationPage from "./pages/RegistrationPage";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
// const io = new Server

function App() {
  const [socket, setSocket] = useState();
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);
  return (
    <Router>
      <AuthProvider>
        <NavbarWrapper />
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route exact path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          {/* AUTHENTICATION PROTECTED ROUTE */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<Home />} />
          </Route>
          <Route
            path={ROUTES.EMAILVERIF}
            element={
              <VerifEmail>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                    <br />
                    <br />
                    <div>Check your email for verification</div>
                  </div>
                </div>
              </VerifEmail>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<ProfileWrapper />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path={ROUTES.REGISTRATION}
              element={<RegistrationPage socket={socket} />}
            />
          </Route>
          <Route path={ROUTES.RESET_PASSWORD} element={<ForgotPassword />} />

          {/* MISSING PAGE */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
