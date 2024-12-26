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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient
});

const privyConfig = {
  loginMethods: ['email' as const, 'wallet' as const],
  embeddedWallets: {
    createOnLogin: "all-users",
    noPromptOnSignature: true,
  },
  theme: 'light' as const,
  defaultChain: mainnet,
};

const App: React.FC = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <PrivyProvider
        appId="cm2ybyp0a02n1nfhbmctt21qc"
        config={{
          embeddedWallets: {
            createOnLogin: "all-users",
          }
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