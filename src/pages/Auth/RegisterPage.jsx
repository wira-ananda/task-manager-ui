import { Button, Form, Input, message, Spin } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { useRegisterMutation } from "../../hooks/api/useAuth";
import { useGlobalContext } from "../../hooks/context/useGlobalContext";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const { passwordVisible, handlePasswordVisible } = useGlobalContext();
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation({ navigate });

  return (
    <main className={`flex justify-center w-full h-[100vh] items-center`}>
      <div className="w-full max-w-[400px] bg-white p-8  justify-between">
        <div>
          <h2 className="text-3xl text-center font-semibold mb-2.5">
            Register
          </h2>

          <p className="block text-gray-600 text-center mb-5 text-[.8rem]">
            Masukkan detail yang diperlukan
          </p>
        </div>

        <Form
          layout="vertical"
          name="register"
          className="w-full"
          onFinish={(values) => registerMutation.mutate(values)}
        >
          <Form.Item
            name="username"
            style={{ marginBottom: 15 }}
            label={<h1 className="font-bold">Nama Lengkap</h1>}
            rules={[
              {
                required: true,
                message: "Nama lengkap wajib diisi",
              },
            ]}
          >
            <Input
              prefix={<Icon icon="mdi:account" width={20} />}
              placeholder="Masukkan Nama Lengkap"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            style={{ marginBottom: 15 }}
            label={<h1 className="font-bold">Email</h1>}
            rules={[
              { required: true, message: "Email wajib diisi!" },
              {
                type: "email",
                message: "Format email tidak valid!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Masukkan Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            style={{ marginBottom: 15 }}
            label={<h1 className="font-bold">Password</h1>}
            rules={[
              {
                required: true,
                message: "Password wajib diisi!",
              },
              { min: 6, message: "Password minimal 6 karakter!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Masukkan Password"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: handlePasswordVisible,
              }}
            />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            label={<h1 className="font-bold">Konfirmasi Password</h1>}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Konfirmasi password wajib diisi!",
              },
              { min: 6, message: "Password minimal 6 karakter!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Konfirmasi password tidak cocok!")
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="Konfirmasi Password"
              size="large"
              type={passwordVisible ? "text" : "password"}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={registerMutation.isLoading}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? <Spin /> : "Daftar"}
            </Button>
          </Form.Item>
        </Form>

        <div className="justify-center mx-auto gap-1 flex text-[.87rem]">
          <span>Sudah punya akun?</span>

          <Link
            to="/"
            className="text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            Daftar disini!
          </Link>
        </div>
      </div>
    </main>
  );
}
