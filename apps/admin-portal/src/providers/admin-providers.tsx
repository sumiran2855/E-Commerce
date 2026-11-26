'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { AuthProvider, createMockAuthAdapter } from '@nextcommerce/auth-client';
import { Toaster } from '@nextcommerce/ui';

const mockAdminAuthAdapter = createMockAuthAdapter('admin');

export function AdminProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider adapter={mockAdminAuthAdapter}>
        <Toaster>{children}</Toaster>
      </AuthProvider>
    </QueryClientProvider>
  );
}
