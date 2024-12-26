export const COLORS = {
  primary: {
    50: '#e6f1fe',
    100: '#cce3fd',
    200: '#99c7fb',
    300: '#66aaf9',
    400: '#338ef7',
    500: '#0072f5',
    600: '#005bc4',
    700: '#004493',
    800: '#002e62',
    900: '#001731',
  },
  success: {
    50: '#e8fbf2',
    100: '#d1f7e4',
    200: '#a3efc9',
    300: '#75e7ae',
    400: '#47df93',
    500: '#19d778',
    600: '#14ac60',
    700: '#0f8148',
    800: '#0a5630',
    900: '#052b18',
  },
  warning: {
    50: '#fff9e6',
    100: '#fff3cc',
    200: '#ffe799',
    300: '#ffdb66',
    400: '#ffcf33',
    500: '#ffc300',
    600: '#cc9c00',
    700: '#997500',
    800: '#664e00',
    900: '#332700',
  },
  error: {
    50: '#fee6e6',
    100: '#fdcccc',
    200: '#fb9999',
    300: '#f96666',
    400: '#f73333',
    500: '#f50000',
    600: '#c40000',
    700: '#930000',
    800: '#620000',
    900: '#310000',
  },
  neutral: {
    50: '#f8f9fa',
    100: '#f1f3f5',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
};

export const FONTS = {
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    'sans-serif',
  ].join(','),
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ].join(','),
};

export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const TRANSITIONS = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  pageLoad: '200ms',
  modalOpen: '300ms',
};

export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

export const ANIMATION = {
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};
