// Validate strategy name
export const validateStrategyName = (name: string): boolean => {
  return name.length >= 3 && name.length <= 50;
};

// Validate strategy description
export const validateStrategyDescription = (description: string): boolean => {
  return description.length <= 200;
};

// Validate strategy risk level
export const validateStrategyRiskLevel = (riskLevel: string): boolean => {
  return ['conservative', 'moderate', 'aggressive'].includes(riskLevel);
};

// Validate asset allocation
export const validateAssetAllocation = (allocations: number[]): boolean => {
  const totalAllocation = allocations.reduce((sum, allocation) => sum + allocation, 0);
  return totalAllocation === 100;
};

// Validate strategy rules
export const validateStrategyRules = (rules: any[]): boolean => {
  return rules.every(rule => rule.type && rule.condition && rule.action);
};

// Validate backtest parameters
export const validateBacktestParameters = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
};

// Validate strategy performance metrics
export const validatePerformanceMetrics = (metrics: any): boolean => {
  return metrics.sharpeRatio >= 0 && metrics.maxDrawdown <= 100;
};

// Validate investment amount
export const validateInvestmentAmount = (amount: number): boolean => {
  return amount > 0;
};
