export const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  API_VERSION: import.meta.env.VITE_API_VERSION || 'v1',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  
  // Web3 Configuration
  WEB3_NETWORKS: {
    ETHEREUM: {
      chainId: '0x1',
      name: 'Ethereum Mainnet',
      symbol: 'ETH',
      explorer: 'https://etherscan.io',
      rpc: import.meta.env.VITE_ETH_RPC_URL,
    },
    POLYGON: {
      chainId: '0x89',
      name: 'Polygon Mainnet',
      symbol: 'MATIC',
      explorer: 'https://polygonscan.com',
      rpc: import.meta.env.VITE_POLYGON_RPC_URL,
    },
    BSC: {
      chainId: '0x38',
      name: 'BNB Smart Chain',
      symbol: 'BNB',
      explorer: 'https://bscscan.com',
      rpc: import.meta.env.VITE_BSC_RPC_URL,
    },
  },
  
  // Authentication
  AUTH: {
    TOKEN_KEY: 'auth_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
    TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  
  // Feature Flags
  FEATURES: {
    MULTI_CHAIN: import.meta.env.VITE_FEATURE_MULTI_CHAIN === 'true',
    ADVANCED_CHARTS: import.meta.env.VITE_FEATURE_ADVANCED_CHARTS === 'true',
    RISK_ANALYSIS: import.meta.env.VITE_FEATURE_RISK_ANALYSIS === 'true',
    AI_SUGGESTIONS: import.meta.env.VITE_FEATURE_AI_SUGGESTIONS === 'true',
    SOCIAL_TRADING: import.meta.env.VITE_FEATURE_SOCIAL_TRADING === 'true',
  },
  
  // Cache Configuration
  CACHE: {
    MARKET_DATA_TTL: 60 * 1000, // 1 minute
    PORTFOLIO_DATA_TTL: 5 * 60 * 1000, // 5 minutes
    RISK_DATA_TTL: 15 * 60 * 1000, // 15 minutes
  },
  
  // Analytics
  ANALYTICS: {
    ENABLED: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
    GA_ID: import.meta.env.VITE_GA_ID,
    MIXPANEL_TOKEN: import.meta.env.VITE_MIXPANEL_TOKEN,
  },
  
  // Error Reporting
  ERROR_REPORTING: {
    ENABLED: import.meta.env.VITE_ERROR_REPORTING_ENABLED === 'true',
    SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  },
  
  // Rate Limits
  RATE_LIMITS: {
    API_CALLS_PER_MINUTE: 60,
    WEBSOCKET_MESSAGES_PER_SECOND: 10,
    MAX_CONCURRENT_REQUESTS: 5,
  },
  
  // Security
  SECURITY: {
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
    PASSWORD_EXPIRY_DAYS: 90,
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  },
} as const;

// Type for environment variables
export type EnvConfig = typeof ENV;

// Helper function to validate environment configuration
export const validateEnvConfig = (): string[] => {
  const errors: string[] = [];

  // Validate API configuration
  if (!ENV.API_URL) errors.push('API_URL is required');
  if (!ENV.API_VERSION) errors.push('API_VERSION is required');

  // Validate Web3 configuration
  Object.entries(ENV.WEB3_NETWORKS).forEach(([network, config]) => {
    if (!config.rpc) errors.push(`RPC URL for ${network} is required`);
  });

  // Validate Analytics configuration
  if (ENV.ANALYTICS.ENABLED) {
    if (!ENV.ANALYTICS.GA_ID) errors.push('Google Analytics ID is required when analytics is enabled');
    if (!ENV.ANALYTICS.MIXPANEL_TOKEN) errors.push('Mixpanel token is required when analytics is enabled');
  }

  // Validate Error Reporting configuration
  if (ENV.ERROR_REPORTING.ENABLED && !ENV.ERROR_REPORTING.SENTRY_DSN) {
    errors.push('Sentry DSN is required when error reporting is enabled');
  }

  return errors;
};
