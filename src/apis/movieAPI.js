import fetcher from "./fetcher";

// LẤY BANNER
export async function getBanners() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
    // console.log(response);
    // console.log(response.data.content);
    
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

// LẤY DANH SÁCH PHIM
export async function getMovies() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP09",
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

// LẤY CHI TIẾT CỦA MỘT BỘ PHIM
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
