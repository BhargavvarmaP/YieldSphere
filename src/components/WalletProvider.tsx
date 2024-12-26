import React, { createContext, useContext, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setWalletAddress, setBalance, setChainId } from '../store/slices/walletSlice';
import { addNotification } from '../store/slices/uiSlice';

interface WalletContextType {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { login, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const dispatch = useAppDispatch();

  const connectWallet = async () => {
    try {
      await login();
      dispatch(addNotification({
        type: 'success',
        message: 'Wallet connected successfully',
      }));
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to connect wallet',
      }));
    }
  };

  const disconnectWallet = () => {
    dispatch(setWalletAddress(''));
    dispatch(setBalance(0));
    dispatch(setChainId(null));
  };

  useEffect(() => {
    if (!authenticated || wallets.length === 0) return;

    const activeWallet = wallets[0];
    
    const updateWalletInfo = async () => {
      try {
        dispatch(setWalletAddress(activeWallet.address));
        
        const provider = await activeWallet.getEthereumProvider();
        const balance = await provider.request({
          method: 'eth_getBalance',
          params: [activeWallet.address, 'latest'],
        });
        
        dispatch(setBalance(parseInt(balance as string, 16) / 1e18));
        
        const chainId = await provider.request({ method: 'eth_chainId' });
        dispatch(setChainId(parseInt(chainId as string, 16)));
      } catch (error) {
        console.error('Error updating wallet info:', error);
      }
    };

    updateWalletInfo();

    // Using useEffect for watching wallet changes instead of events
    const checkInterval = setInterval(updateWalletInfo, 1000);

    return () => clearInterval(checkInterval);
  }, [authenticated, wallets, dispatch]);

  return (
    <WalletContext.Provider value={{ 
      connectWallet, 
      disconnectWallet, 
      isConnecting: !ready 
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};