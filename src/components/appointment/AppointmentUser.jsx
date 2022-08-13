import {
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import React, { useState } from "react";
import "./appointment.css";
import { useAuth } from "../../services/FirebaseAuthContext";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

export default function AppointmentUser() {
  const { currentUser } = useAuth("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [doctor, setDoctor] = useState("Dokter Umum");
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

  const handleValidation = () => {
    if (name !== "" && address1 !== "" && date !== null && doctor !== null) {
      postData();
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAccessToken = () => {
    if (currentUser.photoUrl !== "") {
      return currentUser.accessToken;
    } else {
      return currentUser["stsTokenManager"]["accessToken"];
    }
  };

  const setDefault = () => {
    setName("");
    setAddress1("");
    setAddress2("");
  };

  const postData = async () => {
    let appointmentDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    const data = {
      uid: currentUser.uid,
      name: name,
      email: currentUser.email,
      address: `${address1}.` + address2 || "",
      option: doctor,
      date: appointmentDate,
      role: "USER",
    };
    try {
      setLoading(true);
      const token = handleAccessToken();
      const res = await axios.post("http://localhost:5000/api/addData", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data["message"] === "Success") {
        console.log(res.data);
        setData(res.data);
        setDefault();
        toast.success("Appointment sent !", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      alert(error);
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
        width: {
          xs: 1 / 1.5, // theme.breakpoints.up('xs')
          sm: 1 / 2, // theme.breakpoints.up('sm')
          md: 1 / 3, // theme.breakpoints.up('md')
          lg: 1 / 3, // theme.breakpoints.up('lg')
          xl: 1 / 3, // theme.breakpoints.up('xl')
        },
      }}
    >
      <div className="appointment-title">Appointment</div>
      <form>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="strech"
          >
            {error ? (
              <div className="required">* Indicates a required field</div>
            ) : (
              <br />
            )}
            <TextField
              id="name"
              label="Name"
              className="appointment-item"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              variant="outlined"
            />
            <br />
            <TextField
              id="address1"
              label="Address 1"
              required
              className="appointment-item"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Your Address"
              variant="outlined"
            />
            <br />
            <TextField
              id="address2"
              label="Address 2"
              className="appointment-item"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Your Address"
              variant="outlined"
            />
            <br />
            <TextField
              id="outlined-select-basic"
              label="Select"
              select
              className="appointment-item"
              required
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              variant="outlined"
              helperText="Please select the Doctors"
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
            <br />
            {loading ? (
              <div className="center">
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
          </Grid>
        </LocalizationProvider>
      </form>
    </Box>
  );
}
