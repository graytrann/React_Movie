import fetcher from "./fetcher";

export async function getMovieShowTimes(movieId) {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: movieId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: movieId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getTickets(showtimeId) {
  try {
    const response = await fetcher.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        maLichChieu: showtimeId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function bookingTickets(showtimeId, danhSachVe) {
  try {
    const response = await fetcher.post("/QuanLyDatVe/DatVe", {
      maLichChieu: showtimeId,
      danhSachVe: danhSachVe,
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function addMovie(movie) {
  try {
    const response = await fetcher.post(
      "/QuanLyPhim/ThemPhimUpLoadHinh",
      movie
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
