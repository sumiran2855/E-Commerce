import type { AuthSession, UserRole } from '@nextcommerce/shared-types';

export interface AuthAdapter {
  getSession(): Promise<AuthSession | null>;
  login(redirectTo?: string): Promise<void>;
  logout(): Promise<void>;
}

export interface NavItem {
  label: string;
  href: string;
  requiredRoles?: UserRole[];
}

export function getNavigationForRole(role: UserRole): NavItem[] {
  switch (role) {
    case 'customer':
      return [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/account' },
        { label: 'Orders', href: '/orders' },
        { label: 'Cart', href: '/cart' },
      ];
    case 'seller':
      return [
        { label: 'Dashboard', href: '/' },
        { label: 'Catalog', href: '/catalog', requiredRoles: ['seller'] },
        { label: 'Orders', href: '/orders', requiredRoles: ['seller'] },
        { label: 'Payouts', href: '/payouts', requiredRoles: ['seller'] },
      ];
    case 'admin':
      return [
        { label: 'Overview', href: '/' },
        { label: 'Sellers', href: '/sellers', requiredRoles: ['admin'] },
        { label: 'Moderation', href: '/moderation', requiredRoles: ['admin'] },
        { label: 'Settings', href: '/settings', requiredRoles: ['admin'] },
      ];
  }
}
