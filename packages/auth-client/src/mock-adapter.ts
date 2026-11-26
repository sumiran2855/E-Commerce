import type { AuthSession, UserRole } from '@nextcommerce/shared-types';
import type { AuthAdapter } from './types';

/**
 * Development-only mock authentication adapter.
 * Production builds must use a BFF OAuth 2.0 / OIDC HttpOnly cookie adapter.
 * Never stores tokens in localStorage or sessionStorage.
 */
export function createMockAuthAdapter(defaultRole: UserRole = 'customer'): AuthAdapter {
  let activeSession: AuthSession | null = {
    user: {
      id: `dev-${defaultRole}-001`,
      email: `${defaultRole}@nextcommerce.in`,
      name: `Demo ${defaultRole.charAt(0).toUpperCase() + defaultRole.slice(1)}`,
      role: defaultRole,
    },
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    isAuthenticated: true,
  };

  return {
    async getSession(): Promise<AuthSession | null> {
      return activeSession;
    },
    async login(): Promise<void> {
      activeSession = {
        user: {
          id: `dev-${defaultRole}-001`,
          email: `${defaultRole}@nextcommerce.in`,
          name: `Demo ${defaultRole.charAt(0).toUpperCase() + defaultRole.slice(1)}`,
          role: defaultRole,
        },
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        isAuthenticated: true,
      };
    },
    async logout(): Promise<void> {
      activeSession = null;
    },
  };
}
