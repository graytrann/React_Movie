import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserList } from "../../apis/userAPI";
import dayjs from "dayjs";

export default function AdminUser() {
  const {
    data: userList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userlist"],
    queryFn: getUserList,
  });
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: "20%" }}>
              Họ tên
            </th>
            <th scope="col">Email</th>
            <th scope="col">Số Điện Thoại</th>
            <th scope="col">LOẠI NGƯỜI DÙNG</th>
            <th scope="col">HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr>
                <th scope="row">{user.hoTen}</th>
                <td>{user.email}</td>
                <td>{user.soDT}</td>
                <td>
                  {user.maLoaiNguoiDung === "KhachHang"
                    ? "Khách hàng"
                    : "Quản trị"}
                </td>
                <td>
                  <button className="btn btn-danger me-3">XÓA</button>
                  <button className="btn btn-warning me-3">CẬP NHẬT</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
