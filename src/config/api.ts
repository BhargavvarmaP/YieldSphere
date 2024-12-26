export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY_EMAIL: '/auth/verify-email',
    RESET_PASSWORD: '/auth/reset-password',
    PROFILE: '/auth/profile',
  },
  
  // Portfolio endpoints
  PORTFOLIO: {
    LIST: '/portfolio',
    DETAILS: (id: string) => `/portfolio/${id}`,
    CREATE: '/portfolio',
    UPDATE: (id: string) => `/portfolio/${id}`,
    DELETE: (id: string) => `/portfolio/${id}`,
    PERFORMANCE: (id: string) => `/portfolio/${id}/performance`,
  },
  
  // Market data endpoints
  MARKET: {
    OVERVIEW: '/market/overview',
    ASSETS: '/market/assets',
    PRICES: '/market/prices',
    HISTORY: '/market/history',
    TRENDS: '/market/trends',
  },
  
  // Risk assessment endpoints
  RISK: {
    ANALYSIS: '/risk/analysis',
    FACTORS: '/risk/factors',
    METRICS: '/risk/metrics',
    RECOMMENDATIONS: '/risk/recommendations',
  },
  
  // Investment strategy endpoints
  STRATEGY: {
    LIST: '/strategy',
    DETAILS: (id: string) => `/strategy/${id}`,
    CREATE: '/strategy',
    UPDATE: (id: string) => `/strategy/${id}`,
    DELETE: (id: string) => `/strategy/${id}`,
    PERFORMANCE: (id: string) => `/strategy/${id}/performance`,
  },
  
  // User preferences endpoints
  PREFERENCES: {
    GET: '/preferences',
    UPDATE: '/preferences',
  },
  
  // Notification endpoints
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    SETTINGS: '/notifications/settings',
  },
};

export const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const API_TIMEOUT = 30000; // 30 seconds

export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    return {
      status: error.response.status,
      message: error.response.data.message || 'An error occurred',
      data: error.response.data,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      status: 0,
      message: 'No response from server',
      data: null,
    };
  } else {
    // Something happened in setting up the request
    return {
      status: 0,
      message: error.message || 'Request setup failed',
      data: null,
    };
  }
};
