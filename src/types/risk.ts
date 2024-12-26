export interface RiskProfile {
  id: string;
  userId: string;
  type: 'conservative' | 'moderate' | 'aggressive';
  score: number;
  factors: RiskFactor[];
  recommendations: RiskRecommendation[];
  createdAt: string;
  updatedAt: string;
}

export interface RiskFactor {
  id: string;
  name: string;
  category: 'market' | 'credit' | 'liquidity' | 'operational';
  impact: 'low' | 'medium' | 'high';
  probability: 'low' | 'medium' | 'high';
  score: number;
  description: string;
  mitigation?: string;
}

export interface RiskMetrics {
  volatility: number;
  beta: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  var: number; // Value at Risk
  correlations: CorrelationMatrix;
  stress: StressTestResults;
}

export interface CorrelationMatrix {
  assets: string[];
  matrix: number[][];
}

export interface StressTestResults {
  scenario: string;
  impact: number;
  affectedAssets: string[];
  recommendations: string[];
}

export interface RiskRecommendation {
  id: string;
  type: 'rebalance' | 'diversify' | 'hedge' | 'reduce';
  priority: 'low' | 'medium' | 'high';
  description: string;
  impact: number;
  implementationSteps: string[];
}

export interface RiskAssessment {
  id: string;
  portfolioId: string;
  timestamp: string;
  overallRisk: 'low' | 'medium' | 'high';
  score: number;
  metrics: RiskMetrics;
  factors: RiskFactor[];
  recommendations: RiskRecommendation[];
}

export interface RiskLimit {
  id: string;
  portfolioId: string;
  type: 'exposure' | 'loss' | 'concentration';
  metric: string;
  threshold: number;
  action: 'alert' | 'stop' | 'rebalance';
  status: 'active' | 'triggered' | 'resolved';
  createdAt: string;
  triggeredAt?: string;
}

export interface RiskReport {
  id: string;
  portfolioId: string;
  type: 'daily' | 'weekly' | 'monthly';
  period: {
    start: string;
    end: string;
  };
  summary: {
    riskScore: number;
    riskChange: number;
    topRisks: RiskFactor[];
    keyMetrics: Partial<RiskMetrics>;
  };
  details: {
    factorAnalysis: RiskFactor[];
    metricsTrend: Array<{
      timestamp: string;
      metrics: Partial<RiskMetrics>;
    }>;
    recommendations: RiskRecommendation[];
  };
  createdAt: string;
}

export interface RiskAlert {
  id: string;
  portfolioId: string;
  type: 'limit' | 'factor' | 'metric';
  severity: 'low' | 'medium' | 'high';
  message: string;
  details: any;
  status: 'active' | 'acknowledged' | 'resolved';
  createdAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
}

export interface CreateRiskProfileDTO {
  type: RiskProfile['type'];
  factors: Omit<RiskFactor, 'id'>[];
}

export interface UpdateRiskProfileDTO {
  type?: RiskProfile['type'];
  factors?: Partial<RiskFactor>[];
}
