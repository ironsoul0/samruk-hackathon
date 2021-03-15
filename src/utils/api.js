import axios from "axios";

export const base = "https://morning-peak-19354.herokuapp.com";

export const api = axios.create({
  baseURL: `${base}/`,
});
