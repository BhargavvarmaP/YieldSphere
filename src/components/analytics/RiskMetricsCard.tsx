import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { RiskMetrics } from '../../types/analytics';

interface RiskMetricsCardProps {
  metrics: RiskMetrics;
}

export function RiskMetricsCard({ metrics }: RiskMetricsCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-bold text-gray-900">Risk Metrics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Volatility</p>
          <p className="text-lg font-semibold">{metrics.volatility}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Sharpe Ratio</p>
          <p className="text-lg font-semibold">{metrics.sharpeRatio}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Max Drawdown</p>
          <p className="text-lg font-semibold text-red-600">{metrics.maxDrawdown}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Beta</p>
          <p className="text-lg font-semibold">{metrics.beta}</p>
        </div>
      </div>
    </motion.div>
  );
}