import { defineStore } from 'pinia';
import { authService } from '../services/authService.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    authError: (state) => state.error
  },

  actions: {
    // Initialize auth state from localStorage
    initializeAuth() {
      const token = authService.getStoredToken();
      const user = authService.getStoredUser();
      
      if (token && user) {
        this.token = token;
        this.user = user;
        this.isAuthenticated = true;
      }
    },

    // Register new user
    async register(userData) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await authService.register(userData);
        
        if (response.success) {
          this.user = response.user;
          this.token = response.token;
          this.isAuthenticated = true;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Registration failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Login user
    async login(credentials) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await authService.login(credentials);
        
        if (response.success) {
          this.user = response.user;
          this.token = response.token;
          this.isAuthenticated = true;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Login failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Logout user
    async logout() {
      this.isLoading = true;
      
      try {
        await authService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        // Always clear state
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        this.error = null;
        this.isLoading = false;
      }
    },

    // Update user profile
    async updateProfile(userData) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await authService.updateProfile(userData);
        
        if (response.success) {
          this.user = response.user;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Profile update failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Clear error
    clearError() {
      this.error = null;
    },

    // Clear all auth state
    clearAuth() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      this.isLoading = false;
    }
  }
});
