import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    // Jika belum login, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, izinkan akses ke halaman anak (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
