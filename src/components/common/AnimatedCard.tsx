import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hover = true,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        duration: 0.8,
        opacity: 0,
        y: 50,
        delay,
        ease: 'power3.out',
      });
    }
  }, [delay]);

  const hoverAnimation = hover
    ? {
        whileHover: {
          y: -5,
          transition: {
            duration: 0.2,
            ease: 'easeOut',
          },
        },
        whileTap: {
          y: 0,
        },
      }
    : {};

  return (
    <motion.div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.2,
      }}
      {...hoverAnimation}
    >
      {children}
    </motion.div>
  );
};
