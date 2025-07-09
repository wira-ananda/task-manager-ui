import React, { useState } from "react";
import { Button, Card, Typography, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProjectFormComponent from "./ProjectFormComponent";
import ProjectListComponent from "./ProjectListComponent";
import { useGlobalContext } from "../../hooks/context/useGlobalContext";

const { Title } = Typography;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormFinish = () => {
    setIsModalOpen(false);
  };

  const { logout } = useGlobalContext();

  return (
    <div className="home-page sm:px-6 md:px-8 py-4">
      <Button type="primary" danger onClick={logout}>
        Logout
      </Button>
      <Card
        bordered={false}
        className="mb-6 bg-gray-50"
        bodyStyle={{ padding: 24 }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <Title level={3} style={{ margin: 0 }}>
              Daftar Proyek
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto"
            >
              Tambah Proyek
            </Button>
          </div>
        </Space>
      </Card>

      <ProjectFormComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFinish={handleFormFinish}
      />

      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <ProjectListComponent />
      </Card>
    </div>
  );
}
