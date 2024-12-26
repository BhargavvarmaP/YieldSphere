export interface Strategy {
  id: string;
  userId: string;
  name: string;
  description: string;
  type: 'passive' | 'active' | 'automated';
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  status: 'draft' | 'active' | 'paused' | 'archived';
  performance: StrategyPerformance;
  allocation: AssetAllocation[];
  rules: StrategyRule[];
  backtestResults: BacktestResult[];
  createdAt: string;
  updatedAt: string;
}

export interface StrategyPerformance {
  returns: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
    allTime: number;
  };
  metrics: {
    sharpeRatio: number;
    sortino: number;
    alpha: number;
    beta: number;
    maxDrawdown: number;
  };
  history: Array<{
    timestamp: string;
    value: number;
    returns: number;
  }>;
}

export interface AssetAllocation {
  assetId: string;
  targetPercentage: number;
  currentPercentage: number;
  minPercentage: number;
  maxPercentage: number;
  rebalanceThreshold: number;
}

export interface StrategyRule {
  id: string;
  type: 'entry' | 'exit' | 'rebalance';
  condition: {
    indicator: string;
    operator: 'above' | 'below' | 'crosses_above' | 'crosses_below';
    value: number;
    timeframe?: string;
  };
  action: {
    type: 'buy' | 'sell' | 'rebalance';
    asset?: string;
    amount?: number;
    percentage?: number;
  };
  priority: number;
  enabled: boolean;
}

export interface BacktestResult {
  id: string;
  strategyId: string;
  period: {
    start: string;
    end: string;
  };
  parameters: Record<string, any>;
  performance: {
    totalReturns: number;
    annualizedReturns: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
  };
  trades: BacktestTrade[];
  metrics: Record<string, number>;
  createdAt: string;
}

export interface BacktestTrade {
  timestamp: string;
  type: 'entry' | 'exit';
  asset: string;
  price: number;
  quantity: number;
  value: number;
  pnl?: number;
  pnlPercentage?: number;
  rule: string;
}

export interface StrategyAlert {
  id: string;
  strategyId: string;
  type: 'performance' | 'rule' | 'rebalance';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  metadata: Record<string, any>;
  status: 'active' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export interface StrategyOptimization {
  id: string;
  strategyId: string;
  type: 'parameters' | 'allocation' | 'rules';
  status: 'pending' | 'running' | 'completed' | 'failed';
  parameters: {
    original: Record<string, any>;
    optimized: Record<string, any>;
  };
  improvements: {
    metric: string;
    originalValue: number;
    optimizedValue: number;
    percentageImprovement: number;
  }[];
  createdAt: string;
  completedAt?: string;
}

export interface CreateStrategyDTO {
  name: string;
  description: string;
  type: Strategy['type'];
  riskLevel: Strategy['riskLevel'];
  allocation: Omit<AssetAllocation, 'currentPercentage'>[];
  rules?: Omit<StrategyRule, 'id'>[];
}

export interface UpdateStrategyDTO {
  name?: string;
  description?: string;
  type?: Strategy['type'];
  riskLevel?: Strategy['riskLevel'];
  status?: Strategy['status'];
  allocation?: Partial<AssetAllocation>[];
  rules?: Partial<StrategyRule>[];
}

export interface StrategyFilters {
  search?: string;
  type?: Strategy['type'];
  riskLevel?: Strategy['riskLevel'];
  status?: Strategy['status'];
  minReturns?: number;
  maxDrawdown?: number;
  sortBy?: 'returns' | 'risk' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
