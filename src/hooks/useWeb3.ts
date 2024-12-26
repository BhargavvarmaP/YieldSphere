import { useState, useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setWalletAddress, setBalance, setChainId } from '../store/slices/walletSlice';
import { addNotification } from '../store/slices/uiSlice';

export const useWeb3 = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please install MetaMask to connect your wallet',
      }));
      return false;
    }

    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts[0]) {
        dispatch(setWalletAddress(accounts[0]));
        await updateBalance(accounts[0]);
        await updateChainId();
        return true;
      }
      return false;
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to connect wallet',
      }));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      dispatch(setBalance(parseInt(balance, 16) / 1e18));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const updateChainId = async () => {
    try {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
      dispatch(setChainId(parseInt(chainId, 16)));
    } catch (error) {
      console.error('Error fetching chainId:', error);
    }
  };

  const switchNetwork = async (chainId: number) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        dispatch(addNotification({
          type: 'error',
          message: 'Please add this network to your wallet',
        }));
      }
      return false;
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          dispatch(setWalletAddress(accounts[0]));
          updateBalance(accounts[0]);
        } else {
          dispatch(setWalletAddress(''));
          dispatch(setBalance(0));
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        dispatch(setChainId(parseInt(chainId, 16)));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [dispatch]);

  return {
    connectWallet,
    switchNetwork,
    isLoading,
  };
};
