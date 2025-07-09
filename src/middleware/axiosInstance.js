import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Sesuaikan dengan backend-mu
});

export default axiosInstance;
