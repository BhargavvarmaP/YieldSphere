import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, TrendingUp, ShieldCheck } from 'lucide-react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

interface YieldOpportunity {
  protocol: string;
  apy: number;
  risk: 'Low' | 'Medium' | 'High';
  allocation: number;
  chain: string;
}

const yieldOpportunities: YieldOpportunity[] = [
  {
    protocol: 'Aave V3',
    apy: 4.5,
    risk: 'Low',
    allocation: 35,
    chain: 'Ethereum',
  },
  {
    protocol: 'Compound',
    apy: 5.2,
    risk: 'Low',
    allocation: 25,
    chain: 'Ethereum',
  },
  {
    protocol: 'Curve',
    apy: 8.7,
    risk: 'Medium',
    allocation: 20,
    chain: 'Ethereum',
  },
  {
    protocol: 'Balancer',
    apy: 12.4,
    risk: 'High',
    allocation: 20,
    chain: 'Polygon',
  },
];

export function DynamicYieldFund() {
  const totalYield = useAnimatedCounter(7.2, 2, 1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dynamic Yield Fund</h2>
          <p className="text-gray-600 mt-1">Optimized yield farming across multiple protocols</p>
        </div>
        <RefreshCcw className="w-6 h-6 text-blue-600 animate-spin-slow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Current Performance</h3>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">{totalYield}% APY</div>
          <p className="text-gray-600">Weighted average yield across all protocols</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold">Risk Management</h3>
          </div>
          <div className="text-4xl font-bold text-green-600 mb-2">Protected</div>
          <p className="text-gray-600">Smart contract audited & risk balanced</p>
        </motion.div>
      </div>

      <div className="space-y-4">
        {yieldOpportunities.map((opportunity) => (
          <motion.div
            key={opportunity.protocol}
            className="bg-gray-50 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{opportunity.protocol}</h4>
                <p className="text-sm text-gray-600">on {opportunity.chain}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{opportunity.apy}% APY</p>
                <p className="text-sm text-gray-600">{opportunity.allocation}% Allocated</p>
              </div>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${opportunity.allocation}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className={`px-2 py-1 rounded-full ${
                opportunity.risk === 'Low' ? 'bg-green-100 text-green-600' :
                opportunity.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {opportunity.risk} Risk
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}