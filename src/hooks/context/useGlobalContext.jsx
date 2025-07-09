import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const handlePasswordVisible = () => setPasswordVisible((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_email");
    localStorage.removeItem("userData");

    window.location.href = "/login";
    message.success("Berhasil logout.");
  };

  const refreshUser = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
        setUserId(storedUser.id || storedUser._id || null);
      }
    } catch (error) {
      console.error("Gagal load user dari localStorage:", error);
    }
  };

  useEffect(() => {
    refreshUser();

    // Jika ingin bisa auto update lintas tab (opsional)
    window.addEventListener("storage", refreshUser);
    return () => window.removeEventListener("storage", refreshUser);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        passwordVisible,
        handlePasswordVisible,
        logout,
        userId,
        user,
        refreshUser, // expose fungsi refresh
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
