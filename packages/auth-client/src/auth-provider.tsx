'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { publish } from '@nextcommerce/event-bus';
import type { AuthSession, AuthUser } from '@nextcommerce/shared-types';
import type { AuthAdapter } from './types';

export interface AuthContextValue {
  session: AuthSession | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (redirectTo?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  adapter: AuthAdapter;
  initialSession?: AuthSession | null;
  children: ReactNode;
}

export function AuthProvider({ adapter, initialSession = null, children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(initialSession);
  const [isLoading, setIsLoading] = useState<boolean>(initialSession === null);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const nextSession = await adapter.getSession();
      setSession(nextSession);
      if (nextSession?.isAuthenticated) {
        publish('user:authenticated', {
          userId: nextSession.user.id,
          role: nextSession.user.role,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [adapter]);

  useEffect(() => {
    if (initialSession === null) {
      void refreshSession();
    }
  }, [initialSession, refreshSession]);

  const login = useCallback(
    async (redirectTo?: string) => {
      await adapter.login(redirectTo);
      await refreshSession();
    },
    [adapter, refreshSession],
  );

  const logout = useCallback(async () => {
    await adapter.logout();
    setSession(null);
    publish('user:logged-out', { reason: 'manual' });
  }, [adapter]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.isAuthenticated),
      isLoading,
      login,
      logout,
      refreshSession,
    }),
    [session, isLoading, login, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
