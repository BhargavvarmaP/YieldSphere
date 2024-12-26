import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'swap';
  amount: number;
  token: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  className = '',
}) => {
  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'withdrawal':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case 'swap':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence>
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getTypeIcon(transaction.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {transaction.amount} {transaction.token}
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${getStatusColor(transaction.status)}`}
                >
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
