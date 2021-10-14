import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:2021/api/v1/",
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
