import React, { useEffect } from "react";
import { Form, Input, DatePicker, Button, Modal, Spin } from "antd";
import dayjs from "dayjs";
import { useCreateProject } from "../../hooks/api/useProject";

export default function ProjectFormComponent({ open, onClose, onFinish }) {
  const [form] = Form.useForm();

  const createProjectMutation = useCreateProject({
    onSuccess: (data) => {
      form.resetFields();
      if (onFinish) onFinish(data);
    },
  });

  // Reset state ketika modal dibuka
  useEffect(() => {
    if (open) {
      createProjectMutation.reset();
    }
  }, [open]);

  const handleFinish = (values) => {
    const startDate = values.start_date.format("YYYY-MM-DD");
    const endDate = values.end_date.format("YYYY-MM-DD");
    const today = dayjs().format("YYYY-MM-DD");
    const status = startDate === today ? "active" : "archive";

    const payload = {
      name: values.name,
      description: values.description,
      status: status,
      start_date: startDate,
      end_date: endDate,
    };

    createProjectMutation.mutate(payload);
  };

  return (
    <Modal
      title="Form Buat Proyek"
      open={open}
      onCancel={() => {
        if (!createProjectMutation.isPending) onClose();
      }}
      footer={null}
      closable={!createProjectMutation.isPending}
      maskClosable={!createProjectMutation.isPending}
      destroyOnClose
    >
      <Spin spinning={createProjectMutation.isPending} tip="Menyimpan...">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ status: "archive" }}
        >
          <Form.Item
            label="Nama Proyek"
            name="name"
            rules={[{ required: true, message: "Nama proyek wajib diisi!" }]}
          >
            <Input placeholder="Project Management System" />
          </Form.Item>

          <Form.Item
            label="Deskripsi"
            name="description"
            rules={[{ required: true, message: "Deskripsi wajib diisi!" }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Aplikasi untuk mengelola proyek"
            />
          </Form.Item>

          <Form.Item
            label="Tanggal Mulai"
            name="start_date"
            rules={[{ required: true, message: "Tanggal mulai wajib diisi!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => {
                const endDate = form.getFieldValue("end_date");
                return (
                  endDate && current && current.isAfter(dayjs(endDate), "day")
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Tanggal Selesai"
            name="end_date"
            rules={[
              { required: true, message: "Tanggal selesai wajib diisi!" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => {
                const startDate = form.getFieldValue("start_date");
                return (
                  startDate &&
                  current &&
                  current.isBefore(dayjs(startDate), "day")
                );
              }}
            />
          </Form.Item>

          <Form.Item name="status" hidden>
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createProjectMutation.isPending}
              block
            >
              Buat Proyek
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
