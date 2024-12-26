import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AssetAllocation {
  asset: string;
  percentage: number;
  value: number;
}

interface StrategyPerformance {
  returns: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

interface Strategy {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Conservative' | 'Balanced' | 'Growth' | 'Aggressive';
  allocation: AssetAllocation[];
  minInvestment: number;
  expectedReturn: string;
  rebalancingPeriod: string;
  performance: StrategyPerformance;
  isActive: boolean;
}

interface StrategyState {
  strategies: Strategy[];
  activeStrategyId: string | null;
  targetReturn: number;
  currentReturn: number;
  aum: number;
  avgHoldTime: number;
  historicalPerformance: Array<{
    timestamp: string;
    value: number;
  }>;
  isLoading: boolean;
  error: string | null;
}

const initialState: StrategyState = {
  strategies: [],
  activeStrategyId: null,
  targetReturn: 0,
  currentReturn: 0,
  aum: 0,
  avgHoldTime: 0,
  historicalPerformance: [],
  isLoading: false,
  error: null,
};

const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    setStrategies: (state, action: PayloadAction<Strategy[]>) => {
      state.strategies = action.payload;
    },
    addStrategy: (state, action: PayloadAction<Strategy>) => {
      state.strategies.push(action.payload);
    },
    updateStrategy: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Strategy> }>
    ) => {
      const { id, updates } = action.payload;
      const strategy = state.strategies.find(s => s.id === id);
      if (strategy) {
        Object.assign(strategy, updates);
      }
    },
    removeStrategy: (state, action: PayloadAction<string>) => {
      state.strategies = state.strategies.filter(s => s.id !== action.payload);
    },
    setActiveStrategy: (state, action: PayloadAction<string | null>) => {
      state.activeStrategyId = action.payload;
    },
    updateAllocation: (
      state,
      action: PayloadAction<{
        strategyId: string;
        allocation: AssetAllocation[];
      }>
    ) => {
      const { strategyId, allocation } = action.payload;
      const strategy = state.strategies.find(s => s.id === strategyId);
      if (strategy) {
        strategy.allocation = allocation;
      }
    },
    setPerformanceMetrics: (
      state,
      action: PayloadAction<{
        targetReturn: number;
        currentReturn: number;
        aum: number;
        avgHoldTime: number;
      }>
    ) => {
      const { targetReturn, currentReturn, aum, avgHoldTime } = action.payload;
      state.targetReturn = targetReturn;
      state.currentReturn = currentReturn;
      state.aum = aum;
      state.avgHoldTime = avgHoldTime;
    },
    addHistoricalPerformance: (
      state,
      action: PayloadAction<{ timestamp: string; value: number }>
    ) => {
      state.historicalPerformance.push(action.payload);
    },
    setHistoricalPerformance: (
      state,
      action: PayloadAction<Array<{ timestamp: string; value: number }>>
    ) => {
      state.historicalPerformance = action.payload;
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
  setStrategies,
  addStrategy,
  updateStrategy,
  removeStrategy,
  setActiveStrategy,
  updateAllocation,
  setPerformanceMetrics,
  addHistoricalPerformance,
  setHistoricalPerformance,
  setLoading,
  setError,
} = strategySlice.actions;

export default strategySlice.reducer;
