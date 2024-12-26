import React, { createContext, useContext, useState } from 'react';
import type { RiskTier, PortfolioStats, AssetAllocation } from '../types';

interface PortfolioContextType {
  selectedTier: RiskTier | null;
  portfolioStats: PortfolioStats;
  assets: AssetAllocation[];
  setSelectedTier: (tier: RiskTier) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [selectedTier, setSelectedTier] = useState<RiskTier | null>(null);
  const [portfolioStats] = useState<PortfolioStats>({
    totalValue: '$125,430',
    dailyChange: '+2.4%',
    monthlyYield: '3.8%',
    yearlyYield: '22.5%',
  });
  const [assets] = useState<AssetAllocation[]>([
    {
      asset: 'Ethereum',
      percentage: 45,
      value: '3.5 ETH',
      change24h: '+2.4%',
    },
    {
      asset: 'USDC',
      percentage: 30,
      value: '15,000 USDC',
      change24h: '+0.1%',
    },
    {
      asset: 'Altcoins',
      percentage: 25,
      value: '$12,500',
      change24h: '-1.2%',
    },
  ]);

  return (
    <PortfolioContext.Provider
      value={{
        selectedTier,
        portfolioStats,
        assets,
        setSelectedTier,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}