// Bridge API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://bridge.flexifunnels.com',
  ENDPOINTS: {
    LOGIN: '/api/login',
    CUSTOM_SCRIPT: 'api/customscript',
    AUTO_LOGIN: '/api/autologin',
    GET_DEVICE_LOGIN_DATA: '/api/get-device-login-data',
    GET_INVITE_LOGIN: '/api/getinvitelogin',
    GET_FUNNEL: '/api/getfunnel',
  },
  TIMEOUT: 30000,
};

// Helper to get meta tag content
export const getMetaContent = (name) => {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta ? meta.getAttribute('content') : null;
};

// Helper to set meta tag content
export const setMetaContent = (name, content) => {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

// Helper to load external script dynamically
export const loadScript = (src, isInline = false) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    
    if (isInline) {
      script.textContent = src;
      document.body.appendChild(script);
      resolve();
    } else {
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    }
  });
};
