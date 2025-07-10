import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../middleware/axiosInstance";
import errorMiddleware from "../../middleware/errorMiddleware";
import { message } from "antd";
import { useAddUserToProject } from "../api/useProjectUser";
import { useGlobalContext } from "../context/useGlobalContext";

export const useCreateProject = (options = {}) => {
  const addUserToProject = useAddUserToProject();
  const { userId } = useGlobalContext();

  return useMutation({
    ...options,
    mutationFn: async (projectData) => {
      // Buat project
      const { data: project } = await axiosInstance.post(
        "/projects",
        projectData
      );
      const projectId = project._id || project.id;

      if (!projectId || !userId) {
        throw new Error("projectId atau userId tidak tersedia.");
      }

      // Tambahkan user ke project
      await addUserToProject.mutateAsync({
        userId,
        projectId,
        role: "manager",
      });

      return project;
    },
    onSuccess: () => {
      message.success("Proyek berhasil dibuat!");
    },
    onError: errorMiddleware,
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
  });
};

export const useGetProjectById = (projectId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["projects", projectId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/projects/${projectId}`);
      return data;
    },
    enabled: !!projectId, // hanya fetch jika projectId tidak null
    onError: errorMiddleware,
  });
};

export const useUpdateProject = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: async ({ projectId, projectData }) => {
      const { data } = await axiosInstance.put(
        `/projects/${projectId}`,
        projectData
      );
      return data;
    },
    onSuccess: (data) => {
      message.success("Proyek berhasil diperbarui!");
      // invalidate or update project list cache supaya data terbaru diambil
      queryClient.invalidateQueries(["projects"]);
      // juga invalidate cache detail project jika ada
      if (data?.name222294) {
        queryClient.invalidateQueries(["projects", data.name222294]);
      }
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: errorMiddleware,
  });
};
