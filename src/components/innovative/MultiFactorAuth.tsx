import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useAnimation } from '../../hooks/useAnimation';
import { cardVariants, buttonVariants } from './animations/variants';
import { useAnimationStore } from '../../store/innovativeStore';
import { useAuthStore, MFAMethod } from '../../store/innovativeStore';

export const MultiFactorAuth: React.FC = () => {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { animateIn, animateShake } = useAnimation();
  const { isAnimating } = useAnimationStore();
  const { mfaMethod, verificationCode, setMfaMethod, setVerificationCode } = useAuthStore();

  useEffect(() => {
    if (containerRef.current) {
      animateIn(containerRef.current);
    }
  }, []);

  const handleMethodChange = (method: MFAMethod) => {
    setMfaMethod(method);
    setVerificationCode('');
  };

  const handleVerification = async () => {
    try {
      if (containerRef.current) {
        animateShake(containerRef.current);
      }
      console.log(`Verifying code using ${mfaMethod}`);
    } catch (error) {
      console.error('MFA verification failed:', error);
    }
  };

  const methodVariants = {
    selected: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      scale: 1.05,
    },
    unselected: {
      backgroundColor: '#e5e7eb',
      color: '#374151',
      scale: 1,
    },
  };

  const methods: MFAMethod[] = ['authenticator', 'sms', 'email'];

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="p-4 bg-white rounded-lg shadow-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold mb-4"
        >
          Multi-Factor Authentication
        </motion.h2>
        
        <motion.div
          variants={buttonVariants}
          className="flex gap-2 mb-4"
        >
          {methods.map((method) => (
            <motion.button
              key={method}
              onClick={() => handleMethodChange(method)}
              variants={methodVariants}
              initial="unselected"
              animate={mfaMethod === method ? 'selected' : 'unselected'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-md transition-all duration-200 ease-in-out"
            >
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="space-y-2"
        >
          <motion.input
            layout
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full p-2 border rounded-md"
            maxLength={6}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={handleVerification}
            disabled={!verificationCode || isAnimating}
            className={`w-full py-2 rounded-md ${
              verificationCode && !isAnimating
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Verify
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MultiFactorAuth;
