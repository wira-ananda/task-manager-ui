import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Sesuaikan dengan backend-mu
});

// Tambahkan token otomatis ke setiap request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
