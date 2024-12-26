export interface HistoricalData {
  timestamp: string;
  value: number;
}

export interface TokenMetrics {
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  volume24h: string;
  marketCap: string;
  chart: HistoricalData[];
}

export interface PoolMetrics {
  name: string;
  tvl: string;
  apy: string;
  volume24h: string;
  fees24h: string;
}

export interface RiskMetrics {
  volatility: string;
  sharpeRatio: string;
  maxDrawdown: string;
  beta: string;
}