import axios from "axios";

export const base =
  process.env.NODE_ENV !== "development"
    ? "http://localhost:8080"
    : "https://morning-peak-19354.herokuapp.com";

export const api = axios.create({
  baseURL: `${base}/`,
});
