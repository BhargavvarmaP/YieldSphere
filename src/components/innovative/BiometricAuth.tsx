import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useAnimation } from '../../hooks/useAnimation';
import { cardVariants, buttonVariants } from './animations/variants';
import { useAnimationStore } from '../../store/innovativeStore';

export const BiometricAuth: React.FC = () => {
  const { login } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { animateIn, animateShake } = useAnimation();
  const { isAnimating } = useAnimationStore();
  const [isScanning, setIsScanning] = React.useState(false);

  useEffect(() => {
    if (containerRef.current) {
      animateIn(containerRef.current);
    }
  }, []);

  const handleBiometricAuth = async () => {
    setIsScanning(true);
    try {
      if (window.PublicKeyCredential) {
        // Implement WebAuthn authentication logic here
        console.log('Biometric authentication initiated');
      } else {
        if (containerRef.current) {
          animateShake(containerRef.current);
        }
        console.error('WebAuthn is not supported in this browser');
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

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
          Biometric Authentication
        </motion.h2>
        
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={handleBiometricAuth}
          disabled={isScanning || isAnimating}
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            isScanning || isAnimating
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isScanning ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            'Authenticate with Biometrics'
          )}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default BiometricAuth;
