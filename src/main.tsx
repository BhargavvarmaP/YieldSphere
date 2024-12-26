import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import { mainnet, goerli } from 'wagmi/chains';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { router } from './router';
import './index.css';
import { AnimationProvider } from './contexts/AnimationContext';
import { WalletProvider } from './contexts/WalletContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { ThemeProvider } from 'styled-components';
import themes from './theme';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'YieldSphere',
  projectId: 'cm2ybyp0a02n1nfhbmctt21qc',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const chainsConfig = {
  chains,
  publicClient,
  webSocketPublicClient,
};

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <PrivyProvider
            appId="cm2ybyp0a02n1nfhbmctt21qc"
            config={{
              loginMethods: ['email', 'wallet'],
              appearance: {
                theme: 'dark',
                accentColor: '#2563eb',
                logo: 'YOUR_LOGO_URL',
              },
            }}
          >
            <PrivyWagmiConnector wagmiChainsConfig={chainsConfig}>
              <WalletProvider>
                <PortfolioProvider>
                  <AnimationProvider>
                    <RouterProvider router={router} />
                  </AnimationProvider>
                </PortfolioProvider>
              </WalletProvider>
            </PrivyWagmiConnector>
          </PrivyProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);