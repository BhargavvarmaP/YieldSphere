import React from 'react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

export const Statistics: React.FC = () => {
  const tvl = useAnimatedCounter(1000000000, 2000); // $1B
  const users = useAnimatedCounter(50000, 2000); // 50K
  const transactions = useAnimatedCounter(1000000, 2000); // 1M
  const protocols = useAnimatedCounter(25, 2000); // 25

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const stats = [
    {
      label: 'Total Value Locked',
      value: formatNumber(tvl),
      description: 'in assets managed',
    },
    {
      label: 'Active Users',
      value: formatNumber(users),
      description: 'globally',
    },
    {
      label: 'Transactions',
      value: formatNumber(transactions),
      description: 'processed securely',
    },
    {
      label: 'DeFi Protocols',
      value: formatNumber(protocols),
      description: 'integrated',
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <dt className="text-base font-medium text-gray-500">
                {stat.label}
              </dt>
              <dd className="mt-2">
                <span className="text-3xl font-extrabold text-blue-600">
                  {stat.value}
                </span>
                <span className="block text-sm text-gray-500 mt-1">
                  {stat.description}
                </span>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
