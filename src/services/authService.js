import apiClient from './apiClient';
import { API_CONFIG } from './api.config';

class AuthService {
  // Login user
  async login(email, password) {
    try {
      // First, fetch CSRF token
      await apiClient.fetchCSRFToken();

      // Create form data
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      // Submit login form
      const response = await apiClient.postForm(API_CONFIG.ENDPOINTS.LOGIN, formData);

      if (response.success) {
        // Check if redirected to dashboard
        if (response.redirected && response.url.includes('dashboard')) {
          // Store user info in localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify({ email }));
          
          return {
            success: true,
            user: { email },
          };
        }
      }

      return {
        success: false,
        error: 'Invalid credentials',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  }

  // Logout user
  async logout() {
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
      
      // Clear local storage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage even if API call fails
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      return { success: true };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Change password
  async changePassword(currentPassword, newPassword, confirmPassword) {
    try {
      const formData = new FormData();
      formData.append('current_password', currentPassword);
      formData.append('new_password', newPassword);
      formData.append('new_password_confirmation', confirmPassword);

      const response = await apiClient.postForm(
        API_CONFIG.ENDPOINTS.CHANGE_PASSWORD,
        formData
      );

      return response;
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

const authService = new AuthService();

export default authService;
