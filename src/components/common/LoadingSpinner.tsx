import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = '#3B82F6',
  thickness = 4,
}) => {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1,
  };

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${thickness}px solid ${color}20`,
        borderTopColor: color,
        position: 'relative',
      }}
      animate={{ rotate: 360 }}
      transition={spinTransition}
    />
  );
};
