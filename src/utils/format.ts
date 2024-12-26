import { format as formatDate, formatDistance, formatRelative } from 'date-fns';

// Currency formatting
export const formatCurrency = (
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Percentage formatting
export const formatPercentage = (
  value: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100);
};

// Number formatting with abbreviations
export const formatNumber = (value: number, maximumFractionDigits = 2): string => {
  const lookup = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  const item = lookup.find((item) => Math.abs(value) >= item.value);

  if (item) {
    return (
      (value / item.value).toFixed(maximumFractionDigits).replace(/\.?0+$/, '') +
      item.symbol
    );
  }

  return value.toFixed(maximumFractionDigits).replace(/\.?0+$/, '');
};

// Date formatting
export const formatDateTime = (date: string | Date, format = 'PPpp'): string => {
  return formatDate(new Date(date), format);
};

// Relative time formatting
export const formatRelativeTime = (date: string | Date): string => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

// Asset symbol formatting
export const formatAssetSymbol = (symbol: string): string => {
  return symbol.toUpperCase();
};

// Address formatting
export const formatAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

// Duration formatting
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

// Risk level formatting
export const formatRiskLevel = (level: 'conservative' | 'moderate' | 'aggressive'): string => {
  const lookup = {
    conservative: 'Conservative',
    moderate: 'Moderate',
    aggressive: 'Aggressive',
  };
  return lookup[level];
};

// Transaction status formatting
export const formatTransactionStatus = (
  status: 'pending' | 'completed' | 'failed'
): { text: string; color: string } => {
  const lookup = {
    pending: { text: 'Pending', color: 'warning' },
    completed: { text: 'Completed', color: 'success' },
    failed: { text: 'Failed', color: 'error' },
  };
  return lookup[status];
};

// Phone number formatting
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumber;
};
