import React from 'react';
import { motion } from 'framer-motion';

interface GlowingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/20';
      case 'outline':
        return 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10';
      default:
        return '';
    }
  };

  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-semibold transition-all ${getVariantClasses()} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
