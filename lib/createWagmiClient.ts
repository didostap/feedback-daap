import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, mainnet, sepolia } from 'wagmi';
import { foundry } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { rainbowWeb3AuthConnector } from '~/lib/Web3AuthConnectorInstance';
import { walletConnectWallet, rainbowWallet, metaMaskWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';

const { chains, provider, webSocketProvider } = configureChains([sepolia, foundry, mainnet], [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      walletConnectWallet({ chains }),
      metaMaskWallet({ chains }),
      ledgerWallet({ chains }),
      rainbowWeb3AuthConnector(chains),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { wagmiClient, chains };
