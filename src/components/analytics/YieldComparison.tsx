import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import type { YieldMetrics } from '../../types';

interface YieldComparisonProps {
  metrics: YieldMetrics[];
}

export function YieldComparison({ metrics }: YieldComparisonProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Yield Performance</h3>
      </div>
      
      <div className="space-y-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.period}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between"
          >
            <div className="w-1/4">
              <p className="font-medium text-gray-900">{metric.period}</p>
            </div>
            <div className="w-3/4 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Your Yield</p>
                <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: metric.yield }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
                <p className="text-sm font-medium text-blue-600 mt-1">{metric.yield}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Benchmark</p>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: metric.benchmark }}
                    className="h-full bg-gray-400 rounded-full"
                  />
                </div>
                <p className="text-sm font-medium text-gray-600 mt-1">{metric.benchmark}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}