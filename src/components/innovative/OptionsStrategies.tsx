import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface OptionStrategy {
  name: string;
  type: 'Call' | 'Put' | 'Straddle';
  asset: string;
  strike: string;
  premium: string;
  expiry: string;
  roi: string;
  risk: 'Low' | 'Medium' | 'High';
}

const optionStrategies: OptionStrategy[] = [
  {
    name: 'ETH Covered Call',
    type: 'Call',
    asset: 'ETH',
    strike: '$2,500',
    premium: '2.5%',
    expiry: '30 days',
    roi: '12.5% APY',
    risk: 'Low',
  },
  {
    name: 'BTC Put Selling',
    type: 'Put',
    asset: 'BTC',
    strike: '$35,000',
    premium: '3.2%',
    expiry: '14 days',
    roi: '15.8% APY',
    risk: 'Medium',
  },
  {
    name: 'ETH Straddle',
    type: 'Straddle',
    asset: 'ETH',
    strike: '$2,300',
    premium: '4.8%',
    expiry: '7 days',
    roi: '22.4% APY',
    risk: 'High',
  },
];

export function OptionsStrategies() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Options Strategies</h2>
          <p className="text-gray-600 mt-1">Generate yield through options writing</p>
        </div>
        <Activity className="w-6 h-6 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {optionStrategies.map((strategy) => (
          <motion.div
            key={strategy.name}
            className="bg-gray-50 rounded-lg p-6"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              {strategy.type === 'Call' ? (
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              ) : strategy.type === 'Put' ? (
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              ) : (
                <TrendingUp className="w-6 h-6 text-blue-600" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{strategy.name}</h3>
                <span className="text-sm text-gray-600">{strategy.type} Strategy</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Asset</span>
                <span className="font-medium">{strategy.asset}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Strike Price</span>
                <span className="font-medium">{strategy.strike}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Premium</span>
                <span className="font-medium text-green-600">{strategy.premium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry</span>
                <span className="font-medium">{strategy.expiry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected ROI</span>
                <span className="font-medium text-blue-600">{strategy.roi}</span>
              </div>
            </div>

            <div className="mt-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                strategy.risk === 'Low' ? 'bg-green-100 text-green-600' :
                strategy.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {strategy.risk} Risk
              </span>
            </div>

            <motion.button
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              Trade Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}