import React from "react";
import { message, Button } from "antd";

export default function Test() {
  return (
    <div style={{ padding: "2rem" }}>
      <Button onClick={() => message.success("✅ Toast berhasil muncul!")}>
        Test Message
      </Button>
    </div>
  );
}
