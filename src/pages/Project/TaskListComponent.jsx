import React, { useState } from "react";
import {
  Table,
  Input,
  Select,
  Tag,
  DatePicker,
  Button,
  Modal,
  Form,
  Popconfirm,
  message,
} from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { useDeleteTask } from "../../hooks/api/useTask";
import { useAddUserToProject } from "../../hooks/api/useProjectUser";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Option } = Select;

const statusColors = {
  pending: "orange",
  doing: "blue",
  completed: "green",
};

const priorityColors = {
  low: "green",
  medium: "gold",
  high: "red",
};

const statusOptions = ["pending", "doing", "completed"];
const priorityOptions = ["low", "medium", "high"];

export default function TaskListComponent({
  tasks,
  onTaskCreate,
  onTaskUpdate,
  users,
  startDateProject,
  endDateProject,
}) {
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const [taskForm] = Form.useForm();

  const deleteTaskMutation = useDeleteTask();
  const addUserMutation = useAddUserToProject();

  const handleCreateNewTask = () => {
    taskForm
      .validateFields()
      .then((values) => {
        onTaskCreate({ ...values, status: "pending" });
        setTaskModalOpen(false);
        taskForm.resetFields();
      })
      .catch((err) => console.log("Validation Failed:", err));
  };

  const handleStatusChange = (value, record) => {
    if (
      value === "completed" &&
      record.due_date &&
      dayjs(record.due_date).isBefore(dayjs(), "day")
    ) {
      Modal.warning({
        title: "Tidak Bisa Menyelesaikan Task",
        content:
          "Task ini sudah melewati batas deadline, sudah tidak bisa di update.",
      });
      return;
    }

    onTaskUpdate(record._id, "status", value);
  };

  const handlePriorityChange = (value, record) => {
    onTaskUpdate(record._id, "priority", value);
  };

  const handleDeleteTask = (taskId) => {
    deleteTaskMutation.mutate(taskId);
  };

  const handleExportToExcel = () => {
    const exportData = tasks.map((task) => ({
      Judul: task.title,
      Deskripsi: task.description,
      Status: task.status,
      Prioritas: task.priority,
      Deadline: task.due_date
        ? dayjs(task.due_date).format("DD MMM YYYY")
        : "-",
      Username: task.user_id?.username || "-",
      Email: task.user_id?.email || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "task_list.xlsx");
  };

  const columns = [
    {
      title: "Judul",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(val) => handleStatusChange(val, record)}
          style={{ width: 140 }}
        >
          {statusOptions.map((opt) => (
            <Option key={opt} value={opt}>
              <Tag color={statusColors[opt]}>{opt.toUpperCase()}</Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Prioritas",
      dataIndex: "priority",
      key: "priority",
      render: (priority, record) => (
        <Select
          value={priority}
          onChange={(val) => handlePriorityChange(val, record)}
          style={{ width: 140 }}
        >
          {priorityOptions.map((opt) => (
            <Option key={opt} value={opt}>
              <Tag color={priorityColors[opt]}>{opt.toUpperCase()}</Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "due_date",
      key: "due_date",
      render: (date) => (date ? dayjs(date).format("DD MMMM YYYY") : "-"),
    },
    {
      title: "Username",
      key: "username",
      render: (_, record) => record.user_id?.username || "-",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Hapus task ini?"
          okText="Ya"
          cancelText="Tidak"
          onConfirm={() => handleDeleteTask(record._id)}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            loading={
              deleteTaskMutation.isPending &&
              deleteTaskMutation.variables === record.title
            }
          >
            Hapus
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        footer={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button type="primary" onClick={() => setTaskModalOpen(true)}>
                Tambah Task Baru
              </Button>{" "}
            </div>
            <Button onClick={handleExportToExcel}>Export Laporan</Button>
          </div>
        )}
      />

      {/* Modal Tambah Task */}
      <Modal
        title="Tambah Task Baru"
        open={taskModalOpen}
        onOk={handleCreateNewTask}
        onCancel={() => setTaskModalOpen(false)}
        okText="Tambah"
      >
        <Form
          form={taskForm}
          layout="vertical"
          initialValues={{ priority: "low" }}
        >
          <Form.Item
            name="title"
            label="Judul"
            rules={[{ required: true, message: "Masukkan judul!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Deskripsi">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="priority" label="Prioritas">
            <Select>
              {priorityOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  <Tag color={priorityColors[opt]}>{opt.toUpperCase()}</Tag>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="due_date" label="Deadline">
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => {
                return (
                  (startDateProject &&
                    current.isBefore(dayjs(startDateProject), "day")) ||
                  (endDateProject &&
                    current.isAfter(dayjs(endDateProject), "day"))
                );
              }}
            />
          </Form.Item>
          <Form.Item
            name="user_id"
            label="Pilih User"
            rules={[{ required: true, message: "Pilih user!" }]}
          >
            <Select placeholder="Pilih user">
              {users?.map((user) => (
                <Option key={user._id} value={user.user_id._id}>
                  {user.user_id.username} ({user.user_id.email})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
