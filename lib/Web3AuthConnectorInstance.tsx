// Web3Auth Libraries
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Chain } from 'wagmi';

const name = 'Login with Google';
const iconUrl =
  'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png';

const web3authClientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;

export const rainbowWeb3AuthConnector = (chains: Chain[]) => {
  if (!web3authClientId) {
    throw Error('Web3auth client id required');
  }

  // Create Web3Auth Instance
  const web3AuthInstance = new Web3AuthNoModal({
    clientId: web3authClientId,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x' + chains[0].id.toString(16),
      rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
      displayName: chains[0].name,
      tickerName: chains[0].nativeCurrency?.name,
      ticker: chains[0].nativeCurrency?.symbol,
    },
  });

  // Add openlogin adapter for customisations
  const openloginAdapterInstance = new OpenloginAdapter({
    adapterSettings: {
      network: 'cyan',
      uxMode: 'popup',
      whiteLabel: {
        name: 'POAP',
        logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
        logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
        defaultLanguage: 'en',
        dark: true, // whether to enable dark mode. defaultValue: false
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  return {
    id: 'google',
    name,
    iconUrl,
    iconBackground: '#fff',
    createConnector: () => {
      const connector = new Web3AuthConnector({
        chains: chains,
        options: {
          web3AuthInstance,
          loginParams: {
            loginProvider: 'google',
          },
        },
      });
      return {
        connector,
      };
    },
  };
}
