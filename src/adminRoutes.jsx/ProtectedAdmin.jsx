import React from "react";
import { useUserContext } from "../contexts/UserContext/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const { currentUser } = useUserContext();
  const location = useLocation();
  console.log(location.pathname);
  console.log(currentUser?.maLoaiNguoiDung);
  const url = `/sign-in?redirectTo=${location.pathname}`;
  console.log(url);

  if (!currentUser) {
    const url = `/sign-in?redirectTo=${location.pathname}`;
    console.log(url);
    // user chưa đăng nhập => redirect về trang login
    return <Navigate to={url} replace />;
  }

//   if (currentUser.maLoaiNguoiDung === "KhachHang") {
//     return <Navigate to="*" />;
//   }
  return children || Outlet;
}
