import { createContext, useContext, useState, useEffect } from "react";
import palette from "../../utils/palette";
import { message } from "antd";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisible = () => setPasswordVisible((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_email");
    localStorage.removeItem("userData");

    window.location.href = "/login";
    message.success("Berhasil logout.");
  };

  return (
    <GlobalContext.Provider
      value={{ passwordVisible, handlePasswordVisible, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
