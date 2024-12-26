export interface RiskTier {
  name: string;
  description: string;
  allocation: {
    stablecoins: number;
    blueChip: number;
    altcoins: number;
  };
  apy: string;
  tvl: string;
}

export interface PortfolioStats {
  totalValue: string;
  dailyChange: string;
  monthlyYield: string;
  yearlyYield: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'yield';
  amount: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  asset: string;
}

export interface AssetAllocation {
  asset: string;
  percentage: number;
  value: string;
  change24h: string;
}

export interface YieldMetrics {
  period: string;
  yield: string;
  benchmark: string;
}