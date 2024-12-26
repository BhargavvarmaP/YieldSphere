import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RiskTier } from '../../types';

interface PortfolioState {
  selectedRiskTier: RiskTier | null;
  totalValue: number;
  assets: Array<{
    symbol: string;
    amount: number;
    value: number;
  }>;
  performanceHistory: Array<{
    date: string;
    value: number;
  }>;
}

const initialState: PortfolioState = {
  selectedRiskTier: null,
  totalValue: 0,
  assets: [],
  performanceHistory: [],
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setSelectedRiskTier: (state, action: PayloadAction<RiskTier>) => {
      state.selectedRiskTier = action.payload;
    },
    updateTotalValue: (state, action: PayloadAction<number>) => {
      state.totalValue = action.payload;
    },
    updateAssets: (state, action: PayloadAction<typeof initialState.assets>) => {
      state.assets = action.payload;
    },
    addPerformanceData: (state, action: PayloadAction<{ date: string; value: number }>) => {
      state.performanceHistory.push(action.payload);
    },
  },
});

export const {
  setSelectedRiskTier,
  updateTotalValue,
  updateAssets,
  addPerformanceData,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
