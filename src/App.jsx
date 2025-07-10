import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import ProtectedRoute from "./middleware/protectedRoute";
import ProjectDetailPage from "./pages/Project/ProjectDetailPage";

export default function App() {
  return (
    <Routes>
      {/* Halaman publik */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Halaman yang perlu login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        {/* Tambahkan route lain di sini jika perlu */}
      </Route>
    </Routes>
  );
}
