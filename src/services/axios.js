import axios from "axios";

export const userAxios = axios.create({ baseURL: "http://localhost:5000/api" });

export const setAuthToken = (axios, token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
