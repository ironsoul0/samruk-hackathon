import axios from "axios";

export const base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://samruk-backend.ironsoul.me";

export const api = axios.create({
  baseURL: `${base}/`,
});
