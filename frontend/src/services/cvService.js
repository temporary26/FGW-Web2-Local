import api from './api.js';

export const cvService = {
  // lấy dữ liệu cv của user
  async getCVData() {
    try {
      const response = await api.get('/cv');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch CV data' };
    }
  },

  // lưu dữ liệu cv - dùng cho cả tạo mới và cập nhật
  async saveCVData(cvData) {
    try {
      const response = await api.post('/cv', cvData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to save CV data' };
    }
  },

  // xóa cv của user
  async deleteCVData() {
    try {
      const response = await api.delete('/cv');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete CV data' };
    }
  }
};
