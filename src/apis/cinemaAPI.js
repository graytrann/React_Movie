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

export async function getCinemaInfo(cinemaId) {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinHeThongRap", {
      params: {
        maHeThongRap: cinemaId,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getCinemaTheater(cinemaId) {
  try {
    const response = await fetcher.get(
      "/QuanLyRap/LayThongTinCumRapTheoHeThong",
      {
        params: {
          maHeThongRap: cinemaId,
        },
      }
    );

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getCinemaShowTimes(cinemaId) {
  try {
    const response = await fetcher.get(
      "/QuanLyRap/LayThongTinLichChieuHeThongRap",
      {
        params: {
          maHeThongRap: cinemaId,
          maNhom: "GP09",
        },
      }
    );

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function createShowTime(movie) {
  try {
    const response = await fetcher.post("/QuanLyDatVe/TaoLichChieu", movie);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
