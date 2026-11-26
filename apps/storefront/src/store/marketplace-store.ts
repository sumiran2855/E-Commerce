'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { publish } from '@nextcommerce/event-bus';
import { DELIVERY_LOCATIONS } from '@/constants/storefront';
import { useStorefrontUiStore } from '@/lib/store';
import type { CartItem, DeliveryLocation } from '@/types/storefront';

export interface MarketplaceState {
  cartItems: CartItem[];
  savedForLaterIds: string[];
  wishlistIds: string[];
  recentlyViewedIds: string[];
  deliveryLocation: DeliveryLocation;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  saveForLater: (productId: string) => void;
  moveToCartFromSaved: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  recordProductView: (productId: string) => void;
  setDeliveryLocation: (location: DeliveryLocation) => void;
}

function syncBadges(cartItems: CartItem[], wishlistIds: string[]) {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  useStorefrontUiStore.getState().setCartBadgeCount(cartCount);
  useStorefrontUiStore.getState().setWishlistBadgeCount(wishlistIds.length);
  publish('cart:updated', { itemCount: cartCount, subtotalInPaise: 0 });
  publish('wishlist:updated', { itemCount: wishlistIds.length });
}

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      cartItems: [
        { productId: 'prod-1', quantity: 1 },
        { productId: 'prod-3', quantity: 1 },
      ],
      savedForLaterIds: [],
      wishlistIds: ['prod-4', 'prod-7'],
      recentlyViewedIds: ['prod-1', 'prod-4', 'prod-5', 'prod-12'],
      deliveryLocation: DELIVERY_LOCATIONS[0]!,

      addToCart: (productId, quantity = 1) => {
        const current = get().cartItems;
        const existing = current.find((item) => item.productId === productId);
        const next = existing
          ? current.map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
                : item,
            )
          : [...current, { productId, quantity }];

        set({ cartItems: next });
        syncBadges(next, get().wishlistIds);
      },

      removeFromCart: (productId) => {
        const next = get().cartItems.filter((item) => item.productId !== productId);
        set({ cartItems: next });
        syncBadges(next, get().wishlistIds);
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        const next = get().cartItems.map((item) =>
          item.productId === productId ? { ...item, quantity: Math.min(10, quantity) } : item,
        );
        set({ cartItems: next });
        syncBadges(next, get().wishlistIds);
      },

      saveForLater: (productId) => {
        const nextCart = get().cartItems.filter((item) => item.productId !== productId);
        const nextSaved = Array.from(new Set([...get().savedForLaterIds, productId]));
        set({ cartItems: nextCart, savedForLaterIds: nextSaved });
        syncBadges(nextCart, get().wishlistIds);
      },

      moveToCartFromSaved: (productId) => {
        const nextSaved = get().savedForLaterIds.filter((id) => id !== productId);
        set({ savedForLaterIds: nextSaved });
        get().addToCart(productId, 1);
      },

      clearCart: () => {
        set({ cartItems: [] });
        syncBadges([], get().wishlistIds);
      },

      toggleWishlist: (productId) => {
        const current = get().wishlistIds;
        const exists = current.includes(productId);
        const next = exists ? current.filter((id) => id !== productId) : [productId, ...current];
        set({ wishlistIds: next });
        syncBadges(get().cartItems, next);
        return !exists;
      },

      removeFromWishlist: (productId) => {
        const next = get().wishlistIds.filter((id) => id !== productId);
        set({ wishlistIds: next });
        syncBadges(get().cartItems, next);
      },

      recordProductView: (productId) => {
        const filtered = get().recentlyViewedIds.filter((id) => id !== productId);
        set({ recentlyViewedIds: [productId, ...filtered].slice(0, 8) });
      },

      setDeliveryLocation: (deliveryLocation) => set({ deliveryLocation }),
    }),
    {
      name: 'nextcommerce-marketplace-v1',
      onRehydrateStorage: () => (state) => {
        if (state) {
          syncBadges(state.cartItems, state.wishlistIds);
        }
      },
    },
  ),
);
