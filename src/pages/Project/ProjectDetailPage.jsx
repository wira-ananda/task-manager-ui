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
  Select,
  Modal,
  Form,
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

import { UserAddOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

export default function ProjectDetailPage() {
  const [userForm] = Form.useForm();
  const { id: projectId } = useParams();
  const { userId } = useGlobalContext();

  const {
    data: projectDetailData,
    isLoading,
    isError,
  } = useGetProjectById(projectId);
  const projectDetail = projectDetailData?.project;

  const { data: usersOnProject } = useGetProjectUsers(projectId);
  const {
    data: taskData,
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useGetProjectTasks(projectId);

  const updateTask = useUpdateTask();
  const addUser = useAddUserToProject();
  const addTask = useAddTaskToProject();
  const updateProject = useUpdateProject();

  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({});
  const [userModalOpen, setUserModalOpen] = useState(false);

  const statusColors = {
    pending: "orange",
    doing: "blue",
    completed: "green",
  };

  const handleAddUser = () => {
    userForm.validateFields().then((values) => {
      const { email, role } = values;
      addUser.mutate(
        { projectId, email, role },
        {
          onSuccess: () => {
            message.success("User berhasil ditambahkan.");
            setUserModalOpen(false);
            userForm.resetFields();
          },
          onError: (err) => {
            message.error(
              err?.response?.data?.message || "Gagal menambahkan user."
            );
          },
        }
      );
    });
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
    const updatedFields = {};
    for (let key in formState) {
      const originalValue = dayjs(projectDetail[key]).isValid()
        ? dayjs(projectDetail[key]).format("YYYY-MM-DD")
        : projectDetail[key];

      const currentValue = dayjs(formState[key]).isValid()
        ? dayjs(formState[key]).format("YYYY-MM-DD")
        : formState[key];

      if (originalValue !== currentValue) {
        updatedFields[key] = formState[key];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      message.info("Tidak ada perubahan yang disimpan.");
      return;
    }

    updateProject.mutate(
      { projectId, projectData: updatedFields },
      {
        onSuccess: () => setIsEditing(false),
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
              setFormState({ ...formState, [key]: e.target.value })
            }
          />
        ) : isDate ? (
          <Input
            type="date"
            defaultValue={dayjs(formState[key]).format("YYYY-MM-DD")}
            onChange={(e) =>
              setFormState({ ...formState, [key]: e.target.value })
            }
          />
        ) : (
          <Input
            value={formState[key]}
            onChange={(e) =>
              setFormState({ ...formState, [key]: e.target.value })
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
  const startDateProject = start_date;
  const endDateProject = end_date;

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
              <Select
                value={formState.status}
                onChange={(value) =>
                  setFormState({ ...formState, status: value })
                }
                style={{ width: 200 }}
              >
                <Option value="active">Active</Option>
                <Option value="completed">Completed</Option>
                <Option value="archive">Archive</Option>
              </Select>
            ) : (
              <Tag color={statusColors[status] || "default"}>
                {status.toUpperCase()}
              </Tag>
            )}
          </Descriptions.Item>
          {renderField("Tanggal Mulai", start_date, "start_date", true)}
          {renderField("Tanggal Selesai", end_date, "end_date", true)}
        </Descriptions>

        {/* Task */}
        <Title level={4} style={{ marginTop: 32 }}>
          Daftar Tugas
        </Title>
        <TaskListComponent
          tasks={taskData?.tasks}
          onTaskCreate={handleTaskCreate}
          onTaskUpdate={handleTaskUpdate}
          users={users}
          startDateProject={startDateProject}
          endDateProject={endDateProject}
        />

        {/* Anggota */}
        <Title level={4} style={{ marginTop: 32 }}>
          Anggota Proyek
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={users}
          locale={{ emptyText: "Tidak ada anggota." }}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{user.user_id.username.charAt(0)}</Avatar>}
                title={
                  <>
                    {user.user_id.username}
                    {user.user_id._id === userId && (
                      <span className="text-green-600"> (you)</span>
                    )}
                  </>
                }
                description={`Role: ${user.role}`}
              />
            </List.Item>
          )}
        />

        {/* Tombol Tambah User */}
        {!isManager && (
          <Button
            icon={<UserAddOutlined />}
            onClick={() => setUserModalOpen(true)}
          >
            Tambah User ke Project
          </Button>
        )}

        {/* Modal Tambah User */}
        <Modal
          title="Tambah User ke Proyek"
          open={userModalOpen}
          onOk={handleAddUser}
          onCancel={() => setUserModalOpen(false)}
          okText="Tambah"
        >
          <Form form={userForm} layout="vertical">
            <Form.Item
              name="email"
              label="User"
              rules={[{ required: true, message: "Masukkan email user!" }]}
            >
              <Input placeholder="Masukkan email user" />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Pilih role!" }]}
            >
              <Select placeholder="Pilih role">
                <Option value="manager">Manager</Option>
                <Option value="developer">Developer</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </Spin>
  );
}
