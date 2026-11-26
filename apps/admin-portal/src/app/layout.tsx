import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { AdminShell } from '@/components/admin-shell';
import { AdminProviders } from '@/providers/admin-providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'DMarket Admin Console',
  description: 'Independent platform administration console for DMarket.',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AdminProviders>
          <AdminShell>{children}</AdminShell>
        </AdminProviders>
      </body>
    </html>
  );
}
