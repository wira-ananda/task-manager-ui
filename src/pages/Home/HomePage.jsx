import { Button } from "antd";
import React from "react";
import { useGlobalContext } from "../../hooks/context/useGlobalContext";

export default function HomePage() {
  const { logout } = useGlobalContext();
  return (
    <div>
      Ini Beranda{" "}
      <Button danger type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
