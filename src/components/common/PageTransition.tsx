import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  location,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
