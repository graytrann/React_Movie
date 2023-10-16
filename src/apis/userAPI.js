import fetcher from "./fetcher";

export const signin = async (payload) => {
  try {
    const response = await fetcher.post("QuanLyNguoiDung/DangNhap", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("QuanLyNguoiDung/DangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getUserList = async (payload) => {
  try {
    const response = await fetcher.get(
      "/QuanLyNguoiDung/LayDanhSachNguoiDung",
      {
        params: {
          maNhom: "GP09",
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
