'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Wallet } from 'lucide-react';
import { getNavigationForRole, useAuth } from '@nextcommerce/auth-client';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@nextcommerce/ui';

const ICONS = [LayoutDashboard, Package, ShoppingCart, Wallet];
const AUTH_PATHS = new Set([
  '/login',
  '/register',
  '/forgot-password',
  '/verify-otp',
  '/reset-password',
  '/account-pending',
  '/account-rejected',
  '/auth/error',
]);

export function SellerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const navItems = getNavigationForRole('seller');

  if (AUTH_PATHS.has(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--nc-bg-secondary)]">
      <aside className="hidden w-64 flex-col border-r border-[var(--nc-border)] bg-[var(--nc-bg)] p-4 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2">
          <span className="text-base font-bold text-[var(--nc-text)]">DMarket</span>
          <Badge variant="primary">Seller</Badge>
        </div>
        <nav aria-label="Seller navigation" className="flex flex-1 flex-col gap-1">
          {navItems.map((item, idx) => {
            const Icon = ICONS[idx] ?? LayoutDashboard;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-[var(--nc-text-secondary)] hover:bg-[var(--nc-bg-secondary)] hover:text-[var(--nc-text)]"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-[var(--nc-border)] bg-[var(--nc-bg)] px-6">
          <p className="text-sm font-medium text-[var(--nc-text)]">Seller Portal</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {isAuthenticated ? user?.name : 'Seller Account'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile (Placeholder)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => void logout()}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
