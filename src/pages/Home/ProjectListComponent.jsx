import React from "react";
import { Table, Tooltip, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useGetAllUserProjects } from "../../hooks/api/useProject";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useGlobalContext } from "../../hooks/context/useGlobalContext";

const { Text } = Typography;

export default function ProjectListComponent() {
  const navigate = useNavigate();
  const { userId, user } = useGlobalContext();

  // console.log("userId:", userId);
  // console.log("user:", user);

  const { data, isLoading } = useGetAllUserProjects(userId);

  console.log("projects data:", data);

  // Gunakan fallback kosong jika undefined
  const projectsUser = data?.projects ?? data ?? [];

  const columns = [
    {
      title: "Nama Proyek",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let colorType = "secondary";
        if (status === "active") colorType = "success";
        else if (status === "completed") colorType = "processing";
        return <Text type={colorType}>{status.toUpperCase()}</Text>;
      },
    },
    {
      title: "Tanggal Mulai",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Tanggal Selesai",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Tooltip title="Lihat Detail">
          <EyeOutlined
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={() => navigate(`/project/${record._id}`)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <style>{`
        .project-table-row:hover {
          background-color: #e6f7ff;
          transition: background-color 0.3s ease;
        }
      `}</style>

      <div className="overflow-x-auto">
        <div className="min-w-[750px]">
          <Table
            className="project-table"
            rowKey="_id" // ✅ fix: sesuaikan dengan data MongoDB
            columns={columns}
            dataSource={projectsUser}
            loading={isLoading}
            pagination={{ pageSize: 5 }}
            rowClassName={() => "project-table-row"}
          />
        </div>
      </div>
    </>
  );
}
