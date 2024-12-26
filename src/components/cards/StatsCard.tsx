import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface StatsCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  icon,
  className = '',
}) => {
  const isPositiveChange = change && change > 0;

  return (
    <motion.div
      className={`bg-white p-6 rounded-xl shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {icon && (
          <div className="text-blue-600">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline">
        <div className="text-3xl font-semibold text-gray-900">
          {prefix}
          <AnimatedCounter
            end={value}
            decimals={2}
          />
          {suffix}
        </div>

        {change !== undefined && (
          <span
            className={`ml-2 text-sm font-medium ${
              isPositiveChange ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositiveChange ? '+' : ''}
            {change}%
          </span>
        )}
      </div>
    </motion.div>
  );
};
