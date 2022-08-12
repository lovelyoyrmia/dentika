import React, { useState } from "react";
import { TextField, Typography, Fab, Box } from "@mui/material";
import { useAuth } from "../services/FirebaseAuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import "./css/login.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../constant/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regis, setRegis] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDefault = () => {
    setEmail("");
    setPassword("");
    // handleClose();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      regis ? await signUp(email, password) : await signIn(email, password);
      handleDefault();
      navigate(ROUTES.DASHBOARD);
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

  const handleString = (res) => {
    let resp = res.split("/")[1];
    resp = resp.replace(/-/g, " ");
    const arr = resp.split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const result = arr.join(" ");
    return result;
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
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={"password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          {loading ? (
            <div className="circular">
              <CircularProgress />
            </div>
          ) : !regis ? (
            <Fab
              variant="extended"
              color="secondary"
              aria-label="add"
              onClick={handleSubmit}
            >
              Login
            </Fab>
          ) : (
            <Fab
              variant="extended"
              color="secondary"
              aria-label="add"
              onClick={handleSubmit}
            >
              Register
            </Fab>
          )}
        </form>
      </Box>
      {!regis ? (
        <Typography
          className="login-form"
          variant="text"
          noWrap
          component="div"
        >
          <span>Do not have an Account ?</span>
          <span className="regis" onClick={() => setRegis(!regis)}>
            {" "}
            Register.
          </span>
        </Typography>
      ) : (
        <Typography
          className="login-form"
          variant="text"
          noWrap
          component="div"
        >
          <span>Have an Account ?</span>
          <span
            className="regis"
            onClick={() => {
              setRegis(!regis);
              handleDefault();
            }}
          >
            {" "}
            Login.
          </span>
        </Typography>
      )}
      <ToastContainer />
    </div>
  );
}
