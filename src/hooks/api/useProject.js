import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../middleware/axiosInstance";
import errorMiddleware from "../../middleware/errorMiddleware";
import { message } from "antd";

export const useCreateProject = (options = {}) => {
  return useMutation({
    mutationFn: async (projectData) => {
      const { data } = await axiosInstance.post("/projects", projectData);
      return data;
    },
    onSuccess: (data) => {
      console.log("Proyek berhasil:", data);
      if (options.onSuccess) options.onSuccess(data);
      message.success("Proyek berhasil dibuat!");
    },
    onError: errorMiddleware,
    ...options,
  });
};

export const useGetAllUserProjects = (userId, options = {}) => {
  return useQuery({
    queryKey: ["user-projects", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users/${userId}/projects`);
      return data;
    },
    enabled: !!userId,
    onError: errorMiddleware,
    ...options,
  });
};
