import api from './api.js';

export const userService = {
  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get profile' };
    }
  },

  // Get dashboard data
  async getDashboardData() {
    try {
      const response = await api.get('/user/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get dashboard data' };
    }
  },

  // Update email
  async updateEmail(newEmail, currentPassword) {
    try {
      const response = await api.put('/user/email', {
        newEmail,
        currentPassword
      });
      
      if (response.data.success) {
        // Update stored user data if needed
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        storedUser.email = response.data.data.email;
        storedUser.isEmailVerified = response.data.data.isEmailVerified;
        localStorage.setItem('user', JSON.stringify(storedUser));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Email update failed' };
    }
  },

  // Update username
  async updateUsername(newUsername, currentPassword) {
    try {
      const response = await api.put('/user/username', {
        newUsername,
        currentPassword
      });
      
      if (response.data.success) {
        // Update stored user data
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        storedUser.username = response.data.data.username;
        localStorage.setItem('user', JSON.stringify(storedUser));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Username update failed' };
    }
  },

  // Update password
  async updatePassword(currentPassword, newPassword, confirmPassword) {
    try {
      const response = await api.put('/user/password', {
        currentPassword,
        newPassword,
        confirmPassword
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password update failed' };
    }
  },

  // Update avatar
  async updateAvatar(avatar) {
    try {
      const response = await api.put('/user/avatar', {
        avatar
      });
      
      if (response.data.success) {
        // Update stored user data
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        storedUser.avatar = response.data.data.avatar;
        localStorage.setItem('user', JSON.stringify(storedUser));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Avatar update failed' };
    }
  }
};
