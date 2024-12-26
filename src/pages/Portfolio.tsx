import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { GlowingButton } from '../components/common/GlowingButton';

const Portfolio: React.FC = () => {
  const portfolioStats = [
    { title: 'Total Portfolio Value', value: '125.4K', prefix: '$', change: 8.3 },
    { title: '24h Change', value: '2.4', suffix: '%', change: 2.4 },
    { title: 'Monthly Yield', value: '3.8', suffix: '%', change: 0.5 },
    { title: 'Total Yield Earned', value: '12.5K', prefix: '$', change: 15.7 },
  ];

  const assets = [
    {
      name: 'Ethereum',
      allocation: 45,
      value: '$56,443.50',
      amount: '18.5 ETH',
      apy: 12.5,
      change24h: 2.4,
    },
    {
      name: 'USDC',
      allocation: 30,
      value: '$37,629.00',
      amount: '37,629 USDC',
      apy: 8.2,
      change24h: 0.1,
    },
    {
      name: 'Bitcoin',
      allocation: 15,
      value: '$18,814.50',
      amount: '0.45 BTC',
      apy: 5.8,
      change24h: -1.2,
    },
    {
      name: 'Solana',
      allocation: 10,
      value: '$12,543.00',
      amount: '85.2 SOL',
      apy: 15.3,
      change24h: 4.5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Portfolio Overview</h1>
          <p className="text-gray-400">Track and manage your DeFi investments</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Asset List */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Asset Allocation</h2>
              <GlowingButton variant="outline">
                Add Asset
              </GlowingButton>
            </div>
            
            <div className="space-y-4">
              {assets.map((asset, index) => (
                <motion.div
                  key={asset.name}
                  className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-sm text-gray-400">{asset.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Value</p>
                      <p className="font-semibold">{asset.value}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">APY</p>
                      <p className="text-green-500">{asset.apy}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">24h Change</p>
                      <p className={asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Portfolio Actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <GlowingButton className="w-full">
                  Deposit
                </GlowingButton>
                <GlowingButton variant="secondary" className="w-full">
                  Withdraw
                </GlowingButton>
                <GlowingButton variant="outline" className="w-full">
                  Swap Assets
                </GlowingButton>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Risk Analysis</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Risk Score</span>
                  <span className="text-yellow-500">Medium (65/100)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Diversification</span>
                  <span className="text-green-500">Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Volatility</span>
                  <span className="text-blue-500">Low</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
