'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState, type ReactNode } from 'react';
import { AuthProvider, createMockAuthAdapter } from '@nextcommerce/auth-client';
import { subscribe } from '@nextcommerce/event-bus';
import { Toaster } from '@nextcommerce/ui';
import { useStorefrontUiStore } from '@/lib/store';
import { useMarketplaceStore } from '@/store/marketplace-store';

const mockCustomerAuthAdapter = createMockAuthAdapter('customer');

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const setCartBadgeCount = useStorefrontUiStore((s) => s.setCartBadgeCount);
  const setWishlistBadgeCount = useStorefrontUiStore((s) => s.setWishlistBadgeCount);

  useEffect(() => {
    const initialCartCount = useMarketplaceStore
      .getState()
      .cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const initialWishlistCount = useMarketplaceStore.getState().wishlistIds.length;
    setCartBadgeCount(initialCartCount);
    setWishlistBadgeCount(initialWishlistCount);

    const unsubCart = subscribe('cart:updated', (detail) => {
      setCartBadgeCount(detail.itemCount);
    });
    const unsubWishlist = subscribe('wishlist:updated', (detail) => {
      setWishlistBadgeCount(detail.itemCount);
    });

    return () => {
      unsubCart();
      unsubWishlist();
    };
  }, [setCartBadgeCount, setWishlistBadgeCount]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider adapter={mockCustomerAuthAdapter}>
        <Toaster>{children}</Toaster>
      </AuthProvider>
    </QueryClientProvider>
  );
}
