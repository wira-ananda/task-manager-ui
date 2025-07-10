import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ auth check in progress

  const handlePasswordVisible = () => setPasswordVisible((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_email");
    localStorage.removeItem("userData");

    setUser(null);
    setToken(null);
    setUserId(null);

    message.success("Berhasil logout.");
    window.location.href = "/login";
  };

  const refreshUser = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("auth_token");

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
        setUserId(storedUser.id || storedUser._id || null);
      } else {
        setUser(null);
        setToken(null);
        setUserId(null);
      }
    } catch (error) {
      console.error("Gagal load user dari localStorage:", error);
    } finally {
      setIsLoading(false); // ✅ auth loading selesai
    }
  };

  useEffect(() => {
    refreshUser();

    // Sync update lintas tab (opsional)
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
        token,
        isLoading,
        refreshUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
