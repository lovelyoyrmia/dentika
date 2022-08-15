import React, { useState } from "react";
import { TextField, Typography, Fab, Box } from "@mui/material";
import { useAuth } from "../services/FirebaseAuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import "./css/login.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../constant/routes";
import { handleString } from "../utils/utils";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPasswordUser } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDefault = () => {
    setEmail("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await resetPasswordUser(email);
      handleDefault();
      toast.success("Reset password link sent to your email!", {
        position: "top-center",
        autoClose: 5000,
        draggable: false,
      });
    } catch (error) {
      const err = handleString(error.code);
      toast.error(err, {
        position: "top-center",
        autoClose: 5000,
        draggable: false,
      });
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <Typography className="login-title" variant="h6" noWrap component="div">
        <span className="logo">Dentika</span>
        <span className="logo-span"> user</span>
      </Typography>
      <Box className="login-wrapper">
        <form noValidate>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          {loading ? (
            <div className="circular">
              <CircularProgress />
            </div>
          ) : (
            <Fab
              variant="extended"
              color="secondary"
              aria-label="add"
              onClick={handleSubmit}
            >
              Reset Password
            </Fab>
          )}

          <Typography sx={{ textAlign: "center", my: 2 }}>
            <Link
              to={ROUTES.LOGIN}
              style={{ textDecoration: "none", fontSize: "16px" }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Box>

      <ToastContainer />
    </div>
  );
}
