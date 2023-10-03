import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { object, string } from "yup";
import { signup } from "../../../../apis/userAPI";
import { useNavigate } from "react-router-dom";
import formStyles from "../../components/formStyles.module.scss";

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
    <div className={`${formStyles.form}`}>
      
      <div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={`${formStyles.form_background}`}
        >
          
          <div className={`${formStyles.form_container}`}>
            {/* TÀI KHOẢN INPUT  */}
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Tài khoản</label>
              <input
                className={`${formStyles.input_taiKhoan}`}
                type="text"
                placeholder="Tài Khoản"
                {...register("taiKhoan")}
              />

              {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
            </div>
            {/* MẬT KHẨU INPUT  */}
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Mật Khẩu</label>
              <input
                className={`${formStyles.input_matKhau}`}
                type="password"
                placeholder="Mật khẩu"
                {...register("matKhau")}
              />

              {errors.matKhau && <p>{errors.matKhau.message}</p>}
            </div>
            {/* EMAIL INPUT  */}
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`${formStyles.input_email}`}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            {/* HỌ TÊN INPUT */}
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Họ tên </label>
              <input
                type="text"
                placeholder="Họ tên"
                {...register("hoTen")}
                className={`${formStyles.input_hoTen}`}
              />
              {errors.hoTen && <p>{errors.hoTen.message}</p>}
            </div>

            {/* SĐT INPUT */}
            <div className={`${formStyles.form_input}`}>
              <label htmlFor="">Số điện thoại</label>
              <input
                type="text"
                placeholder="SĐT"
                {...register("soDt")}
                className={`${formStyles.input_sdt}`}
              />
              {errors.soDt && <p>{errors.soDt.message}</p>}
            </div>

            {/* button submit */}
            <div className="text-center mt-4 ">
              <button
                className="btn btn-success btn-lg"
                type="submit"
                disabled={isLoading}
              >
                Đăng Ký
              </button>
              {error && <p>{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
