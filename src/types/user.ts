export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  profileImage?: string;
}

export interface UserProfile extends User {
  phone?: string;
  country?: string;
  timezone?: string;
  language?: string;
  currency?: string;
  twoFactorEnabled: boolean;
  notifications: NotificationSettings;
  preferences: UserPreferences;
}

export interface NotificationSettings {
  email: {
    marketing: boolean;
    security: boolean;
    updates: boolean;
    alerts: boolean;
  };
  push: {
    priceAlerts: boolean;
    portfolioUpdates: boolean;
    newsAlerts: boolean;
    securityAlerts: boolean;
  };
  sms: {
    security: boolean;
    alerts: boolean;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  dashboardLayout: string;
  defaultPortfolio?: string;
  defaultTimeframe: '1d' | '1w' | '1m' | '3m' | '1y' | 'all';
  hideBalance: boolean;
  advancedMode: boolean;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'bank' | 'crypto';
  name: string;
  isDefault: boolean;
  details: CardDetails | BankDetails | CryptoDetails;
  createdAt: string;
  updatedAt: string;
}

export interface CardDetails {
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  cardholderName: string;
}

export interface BankDetails {
  bankName: string;
  accountType: string;
  last4: string;
  routingNumber: string;
}

export interface CryptoDetails {
  address: string;
  network: string;
  label?: string;
}

export interface SecuritySettings {
  passwordLastChanged?: string;
  twoFactorMethod?: 'app' | 'sms' | 'email';
  trustedDevices: TrustedDevice[];
  loginHistory: LoginHistory[];
  activeDevices: ActiveDevice[];
}

export interface TrustedDevice {
  id: string;
  name: string;
  type: string;
  lastUsed: string;
  ipAddress: string;
}

export interface LoginHistory {
  id: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  location: string;
  status: 'success' | 'failed';
}

export interface ActiveDevice {
  id: string;
  name: string;
  type: string;
  lastActive: string;
  ipAddress: string;
  location: string;
}

export interface UserStats {
  totalPortfolios: number;
  totalAssets: number;
  totalValue: number;
  totalPnl: number;
  joinDate: string;
  lastActive: string;
  loginCount: number;
  transactionCount: number;
}

export interface UpdateProfileDTO {
  fullName?: string;
  phone?: string;
  country?: string;
  timezone?: string;
  language?: string;
  currency?: string;
  notifications?: Partial<NotificationSettings>;
  preferences?: Partial<UserPreferences>;
}
