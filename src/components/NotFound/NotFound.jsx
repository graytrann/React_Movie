import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  // biến điều hướng
  const navigate = useNavigate();
  return (
    <div>
      <h1>TRANG NOT FOUND</h1>
      <button onClick={() => navigate("/")}>QUAY VỀ TRANG CHỦ</button>
    </div>
  );
}
