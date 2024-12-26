import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export const YieldSphereLogo: React.FC<LogoProps> = ({ className = '', animate = true }) => {
  return (
    <motion.svg
      className={`w-10 h-10 ${className}`}
      viewBox="0 0 40 40"
      initial={animate ? { rotate: -90, scale: 0.8 } : undefined}
      animate={animate ? { rotate: 0, scale: 1 } : undefined}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="sphereGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer Ring */}
      <motion.circle
        cx="20"
        cy="20"
        r="18"
        stroke="url(#sphereGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      {/* Inner Y shape */}
      <motion.path
        d="M20 8 L26 18 L20 18 L20 32 L14 18 L20 18 Z"
        fill="url(#sphereGradient)"
        filter="url(#glow)"
        initial={animate ? { opacity: 0, scale: 0 } : undefined}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      
      {/* Connecting dots */}
      {[0, 120, 240].map((angle, i) => (
        <motion.circle
          key={i}
          cx={20 + 14 * Math.cos((angle * Math.PI) / 180)}
          cy={20 + 14 * Math.sin((angle * Math.PI) / 180)}
          r="2"
          fill="url(#sphereGradient)"
          filter="url(#glow)"
          initial={animate ? { opacity: 0, scale: 0 } : undefined}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
        />
      ))}
    </motion.svg>
  );
};
