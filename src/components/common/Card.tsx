import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  );
};
