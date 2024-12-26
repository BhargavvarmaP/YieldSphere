import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { GlowingButton } from '../components/common/GlowingButton';
import { YieldSphereLogo } from '../components/common/YieldSphereLogo';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Value Locked', value: '1.5M', prefix: '$', change: 12.5 },
    { title: 'Active Strategies', value: '8', change: 25 },
    { title: 'Current APY', value: '15.2', suffix: '%', change: 5.3 },
    { title: 'Portfolio Balance', value: '45.3K', prefix: '$', change: -2.1 },
  ];

  const strategies = [
    { name: 'Yield Farming Alpha', apy: 18.5, risk: 'Medium', tvl: '$2.1M' },
    { name: 'Stablecoin Optimizer', apy: 12.3, risk: 'Low', tvl: '$5.4M' },
    { name: 'DeFi Pulse Index', apy: 21.7, risk: 'High', tvl: '$1.8M' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back, Yield Seeker</h1>
          <p className="text-gray-400">Here's your DeFi portfolio overview</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Strategies */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-bold mb-4">Active Strategies</h2>
            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <motion.div
                  key={strategy.name}
                  className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{strategy.name}</h3>
                      <p className="text-sm text-gray-400">Risk: {strategy.risk}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500">{strategy.apy}% APY</p>
                      <p className="text-sm text-gray-400">TVL: {strategy.tvl}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4">
              <GlowingButton variant="outline" className="w-full">
                View All Strategies
              </GlowingButton>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <GlowingButton className="w-full">
                Deposit Funds
              </GlowingButton>
              <GlowingButton variant="secondary" className="w-full">
                Withdraw
              </GlowingButton>
              <GlowingButton variant="outline" className="w-full">
                Rebalance Portfolio
              </GlowingButton>
            </div>

            {/* Network Status */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Network Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Gas Price</span>
                  <span className="text-green-500">32 Gwei</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="text-blue-500">Ethereum</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-500">●</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;