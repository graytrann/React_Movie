import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../apis/cinemaAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { getMovies, deleteMovie, updateMovie } from "../../apis/movieAPI.js";
import { useQuery } from "@tanstack/react-query";
import adminMovieStyles from "./adminMovie.module.scss";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const movieFormSchema = object({
  tenPhim: string().required("Tên phim không được để trống"),
  biDanh: string().required("Bí danh không được để trống"),
  moTa: string().required("Mô tả không được để trống"),
  // hinhAnh: string().required("Hình ảnh không được để trống"),
  trailer: string().required("Trailer không được để trống"),
  ngayKhoiChieu: string().required("Ngày khởi chiếu không được để trống"),
});

export default function AddMovie() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //SweetAlert
  const MySwal = withReactContent(Swal);

  // lấy danh sách phim
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
    resolver: yupResolver(movieFormSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const picture = watch("hinhAnh");

  const [imgPreview, setImgPreview] = useState("");
  // const [idFromSelect, setIdFromSelect] = useState("");
  // const [nameFromSelect, setNameFromSelect] = useState("");
  // const [biDanhFromSelect, setBiDanhFromSelect] = useState("");
  // const [moTaFromSelect, setMoTaFromSelect] = useState("");
  // const [trailerFromSelect, setTrailerFromSelect] = useState("");
  // const [ngayKhoiChieuFromSelect, setNgayKhoiChieuFromSelect] = useState("");

  const [formValues, setFormValues] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    moTa: "",
    hinhAnh: "",
    trailer: "",
    ngayKhoiChieu: "",
  });

  const [value, setValue] = useState({}); // Khởi tạo giá trị ban đầu của input

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue); // In ra giá trị mỗi khi người dùng gõ

    // Lưu giá trị vào state
    setValue(inputValue);
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    console.log(formValues);
  };

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
      console.log(formValues);
      return addMovie(formData);
    },
    onSuccess: () => {
      // Đóng modal hoặc chuyển trang
      // Sử dụng queryClient.invalidateQueris để gọi lại API get danh sách phim
    },
    onError: () => {},
  });

  useEffect(() => {
    // chạy vào useEffect call back khi giá trị của hinhAnh bị thay đổi
    const file = picture?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  }, [picture]);

  // xóa phim
  const handleDeleteMovie = (maPhim) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteMovie(maPhim)
            .then(() => {
              console.log("thành công xóa");
            })
            .catch((error) => {
              // Xử lý lỗi nếu có.
              console.error("Lỗi xóa phim:", error);
            });
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "PHIM BỊ XÓA RỒI HUHU :<.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "PHIM CỦA BẠN VẪN AN TOÀN =))",
            "error"
          );
        }
      });
  };

  const selectMovie = (movie) => {
    // setIdFromSelect(movie.maPhim);
    // setNameFromSelect(movie.tenPhim);
    // setBiDanhFromSelect(movie.biDanh);
    // setMoTaFromSelect(movie.moTa);
    // setTrailerFromSelect(movie.trailer);
    // setNgayKhoiChieuFromSelect(movie.ngayKhoiChieu);
    // setImgPreview(movie.hinhAnh);
    // console.log(movie.hinhAnh);
    setImgPreview(movie.hinhAnh);
    setFormValues({
      ...formValues,
      maPhim: movie.maPhim,
      tenPhim: movie.tenPhim,
      biDanh: movie.biDanh,
      moTa: movie.moTa,
      hinhAnh: movie.hinhAnh,
      trailer: movie.trailer,
      ngayKhoiChieu: movie.ngayKhoiChieu,
    });
    console.log(formValues);
    handleShow();
  };

  const handleUpdateMovie = (movie) => {
    const formData = new FormData();
    formData.append("maPhim", formValues.maPhim);
    formData.append("tenPhim", formValues.tenPhim);
    formData.append("biDanh", formValues.biDanh);
    formData.append("moTa", formValues.moTa);
    formData.append("hinhAnh", formValues.hinhAnh);
    formData.append("trailer", formValues.trailer);
    formData.append("ngayKhoiChieu", formValues.ngayKhoiChieu);
    formData.append("maNhom", "GP09");
    return updateMovie(formData);
  };

  return (
    <div className={`${adminMovieStyles.movieAdmin}`}>
      <div className={`${adminMovieStyles.container}`}>
        <div className={`row ${adminMovieStyles.form}`}>
          <div className="col-6">
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <div className={`row ${adminMovieStyles.input_container}`}>
                <input
                  name="tenPhim"
                  type="text"
                  placeholder="Tên Phim"
                  {...register("tenPhim")}
                  className={`${adminMovieStyles.form_input}`}
                  onChange={handleChange}
                />
                {errors.tenPhim && <p>{errors.tenPhim.message}</p>}
              </div>
              <div className={`row ${adminMovieStyles.input_container}`}>
                <input
                  placeholder="Bí Danh"
                  name="biDanh"
                  type="text"
                  {...register("biDanh")}
                  className={`${adminMovieStyles.form_input}`}
                />
                {errors.biDanh && <p>{errors.biDanh.message}</p>}
              </div>
              <div className={`row ${adminMovieStyles.input_container}`}>
                <input
                  placeholder="Mô Tả"
                  type="text"
                  {...register("moTa")}
                  className={`${adminMovieStyles.form_input}`}
                />
                {errors.moTa && <p>{errors.moTa.message}</p>}
              </div>
              <div className={`row ${adminMovieStyles.input_container}`}>
                <input
                  placeholder="Hình Ảnh"
                  multiple
                  type="file"
                  {...register("hinhAnh")}
                  className={`${adminMovieStyles.form_input}`}
                />
              </div>

              <div className={`row ${adminMovieStyles.input_container}`}>
                <input
                  placeholder="Trailer"
                  type="text"
                  {...register("trailer")}
                  className={`${adminMovieStyles.form_input}`}
                />
                {errors.trailer && <p>{errors.trailer.message}</p>}
              </div>
              <div className={`row ${adminMovieStyles.input_container}`}>
                <input
                  placeholder="Ngày Khởi Chiếu"
                  type="date"
                  {...register("ngayKhoiChieu", {
                    setValueAs: (value) => {
                      return dayjs(value).format("DD/MM/YYYY");
                    },
                  })}
                  className={`${adminMovieStyles.form_input}`}
                />
                {errors.ngayKhoiChieu && <p>{errors.ngayKhoiChieu.message}</p>}
              </div>

              <button>Thêm Phim</button>
              <button onClick={() => handleUpdateMovie()}>Sửa Phim</button>
            </form>
          </div>
          <div className={`col-6 ${adminMovieStyles.image_input}`}>
            {imgPreview && (
              <div>
                <img width={300} height={300} src={imgPreview} alt="" />
              </div>
            )}
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">MÃ PHIM</th>
                <th scope="col">TÊN PHIM</th>
                <th scope="col">NGÀY KHỞI CHIẾU</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((movie) => {
                const day = dayjs(movie.ngayKhoiChieu).format("DD-MM-YYYY");
                return (
                  <tr>
                    <th scope="row">{movie.maPhim}</th>
                    <td>{movie.tenPhim}</td>
                    <td>{day}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteMovie(movie.maPhim)}
                        className="btn btn-danger me-3"
                      >
                        XÓA
                      </button>
                      <button
                        onClick={() => selectMovie(movie)}
                        className="btn btn-warning me-3"
                      >
                        LỰA PHIM
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>CẬP NHẬT PHIM</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input
                type="text"
                placeholder="Mã Phim"
                name="maPhim"
                value={formValues.maPhim}
                disabled
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Tên Phim"
                name="tenPhim"
                value={formValues.tenPhim}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="biDanh"
                placeholder="Bí Danh"
                value={formValues.biDanh}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Mô tả"
                name="moTa"
                value={formValues.moTa}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="file"
                placeholder="Hình ảnh"
                name="hinhAnh"
                // value={formValues.hinhAnh}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Trailer"
                name="trailer"
                value={formValues.trailer}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Ngày khởi chiếu"
                name="ngayKhoiChieu"
                value={formValues.ngayKhoiChieu}
                onChange={handleChange}
              />
              {formValues.ngayKhoiChieu}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <button onClick={handleUpdateMovie}>CẬP NHẬT</button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
