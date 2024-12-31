import React, { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { clearWeb3Modal } from '../lib/web3modal';

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ready } = usePrivy();

  useEffect(() => {
    // Clean up Web3Modal on mount
    clearWeb3Modal();
    
    return () => {
      // Clean up on unmount
      clearWeb3Modal();
    };
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};