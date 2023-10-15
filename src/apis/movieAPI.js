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

// LẤY DANH SÁCH PHIM PHÂN TRANG
export async function getMoviesPanigation() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: "GP09",
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function deleteMovie(movieId) {
  try {
    const response = await fetcher.delete("/QuanLyPhim/XoaPhim", {
      params: {
        maPhim: movieId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function updateMovie(movie) {
  try {
    const response = await fetcher.post("/QuanLyPhim/CapNhatPhimUpload", movie);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// export async function deleteMovie(movieId) {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   try {
//     const response = await fetcher.delete(
//       "/QuanLyPhim/XoaPhim",
//       {
//         params: {
//           maPhim: movieId,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       }
//     );
//     return response.data?.content;
//   } catch (error) {
//     throw error.response.data.content;
//   }
// }

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
