import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../../apis/cinemaAPI";
import movieDetailsStyles from "./movieDetails.module.scss";
import dayjs from "dayjs";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MovieModal from "./MovieModal";

export default function MovieProfile({ movieId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieShowtimes"],
    queryFn: () => getMovieDetails(movieId),
    // nếu giá trị movieId là null hay undefined thì không gọi
    enabled: !!movieId,
  });
  const movie = data;
  console.log("Phim đã được chọn", data);
  const time = dayjs(data.ngayKhoiChieu).format("DD-MM-YYYY");
  return (
    <div className={movieDetailsStyles.movie}>
      <div className={movieDetailsStyles.movie_container}>
        <div
          style={{ backgroundImage: "url(" + data.hinhAnh + ")" }}
          className={movieDetailsStyles.movie_background}
        ></div>
        <div class={`${movieDetailsStyles.movie_detail} row`}>
          <div class={`${movieDetailsStyles.movie_img}  col-sm-12 col-lg-4`}>
            <img src={data.hinhAnh} alt="" />
          </div>
          <div
            class={`${movieDetailsStyles.movie_info} col-sm-12 col-lg-8 px-lg-5 px-sm-0`}
          >
            <p>{time}</p>
            <p>{data.tenPhim}</p>
            <p>
              <span className={movieDetailsStyles.movie_info_duration}>
                120 phút
              </span>{" "}
              - 10 Tix - 2D/Digital
            </p>
            <Button variant="success" onClick={handleShow}>
              Hiển Thị Thêm Thông Tin
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Thông tin chi tiết phim</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <MovieModal
                  hinhAnh={data.hinhAnh}
                  ngayKhoiChieu={data.ngayKhoiChieu}
                  tenPhim={data.tenPhim}
                  moTa={data.moTa}
                  danhGia={data.danhGia}
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
