import axios from 'axios';
import { API_CONFIG } from './config';

// Create axios instance
const bridgeApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token if available
bridgeApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
bridgeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

/**
 * Auto login API call
 * @param {Object} payload - Login credentials
 * @returns {Promise} API response
 */
export const autoLogin = async (payload) => {
  try {
    const response = await bridgeApi.post(API_CONFIG.ENDPOINTS.AUTO_LOGIN, payload);
    return response.data;
  } catch (error) {
    console.error('Auto login error:', error);
    throw error;
  }
};

export const Login = async (payload) => {
  try {
    const response = await bridgeApi.post(API_CONFIG.ENDPOINTS.LOGIN, payload);
    return response.data;
  } catch (error) {
    console.error('Auto login error:', error);
    throw error;
  }
};

/**
 * Get device login data
 * @param {Object} payload - Device information
 * @returns {Promise} API response
 */
export const getDeviceLoginData = async (payload) => {
  try {
    const response = await bridgeApi.post(API_CONFIG.ENDPOINTS.GET_DEVICE_LOGIN_DATA, payload);
    return response.data;
  } catch (error) {
    console.error('Get device login data error:', error);
    throw error;
  }
};

/**
 * Get invite login
 * @param {Object} payload - Invite code data
 * @returns {Promise} API response with step_url
 */
export const getInviteLogin = async (payload) => {
  try {
    const response = await bridgeApi.post(API_CONFIG.ENDPOINTS.GET_INVITE_LOGIN, payload);
    return response.data;
  } catch (error) {
    console.error('Get invite login error:', error);
    throw error;
  }
};

/**
 * Get funnel configuration
 * @param {Object} payload - Contains funnel_id
 * @returns {Promise} API response with funnel data
 */
export const getFunnel = async (payload) => {
  try {
    const response = await bridgeApi.post(API_CONFIG.ENDPOINTS.GET_FUNNEL, payload);
    return response.data;
  } catch (error) {
    console.error('Get funnel error:', error);
    throw error;
  }
};

export const getcustomscript = async (payload) => {
  try {
    const response = await bridgeApi.post(API_CONFIG.ENDPOINTS.CUSTOM_SCRIPT, payload);
    return response.data;
  } catch (error) {
    console.error('Get funnel error:', error);
    throw error;
  }
};

export default bridgeApi;
