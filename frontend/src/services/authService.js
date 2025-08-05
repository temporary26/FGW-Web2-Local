import api from './api.js';

export const authService = {
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success) {
        // lưu token và thông tin user vào localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // đăng nhập
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success) {
        // lưu token và thông tin user vào localStorage khi đăng nhập thành công
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // đăng xuất
  async logout() {
    try {
      // gọi api logout trên server
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // luôn luôn xóa dữ liệu local dù api có lỗi
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // lấy thông tin user hiện tại từ server
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user data' };
    }
  },

  // cập nhật thông tin profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData);
      
      if (response.data.success) {
        // cập nhật lại thông tin user trong localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' };
    }
  },

  // kiểm tra user đã đăng nhập chưa
  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user); // trả về true nếu có cả token và user
  },

  // lấy thông tin user từ localStorage
  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // lấy token từ localStorage
  getStoredToken() {
    return localStorage.getItem('token');
  }
};
