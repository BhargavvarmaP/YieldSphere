import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useAnimation } from '../../hooks/useAnimation';
import { cardVariants, buttonVariants } from './animations/variants';
import { useAnimationStore } from '../../store/innovativeStore';
import { useWalletStore } from '../../store/innovativeStore';

type WalletType = 'metamask' | 'walletconnect' | 'coinbase' | 'ledger';

export const WalletConnect: React.FC = () => {
  const { handleLogin } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { animateIn } = useAnimation();
  const { isAnimating } = useAnimationStore();
  const { selectedWallet, isConnecting, setSelectedWallet, setIsConnecting } = useWalletStore();

  useEffect(() => {
    if (containerRef.current) {
      animateIn(containerRef.current);
    }
  }, []);

  const wallets: { type: WalletType; name: string; icon: string }[] = [
    { type: 'metamask', name: 'MetaMask', icon: '🦊' },
    { type: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
    { type: 'coinbase', name: 'Coinbase Wallet', icon: '💰' },
    { type: 'ledger', name: 'Ledger', icon: '🔒' },
  ];

  const handleConnect = async (walletType: WalletType) => {
    setIsConnecting(true);
    setSelectedWallet(walletType);
    try {
      // Implement wallet connection logic here
      console.log(`Connecting to ${walletType}`);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate connection

      // Call the handleLogin function after a successful connection
      await handleLogin();
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const walletCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95,
    },
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
          Connect Wallet
        </motion.h2>
        
        <motion.div
          variants={buttonVariants}
          className="grid grid-cols-2 gap-4"
        >
          {wallets.map(({ type, name, icon }, i) => (
            <motion.button
              key={type}
              custom={i}
              variants={walletCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleConnect(type)}
              disabled={isConnecting || isAnimating}
              className={`p-4 border rounded-lg transition-colors ${
                selectedWallet === type
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              } ${isConnecting || isAnimating ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="text-2xl mb-2"
              >
                {icon}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="font-medium"
              >
                {name}
              </motion.div>
              {isConnecting && selectedWallet === type && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"
                  />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {isConnecting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 text-center text-blue-600"
          >
            Connecting to {selectedWallet}...
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default WalletConnect;
