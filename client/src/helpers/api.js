import axios from "axios";

export default function api() {
  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

  return api;
}
