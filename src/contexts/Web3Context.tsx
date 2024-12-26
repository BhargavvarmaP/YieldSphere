import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addNotification } from '../store/slices/uiSlice';
import { ethers } from 'ethers';

interface Web3ContextType {
  provider: ethers.providers.Web3Provider | null;
  account: string | null;
  chainId: number | null;
  balance: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const updateAccountData = async (newAccount: string) => {
    if (provider && newAccount) {
      try {
        const balance = await provider.getBalance(newAccount);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please install MetaMask to connect',
      }));
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      
      setProvider(provider);
      setAccount(accounts[0]);
      setChainId(network.chainId);
      await updateAccountData(accounts[0]);

      dispatch(addNotification({
        type: 'success',
        message: 'Wallet connected successfully',
      }));
    } catch (error) {
      console.error('Error connecting wallet:', error);
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to connect wallet',
      }));
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setAccount(null);
    setChainId(null);
    setBalance(null);
  };

  const switchNetwork = async (targetChainId: number) => {
    if (!provider) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        dispatch(addNotification({
          type: 'error',
          message: 'Please add this network to your wallet',
        }));
      } else {
        dispatch(addNotification({
          type: 'error',
          message: 'Failed to switch network',
        }));
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateAccountData(accounts[0]);
        } else {
          disconnectWallet();
        }
      };

      const handleChainChanged = (chainId: string) => {
        setChainId(parseInt(chainId, 16));
      };

      const handleDisconnect = () => {
        disconnectWallet();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      };
    }
  }, [provider]);

  const value = {
    provider,
    account,
    chainId,
    balance,
    isConnecting,
    isConnected: !!account,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
