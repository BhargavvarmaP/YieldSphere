import React from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';
import type { AssetAllocation } from '../../types';

interface AssetDistributionProps {
  assets: AssetAllocation[];
}

export function AssetDistribution({ assets }: AssetDistributionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <PieChart className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Asset Distribution</h3>
      </div>
      
      <div className="space-y-4">
        {assets.map((asset) => (
          <motion.div
            key={asset.asset}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-900">{asset.asset}</span>
              <span className="text-gray-600">{asset.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${asset.percentage}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{asset.value}</span>
              <span className={asset.change24h.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                {asset.change24h}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}