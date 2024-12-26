import React from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setWalletAddress } from '../../store/slices/walletSlice';
import { addNotification } from '../../store/slices/uiSlice';

export const WalletConnectForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) {
        dispatch(addNotification({
          type: 'error',
          message: 'Please install MetaMask to connect your wallet',
        }));
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts[0]) {
        dispatch(setWalletAddress(accounts[0]));
        dispatch(addNotification({
          type: 'success',
          message: 'Wallet connected successfully!',
        }));
      }
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to connect wallet. Please try again.',
      }));
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Connect Your Wallet
      </h2>
      <p className="text-gray-600 mb-6">
        Connect your wallet to start managing your portfolio with PLIF.
      </p>
      
      <button
        onClick={handleConnectWallet}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold
          hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Connect MetaMask
      </button>

      <div className="mt-6 text-sm text-gray-500">
        <p>By connecting your wallet, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </motion.div>
  );
};
