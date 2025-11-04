import { API_CONFIG, buildURL } from './api.config';

class APIClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.csrfToken = null;
  }

  // Get CSRF token from cookies
  getCSRFToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  // Get session token from cookies
  getSessionToken() {
    const match = document.cookie.match(/laravel_session=([^;]+)/);
    return match ? match[1] : null;
  }

  // Fetch CSRF token from server
  async fetchCSRFToken() {
    try {
      const response = await fetch(buildURL('/sanctum/csrf-cookie'), {
        method: 'GET',
        credentials: 'include',
      });
      this.csrfToken = this.getCSRFToken();
      return this.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  }

  // Make authenticated request
  async request(endpoint, options = {}) {
    const url = buildURL(endpoint);
    
    // Ensure CSRF token is available
    if (!this.csrfToken) {
      this.csrfToken = this.getCSRFToken();
    }

    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // Add CSRF token for non-GET requests
    if (options.method && options.method !== 'GET') {
      defaultHeaders['X-CSRF-TOKEN'] = this.csrfToken;
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // Include cookies
    };

    try {
      const response = await fetch(url, config);
      
      // Handle redirects
      if (response.redirected) {
        return {
          success: true,
          redirected: true,
          url: response.url,
        };
      }

      // Parse response
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return {
        success: true,
        data,
        status: response.status,
      };
    } catch (error) {
      console.error('API Request Error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // POST form data
  async postForm(endpoint, formData) {
    const url = buildURL(endpoint);
    
    // Get CSRF token
    if (!this.csrfToken) {
      this.csrfToken = this.getCSRFToken();
    }

    // Add CSRF token to form data
    if (this.csrfToken) {
      formData.append('_token', this.csrfToken);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      // Handle redirects
      if (response.redirected) {
        return {
          success: true,
          redirected: true,
          url: response.url,
        };
      }

      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      return {
        success: response.ok,
        data,
        status: response.status,
      };
    } catch (error) {
      console.error('Form submission error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create singleton instance
const apiClient = new APIClient();

export default apiClient;
