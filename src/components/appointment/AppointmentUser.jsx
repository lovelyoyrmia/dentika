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
import indonesia from "indonesia-cities-regencies";
import { setAuthToken, userAxios } from "../../services/axios";
import { ROLE } from "../../constant/role";

export default function AppointmentUser() {
  const { currentUser } = useAuth("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [doctor, setDoctor] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [cities, setCities] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [provinces, setProvinces] = useState([]);
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
    if (
      name !== "" &&
      address1 !== "" &&
      city !== "" &&
      province !== "" &&
      date !== null &&
      doctor !== null
    ) {
      postData();
      setError(false);
    } else {
      setError(true);
    }
  };

  const setDefault = () => {
    setName("");
    setAddress1("");
    setAddress2("");
    setProvince("");
    setCity("");
    setDoctor("");
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
          name: name,
          email: currentUser.email,
          address: `${address1}.` + address2 || "",
          province: province,
          city: city,
          option: doctor,
          date: appointmentDate,
          role: ROLE.PATIENT,
        };
        const token = handleAccessToken(currentUser);
        setAuthToken(userAxios, token);
        const res = await userAxios.post("/addData", data);
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

  const indonesiaCities = indonesia.getAll();

  const findCity = (prov) => {
    const newCities = [];
    if (prov !== "") {
      for (let i = 0; i < indonesiaCities.length; i++) {
        const elm = indonesiaCities[i];
        if (elm.province === prov) {
          newCities.push(elm.name);
        }
      }
      setRegencies([...new Set(newCities)]);
    }
  };

  useEffect(() => {
    const provincesFunc = () => {
      const provinces = [];
      const cities = [];
      for (let i = 0; i < indonesiaCities.length; i++) {
        const element = indonesiaCities[i];
        provinces.push(element.province);
        cities.push(element.name);
      }
      setCities([...new Set(cities)]);
      setProvinces([...new Set(provinces)].sort());
    };
    provincesFunc();
  }, [indonesiaCities]);

  return (
    <Box
      sx={{
        border: 1,
        p: 3,
        margin: 2,
        borderRadius: 2,
        width: {
          md: 1 / 1.5,
        },
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
            spacing={{ md: 3, xs: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {/* ======================================== */}

            <Grid item xs={2} sm={4} md={4}>
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(false);
                  }}
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
                  onChange={(e) => {
                    setAddress1(e.target.value);
                    setError(false);
                  }}
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
              </Grid>
            </Grid>

            {/* ======================================== */}

            <Grid item xs={2} sm={4} md={4}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="strech"
              >
                <TextField
                  id="provinces"
                  label="Provinces"
                  select
                  className="appointment-item"
                  required
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                    findCity(e.target.value);
                    setCity("");
                    setError(false);
                  }}
                  variant="outlined"
                >
                  {provinces.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <TextField
                  id="cities"
                  label="Cities"
                  select
                  className="appointment-item"
                  required
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setError(false);
                  }}
                  variant="outlined"
                >
                  {regencies.length !== 0
                    ? regencies.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))
                    : cities.map((option) => {
                        const name = option.replace(/Administrasi/g, "");
                        return (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        );
                      })}
                </TextField>
                <br />
                <TextField
                  id="outlined-select-basic"
                  label="Doctors"
                  select
                  className="appointment-item"
                  required
                  value={doctor}
                  onChange={(e) => {
                    setDoctor(e.target.value);
                    setError(false);
                  }}
                  variant="outlined"
                  // helperText="Please select the Doctors"
                >
                  {doctors.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* ======================================== */}

            <Grid item xs={2} sm={4} md={4}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="strech"
              >
                <TextField
                  id="symptoms"
                  label="Symptoms"
                  className="appointment-item"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Your Symptoms"
                  variant="outlined"
                />
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
