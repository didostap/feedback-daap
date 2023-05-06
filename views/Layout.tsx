import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ReactNode} from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div>
        <ConnectButton />
      </div>
      {children}
    </>
  );
};
