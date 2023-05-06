import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const feebackContract = process.env.NEXT_PUBLIC_FEEDBACK_CONTRACT

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      HELLO
    </main>
  );
}
