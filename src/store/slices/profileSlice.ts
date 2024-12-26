import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'crypto';
  name: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
}

interface NotificationSetting {
  type: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface SecuritySetting {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'app' | 'sms' | 'email' | null;
  lastPasswordChange: string;
  loginNotifications: boolean;
  trustedDevices: string[];
}

interface ProfileState {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    timezone: string;
    avatar: string | null;
  };
  paymentMethods: PaymentMethod[];
  notificationSettings: NotificationSetting[];
  securitySettings: SecuritySetting;
  preferences: {
    language: string;
    currency: string;
    theme: 'light' | 'dark' | 'system';
    dashboardLayout: string;
  };
  verificationStatus: {
    email: boolean;
    phone: boolean;
    identity: boolean;
    address: boolean;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    country: '',
    timezone: '',
    avatar: null,
  },
  paymentMethods: [],
  notificationSettings: [],
  securitySettings: {
    twoFactorEnabled: false,
    twoFactorMethod: null,
    lastPasswordChange: '',
    loginNotifications: true,
    trustedDevices: [],
  },
  preferences: {
    language: 'en',
    currency: 'USD',
    theme: 'system',
    dashboardLayout: 'default',
  },
  verificationStatus: {
    email: false,
    phone: false,
    identity: false,
    address: false,
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setPersonalInfo: (
      state,
      action: PayloadAction<Partial<ProfileState['personalInfo']>>
    ) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    addPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethods.push(action.payload);
    },
    removePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethods = state.paymentMethods.filter(
        (method) => method.id !== action.payload
      );
    },
    setDefaultPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethods = state.paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === action.payload,
      }));
    },
    updateNotificationSettings: (
      state,
      action: PayloadAction<NotificationSetting[]>
    ) => {
      state.notificationSettings = action.payload;
    },
    updateSecuritySettings: (
      state,
      action: PayloadAction<Partial<SecuritySetting>>
    ) => {
      state.securitySettings = { ...state.securitySettings, ...action.payload };
    },
    addTrustedDevice: (state, action: PayloadAction<string>) => {
      state.securitySettings.trustedDevices.push(action.payload);
    },
    removeTrustedDevice: (state, action: PayloadAction<string>) => {
      state.securitySettings.trustedDevices = state.securitySettings.trustedDevices.filter(
        (device) => device !== action.payload
      );
    },
    updatePreferences: (
      state,
      action: PayloadAction<Partial<ProfileState['preferences']>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateVerificationStatus: (
      state,
      action: PayloadAction<Partial<ProfileState['verificationStatus']>>
    ) => {
      state.verificationStatus = { ...state.verificationStatus, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPersonalInfo,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
  updateNotificationSettings,
  updateSecuritySettings,
  addTrustedDevice,
  removeTrustedDevice,
  updatePreferences,
  updateVerificationStatus,
  setLoading,
  setError,
} = profileSlice.actions;

export default profileSlice.reducer;
