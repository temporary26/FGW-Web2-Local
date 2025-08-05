import axios from 'axios';

// lấy url api từ biến môi trường
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// hiển thị url trong môi trường dev để debug
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}

// tạo axios instance với config cơ bản
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // cho phép gửi cookies
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // timeout 10 giây
});

// interceptor cho request - tự động thêm token vào header
api.interceptors.request.use(
  (config) => {
    // lấy token từ localStorage và thêm vào header Authorization
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor cho response - xử lý lỗi tự động
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // nếu lỗi 401 (unauthorized) và không phải là request login thì tự động logout
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
      // xóa token và user khỏi localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // chuyển về trang đăng nhập
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
