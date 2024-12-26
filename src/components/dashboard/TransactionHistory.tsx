import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Timer } from 'lucide-react';
import type { Transaction } from '../../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownRight className="w-5 h-5 text-green-600" />;
      case 'withdraw':
        return <ArrowUpRight className="w-5 h-5 text-red-600" />;
      case 'yield':
        return <Timer className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h3>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {getTypeIcon(tx.type)}
              <div>
                <p className="font-medium text-gray-900 capitalize">{tx.type}</p>
                <p className="text-sm text-gray-600">{tx.asset}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{tx.amount}</p>
              <p className={`text-sm ${getStatusColor(tx.status)} capitalize`}>
                {tx.status}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}