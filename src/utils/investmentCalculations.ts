// Calculate Compound Annual Growth Rate (CAGR)
export const calculateCAGR = (
  initialValue: number,
  finalValue: number,
  years: number
): number => {
  if (years <= 0) return 0;
  return ((finalValue / initialValue) ** (1 / years) - 1) * 100;
};

// Calculate Total Return on Investment (ROI)
export const calculateROI = (
  initialInvestment: number,
  finalValue: number
): number => {
  if (initialInvestment === 0) return 0;
  return ((finalValue - initialInvestment) / initialInvestment) * 100;
};

// Calculate Annualized Volatility
export const calculateAnnualizedVolatility = (returns: number[]): number => {
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / (returns.length - 1);
  return Math.sqrt(variance) * Math.sqrt(252); // Assuming 252 trading days
};

// Calculate Value at Risk (VaR)
export const calculateVaR = (returns: number[], confidenceLevel: number): number => {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor((1 - confidenceLevel) * sortedReturns.length);
  return sortedReturns[index];
};

// Calculate Expected Shortfall (ES)
export const calculateES = (returns: number[], confidenceLevel: number): number => {
  const varValue = calculateVaR(returns, confidenceLevel);
  const losses = returns.filter((r) => r <= varValue);
  return losses.reduce((a, b) => a + b, 0) / losses.length;
};
