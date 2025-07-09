import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../middleware/axiosInstance";
import errorMiddleware from "../../middleware/errorMiddleware";
import { message } from "antd";

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
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post(`/auth/login`, userData);

      // Simpan token dan user
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_email", data.email);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          email: data.email,
        })
      );
      localStorage.setItem("userData", JSON.stringify(data));

      return data;
    },
    onSuccess: () => {
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
