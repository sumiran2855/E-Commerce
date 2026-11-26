'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Flame,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '@nextcommerce/auth-client';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@nextcommerce/ui';
import { cn, formatINR } from '@nextcommerce/utilities';
import { DMarketLogo } from '@/components/common/dmarket-logo';
import { ANNOUNCEMENTS, DELIVERY_LOCATIONS, NAV_CATEGORIES } from '@/constants/storefront';
import { useStorefrontUiStore } from '@/lib/store';
import { getSearchSuggestions } from '@/services/catalog.service';
import { useMarketplaceStore } from '@/store/marketplace-store';
import type { Category, Product } from '@/types/storefront';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const cartBadgeCount = useStorefrontUiStore((s) => s.cartBadgeCount);
  const wishlistBadgeCount = useStorefrontUiStore((s) => s.wishlistBadgeCount);
  const mobileMenuOpen = useStorefrontUiStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useStorefrontUiStore((s) => s.setMobileMenuOpen);

  const deliveryLocation = useMarketplaceStore((s) => s.deliveryLocation);
  const setDeliveryLocation = useMarketplaceStore((s) => s.setDeliveryLocation);
  const cartItems = useMarketplaceStore((s) => s.cartItems);
  const wishlistIds = useMarketplaceStore((s) => s.wishlistIds);

  const displayCartCount =
    cartBadgeCount || cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayWishlistCount = wishlistBadgeCount || wishlistIds.length;

  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<{ products: Product[]; categories: Category[] }>({
    products: [],
    categories: [],
  });
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    void getSearchSuggestions(searchQuery).then((res) => {
      if (active) setSuggestions(res);
    });
    return () => {
      active = false;
    };
  }, [searchQuery]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    setSearchFocused(false);
    setMobileMenuOpen(false);
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/products');
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-4 py-1.5 text-center text-xs font-medium text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
          <span className="truncate">{ANNOUNCEMENTS[announcementIndex]}</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <DMarketLogo subtitle="India Marketplace" />

          {/* Delivery Location Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-left text-xs transition-all hover:border-indigo-200 hover:bg-indigo-50/40 xl:flex"
                aria-label="Select delivery location"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <span className="block text-[10px] font-medium text-slate-500">Deliver to</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryLocation.city} · {deliveryLocation.pincode}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <div className="px-2 py-1.5 text-xs font-semibold text-slate-700">
                Choose Delivery Location
              </div>
              <DropdownMenuSeparator />
              {DELIVERY_LOCATIONS.map((loc) => (
                <DropdownMenuItem
                  key={loc.pincode}
                  onClick={() => setDeliveryLocation(loc)}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {loc.city} ({loc.pincode})
                    </p>
                    <p className="text-[11px] text-slate-500">{loc.etaText}</p>
                  </div>
                  {deliveryLocation.pincode === loc.pincode ? (
                    <Badge variant="primary">Active</Badge>
                  ) : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Search Bar */}
        <div ref={searchContainerRef} className="relative hidden flex-1 max-w-xl md:block">
          <form onSubmit={handleSearchSubmit} role="search">
            <label htmlFor="desktop-search" className="sr-only">
              Search products, brands, and categories
            </label>
            <div className="relative flex items-center">
              <Search
                className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="desktop-search"
                type="search"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchFocused(false);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search headphones, linen shirts, air fryers, brands..."
                className="h-10.5 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-24 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="submit"
                className="absolute right-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-95"
              >
                Search
              </button>
            </div>
          </form>

          {searchFocused &&
          (suggestions.products.length > 0 || suggestions.categories.length > 0) ? (
            <div
              role="listbox"
              aria-label="Search suggestions"
              className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
            >
              {suggestions.categories.length > 0 ? (
                <div className="border-b border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Popular Categories
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setSearchFocused(false)}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {suggestions.products.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {suggestions.products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => setSearchFocused(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-indigo-50/40"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {product.brand} · {product.categoryName}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {formatINR(product.priceInPaise)}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Account menu"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 text-slate-700 transition-all hover:border-indigo-200 hover:bg-indigo-50/40"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <User className="h-3.5 w-3.5" />
                </span>
                <span className="hidden text-xs font-semibold sm:inline">
                  {isAuthenticated ? (user?.name ?? 'Account') : 'Sign In'}
                </span>
                <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:inline" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/account')}>
                    <User className="mr-2 h-4 w-4" /> My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/orders')}>
                    <Package className="mr-2 h-4 w-4" /> My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => void logout()}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-semibold text-slate-900">Welcome to DMarket</p>
                    <p className="text-[11px] text-slate-500">
                      Sign in for orders &amp; exclusive deals
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/login')}>Sign In</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/register')}>
                    Create Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/orders')}>
                    Track Orders
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label={`Wishlist (${displayWishlistCount} items)`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 transition-all hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-600"
          >
            <Heart className="h-4.5 w-4.5" />
            {displayWishlistCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-xs">
                {displayWishlistCount}
              </span>
            ) : null}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart (${displayCartCount} items)`}
            className="relative inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-3.5 text-white shadow-xs transition-all hover:bg-indigo-600"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            <span className="hidden text-xs font-semibold sm:inline">Cart</span>
            {displayCartCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[11px] font-bold text-slate-950">
                {displayCartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="border-t border-slate-100 px-4 py-2 md:hidden">
        <form onSubmit={handleSearchSubmit} role="search" className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands..."
            aria-label="Search products"
            className="h-9.5 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-16 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white"
          >
            Go
          </button>
        </form>
      </div>

      {/* Secondary Category Navigation */}
      <nav
        aria-label="Product categories"
        className="hidden border-t border-slate-100 bg-slate-50/70 lg:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-1.5">
            {NAV_CATEGORIES.map((category) => {
              const isActive = pathname === `/category/${category.slug}`;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className={cn(
                    'whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-xs',
                  )}
                >
                  {category.name}
                </Link>
              );
            })}
            <Link
              href="/products"
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-white"
            >
              All Categories
            </Link>
          </div>
          <Link
            href="/products?sort=price-asc"
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-200"
          >
            <Flame className="h-3.5 w-3.5 text-amber-600" />
            Today&apos;s Deals
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-50 flex lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <DMarketLogo href="/" />
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Delivering to</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">
                  {deliveryLocation.city}, {deliveryLocation.pincode}
                </p>
              </div>

              <div className="mb-5 flex gap-2">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push('/account');
                    }}
                  >
                    My Account ({user?.name})
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        router.push('/login');
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        router.push('/register');
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Shop by Category
              </p>
              <div className="space-y-1">
                {NAV_CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                  All Products
                </Link>
              </div>

              <div className="mt-6 space-y-1 border-t border-slate-100 pt-4">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Wishlist ({displayWishlistCount})
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Shopping Cart ({displayCartCount})
                </Link>
                <Link
                  href="/help"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
