import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  prefix = '',
  suffix = '',
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <motion.h3
            className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {prefix}{value}{suffix}
          </motion.h3>
          {change !== undefined && (
            <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              <span className="text-sm">
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-gray-400 text-xl">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
