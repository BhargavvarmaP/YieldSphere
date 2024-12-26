import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  activeTab: string;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }>;
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: true,
  activeTab: 'dashboard',
  notifications: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id'>>) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  setActiveTab,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
