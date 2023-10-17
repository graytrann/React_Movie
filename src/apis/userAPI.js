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
    const response = await fetcher.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        maNhom: "GP09",
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetcher.post("QuanLyNguoiDung/ThemNguoiDung", user);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await fetcher.post(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      user
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export async function deleteUser(userAccount) {
  try {
    const response = await fetcher.delete("/QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: userAccount,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
