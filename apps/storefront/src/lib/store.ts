'use client';

import { create } from 'zustand';

export interface StorefrontUiState {
  cartBadgeCount: number;
  wishlistBadgeCount: number;
  mobileMenuOpen: boolean;
  setCartBadgeCount: (count: number) => void;
  setWishlistBadgeCount: (count: number) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStorefrontUiStore = create<StorefrontUiState>((set) => ({
  cartBadgeCount: 0,
  wishlistBadgeCount: 0,
  mobileMenuOpen: false,
  setCartBadgeCount: (cartBadgeCount) => set({ cartBadgeCount }),
  setWishlistBadgeCount: (wishlistBadgeCount) => set({ wishlistBadgeCount }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
}));
