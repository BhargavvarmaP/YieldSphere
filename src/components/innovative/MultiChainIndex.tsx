import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Globe, PieChart, ArrowRight } from 'lucide-react';

interface ChainAllocation {
  chain: string;
  allocation: number;
  tvl: string;
  apy: string;
  tokens: string[];
}

const chainAllocations: ChainAllocation[] = [
  {
    chain: 'Ethereum',
    allocation: 40,
    tvl: '$45.2M',
    apy: '12.4%',
    tokens: ['ETH', 'USDC', 'LINK'],
  },
  {
    chain: 'Polygon',
    allocation: 25,
    tvl: '$28.7M',
    apy: '18.6%',
    tokens: ['MATIC', 'AAVE', 'QUICK'],
  },
  {
    chain: 'Solana',
    allocation: 20,
    tvl: '$22.4M',
    apy: '15.8%',
    tokens: ['SOL', 'RAY', 'SRM'],
  },
  {
    chain: 'Avalanche',
    allocation: 15,
    tvl: '$18.9M',
    apy: '16.2%',
    tokens: ['AVAX', 'JOE', 'QI'],
  },
];

export function MultiChainIndex() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Multi-Chain Index</h2>
          <p className="text-gray-600 mt-1">Diversified exposure across leading blockchains</p>
        </div>
        <Globe className="w-6 h-6 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <PieChart className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Total Value Locked</h3>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">$115.2M</div>
          <p className="text-gray-600">Across all supported chains</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Link2 className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Cross-Chain Bridges</h3>
          </div>
          <div className="text-4xl font-bold text-purple-600 mb-2">4</div>
          <p className="text-gray-600">Integrated bridge protocols</p>
        </motion.div>
      </div>

      <div className="space-y-4">
        {chainAllocations.map((chain) => (
          <motion.div
            key={chain.chain}
            className="bg-gray-50 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-gray-900">{chain.chain}</h4>
                <span className="text-sm text-gray-600">{chain.allocation}% Allocation</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{chain.apy} APY</p>
                <p className="text-sm text-gray-600">TVL: {chain.tvl}</p>
              </div>
            </div>

            <div className="mb-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${chain.allocation}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Top Tokens:</span>
              {chain.tokens.map((token) => (
                <span
                  key={token}
                  className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm"
                >
                  {token}
                </span>
              ))}
            </div>

            <motion.button
              className="w-full mt-3 bg-transparent text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              whileHover={{ x: 5 }}
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}