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
