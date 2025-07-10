import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../middleware/axiosInstance";
import errorMiddleware from "../../middleware/errorMiddleware";
import { message } from "antd";

export const useAddUserToProject = (options = {}) => {
  return useMutation({
    ...options,
    mutationFn: async ({ projectId, userId, role }) => {
      const { data } = await axiosInstance.post(
        `/projects/${projectId}/users`,
        {
          user_id: userId,
          role,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("User berhasil ditambahkan", data);
      message.success("User berhasil ditambahkan ke project");
    },
    onError: errorMiddleware,
  });
};

export const useGetProjectUsers = (projectId) => {
  return useQuery({
    queryKey: ["project-users", projectId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/projects/${projectId}/users`);
      return data;
    },
    onError: errorMiddleware,
  });
};
