import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getMovies } from "../../apis/movieAPI";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import {
  getCinemaInfo,
  getCinemaTheater,
  createShowTime,
} from "../../apis/cinemaAPI";

const showtimeSchema = object({
  maHeThongRap: string().required("Hệ thống rạp không được để trống"),
  maRap: string().required("Rạp không được để trống"),
  rapId: string().required("Mã rạp không được để trống"),
  ngayChieuGioChieu: string().required(
    "Ngày chiếu giờ chiếu không được để trống"
  ),
  giaVe: string().required("Giá vé không được để trống"),
});

export default function AdminShowtime() {
  const [cinemaList, setCinemaList] = useState([]); // Khởi tạo state cho danh sách các rạp
  const [theaterList, setTheaterList] = useState([]); // Khởi tạo state cho danh sách các rạp theo hệ thống
  const [selectedCinema, setSelectedCinema] = useState(""); // State để lưu giá trị hệ thống rạp đã chọn
  const [selectedTheater, setSelectedTheater] = useState(""); // state quản lý rạp được chọn trong hệ thống rạp
  const [maRapList, setMaRapList] = useState([]);

  // lấy danh sách phim
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  // setUp form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      maPhim: "",
      maHeThongRap: "",
      maRap: "",
      rapId: "",
      ngayChieuGioChieu: "",
      giaVe: "",
    },
    resolver: yupResolver(showtimeSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  useEffect(() => {
    // Gọi API và cập nhật state khi component được tạo
    const fetchData = async () => {
      try {
        const response =
          await getCinemaInfo(/* cinemaId hoặc params khác tùy theo API */);
        // response chứa dữ liệu từ API (danh sách hệ thống rạp)
        setCinemaList(response);
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error(error);
      }
    };

    fetchData(); // Gọi hàm fetchData để lấy dữ liệu từ API khi component được tạo
    console.log("CÁC RẠP", cinemaList);
  }, []); // []

  // Sử dụng useEffect để gọi getCinemaTheater khi selectedCinema thay đổi
  useEffect(() => {
    if (selectedCinema) {
      try {
        const getCinemaTheaterData = async () => {
          const response = await getCinemaTheater(selectedCinema);
          console.log(response);
          setTheaterList(response);
        };
        getCinemaTheaterData();
      } catch (error) {
        console.error(error);
        setTheaterList([]);
      }
    }
  }, [selectedCinema]);

  // lấy mã rạp
  useEffect(() => {
    if (selectedTheater) {
      try {
        // Lọc maRap từ selectedTheater
        const filteredMaRapList = theaterList
          .find((theater) => theater.maCumRap === selectedTheater)
          .danhSachRap.map((rap) => rap);

        // Đưa danh sách maRap đã lọc vào state
        setMaRapList(filteredMaRapList);
        console.log(filteredMaRapList);
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    }
  }, [selectedTheater]);

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue); // In ra giá trị được chọn
    setSelectedCinema(selectedValue); // Lưu giá trị vào state nếu cần
  };

  const handleSelectCinemaChange = async (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedTheater(selectedValue);
  };

  const handleSelectCinemaIdChange = async (event) => {
    // const selectedValue = event.select.value;
    // console.log(selectedValue);
  };

  const selectMovie = (movie) => {
    setValue("maPhim", movie.maPhim);
  };

  const {
    mutate: handleCreateShowtime,
    error: errorCreateShowtime,
    isLoading: isLoadingCreateShowtime,
  } = useMutation({
    mutationFn: (payload) => createShowTime(payload),
  });

  const onSubmit = (values) => {
    handleCreateShowtime(values);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };
  return (
    <div>
      <div>
        <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
          <div>
            <div>
              <label htmlFor="">Mã phim</label>
              <input {...register("maPhim")}></input>
            </div>
            <div>
              <label htmlFor="">Hệ thống rạp</label>
              <select
                {...register("maHeThongRap")}
                onChange={handleSelectChange}
              >
                {cinemaList.map((cinema) => {
                  return (
                    <option
                      key={cinema.maHeThongRap}
                      value={cinema.maHeThongRap}
                    >
                      {cinema.maHeThongRap}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="">Rạp</label>
              <select
                {...register("maRap")}
                onChange={handleSelectCinemaChange}
              >
                {theaterList.map((theater) => {
                  return (
                    <option key={theater} value={theater.maCumRap}>
                      {theater.maCumRap}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="">Mã Rạp</label>
              <select
                {...register("rapId")}
                onChange={handleSelectCinemaIdChange}
              >
                {maRapList.map((theater) => {
                  return (
                    <option key={theater.maRap} value={theater.maRap}>
                      {theater.maRap}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="">Ngày chiếu giờ chiếu</label>
              <input
                placeholder="Ngày Khởi Chiếu"
                type="text"
                {...register("ngayChieuGioChieu")}
              />
            </div>
            <div>
              <label htmlFor="">Giá vé</label>
              <input
                placeholder="Ngày Khởi Chiếu"
                type="text"
                {...register("giaVe")}
              />
              {errors.giaVe && <p>{errors.giaVe.message}</p>}
            </div>
            <div>
              <button className="btn btn-success btn-lg" type="submit">
                TẠO LỊCH
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {movies.map((movie) => {
          return (
            <div key={movie.maPhim}>
              {movie.tenPhim}
              <button
                onClick={() => {
                  selectMovie(movie);
                }}
              >
                Chọn phim
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
