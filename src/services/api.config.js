// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://hair.bindunaturalworld.com',
  BATCH_ID: 'batch-50',
  ENDPOINTS: {
    LOGIN: '/membership/batch-50/login',
    DASHBOARD: '/membership/batch-50/dashboard',
    MY_LEARNING: '/membership/batch-50/my-learning',
    PROFILE: '/membership/batch-50/profile',
    CHANGE_PASSWORD: '/membership/batch-50/change-password',
    MY_PLAN: '/membership/batch-50/my-plan',
    LOGOUT: '/membership/batch-50/logout',
    // API endpoints
    API_COURSES: '/api/courses',
    API_LESSONS: '/api/lessons',
  },
  TIMEOUT: 30000, // 30 seconds
};

// Helper to build full URL
export const buildURL = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper to encode course ID
export const encodeCourseId = (courseId) => {
  const json = JSON.stringify({ fId: courseId });
  return btoa(json);
};

// Helper to decode course ID
export const decodeCourseId = (encoded) => {
  try {
    const json = atob(encoded);
    const data = JSON.parse(json);
    return data.fId;
  } catch (error) {
    console.error('Error decoding course ID:', error);
    return null;
  }
};
