import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connect = async () => {
    // Simulated wallet connection
    setIsConnected(true);
    setAddress('0x1234...5678');
    setBalance('12.345 ETH');
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}