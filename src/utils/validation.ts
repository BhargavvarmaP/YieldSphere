// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// Password strength validation
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
  if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
  if (!hasNumbers) errors.push('Password must contain at least one number');
  if (!hasSpecialChar) errors.push('Password must contain at least one special character');

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Phone number validation
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

// Ethereum address validation
export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Amount validation
export const isValidAmount = (
  amount: number,
  options: { min?: number; max?: number } = {}
): boolean => {
  if (typeof amount !== 'number' || isNaN(amount)) return false;
  if (options.min !== undefined && amount < options.min) return false;
  if (options.max !== undefined && amount > options.max) return false;
  return true;
};

// Date validation
export const isValidDate = (date: string): boolean => {
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
};

// Portfolio allocation validation
export const validateAllocation = (allocation: number[]): boolean => {
  const sum = allocation.reduce((acc, val) => acc + val, 0);
  return Math.abs(sum - 100) < 0.01; // Allow for small floating-point errors
};

// Risk level validation
export const isValidRiskLevel = (
  level: string
): level is 'conservative' | 'moderate' | 'aggressive' => {
  return ['conservative', 'moderate', 'aggressive'].includes(level);
};

// Transaction validation
export const validateTransaction = (
  type: 'buy' | 'sell',
  amount: number,
  balance: number,
  price: number
): { isValid: boolean; error?: string } => {
  if (!isValidAmount(amount, { min: 0 })) {
    return { isValid: false, error: 'Invalid amount' };
  }

  if (type === 'buy') {
    if (amount * price > balance) {
      return { isValid: false, error: 'Insufficient balance' };
    }
  } else if (type === 'sell') {
    if (amount > balance) {
      return { isValid: false, error: 'Insufficient assets' };
    }
  }

  return { isValid: true };
};

// Form validation
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => boolean | string>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const errors: Partial<Record<keyof T, string>> = {};

  Object.entries(rules).forEach(([field, validator]) => {
    const result = validator(data[field]);
    if (typeof result === 'string') {
      errors[field as keyof T] = result;
    } else if (!result) {
      errors[field as keyof T] = `Invalid ${field}`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// API response validation
export const validateApiResponse = <T>(
  response: any,
  schema: Record<keyof T, string>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  Object.entries(schema).forEach(([key, type]) => {
    if (!(key in response)) {
      errors.push(`Missing required field: ${key}`);
    } else if (typeof response[key] !== type) {
      errors.push(`Invalid type for field ${key}: expected ${type}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
