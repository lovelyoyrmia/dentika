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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path={ROUTES.HOME} element={<LandingPage />} />
          <Route exact path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
