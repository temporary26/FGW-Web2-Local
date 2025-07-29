import api from './api.js';

export const cvService = {
  // Get user's CV data
  async getCVData() {
    try {
      const response = await api.get('/cv');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch CV data' };
    }
  },

  // Save user's CV data
  async saveCVData(cvData) {
    try {
      const response = await api.post('/cv', cvData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to save CV data' };
    }
  },

  // Delete user's CV data
  async deleteCVData() {
    try {
      const response = await api.delete('/cv');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete CV data' };
    }
  }
};
