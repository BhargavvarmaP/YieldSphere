import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarketNews {
  id: string;
  title: string;
  content: string;
  source: string;
  timestamp: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
}

interface TopMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

interface SectorPerformance {
  name: string;
  change: number;
  volume: string;
  marketCap: number;
}

interface MarketState {
  marketCap: number;
  volume24h: number;
  globalIndex: number;
  volatility: number;
  news: MarketNews[];
  topMovers: TopMover[];
  sectors: SectorPerformance[];
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: MarketState = {
  marketCap: 0,
  volume24h: 0,
  globalIndex: 0,
  volatility: 0,
  news: [],
  topMovers: [],
  sectors: [],
  lastUpdated: '',
  isLoading: false,
  error: null,
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketMetrics: (
      state,
      action: PayloadAction<{
        marketCap: number;
        volume24h: number;
        globalIndex: number;
        volatility: number;
      }>
    ) => {
      const { marketCap, volume24h, globalIndex, volatility } = action.payload;
      state.marketCap = marketCap;
      state.volume24h = volume24h;
      state.globalIndex = globalIndex;
      state.volatility = volatility;
    },
    setMarketNews: (state, action: PayloadAction<MarketNews[]>) => {
      state.news = action.payload;
    },
    addMarketNews: (state, action: PayloadAction<MarketNews>) => {
      state.news.unshift(action.payload);
    },
    setTopMovers: (state, action: PayloadAction<TopMover[]>) => {
      state.topMovers = action.payload;
    },
    setSectorPerformance: (state, action: PayloadAction<SectorPerformance[]>) => {
      state.sectors = action.payload;
    },
    setLastUpdated: (state, action: PayloadAction<string>) => {
      state.lastUpdated = action.payload;
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
  setMarketMetrics,
  setMarketNews,
  addMarketNews,
  setTopMovers,
  setSectorPerformance,
  setLastUpdated,
  setLoading,
  setError,
} = marketSlice.actions;

export default marketSlice.reducer;
