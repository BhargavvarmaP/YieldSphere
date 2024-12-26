import React from 'react';
import { TokenChart } from '../components/analytics/TokenChart';
import { RiskMetricsCard } from '../components/analytics/RiskMetricsCard';
import type { TokenMetrics, PoolMetrics, RiskMetrics } from '../types/analytics';

const mockTokenData: TokenMetrics = {
  symbol: 'ETH',
  name: 'Ethereum',
  price: '$3,245.67',
  change24h: '+2.4%',
  volume24h: '$1.2B',
  marketCap: '$389.5B',
  chart: Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    value: 3000 + Math.random() * 500,
  })).reverse(),
};

const mockRiskMetrics: RiskMetrics = {
  volatility: '32.5%',
  sharpeRatio: '1.8',
  maxDrawdown: '-25.4%',
  beta: '1.2',
};

const mockPoolMetrics: PoolMetrics[] = [
  {
    name: 'ETH/USDC',
    tvl: '$45.2M',
    apy: '12.4%',
    volume24h: '$2.1M',
    fees24h: '$6.3K',
  },
  {
    name: 'BTC/ETH',
    tvl: '$38.7M',
    apy: '8.9%',
    volume24h: '$1.8M',
    fees24h: '$5.4K',
  },
];

export function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{mockTokenData.name}</h2>
                <p className="text-gray-600">{mockTokenData.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{mockTokenData.price}</p>
                <p className={mockTokenData.change24h.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {mockTokenData.change24h}
                </p>
              </div>
            </div>
            
            <div className="h-64">
              <TokenChart data={mockTokenData.chart} height={256} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RiskMetricsCard metrics={mockRiskMetrics} />
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Liquidity Pools</h3>
              <div className="space-y-4">
                {mockPoolMetrics.map((pool) => (
                  <div key={pool.name} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{pool.name}</h4>
                      <p className="text-blue-600 font-medium">{pool.apy} APY</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">TVL</p>
                        <p className="font-medium">{pool.tvl}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Volume 24h</p>
                        <p className="font-medium">{pool.volume24h}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fees 24h</p>
                        <p className="font-medium">{pool.fees24h}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}