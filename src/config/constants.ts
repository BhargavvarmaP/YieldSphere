export const APP_CONFIG = {
  // App-wide settings
  APP_NAME: 'PLIF',
  
  // API endpoints (if any)
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Feature flags
  FEATURES: {
    ENABLE_WALLET_CONNECT: true,
    ENABLE_PORTFOLIO_TRACKING: true,
  },
  
  // Risk tier settings
  RISK_TIERS: {
    LOW: {
      MIN_APY: 8,
      MAX_APY: 12,
    },
    MEDIUM: {
      MIN_APY: 12,
      MAX_APY: 20,
    },
    HIGH: {
      MIN_APY: 20,
      MAX_APY: 30,
    },
  },
} as const;
