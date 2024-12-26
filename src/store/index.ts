import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './slices/portfolioSlice';
import uiReducer from './slices/uiSlice';
import marketReducer from './slices/marketSlice';
import riskReducer from './slices/riskSlice';
import strategyReducer from './slices/strategySlice';
import profileReducer from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    ui: uiReducer,
    market: marketReducer,
    risk: riskReducer,
    strategy: strategyReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
