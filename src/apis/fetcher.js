import axios from "axios";

// THƯ VIỆN GỌI API
// Setup axios instance - tạo ra cấu hình mặc định
const fetcher = axios.create({
  baseURL: "http://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjIxLzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwODQ3MzYwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA4NjIxMjAwfQ.2JFd_iMYjvwU4SaKsLmL_x-kEZcKonddkHVR7z3Gxbc",
  },
});

// Request interceptor
fetcher.interceptors.request.use((request) => {
  // kiểm tra xem user đã đăng nhập hay chưa để thêm token của user vào headers
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    // update request
    request.headers.Authorization = `Bearer ${user.accessToken}`;
  }

  // tiếp tục gửi request lên server típ
  return request;
});

// Response interceptor
fetcher.interceptors.response.use(
  // thành công thì đi vào đây , TA CÓ THỂ THAY ĐỔI RESPONSE TRƯỚC KHI TRẢ VỀ
  (response) => {
    return response;
  },
  // lỗi thì đi vào callback này
  (error) => {
    // Kiểm tra nếu lỗi là 401 => token không hợp lệ => đăng xuất
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.replace("/sign-in");
    }

    return Promise.reject(error);
  }
);

export default fetcher;
