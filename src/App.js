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
import { ListSidebar } from "./constant/constants";
import EditProfile from "./components/registrations/patient/EditProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavbarWrapper />
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route exact path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ForgotPassword />} />

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
                    height: "80vh",
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
            <Route path={ROUTES.PROFILE} element={<ProfileWrapper />}>
              {ListSidebar.map((value) => {
                return (
                  <Route
                    key={value.id}
                    path={value.path}
                    element={value.element}
                  />
                );
              })}
              <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
          </Route>

          {/* MISSING PAGE */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
