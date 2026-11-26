import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { SellerShell } from '@/components/seller-shell';
import { SellerProviders } from '@/providers/seller-providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'DMarket Seller Central',
  description: 'Independent seller portal for DMarket India.',
};

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SellerProviders>
          <SellerShell>{children}</SellerShell>
        </SellerProviders>
      </body>
    </html>
  );
}
