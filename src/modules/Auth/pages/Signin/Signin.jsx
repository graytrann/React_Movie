import React from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signin } from "../../../../apis/userAPI";
import { useNavigate, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";

const signupSchema = object({
  taiKhoan: string().required("Tài Khoản không được để trống"),
  matKhau: string()
    .required("Mật Khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mat Khau It Nhat 8 ki tu, 1 ky tu thuong va 1 so"
    ),
});
export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signupSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();
  const {
    mutate: handleSignin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      // key data là dữ liệu api trả về
      console.log("data đã đăng nhập", data); //FROM API
      // localStorage.setItem("currentUser", JSON.stringify(data));
      onSigninSuccess(data); // from UserContext
      // navigate("/");
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    handleSignin(values);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };

  // currentUser khác null => User đã đăng nhập , điều hướng về Home
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>ĐĂNG NHẬP</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <input placeholder="Tài Khoản" {...register("taiKhoan")} />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Mật Khẩu"
            {...register("matKhau")}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          Đăng Nhập
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
