import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { object, string } from "yup";
import { signup } from "../../../../apis/userAPI";
import { useNavigate } from "react-router-dom";

const signupSchema = object({
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
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    resolver: yupResolver(signupSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const navigate = useNavigate();

  // sau khi form thành công
  const onSubmit = (values) => {
    console.log(values);
    // gọi API đăng ký
    handleSignup(values);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
        {/* TÀI KHOẢN INPUT  */}
        <div>
          <label htmlFor="">tài khoản</label>
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
          <input type="email" placeholder="Email" {...register("email")} />
        </div>
        {errors.email && <p>{errors.email.message}</p>}
        {/* HỌ TÊN INPUT */}
        <div>
          <label htmlFor="">Họ tên </label>
          <input type="text" placeholder="Họ tên" {...register("hoTen")} />
        </div>
        {errors.hoTen && <p>{errors.hoTen.message}</p>}
        {/* SĐT INPUT */}
        <div>
          <label htmlFor="">Số điện thoại</label>
          <input type="text" placeholder="SĐT" {...register("soDt")} />
        </div>
        {errors.soDt && <p>{errors.soDt.message}</p>}
        {/* button submit */}
        <button type="submit" disabled={isLoading}>
          Đăng Ký
        </button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
