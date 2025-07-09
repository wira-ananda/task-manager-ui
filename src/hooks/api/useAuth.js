import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../middleware/axiosInstance";
import errorMiddleware from "../../middleware/errorMiddleware";
import { message } from "antd";
import { useGlobalContext } from "../context/useGlobalContext";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/user");
        return response.data.user;
      } catch (error) {
        throw new Error("Not authenticated");
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRegisterMutation = ({ navigate } = {}) => {
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post(`/auth/register`, userData);
      return data;
    },
    onSuccess: () => {
      message.success("Registrasi berhasil! Silakan login.");
      if (navigate) navigate("/login");
    },
    onError: errorMiddleware,
  });
};

export const useLoginMutation = ({ navigate } = {}) => {
  const { refreshUser } = useGlobalContext();

  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post(`/auth/login`, userData);

      const { _id, username, email, token } = data;

      // Simpan data login ke localStorage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_email", email);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: _id,
          username,
          email,
        })
      );
      localStorage.setItem("userData", JSON.stringify(data));

      return data;
    },

    onSuccess: () => {
      refreshUser(); // panggil agar context auto update
      if (navigate) navigate("/");
      message.success("Berhasil masuk, selamat datang!");
    },

    onError: errorMiddleware,
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: async ({ userId, userData }) => {
      const { data } = await axiosInstance.put(`users/${userId}`, userData);
      return data;
    },
    onSuccess: (data) => {
      message.success(data.message || "User berhasil diperbarui");
    },
    onError: errorMiddleware,
  });
};
