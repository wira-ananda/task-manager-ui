import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../middleware/axiosInstance";
import errorMiddleware from "../../middleware/errorMiddleware";
import { message } from "antd";

export const useGetProjectTasks = (projectId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["project-tasks", projectId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/projects/${projectId}/tasks`);
      return data;
    },
    enabled: !!projectId,
    onError: errorMiddleware,
  });
};

export function useAddTaskToProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, taskData }) => {
      const response = await axiosInstance.post(
        `/projects/${projectId}/tasks`,
        taskData
      );
      return response.data; // return hanya data supaya lebih clean
    },
    onSuccess: (_, variables) => {
      message.success("Task berhasil ditambahkan ke proyek");
      queryClient.invalidateQueries(["project-tasks", variables.projectId]); // konsisten dengan key query fetching task
    },
    onError: (error) => {
      errorMiddleware(error);
      message.error("Gagal menambahkan task ke proyek");
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, ...fields }) => {
      return axiosInstance.patch(`/tasks/${taskId}`, fields);
    },
    onSuccess: (_, variables) => {
      message.success("Task berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["task", variables.taskId] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError: (error) => {
      errorMiddleware(error);
      message.error("Gagal memperbarui task");
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId) => {
      return axiosInstance.delete(`/tasks/${taskId}`);
    },
    onSuccess: (_, taskId) => {
      message.success("Task berhasil dihapus");

      // Invalidate queries agar data task dan project refresh
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error) => {
      errorMiddleware(error);
      message.error("Gagal menghapus task");
    },
  });
}
