import {
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
import "./appointment.css";
import { useAuth } from "../../services/FirebaseAuthContext";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { handleAccessToken } from "../../utils/utils";
import { setAuthToken, appointAxios } from "../../services/axios";
import { ROLE } from "../../constant/role";

export default function AppointmentUser() {
  const { currentUser } = useAuth("");
  const [state, setState] = useState({
    name: "",
    doctor: "",
    symptoms: "",
  });
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const doctors = [
    {
      icon: "",
      value: "Dokter Umum",
    },
    {
      icon: "",
      value: "Dokter Gigi",
    },
  ];

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleValidation = () => {
    if (
      state.name !== "" &&
      state.symptoms !== "" &&
      date !== null &&
      state.doctor !== null
    ) {
      postData();
      setError(false);
    } else {
      setError(true);
    }
  };

  const setDefault = () => {
    setState({
      name: "",
      doctor: "",
      symptoms: "",
    });
  };

  const postData = async () => {
    try {
      setLoading(true);
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      const appointmentDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
      const isAfter = moment(now).isAfter(appointmentDate);

      if (isAfter) {
        toast.error("Appointment date should be after the current date", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        const data = {
          uid: currentUser.uid,
          name: state.name,
          email: currentUser.email,
          symptoms: state.symptoms,
          option: state.doctor,
          date: appointmentDate,
          role: {
            PATIENT: ROLE.patient,
          },
        };
        const token = handleAccessToken(currentUser);
        setAuthToken(appointAxios, token);
        const res = await appointAxios.post("/addData", data);
        if (res.data["message"] === "Success") {
          console.log(res.data);
          setData(res.data);
          setDefault();
          toast.success("Appointment sent !", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        border: 1,
        p: 3,
        margin: 2,
        borderRadius: 2,
        width: 1 / 2,
        flexGrow: 1,
      }}
    >
      <div className="appointment-title">APPOINTMENT</div>
      <form>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {error ? (
            <div>
              <Alert severity="error" sx={{ my: 2 }}>
                Indicates a required field
              </Alert>
            </div>
          ) : (
            <br />
          )}
          <Grid
            container
            spacing={{ md: 2, xs: 1 }}
            columns={{ xs: 2, sm: 4, md: 6 }}
          >
            {/* ======================================== */}

            <Grid item xs={2} sm={4} md>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="strech"
              >
                <TextField
                  id="name"
                  label="Name"
                  className="appointment-item"
                  required
                  value={state.name}
                  onChange={handleChange("name")}
                  placeholder="Your Name"
                  variant="outlined"
                />
                <br />
                <TextField
                  id="symptoms"
                  label="Symptoms"
                  className="appointment-item"
                  required
                  value={state.symptoms}
                  onChange={handleChange("symptoms")}
                  placeholder="Your Symptoms"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {/* ======================================== */}

            <Grid item xs={2} sm={4} md>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="strech"
              >
                <TextField
                  id="outlined-select-basic"
                  label="Doctors"
                  select
                  className="appointment-item"
                  required
                  value={state.doctor}
                  onChange={handleChange("doctor")}
                  variant="outlined"
                  // helperText="Please select the Doctors"
                >
                  {doctors.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date"
                  className="appointment-item"
                  value={date}
                  onChange={(value) => setDate(value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <br />
          {loading ? (
            <div style={{ textAlign: "start" }}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              size="large"
              onClick={handleValidation}
            >
              Send
            </Button>
          )}
          <ToastContainer style={{ textAlign: "start" }} />
        </LocalizationProvider>
      </form>
    </Box>
  );
}
