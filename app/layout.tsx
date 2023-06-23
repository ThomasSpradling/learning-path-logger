import NavBar from '@/components/ui/NavBar';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/Toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Learning Plan',
  description: 'A planning app to guide your learning of subjects.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='flex flex-col h-screen'>
        <Providers>
          <NavBar />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
