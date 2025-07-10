import React, { useState } from "react";
import {
  Card,
  Descriptions,
  Typography,
  List,
  Avatar,
  Spin,
  Tag,
  Input,
  Button,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";

import { useParams } from "react-router-dom";
import {
  useGetProjectById,
  useUpdateProject,
} from "../../hooks/api/useProject";

import {
  useGetProjectUsers,
  useAddUserToProject,
} from "../../hooks/api/useProjectUser";

import {
  useGetProjectTasks,
  useUpdateTask,
  useAddTaskToProject,
} from "../../hooks/api/useTask";

import TaskListComponent from "./TaskListComponent";
import { useGlobalContext } from "../../hooks/context/useGlobalContext";

const { Title, Text } = Typography;

export default function ProjectDetailPage({}) {
  const { id: projectId } = useParams();
  const { userId } = useGlobalContext();
  const {
    data: projectDetailData,
    isLoading,
    isError,
  } = useGetProjectById(projectId);
  const projectDetail = projectDetailData.project;

  console.log("project detail ", projectDetail);
  const { data: usersOnProject } = useGetProjectUsers(projectId);

  console.log("user dalam project", usersOnProject);
  const {
    data: taskData,
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useGetProjectTasks(projectId);

  console.log("task detail", taskData);

  const updateTask = useUpdateTask();
  const addUser = useAddUserToProject();
  const addTask = useAddTaskToProject();
  const updateProject = useUpdateProject();

  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({});

  const statusColors = {
    pending: "orange",
    doing: "blue",
    completed: "green",
  };

  const handleAddUser = () => {
    if (!email) return message.warning("Email tidak boleh kosong.");
    addUser.mutate(
      { projectId, email: email },
      {
        onSuccess: () => {
          message.success("User berhasil ditambahkan.");
          setEmail("");
        },
        onError: (err) => {
          message.error(
            err?.response?.data?.message || "Gagal menambahkan user."
          );
        },
      }
    );
  };

  const handleTaskCreate = (newTaskData) => {
    addTask.mutate(
      { projectId, taskData: newTaskData },
      {
        onSuccess: () => message.success("Task berhasil ditambahkan."),
        onError: (err) =>
          message.error(
            err?.response?.data?.message || "Gagal menambahkan task."
          ),
      }
    );
  };

  const handleTaskUpdate = (taskId, field, value) => {
    console.log("task id", taskId);
    if (field === "status") {
      updateTask.mutate({ taskId, status: value });
    } else if (field === "priority") {
      updateTask.mutate({ taskId, priority: value });
    }
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setFormState({
        name: projectDetail.name,
        description: projectDetail.description,
        status: projectDetail.status,
        start_date: projectDetail.start_date,
        end_date: projectDetail.end_date,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    updateProject.mutate(
      { projectId, projectData: formState },
      {
        onSuccess: () => {
          setIsEditing(false);
          message.success("Proyek berhasil diperbarui.");
        },
        onError: () => message.error("Gagal memperbarui proyek."),
      }
    );
  };

  const renderField = (
    label,
    value,
    key,
    isDate = false,
    isTextArea = false
  ) => (
    <Descriptions.Item label={label}>
      {isEditing ? (
        isTextArea ? (
          <Input.TextArea
            value={formState[key]}
            onChange={(e) =>
              setFormState({
                ...formState,
                [key]: e.target.value,
              })
            }
          />
        ) : (
          <Input
            type={isDate ? "date" : "text"}
            value={formState[key]}
            onChange={(e) =>
              setFormState({
                ...formState,
                [key]: e.target.value,
              })
            }
          />
        )
      ) : isDate ? (
        dayjs(value).format("YYYY-MM-DD")
      ) : (
        value
      )}
    </Descriptions.Item>
  );

  if (isError) return <Text type="danger">Gagal memuat data proyek.</Text>;
  if (!projectDetail) return <Text>Data proyek tidak ditemukan.</Text>;

  const { name, description, status, start_date, end_date } = projectDetail;

  const users = usersOnProject?.users ?? [];
  const currentUserInProject = users.find((user) => user.id == userId);
  const isManager = currentUserInProject?.role === "manager";

  return (
    <Spin
      spinning={
        addUser.isPending || addTask.isPending || updateProject.isPending
      }
      tip="Memproses..."
    >
      <Card
        title={<Title level={3}>{name}</Title>}
        style={{ maxWidth: 1000, margin: "auto" }}
      >
        <Descriptions
          bordered
          column={1}
          size="middle"
          extra={
            isEditing ? (
              <Space>
                <Button onClick={handleEditToggle}>Batal</Button>
                <Button type="primary" onClick={handleSaveEdit}>
                  Simpan
                </Button>
              </Space>
            ) : (
              <Button onClick={handleEditToggle}>Edit</Button>
            )
          }
        >
          {renderField("Nama Proyek", name, "name")}
          {renderField("Deskripsi", description, "description", false, true)}
          <Descriptions.Item label="Status">
            {isEditing ? (
              <Input
                value={formState.status}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    status: e.target.value,
                  })
                }
              />
            ) : (
              <Tag color={statusColors[status] || "default"}>
                {status.toUpperCase()}
              </Tag>
            )}
          </Descriptions.Item>
          {renderField("Tanggal Mulai", start_date, "start_date", true)}
          {renderField("Tanggal Selesai", end_date, "end_date", true)}
        </Descriptions>

        <Title level={4} style={{ marginTop: 32 }}>
          Statistik Proyek
        </Title>

        <Space
          size="large"
          direction="horizontal"
          style={{
            marginBottom: 16,
            flexWrap: "wrap",
            display: "flex",
          }}
        >
          {/* Statistik Cards */}

          <Card
            size="small"
            title="Jumlah Anggota"
            style={{ flex: "1 1 220px" }}
          >
            <Text strong>{users.length}</Text> orang
          </Card>

          <Card size="small" title="Total Task" style={{ flex: "1 1 220px" }}>
            <Text strong>{taskData?.tasks?.length || 0}</Text> task
          </Card>

          <Card size="small" title="Task Selesai" style={{ flex: "1 1 220px" }}>
            <Text type="success" strong>
              {taskData?.tasks?.filter((task) => task.status === "completed")
                .length || 0}
            </Text>{" "}
            task
          </Card>

          <Card
            size="small"
            title="Task Belum Selesai"
            style={{ flex: "1 1 220px" }}
          >
            <Text type="warning" strong>
              {taskData?.tasks?.filter(
                (task) => task.status === "pending" || task.status === "doing"
              ).length || 0}
            </Text>{" "}
            task
          </Card>

          <Card
            size="small"
            title="Prioritas Tinggi (High)"
            style={{ flex: "1 1 220px" }}
          >
            <Text type="danger" strong>
              {taskData?.tasks?.filter(
                (task) => task.priority?.toLowerCase() === "high"
              ).length || 0}
            </Text>{" "}
            task
          </Card>

          <Card
            size="small"
            title="Prioritas Sedang (Medium)"
            style={{ flex: "1 1 220px" }}
          >
            <Text strong>
              {taskData?.tasks?.filter(
                (task) => task.priority?.toLowerCase() === "medium"
              ).length || 0}
            </Text>{" "}
            task
          </Card>

          <Card
            size="small"
            title="Prioritas Rendah (Low)"
            style={{ flex: "1 1 220px" }}
          >
            <Text type="secondary" strong>
              {taskData?.tasks?.filter(
                (task) => task.priority?.toLowerCase() === "low"
              ).length || 0}
            </Text>{" "}
            task
          </Card>

          <Card
            size="small"
            title="Belum Deadline"
            style={{ flex: "1 1 220px" }}
          >
            <Text strong type="success">
              {taskData?.tasks?.filter((task) =>
                dayjs(task.due_date).isAfter(dayjs(), "day")
              ).length || 0}
            </Text>{" "}
            task
          </Card>

          <Card
            size="small"
            title="Sudah Melewati Deadline"
            style={{ flex: "1 1 220px" }}
          >
            <Text strong type="danger">
              {taskData?.tasks?.filter((task) =>
                dayjs(task.due_date).isBefore(dayjs(), "day")
              ).length || 0}
            </Text>{" "}
            task
          </Card>
        </Space>

        <Title level={4} style={{ marginTop: 32 }}>
          Daftar Tugas
        </Title>

        <TaskListComponent
          tasks={taskData?.tasks}
          isLoading={isTasksLoading}
          isError={isTasksError}
          onStatusChange={handleTaskUpdate}
          onPriorityChange={handleTaskUpdate}
          onTaskCreate={handleTaskCreate}
          onTaskUpdate={handleTaskUpdate}
          users={users}
        />

        <Title level={4} style={{ marginTop: 32 }}>
          Anggota Proyek
        </Title>

        <List
          className="cursor-pointer"
          itemLayout="horizontal"
          dataSource={usersOnProject?.users || []}
          locale={{ emptyText: "Tidak ada anggota." }}
          renderItem={(user) => {
            const progress = user.progress ?? 0;
            const perform = user.perform?.toLowerCase() ?? "unknown";

            let color = "default";
            if (perform === "excellent") color = "green";
            else if (perform === "good") color = "blue";
            else if (perform === "fair") color = "orange";
            else if (perform === "poor") color = "red";
            else color = "gray";

            return (
              <List.Item className="hover:bg-gray-100 transition-colors duration-200 px-4 rounded-md">
                <List.Item.Meta
                  className="ml-2.5"
                  avatar={<Avatar>{user.user_id.username.charAt(0)}</Avatar>}
                  title={
                    <>
                      {user.user_id.username}
                      {user.user_id._id === userId && (
                        <span className="text-green-600"> (you)</span>
                      )}
                    </>
                  }
                  description={
                    <>Role: {user.role.charAt(0) + user.role.slice(1)}</>
                  }
                />
                <div style={{ textAlign: "right", minWidth: 120 }}>
                  <Tag color={color} style={{ fontWeight: "bold" }}>
                    {progress} / {perform.charAt(0) + perform.slice(1)}
                  </Tag>
                </div>
              </List.Item>
            );
          }}
        />

        {!isManager && (
          <>
            <Title level={5} style={{ marginTop: 24 }}>
              Tambah Anggota Proyek
            </Title>

            <Space direction="horizontal" style={{ marginBottom: 16 }}>
              <Input
                placeholder="Masukkan email user"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: 300 }}
                disabled={addUser.isPending}
              />
              <Button
                type="primary"
                onClick={handleAddUser}
                disabled={addUser.isPending}
              >
                Tambah
              </Button>
            </Space>
          </>
        )}
      </Card>
    </Spin>
  );
}
