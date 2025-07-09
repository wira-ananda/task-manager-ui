import { useState } from "react";
import { Form, Input, Spin, Button, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useLoginMutation } from "../../hooks/api/useAuth";
import { useGlobalContext } from "../../hooks/context/useGlobalContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage({}) {
  const { passwordVisible, handlePasswordVisible } = useGlobalContext();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation({ navigate });

  return (
    <main className="flex justify-center w-full h-[100vh] items-center">
      <div className="w-full max-w-[400px] bg-white p-8 justify-between items-center">
        {/* Header */}

        <div>
          <h2 className="text-3xl text-center font-semibold mb-2.5">Login</h2>
          <p className="text-gray-600 text-center mb-5 text-sm">
            Masukkan detail yang diperlukan!
          </p>
        </div>

        {/* Form Login */}
        <Form
          layout="vertical"
          name="login"
          onFinish={(values) => loginMutation.mutate(values)}
        >
          {/* Input Email atau Username */}
          <Form.Item
            name="emailOrUsername"
            label={<span className="font-bold">Email atau Username</span>}
            rules={[
              { required: true, message: "Email atau Username wajib diisi!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email atau Username"
              size="large"
            />
          </Form.Item>

          {/* Input Password */}
          <Form.Item
            name="password"
            label={<span className="font-bold">Password</span>}
            rules={[
              { required: true, message: "Password wajib diisi!" },
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

          {/* Lupa Password */}
          <div className="flex justify-end mb-3">
            <div className="cursor-pointer text-primary-dark hover:text-primary font-normal text-sm">
              Lupa Password?
            </div>
          </div>

          {/* Tombol Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loginMutation.isLoading}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <Spin /> : "Masuk"}
            </Button>
          </Form.Item>
        </Form>

        {/* Link ke halaman register */}
        <div className="text-center text-sm mt-4">
          <span>Belum punya akun? </span>
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Daftar disini!
          </Link>
        </div>
      </div>
    </main>
  );
}
