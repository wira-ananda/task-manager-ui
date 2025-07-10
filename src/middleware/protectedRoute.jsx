import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../hooks/context/useGlobalContext"; // sesuaikan path kamu
import { Spin } from "antd";

const ProtectedRoute = () => {
  const { token, isLoading } = useGlobalContext(); // atau { user, isLoading }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin tip="Memuat halaman..." size="large" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
