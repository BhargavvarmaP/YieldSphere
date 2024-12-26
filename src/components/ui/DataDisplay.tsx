import React from 'react';
import { motion } from 'framer-motion';

interface DataDisplayProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

export const DataDisplay: React.FC<DataDisplayProps> = ({ label, value, change, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm">{label}</span>
        {icon}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold">{value}</span>
        {change !== undefined && (
          <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </motion.div>
  );
};