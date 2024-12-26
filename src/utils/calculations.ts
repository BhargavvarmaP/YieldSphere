// Calculate percentage change
export const calculatePercentageChange = (
  currentValue: number,
  previousValue: number
): number => {
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
};

// Calculate portfolio value
export const calculatePortfolioValue = (positions: Array<{ quantity: number; price: number }>) => {
  return positions.reduce((total, position) => {
    return total + position.quantity * position.price;
  }, 0);
};

// Calculate portfolio returns
export const calculateReturns = (
  initialValue: number,
  currentValue: number,
  timeInYears: number
): {
  totalReturn: number;
  annualizedReturn: number;
} => {
  const totalReturn = ((currentValue - initialValue) / initialValue) * 100;
  const annualizedReturn =
    (Math.pow(currentValue / initialValue, 1 / timeInYears) - 1) * 100;

  return {
    totalReturn,
    annualizedReturn,
  };
};

// Calculate Sharpe Ratio
export const calculateSharpeRatio = (
  returns: number[],
  riskFreeRate: number
): number => {
  const averageReturn = returns.reduce((a, b) => a + b) / returns.length;
  const standardDeviation = Math.sqrt(
    returns.reduce((sq, n) => sq + Math.pow(n - averageReturn, 2), 0) /
      (returns.length - 1)
  );

  return (averageReturn - riskFreeRate) / standardDeviation;
};

// Calculate Maximum Drawdown
export const calculateMaxDrawdown = (values: number[]): number => {
  let maxDrawdown = 0;
  let peak = values[0];

  for (const value of values) {
    if (value > peak) {
      peak = value;
    }
    const drawdown = ((peak - value) / peak) * 100;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  }

  return maxDrawdown;
};

// Calculate Risk-adjusted Returns
export const calculateRiskAdjustedReturns = (
  returns: number[],
  riskFreeRate: number
): {
  sharpeRatio: number;
  sortinoRatio: number;
  treynorRatio: number;
} => {
  const averageReturn = returns.reduce((a, b) => a + b) / returns.length;
  const standardDeviation = Math.sqrt(
    returns.reduce((sq, n) => sq + Math.pow(n - averageReturn, 2), 0) /
      (returns.length - 1)
  );

  // Calculate downside deviation (for Sortino ratio)
  const downsideReturns = returns.filter((r) => r < 0);
  const downsideDeviation = Math.sqrt(
    downsideReturns.reduce((sq, n) => sq + Math.pow(n, 2), 0) /
      downsideReturns.length
  );

  // Calculate beta (for Treynor ratio)
  const marketReturns = returns.map((r) => r * 1.2); // Simplified market correlation
  const beta =
    returns.reduce((sum, r, i) => sum + r * marketReturns[i], 0) /
    marketReturns.reduce((sum, r) => sum + r * r, 0);

  return {
    sharpeRatio: (averageReturn - riskFreeRate) / standardDeviation,
    sortinoRatio: (averageReturn - riskFreeRate) / downsideDeviation,
    treynorRatio: (averageReturn - riskFreeRate) / beta,
  };
};

// Calculate Position Size
export const calculatePositionSize = (
  portfolioValue: number,
  riskPercentage: number,
  stopLossPercentage: number
): number => {
  const riskAmount = portfolioValue * (riskPercentage / 100);
  return (riskAmount / (stopLossPercentage / 100));
};

// Calculate Asset Allocation
export const calculateAssetAllocation = (
  positions: Array<{ value: number; category: string }>
): Record<string, { value: number; percentage: number }> => {
  const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0);
  const allocation: Record<string, { value: number; percentage: number }> = {};

  positions.forEach((position) => {
    if (!allocation[position.category]) {
      allocation[position.category] = { value: 0, percentage: 0 };
    }
    allocation[position.category].value += position.value;
    allocation[position.category].percentage = (allocation[position.category].value / totalValue) * 100;
  });

  return allocation;
};

// Calculate Correlation Matrix
export const calculateCorrelationMatrix = (
  assets: Array<{ symbol: string; returns: number[] }>
): Array<Array<number>> => {
  const matrix: number[][] = [];

  for (let i = 0; i < assets.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < assets.length; j++) {
      if (i === j) {
        matrix[i][j] = 1;
      } else {
        const correlation = calculateCorrelation(
          assets[i].returns,
          assets[j].returns
        );
        matrix[i][j] = correlation;
        matrix[j][i] = correlation;
      }
    }
  }

  return matrix;
};

// Helper function to calculate correlation
const calculateCorrelation = (array1: number[], array2: number[]): number => {
  const mean1 = array1.reduce((a, b) => a + b) / array1.length;
  const mean2 = array2.reduce((a, b) => a + b) / array2.length;

  const variance1 = array1.reduce((sq, n) => sq + Math.pow(n - mean1, 2), 0);
  const variance2 = array2.reduce((sq, n) => sq + Math.pow(n - mean2, 2), 0);

  const covariance = array1.reduce(
    (sum, n, i) => sum + (n - mean1) * (array2[i] - mean2),
    0
  );

  return covariance / Math.sqrt(variance1 * variance2);
};
