export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  PORTFOLIO: {
    ROOT: '/portfolio',
    DETAILS: '/portfolio/:id',
    CREATE: '/portfolio/create',
    EDIT: '/portfolio/:id/edit',
    ANALYSIS: '/portfolio/:id/analysis',
  },
  MARKET: {
    ROOT: '/market',
    OVERVIEW: '/market/overview',
    ASSETS: '/market/assets',
    ASSET_DETAILS: '/market/assets/:id',
    WATCHLIST: '/market/watchlist',
  },
  RISK: {
    ROOT: '/risk',
    ASSESSMENT: '/risk/assessment',
    ANALYSIS: '/risk/analysis',
    REPORTS: '/risk/reports',
  },
  STRATEGY: {
    ROOT: '/strategy',
    LIST: '/strategy/list',
    DETAILS: '/strategy/:id',
    CREATE: '/strategy/create',
    EDIT: '/strategy/:id/edit',
    COMPARE: '/strategy/compare',
  },
  PROFILE: {
    ROOT: '/profile',
    SETTINGS: '/profile/settings',
    SECURITY: '/profile/security',
    NOTIFICATIONS: '/profile/notifications',
    PAYMENT: '/profile/payment',
  },
  HELP: {
    ROOT: '/help',
    SUPPORT: '/help/support',
    DOCUMENTATION: '/help/documentation',
    FAQ: '/help/faq',
    CONTACT: '/help/contact',
  },
};

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PORTFOLIO.ROOT,
  ROUTES.PORTFOLIO.DETAILS,
  ROUTES.PORTFOLIO.CREATE,
  ROUTES.PORTFOLIO.EDIT,
  ROUTES.PORTFOLIO.ANALYSIS,
  ROUTES.MARKET.ROOT,
  ROUTES.MARKET.OVERVIEW,
  ROUTES.MARKET.ASSETS,
  ROUTES.MARKET.ASSET_DETAILS,
  ROUTES.MARKET.WATCHLIST,
  ROUTES.RISK.ROOT,
  ROUTES.RISK.ASSESSMENT,
  ROUTES.RISK.ANALYSIS,
  ROUTES.RISK.REPORTS,
  ROUTES.STRATEGY.ROOT,
  ROUTES.STRATEGY.LIST,
  ROUTES.STRATEGY.DETAILS,
  ROUTES.STRATEGY.CREATE,
  ROUTES.STRATEGY.EDIT,
  ROUTES.STRATEGY.COMPARE,
  ROUTES.PROFILE.ROOT,
  ROUTES.PROFILE.SETTINGS,
  ROUTES.PROFILE.SECURITY,
  ROUTES.PROFILE.NOTIFICATIONS,
  ROUTES.PROFILE.PAYMENT,
  ROUTES.HELP.ROOT,
  ROUTES.HELP.SUPPORT,
  ROUTES.HELP.DOCUMENTATION,
  ROUTES.HELP.FAQ,
  ROUTES.HELP.CONTACT,
];

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VERIFY_EMAIL,
];

export const getRouteParams = (route: string, params: Record<string, string>) => {
  let url = route;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value);
  });
  return url;
};
