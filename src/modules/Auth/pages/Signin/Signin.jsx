import React from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signin } from "../../../../apis/userAPI";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";
import formStyles from "../../components/formStyles.module.scss";

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

  const [searchParams] = useSearchParams();

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
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return (
    <div className={`${formStyles.form}`}>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={`${formStyles.form_background}`}
        >
          <div className={`${formStyles.form_container}`}>
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Tài Khoản</label>
              <input
                placeholder="Tài Khoản"
                {...register("taiKhoan")}
                className={`${formStyles.input_taiKhoan}`}
              />
              {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
            </div>
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Mật Khẩu</label>
              <input
                className={`${formStyles.input_matKhau}`}
                type="password"
                placeholder="Mật Khẩu"
                {...register("matKhau")}
              />
              {errors.matKhau && <p>{errors.matKhau.message}</p>}
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-success btn-lg"
                type="submit"
                disabled={isLoading}
              >
                Đăng Nhập
              </button>
              {error && <p>{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
