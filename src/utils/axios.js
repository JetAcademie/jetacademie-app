import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/",
  timeout: 10000,
  withCredentials: true, // for CORS
});
export default Axios;
