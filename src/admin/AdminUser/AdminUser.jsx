import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createUser, getUserList, updateUser } from "../../apis/userAPI";
import dayjs from "dayjs";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu ít nhất 8 kí tự và không được để trống,1 ký tự hoa, 1 ký tự thường và 1 ký tự số "
    ),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Họ tên không được để trống"),
  soDt: string().required("Số điện thoại không được để trống"),
  maLoaiNguoiDung: string().required("Mã người dùng không được để trống"),
});

export default function AdminUser() {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
      maLoaiNguoiDung: "",
      maNhom: "",
    },
    resolver: yupResolver(userSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const {
    mutate: handleCreateUser,
    error: errorCreateUser,
    isLoading: isLoadingCreateUser,
  } = useMutation({
    mutationFn: (payload) => createUser(payload),
  });

  const {
    data: userList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userlist"],
    queryFn: getUserList,
  });

  // sau khi form thành công
  // const onSubmit = (values) => {
  //   console.log(values);
  //   // gọi API tạo tài khoản
  //   handleCreateUser(values);
  // };
  const onSubmit = (values) => {
    if (isUpdating) {
      // Thực hiện hàm cập nhật
      updateUser(values);
    } else {
      // Thực hiện hàm thêm mới
      handleCreateUser(values);
    }
    queryClient.invalidateQueries(["userlist"]);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };

  const selectUser = (user) => {
    // Lấy giá trị tên bộ phim và gán vào các trường
    setValue("taiKhoan", user.taiKhoan);
    setValue("matKhau", user.matKhau);
    setValue("email", user.email);
    setValue("hoTen", user.hoTen);
    setValue("soDt", user.soDT);
    setValue("maLoaiNguoiDung", user.maLoaiNguoiDung);
    setValue("maNhom", user.maNhom);
    setIsUpdating(!isUpdating);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div>
                {/* TÀI KHOẢN INPUT  */}
                <div>
                  <label htmlFor="">Tài khoản</label>
                  <input
                    type="text"
                    placeholder="Tài Khoản"
                    {...register("taiKhoan")}
                  />

                  {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
                </div>
                {/* MẬT KHẨU INPUT  */}
                <div>
                  <label htmlFor="">Mật Khẩu</label>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    {...register("matKhau")}
                  />

                  {errors.matKhau && <p>{errors.matKhau.message}</p>}
                </div>
                {/* EMAIL INPUT  */}
                <div>
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>

                {/* HỌ TÊN INPUT */}
                <div>
                  <label htmlFor="">Họ tên </label>
                  <input
                    type="text"
                    placeholder="Họ tên"
                    {...register("hoTen")}
                  />
                  {errors.hoTen && <p>{errors.hoTen.message}</p>}
                </div>

                {/* SĐT INPUT */}
                <div>
                  <label htmlFor="">Số điện thoại</label>
                  <input type="text" placeholder="SĐT" {...register("soDt")} />
                  {errors.soDt && <p>{errors.soDt.message}</p>}
                </div>

                <div>
                  <label htmlFor="">Loại người dùng</label>
                  {/* <input
                    type="text"
                    placeholder="Mã loại người dùng"
                    {...register("maLoaiNguoiDung")}
                  /> */}
                  <select id="cars" {...register("maLoaiNguoiDung")}>
                    <option value="KhachHang">Khách Hàng</option>
                    <option value="QuanTri">Quản trị</option>
                  </select>

                  {errors.maLoaiNguoiDung && (
                    <p>{errors.maLoaiNguoiDung.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="">Mã nhóm</label>
                  <input
                    type="text"
                    placeholder="Mã Nhóm"
                    {...register("maNhom")}
                  />
                  {errors.maNhom && <p>{errors.maNhom.message}</p>}
                </div>

                {/* button submit */}
                <div className="text-center mt-4">
                  {isUpdating ? (
                    <button
                      className="btn btn-success btn-lg"
                      type="submit"
                      disabled={isLoading}
                    >
                      CẬP NHẬT
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-lg"
                      type="submit"
                      disabled={isLoading}
                    >
                      THÊM NGƯỜI DÙNG
                    </button>
                  )}
                  {error && <p>{error}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
                    <button
                      className="btn btn-warning me-3"
                      onClick={() => selectUser(user)}
                    >
                      CẬP NHẬT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
