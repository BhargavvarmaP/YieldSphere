import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export const AnimatedLogo: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <motion.div
      ref={logoRef}
      className="relative w-16 h-16"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75 blur-lg" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
      <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
          YS
        </span>
      </div>
    </motion.div>
  );
};
