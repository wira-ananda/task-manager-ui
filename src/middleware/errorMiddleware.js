import { message } from "antd";

const errorMiddleware = (error) => {
  const errorResponse = error?.response;

  console.error("POST Gagal:", errorResponse?.data || error.message);

  let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

  if (errorResponse?.status === 401) {
    errorMessage = "Email atau Sandi anda salah! Silakan coba lagi.";
  } else if (errorResponse?.status === 500) {
    errorMessage = "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
  } else if (errorResponse?.data?.error) {
    if (typeof errorResponse.data.error === "object") {
      errorMessage = "Email atau Nama sudah digunakan";
    } else {
      errorMessage = "Terjadi kesalahan validasi";
    }
  } else if (errorResponse?.data?.message) {
    errorMessage = errorResponse.data.message;
  }

  message.error(errorMessage);
};

export default errorMiddleware;
