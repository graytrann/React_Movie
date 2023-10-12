import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../apis/cinemaAPI";
import dayjs from "dayjs";

export default function AddMovie() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
  });

  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    // chạy vào useEffect call back khi giá trị của hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  }, [hinhAnh]);

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP09");
      console.log(formData);
      return addMovie(formData);
    },
    onSuccess: () => {
      // Đóng modal hoặc chuyển trang
      // Sử dụng queryClient.invalidateQueris để gọi lại API get danh sách phim
    },
    onError: () => {},
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div>
          <input placeholder="Tên Phim" type="text" {...register("tenPhim")} />
        </div>
        <div>
          <input placeholder="Bí Danh" type="text" {...register("biDanh")} />
        </div>
        <div>
          <input placeholder="Mô Tả" type="text" {...register("moTa")} />
        </div>
        <div>
          <input
            placeholder="Hình Ảnh"
            multiple
            type="file"
            {...register("hinhAnh")}
          />
        </div>
        {imgPreview && (
          <div>
            <img width={300} height={300} src={imgPreview} alt="" />
          </div>
        )}
        <div>
          <input placeholder="Trailer" type="text" {...register("trailer")} />
        </div>
        <div>
          <input
            placeholder="Ngày Khởi Chiếu"
            type="date"
            {...register("ngayKhoiChieu", {
              setValueAs: (value) => {
                return dayjs(value).format("DD/MM/YYYY");
              },
            })}
          />
        </div>

        <button>Thêm Phim</button>
      </form>
    </div>
  );
}
