import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '~/views';
import { Provider } from '~/lib/provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
