import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiClient } from './createWagmiClient';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RainbowKitSiweNextAuthProvider } from '~/lib/RainbowKitSiweNextAuthProvider';

export type ProviderProps = Pick<AppProps, 'pageProps'> & {
  children: ReactNode;
};

const getSiweMessageOptions = () => ({
  statement: 'Sign in to POAP',
});

const appInfo = {
  appName: 'POAP',
};

export const Provider = ({ children, pageProps }: ProviderProps) => (
  <SessionProvider refetchInterval={0} session={pageProps.session}>
    <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} appInfo={appInfo} modalSize='compact' theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </RainbowKitSiweNextAuthProvider>
  </SessionProvider>
);
