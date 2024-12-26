import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ThemeColor = 'blue' | 'indigo' | 'purple' | 'green';

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  setThemeColor: (color: ThemeColor) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => {
    const savedColor = localStorage.getItem('themeColor') as ThemeColor;
    return savedColor || 'blue';
  });

  const [isDark, setIsDark] = useState(false);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem('themeColor', color);
    document.documentElement.setAttribute('data-theme-color', color);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      const systemDark = mediaQuery.matches;
      const isDarkMode = theme === 'system' ? systemDark : theme === 'dark';
      setIsDark(isDarkMode);
      
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);

    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  const value = {
    theme,
    themeColor,
    isDark,
    setTheme,
    setThemeColor,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
