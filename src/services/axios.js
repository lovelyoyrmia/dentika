import axios from "axios";

export const patientAxios = axios.create({
  baseURL: "http://localhost:5000/api/patient",
});

export const doctorAxios = axios.create({
  baseURL: "http://localhost:5000/api/doctor",
});

export const adminAxios = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

export const appointAxios = axios.create({
  baseURL: "http://localhost:5000/api/appointment",
});

export const setAuthToken = (axios, token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
