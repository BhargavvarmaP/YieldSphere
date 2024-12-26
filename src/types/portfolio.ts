export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'crypto' | 'stock' | 'commodity' | 'forex';
  price: number;
  change24h: number;
  volume24h: number;
  marketCap?: number;
  imageUrl?: string;
}

export interface Position {
  id: string;
  assetId: string;
  asset: Asset;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
  allocation: number;
}

export interface Transaction {
  id: string;
  portfolioId: string;
  assetId: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  hash?: string;
}

export interface PortfolioPerformance {
  timestamp: string;
  value: number;
  pnl: number;
  pnlPercentage: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: 'personal' | 'institutional';
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  positions: Position[];
  transactions: Transaction[];
  performance: PortfolioPerformance[];
  totalValue: number;
  totalPnl: number;
  totalPnlPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioStats {
  totalPortfolios: number;
  totalValue: number;
  totalPnl: number;
  bestPerforming: Position;
  worstPerforming: Position;
  largestPosition: Position;
  recentTransactions: Transaction[];
}

export interface PortfolioFilters {
  search?: string;
  type?: Portfolio['type'];
  riskLevel?: Portfolio['riskLevel'];
  sortBy?: 'value' | 'pnl' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CreatePortfolioDTO {
  name: string;
  description?: string;
  type: Portfolio['type'];
  riskLevel: Portfolio['riskLevel'];
}

export interface UpdatePortfolioDTO {
  name?: string;
  description?: string;
  type?: Portfolio['type'];
  riskLevel?: Portfolio['riskLevel'];
}
