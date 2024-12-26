import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RiskFactor {
  name: string;
  value: number;
  weight: number;
  trend: 'up' | 'down' | 'stable';
}

interface RiskStrategy {
  title: string;
  description: string;
  status: 'Implemented' | 'Recommended' | 'In Progress';
  impact: number;
}

interface RiskState {
  riskScore: number;
  volatility: number;
  diversificationScore: number;
  protectionLevel: number;
  riskTolerance: 'Low' | 'Moderate' | 'High';
  riskFactors: RiskFactor[];
  mitigationStrategies: RiskStrategy[];
  historicalRisk: Array<{
    timestamp: string;
    score: number;
  }>;
  recommendations: string[];
  lastAssessment: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: RiskState = {
  riskScore: 0,
  volatility: 0,
  diversificationScore: 0,
  protectionLevel: 0,
  riskTolerance: 'Moderate',
  riskFactors: [],
  mitigationStrategies: [],
  historicalRisk: [],
  recommendations: [],
  lastAssessment: '',
  isLoading: false,
  error: null,
};

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    setRiskMetrics: (
      state,
      action: PayloadAction<{
        riskScore: number;
        volatility: number;
        diversificationScore: number;
        protectionLevel: number;
      }>
    ) => {
      const { riskScore, volatility, diversificationScore, protectionLevel } = action.payload;
      state.riskScore = riskScore;
      state.volatility = volatility;
      state.diversificationScore = diversificationScore;
      state.protectionLevel = protectionLevel;
    },
    setRiskTolerance: (
      state,
      action: PayloadAction<'Low' | 'Moderate' | 'High'>
    ) => {
      state.riskTolerance = action.payload;
    },
    setRiskFactors: (state, action: PayloadAction<RiskFactor[]>) => {
      state.riskFactors = action.payload;
    },
    updateRiskFactor: (
      state,
      action: PayloadAction<{ name: string; updates: Partial<RiskFactor> }>
    ) => {
      const { name, updates } = action.payload;
      const factor = state.riskFactors.find(f => f.name === name);
      if (factor) {
        Object.assign(factor, updates);
      }
    },
    setMitigationStrategies: (state, action: PayloadAction<RiskStrategy[]>) => {
      state.mitigationStrategies = action.payload;
    },
    updateMitigationStrategy: (
      state,
      action: PayloadAction<{ title: string; updates: Partial<RiskStrategy> }>
    ) => {
      const { title, updates } = action.payload;
      const strategy = state.mitigationStrategies.find(s => s.title === title);
      if (strategy) {
        Object.assign(strategy, updates);
      }
    },
    addHistoricalRisk: (
      state,
      action: PayloadAction<{ timestamp: string; score: number }>
    ) => {
      state.historicalRisk.push(action.payload);
    },
    setRecommendations: (state, action: PayloadAction<string[]>) => {
      state.recommendations = action.payload;
    },
    setLastAssessment: (state, action: PayloadAction<string>) => {
      state.lastAssessment = action.payload;
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
  setRiskMetrics,
  setRiskTolerance,
  setRiskFactors,
  updateRiskFactor,
  setMitigationStrategies,
  updateMitigationStrategy,
  addHistoricalRisk,
  setRecommendations,
  setLastAssessment,
  setLoading,
  setError,
} = riskSlice.actions;

export default riskSlice.reducer;
