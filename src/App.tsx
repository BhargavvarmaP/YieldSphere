import React from 'react';
import { Outlet } from 'react-router-dom';
import { WalletProvider } from './components/WalletProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { AnimationProvider } from './contexts/AnimationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PrivyProvider } from "@privy-io/react-auth";
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// Add environment variables for RPC providers
const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_KEY || '';
const INFURA_KEY = import.meta.env.VITE_INFURA_PROJECT_ID || '';

// Add these RPC URLs
const RPC_URLS = {
  1: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  137: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
};

// Configure chains with fallback providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [
    alchemyProvider({ apiKey: ALCHEMY_KEY }),
    infuraProvider({ apiKey: INFURA_KEY }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: RPC_URLS[chain.id as keyof typeof RPC_URLS] || '',
      }),
    }),
    publicProvider(),
  ]
);

const wagmiConfig = createConfig({
  autoConnect: true, // Changed to true to maintain connection
  publicClient,
  webSocketPublicClient
});

// Updated Privy configuration
const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

if (!PRIVY_APP_ID) {
  throw new Error('VITE_PRIVY_APP_ID is not set in environment variables');
}

const App: React.FC = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <PrivyProvider
        appId={PRIVY_APP_ID}
        config={{
          loginMethods: ['email', 'wallet'],
          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
          },
          embeddedWallets: {
            createOnLogin: 'all-users',
            noPromptOnSignature: true,
          },
          defaultChain: mainnet,
        }}
      >
        <PrivyWagmiConnector 
          wagmiChainsConfig={{
            chains,
            publicClient,
            webSocketPublicClient
          }}
        >
          <ReduxProvider store={store}>
            <ThemeProvider>
              <WalletProvider>
                <AnimationProvider>
                  <Outlet />
                </AnimationProvider>
              </WalletProvider>
            </ThemeProvider>
          </ReduxProvider>
        </PrivyWagmiConnector>
      </PrivyProvider>
    </WagmiConfig>
  );
};

export default App;