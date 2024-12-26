import React, { createContext, useContext, useState } from 'react';

interface LayoutContextType {
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isNotificationsOpen: boolean;
  sidebarWidth: number;
  toggleSidebar: () => void;
  toggleSettings: () => void;
  toggleNotifications: () => void;
  setSidebarWidth: (width: number) => void;
  resetLayout: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

const DEFAULT_SIDEBAR_WIDTH = 280;

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
    if (isSettingsOpen) setIsSettingsOpen(false);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
    if (isSettingsOpen) setIsSettingsOpen(false);
  };

  const resetLayout = () => {
    setIsSidebarOpen(true);
    setIsSettingsOpen(false);
    setIsNotificationsOpen(false);
    setSidebarWidth(DEFAULT_SIDEBAR_WIDTH);
  };

  const value = {
    isSidebarOpen,
    isSettingsOpen,
    isNotificationsOpen,
    sidebarWidth,
    toggleSidebar,
    toggleSettings,
    toggleNotifications,
    setSidebarWidth,
    resetLayout,
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export default LayoutContext;
