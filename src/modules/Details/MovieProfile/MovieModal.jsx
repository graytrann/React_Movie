import React from "react";
import dayjs from "dayjs";

export default function MovieModal({
  hinhAnh,
  ngayKhoiChieu,
  tenPhim,
  moTa,
  danhGia,
}) {
  const time = dayjs(ngayKhoiChieu).format("DD-MM-YYYY");
  return (
    <div>
      <div className="text-center pt-1 pb-5 ">
        <img className="border border-white" src={hinhAnh} width={300} alt="" />
      </div>
      <p>Tên Phim : {tenPhim}</p>
      <p>Ngày Công Chiếu : {time}</p>
      <p>Đạo Diễn : Gray Trann</p>
      <p>Diễn Viên : Khánh Wolf, Chim Sẻ, Faker ...</p>
      <p>Mô Tả Phim : {moTa}</p>
      <p>Đánh Giá : {danhGia} sao</p>
    </div>
  );
}
