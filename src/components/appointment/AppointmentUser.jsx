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
import React, { useState } from "react";
import "./appointment.css";
import { useAuth } from "../../services/FirebaseAuthContext";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { handleAccessToken } from "../../utils/utils";
import { setAuthToken, bookingAxios } from "../../services/axios";
import { ROLE } from "../../constant/role";

export default function AppointmentUser({ patient }) {
  const { currentUser } = useAuth("");
  const [state, setState] = useState({
    name: patient ? patient.name : "",
    doctor: patient ? patient.option : "",
    symptoms: patient ? patient.symptoms : "",
  });
  const [date, setDate] = useState(
    patient ? patient.appointmentDate : new Date()
  );
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
      patient ? editData() : postData();
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

  const editData = async () => {
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
        setAuthToken(bookingAxios, token);
        const res = await bookingAxios.put(
          "/updateData/" + patient.docId,
          data
        );
        if (res.data["message"] === "Success") {
          console.log(res.data);
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
        setAuthToken(bookingAxios, token);
        const res = await bookingAxios.post("/addData", data);
        if (res.data["message"] === "Success") {
          console.log(res.data);
          setDefault();
          toast.success("Appointment sent !", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
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
        p: 2,
        margin: 1,
        borderRadius: 2,
        flexGrow: 1,
      }}
    >
      <form>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {error ? (
            <div>
              <Alert severity="error" sx={{ mb: 2 }}>
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
